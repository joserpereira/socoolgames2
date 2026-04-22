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
                    <button class="flex btn-pulse  flex-row justify-center align-center items-center bg-primary w-full hover:bg-secondary transition-colors text-white font-display font-black text-base tracking-widest uppercase px-8 py-3 rounded-full shadow-md whitespace-nowrap"
                            @click="downloadFileClick">
                        <span v-if="data.downloading">
                            <svg class="rotate lucide lucide-hourglass-icon lucide-hourglass" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
                            </svg>
                        </span> 
                        <span v-else>
                            <svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </span>
                        <span class="ms-2"> 
                            {{ props.data.buttonDownloadText?.[props.selectedLang] || "Download" }}
                        </span>

                        
                    </button>                
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
        downloading: false,
        url: ""
    })

    const downloadFileClick = async () => {
        data.downloading = true;
        if (props.data?.downloadFile?.[props.selectedLang]?._id) {
            const result = await fileService.downloadItem(props.data.downloadFile[props.selectedLang]._id);
            data.downloaded = true;
            data.downloading = false;
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
<style>
/* .rotate {
	animation-duration: 5s;
	animation-delay: 1s;
	animation-iteration-count: infinite;
    animation-name: hourglass-rotation;
}
@keyframes hourglass-rotation {
    0%{transform: rotateZ(0);}
	25%{transform: rotateZ(90deg);}
    75%{transform: rotateZ(170deg);}
	100%{transform: rotateZ(300deg);}
} */

@keyframes rotate-steps {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate {
  animation: rotate-steps 2s steps(8, end) infinite;
}
</style>