<template>
    <section :class="'py-16 md:bg-[url('+formatUrl(baseUrl+props.data?.backgroundImage?.large)+')] bg-[url('+formatUrl(baseUrl+props.data?.backgroundImage?.medium)+')] bg-cover'">
        <div class="max-w-6xl mx-auto px-6 py-5 grid gap-12 items-center">        <!-- BLOCK 3 - INSTAGRAM -->
            <div class="max-w-6xl mx-auto mt-20 px-6 text-center">

                <h3 class="text-2xl md:text-3xl font-bold text-green-700 mb-10" v-html="props.data.title?.[props.selectedLang]">            
                </h3>

                <div :class="'md:grid-cols-'+ (props.data.items.length < 6 ? props.data.items.length : '5')" 
                        class="grid gap-6 mb-10">

                <div v-for="value in props.data.items" :key="value">
                    <img :src="formatUrl(baseUrl + value?.image?.thumb)" alt="" 
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

                <a :href="props.data.buttonLink?.[props.selectedLang]" target="_blank"
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
    const baseUrl = 'http://localhost:3000';

    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    defineExpose({ formatUrl });
</script>