<template>
    <section class="py-16 bg-gradient-to-r from-yellow-100 via-yellow-200 to-green-100 ">
        <div class="max-w-7xl mx-auto px-6 text-center">

            <h2 class="text-3xl md:text-4xl font-bold mb-8" v-html="props.data.title?.[props.selectedLang]"></h2>
            <h3 class="text-2xl md:text-2xl mb-12" v-html="props.data.subTitle?.[props.selectedLang]"></h3>
            <div class="grid md:grid-cols-4 gap-8">

                <div class="hover:scale-110 rounded-xl bg-white">
                    <div v-if="props.data.image1?.[props.selectedLang].thumb" 
                        class="flex flex-row justify-center items-center">
                        <img class="h-16" :src="formatUrl(baseUrl + (props.data.image1?.[props.selectedLang].thumb))" />
                    </div>
                    <div v-if="props.data.title1?.[props.selectedLang]" class="text-4xl mb-4">{{ props.data.title1?.[props.selectedLang] }}</div>
                    <h3 class="font-bold mb-2 mx-1">{{ props.data.subTitle1?.[props.selectedLang] }}</h3>
                </div>

                <div class="hover:scale-110 rounded-xl bg-white">
                    <div v-if="props.data.image2?.[props.selectedLang].thumb" 
                        class="flex flex-row justify-center items-center">
                        <img class="h-16" :src="formatUrl(baseUrl + (props.data.image2?.[props.selectedLang].thumb))" />
                    </div>
                    <div v-if="props.data.title2?.[props.selectedLang]" class="text-4xl mb-4">{{ props.data.title2?.[props.selectedLang] }}</div>
                    <h3 class="font-bold mb-2 mx-1">{{ props.data.subTitle2?.[props.selectedLang] }}</h3>
                </div>

                <div class="hover:scale-110 rounded-xl bg-white">
                    <div v-if="props.data.image3?.[props.selectedLang].thumb" 
                        class="flex flex-row justify-center items-center">
                        <img class="h-16" :src="formatUrl(baseUrl + (props.data.image3?.[props.selectedLang].thumb))" />
                    </div>
                    <div v-if="props.data.title3?.[props.selectedLang]" class="text-4xl mb-4">{{ props.data.title3?.[props.selectedLang] }}</div>
                    <h3 class="font-bold mb-2 mx-1">{{ props.data.subTitle3?.[props.selectedLang] }}</h3>
                </div>

                <div class="hover:scale-110 rounded-xl bg-white">
                    <div v-if="props.data.image4?.[props.selectedLang].thumb" 
                        class="flex flex-row justify-center items-center">
                        <img class="h-16" :src="formatUrl(baseUrl + (props.data.image4?.[props.selectedLang].thumb))" />
                    </div>
                    <div v-if="props.data.title4?.[props.selectedLang]" class="text-4xl mb-4">{{ props.data.title4?.[props.selectedLang] }}</div>
                    <h3 class="font-bold mb-2 mx-1">{{ props.data.subTitle4?.[props.selectedLang] }}</h3>
                </div>

            </div>
        </div>
    </section>
</template>
<script setup>
    import { defineProps } from 'vue';
    import { formatUrl } from "@/utils/url.utils";
    const baseUrl = process.env.VUE_APP_API_URL;
    
    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

</script>