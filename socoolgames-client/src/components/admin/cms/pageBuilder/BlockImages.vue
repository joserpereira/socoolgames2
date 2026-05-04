<template>
    <section :style="bgImage" class="bg-cover bg-center">
        <div class="max-w-7xl mx-auto px-6 py-5 grid gap-12 items-center">        <!-- BLOCK 3 - INSTAGRAM -->
            <div class="mx-auto mt-20 px-6 text-center">

                <h3 v-if="props.data.title?.[props.selectedLang]"
                    class="text-2xl md:text-3xl font-bold text-green-700 mb-10" v-html="props.data.title?.[props.selectedLang]">
                </h3>
                <div :class="['grid gap-6 mb-10 place-items-center', 
                                'grid-cols-1', 
                                props.data.items.length >= 5 ? 'md:grid-cols-5' : 
                                props.data.items.length === 4 ? 'md:grid-cols-4' :
                                props.data.items.length === 3 ? 'md:grid-cols-3' :
                                'md:grid-cols-2']">
                <div v-for="value in props.data.items" :key="value" class="justify-items-center">
                    <img :src="getImage((value?.image?.[props.selectedLang] || value?.image), value.imageSize)" alt="" 
                         :class="props.data.items.length % 4 == 0 ? 'h-48' : 'h-48'" 
                         class="rounded-xl shadow-md hover:scale-105 transition h-48" loading="lazy">

                </div>
                </div>
<!--
                    
                <img :src="formatUrl('./public/images/insta1.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
                <img :src="formatUrl('./public/images/insta2.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
                <img :src="formatUrl('./public/images/insta3.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
                <img :src="formatUrl('./public/images/insta4.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
                <img :src="formatUrl('./public/images/insta5.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
-->                    

                <a v-if="props.data.buttonText?.[props.selectedLang]" 
                   :href="props.data.buttonLink?.[props.selectedLang]" target="_blank"
                   class="inline-block bg-primary hover:bg-darkgreen text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition">
                   {{ props.data.buttonText?.[props.selectedLang] }}
                </a>

            </div>        
        </div>
    </section>
</template>
<script setup>
    import { computed } from 'vue';
    import { formatUrl } from "@/utils/url.utils";
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    
    const bgImage = computed(() => {
        const images = props.data?.backgroundImage?.[props.selectedLang] || props.data?.backgroundImage
        const isMobile = window.innerWidth < 768
        const url = formatUrl(baseUrl + (isMobile ? images?.medium : images?.large))
        return { backgroundImage: `url('${url}')` }
    })
    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    const getImage = (image, imageSize) => {
        if (image == undefined)
            return undefined;

        var imageUrl = "";
        if (imageSize == "medium") {
            imageUrl = image.medium;
        }            
        else if (imageSize == "large") {
            imageUrl = image.large;
        }
        else 
            imageUrl = image.thumb;
        
        return formatUrl(baseUrl + imageUrl)
    }

    defineExpose({ getImage });
</script>