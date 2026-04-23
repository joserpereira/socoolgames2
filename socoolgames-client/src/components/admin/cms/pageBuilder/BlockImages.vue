<template>
    <section :class="'md:bg-[url('+formatUrl(baseUrl+props.data?.backgroundImage?.large)+')] bg-[url('+formatUrl(baseUrl+props.data?.backgroundImage?.medium)+')] bg-cover'">
        <div class="max-w-7xl mx-auto px-6 py-5 grid gap-12 items-center">        <!-- BLOCK 3 - INSTAGRAM -->
            <div class="mx-auto mt-20 px-6 text-center">

                <h3 v-if="props.data.title?.[props.selectedLang]"
                    class="text-2xl md:text-3xl font-bold text-green-700 mb-10" v-html="props.data.title?.[props.selectedLang]">
                </h3>

                <div :class="'md:grid-cols-'+ (props.data.items.length < 6 ? props.data.items.length : '5')" 
                        class="grid gap-6 mb-10">
                <div v-for="value in props.data.items" :key="value" class="justify-items-center">
                    <img :src="getImage(value.image, value.imageSize)" alt="" 
                         :class="props.data.items.length % 4 == 0 ? 'h-48' : 'h-100'" 
                         class="rounded-xl shadow-md hover:scale-105 transition" loading="lazy">

                </div>
<!--
                    
                <img :src="formatUrl('./public/images/insta1.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
                <img :src="formatUrl('./public/images/insta2.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
                <img :src="formatUrl('./public/images/insta3.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
                <img :src="formatUrl('./public/images/insta4.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
                <img :src="formatUrl('./public/images/insta5.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
-->                    
                </div>

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
    import { defineProps, defineExpose } from 'vue';
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