<template>
    <!-- ══════════════════ FORM / CTA ══════════════════ -->
    <section id="receber" class="bg-[#e8f0d0] py-16 fade d4">
        <div class="max-w-2xl mx-auto px-6 text-center">
            <h2 class="font-display font-black text-4xl text-[#1a1808] mb-2"  v-html="props.data.title?.[props.selectedLang]">
            </h2>
            <p class="text-[#4a4428] text-base mb-8" v-html="props.data.subTitle?.[props.selectedLang]">
            </p>
            <!-- Language + submit row -->
            <div v-if="!data.showFile" class="flex flex-col sm:flex-row gap-3 bg-white rounded-3xl sm:rounded-full p-4 shadow-md border border-[#ddd8c0] mb-5">
                <input 
                    type="email" 
                    :placeholder="props.data.inputPlaceholder?.[props.selectedLang]"
                    v-model="data.email"
                    :disabled="!props.data?.downloadFile?.[props.selectedLang]"
                    class="px-6 py-4 rounded-full text-gray-700 border border-gray-300 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <button class="btn-pulse hover:scale-105 bg-primary hover:bg-secondary transition-colors text-white font-display font-black text-base tracking-widest uppercase px-8 py-3 rounded-full shadow-md whitespace-nowrap"
                    :disabled="!props.data?.downloadFile?.[props.selectedLang]"
                    @click="submitEmail">
                    {{ props.data.buttonText?.[props.selectedLang] }}
                </button>
            </div>

            <div v-if="!data.showFile" class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-[#3a6418]" v-html="props.data.footer?.[props.selectedLang]">
            </div>

            <div v-else :class="data.downloaded ? 'rounded-3xl' : 'rounded-3xl sm:rounded-full'" class="bg-white hover:scale-105 p-2 shadow-md border border-[#ddd8c0] mb-5">
                <div class="flex sm:flex-row ">
                    <button class="btn-pulse bg-primary w-full hover:bg-secondary transition-colors text-white font-display font-black text-base tracking-widest uppercase px-8 py-3 rounded-full shadow-md whitespace-nowrap"
                            @click="downloadFileClick">{{ props.data.buttonDownloadText?.[props.selectedLang] || "Download" }}</button>                
                </div>
                <div v-if="data.downloaded" class="w-full textcenter my-3">
                    <p>{{ props.data?.downloadedMessage?.[props.selectedLang] || "Thanks for your download" }}</p>
                    <a :href="data.url" class="button" target="_blank">{{ props.data?.downloadedLinkMessage?.[props.selectedLang] || "Download Here" }}</a>
                </div>
            </div>
            <div v-if="data.errorMessage" class="mt-5 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p class="font-bold">Be Warned</p>
                <p>{{ data.errorMessage }}</p>
            </div>
        </div>
    </section>
</template>
<script setup>
    import { defineProps, defineExpose, reactive } from 'vue';
    import { formatUrl } from "@/utils/url.utils";
    import utilsService from '@/services/common/utils.service';
    import fileService from '@/services/common/file.service';

    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    const data = reactive({
        email: "",
        downloadFile: "",
        showFile: false,
        downloaded: false,
        url: ""
    })

    const downloadFileClick = async () => {
        if (props.data?.downloadFile?.[props.selectedLang]?._id) {
            const result = await fileService.downloadItem(props.data.downloadFile[props.selectedLang]._id);
            data.downloaded = true;
            if (result.error == 0)
                data.url = result.data;
        }
        else
            data.errorMessage = "Ooops. Couldn't download file.";
    }
    const submitEmail = async () => {
        // Implement your email submission logic here
        if (!data.email) {
            data.errorMessage = "Please enter a email address.";
            return;
        } 
        if (!utilsService.validateEmail(data.email)) {
            data.errorMessage = "Please enter a valid email address.";
            return
        }
        data.errorMessage = "";

        const result = await fileService.submit(props.data.downloadFile[props.selectedLang]._id, data.email, props.data.emailTemplate, props.selectedLang);

        if (result.error == 0 && result.data) {
            data.downloadFile = result.data;
            data.showFile = true;
        } else {
            data.errorMessage = "Oops. Sorry we couldn't submit your request. Please try again or contact us."
        }
     };

     defineExpose({ formatUrl, props, data, downloadFileClick });

     
</script>