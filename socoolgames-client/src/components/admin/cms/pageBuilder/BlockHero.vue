<template>
    <section :class="'bg-gradient-to-r1 from-green-100 to-green-200 py-20 md:bg-[url('+formatUrl(baseUrl+props.data?.backgroundImage.large)+')] bg-[url('+formatUrl(baseUrl+props.data?.backgroundImage.medium)+')] bg-cover' "  >
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center" >

            <div>
                <h1 class="text-4xl backdrop-blur-sm md:text-5xl font-black mb-6 leading-tight rounded-lg px-6 py-4 inline-block">
                    {{ props.data.title?.[props.selectedLang] }}
                </h1>

                <p class="backdrop-blur-sm text-lg text-gray-700 mb-8 px-6 rounded-lg py-4 inline-block" v-html="formatText(props.data.subTitle?.[props.selectedLang])">
                    
                </p>
                <div>
                    <a :href="props.data?.buttonLink?.[props.selectedLang]" 
                        class="hover:scale-105 bg-primary text-white px-8 py-4 rounded-full inline-block font-bold hover:bg-darkgreen transition">
                        {{ props.data?.buttonText?.[props.selectedLang] }}
                    </a>
                </div>
            </div>
        </div>
    </section>
    <!-- <picture> -->
    <!-- <source media="(width < 640px)" :srcset="formatUrl('http://localhost:3000/uploads/images/header-thumb-1773510699054.webp')" /> -->
    <!-- <source media="(width <= 768px)" :srcset="formatUrl('http://localhost:3000'+props.data?.backgroundImage.medium)" />
    <img :src="formatUrl('http://localhost:3000'+props.data?.backgroundImage.large)" alt="Chris standing up holding his daughter Elva" />
    </picture> -->
</template>
<script setup>
    import { defineProps, defineEmits, onMounted } from 'vue';
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

    onMounted(() => {
    })

    defineEmits({ formatUrl })
</script>