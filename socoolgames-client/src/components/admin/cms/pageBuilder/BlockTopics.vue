<template>
    <section :class="'py-16 md:bg-[url('+formatUrl(baseUrl+props.data?.backgroundImage.large)+')] bg-[url('+formatUrl(baseUrl+props.data?.backgroundImage.medium)+')] bg-cover'">

        <!-- BLOCK 1 -->
        <div class="max-w-6xl mx-auto px-6 py-5 grid md:grid-cols-2 gap-12 items-center">

            <!-- Text -->
            <div class="py-5">
                <h2 class="text-3xl md:text-4xl font-bold text-green-700 mb-4">
                    {{ props.data.title?.[props.selectedLang] }}
                </h2>

                <p class="text-lg text-gray-700 mb-8" v-html="props.data.subTitle?.[props.selectedLang]">
                </p>
                    
                <ul class="space-y-4 text-gray-800 text-lg">
                    <li class="flex items-center gap-3" v-for="(item, index) in (props.data.items?.[props.selectedLang].split('\n') ?? [])" :key="index">
                        <span class="text-green-600 text-xl">✔</span> {{ item }}
                    </li>
                </ul>

                <button class="mt-10 bg-primary hover:bg-darkgreen text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition">
                    {{ props.data.buttonText?.[props.selectedLang] }}
                </button>
            </div>

            <!-- Imagem -->
            <div class="flex justify-center">
                <picture>
                    <source media="(width < 640px)" :srcset="formatUrl(baseUrl + props.data?.image.thumb)" />
                    <source media="(width <= 768px)" :srcset="formatUrl(baseUrl + props.data?.image.medium)" />
                    <img loading="lazy" class="rounded-2xl shadow-xl w-full max-w-md" alt="Criança a utilizar jogo criativo no telemóvel"
                            :src="formatUrl(baseUrl + props.data?.image.large)" />
                </picture>
            </div>
        </div>
    </section>

    <!-- <section class="relative w-full h-[600px] flex items-center justify-center text-center text-white">

        <div class="absolute inset-0">
            <picture>
                <source media="(width < 640px)" :srcset="formatUrl(baseUrl + props.data?.backgroundImage.thumb)" />
                <source media="(width <= 768px)" :srcset="formatUrl(baseUrl + props.data?.backgroundImage.medium)" />
                <img loading="lazy" class="w-full h-full object-cover" alt="Criança a utilizar jogo criativo no telemóvel"
                     :src="formatUrl(baseUrl + props.data?.backgroundImage.large)" />
            </picture>
            <div class="absolute inset-0 bg-black/50"></div>
        </div>

        <div class="relative z-10 max-w-3xl px-6">

            <h2 class="text-3xl md:text-5xl font-bold mb-6">
            {{ props.data.title?.[props.selectedLang] }}
            </h2>

            <p class="text-lg md:text-xl mb-10 text-gray-200">
            {{ props.data.subTitle?.[props.selectedLang] }}
            </p>

            <a :href="props.data.buttonLink?.[props.selectedLang]" 
               target="_blank" 
               rel="noopener"
               class="inline-flex items-center gap-3 border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                {{ props.data.buttonText?.[props.selectedLang] }}
            </a>

        </div>
    </section> -->
</template>
<script setup>
    import { defineProps } from 'vue';
    const baseUrl = 'http://localhost:3000';
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