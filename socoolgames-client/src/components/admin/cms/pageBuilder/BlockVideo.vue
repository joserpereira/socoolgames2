<template>
    <section class="relative w-full h-[600px] flex items-center justify-center text-center text-white">

        <!-- Background Image -->
        <div class="absolute inset-0">
            <picture>
                <source media="(width < 640px)" :srcset="formatUrl(baseUrl + props.data?.backgroundImage.thumb)" />
                <source media="(width <= 768px)" :srcset="formatUrl(baseUrl + props.data?.backgroundImage.medium)" />
                <img loading="lazy" class="w-full h-full object-cover" alt="Criança a utilizar jogo criativo no telemóvel"
                     :src="formatUrl(baseUrl + props.data?.backgroundImage.large)" />
            </picture>
            <div class="absolute inset-0 bg-black/50"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 max-w-3xl px-6">

            <h2 class="text-3xl md:text-5xl font-bold mb-6">
            {{ props.data.title?.[props.selectedLang] }}
            </h2>

            <p class="text-lg md:text-xl mb-10 text-gray-200">
            {{ props.data.subTitle?.[props.selectedLang] }}
            </p>

            <!-- Video Button -->
            <a :href="props.data.buttonLink?.[props.selectedLang]" 
               target="_blank" 
               rel="noopener"
               class="inline-flex items-center gap-3 border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition">
                <!-- Play Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                {{ props.data.buttonText?.[props.selectedLang] }}
            </a>

        </div>
    </section>
</template>
<script setup>
    import { defineProps } from 'vue';
    const baseUrl = process.env.VUE_APP_API_URL;
    import { formatUrl } from "@/utils/url.utils";

    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

</script>