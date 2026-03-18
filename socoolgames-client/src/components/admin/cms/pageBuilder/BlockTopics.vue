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