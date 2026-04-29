<template>
    <section id="produtos" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-14">
                <h2 v-if="props.data.title?.[props.selectedLang]" class="text-3xl md:text-4xl font-bold mb-4" v-html="formatText(props.data.title?.[props.selectedLang])">
                </h2>
                <p v-if="props.data.subTitle?.[props.selectedLang]" class="text-gray-600" v-html="formatText(props.data.subTitle?.[props.selectedLang])">
                </p>
            </div>
            <div :class="props.data.items.length % 2 == 0 ? 'md:grid-cols-2' : 'md:grid-cols-3'" class="grid gap-8 items-stretch">                
                <article v-for="(item, index) in props.data.items" :key="index"
                    class="flex flex-col bg-white hover:scale-105 rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
                    <picture>
                        <!-- <source media="(width < 640px)" :srcset="formatUrl(baseUrl+(item?.image?.[props.selectedLang]?.thumb || item?.image?.thumb))"  alt="" /> -->
                        <source media="(width <= 768px)" :srcset="formatUrl(baseUrl+(item?.image?.[props.selectedLang]?.medium || item?.image?.medium))" alt="" />
                        <img :src="formatUrl(baseUrl+(item?.image?.[props.selectedLang]?.large || item?.image?.large))" alt="" />
                    </picture>  
                    <span v-if="item.header?.[props.selectedLang]" 
                        :class="(item.headerColor ?? '').length > 0 ? item.headerColor : 'bg-yellow-100 text-yellow-700'"
                        class="w-fit mx-6 mt-6 text-xs px-3 py-1 rounded-full">{{ item.header?.[props.selectedLang] }}</span>
                    <h3 v-if="item.title?.[props.selectedLang]" class="px-6 text-xl font-bold mt-4 mb-2">{{ item.title?.[props.selectedLang] }}</h3>
                    <p v-if="item.subTitle?.[props.selectedLang]" class="flex-1 px-6 flex-1 text-gray-600 mb-4" v-html="formatText(item.subTitle?.[props.selectedLang])">
                    </p>
                    <div class="px-6 pb-6">
                        <button 
                            class="flex btn-pulse  flex-row justify-center align-center items-center w-full transition-colors text-white font-display font-black text-base tracking-widest uppercase px-8 py-3 rounded-full shadow-md whitespace-nowrap"
                            :disabled="!item.file"
                            :class="(item.buttonColor ?? '').length > 0 ? item.buttonColor : 'bg-primary hover:bg-secondary text-white'"
                            @click="downloadFileClick(item.file)">
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
                                {{ item.buttonText?.[props.selectedLang] }}
                            </span>                            
                        </button>
                    </div>
                </article>

            </div>
        </div>
    </section>
</template>
<script setup>
    import { defineProps, reactive /* defineEmits,*/ } from 'vue';
    import { formatUrl } from "@/utils/url.utils";
    import { formatText } from '@/utils/html.utils';
    import fileService from '@/services/common/file.service';

    const baseUrl = process.env.VUE_APP_API_URL;
    
    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })
    const data = reactive({
        downloading: false,
        downloaded: false,
        url: "",
        errorMessage: ""
    })

    const downloadFileClick = async (file) => {
        data.downloading = true;
        if (file?.[props.selectedLang]?._id) {
            const result = await fileService.downloadItem(file[props.selectedLang]._id);
            data.downloaded = true;
            data.downloading = false;
            if (result.error == 0)
                data.url = result.data;
        }
        else
            data.errorMessage = "Ooops. Couldn't download file.";
    }

</script>