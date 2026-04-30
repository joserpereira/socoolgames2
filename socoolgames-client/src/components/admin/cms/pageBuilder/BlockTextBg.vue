<template>
    <section :style="bgImage" class="relative py-20 px-6 text-center bg-cover">    
        <div class="max-w-4xl mx-auto ">

            <h2 class="text-3xl md:text-4xl font-bold mb-6" v-html="props.data.title?.[props.selectedLang]">
            </h2>

            <p class="text-lg text-gray-700 mb-6">
                {{ props.data.subTitle?.[props.selectedLang] }}
            </p>

            <p class="text-gray-700 max-w-3xl mx-auto">
                {{ formatText(props.data.text?.[props.selectedLang]) }}
            </p>

        </div>
    </section>
</template>
<script setup>
    import { defineProps, defineExpose, onMounted, computed } from 'vue';
    import { formatUrl } from "@/utils/url.utils";
    import { formatText } from '@/utils/html.utils';

    const baseUrl = process.env.VUE_APP_API_URL;
    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    const bgImage = computed(() => {
        const images = props.data?.backgroundImage?.[props.selectedLang] || props.data?.backgroundImage
        const isMobile = window.innerWidth < 768
        const url = formatUrl(baseUrl + (isMobile ? images?.medium : images?.large))
        return { backgroundImage: `url('${url}')` }
    })


    onMounted(() => {
    })

    defineExpose({ formatUrl, bgImage })
</script>