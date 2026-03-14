<template>
    <section :class="'bg-gradient-to-r1 from-green-100 to-green-200 py-20 md:bg-[url('+formatUrl('http://localhost:3000'+props.data?.backgroundImage.large)+')] bg-[url('+formatUrl('http://localhost:3000'+props.data?.backgroundImage.medium)+')] bg-cover' "  >
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center" >

            <div>
                <h1 class="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    {{ props.data.title?.[props.selectedLang] }}
                </h1>

                <p class="text-lg text-gray-700 mb-8" v-html="formatText(props.data.subtitle?.[props.selectedLang])">
                    
                </p>

                <a :href="props.data?.buttonLink?.[props.selectedLang]" 
                    class="hover:scale-105 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-darkgreen transition">
                    {{ props.data?.buttonText?.[props.selectedLang] }}
                </a>
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

    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    const formatText = (text) => {
        if (text)
            return text.replaceAll('\n', '<br />')
        return "";
    }

    onMounted(() => {
    })

    defineEmits({ formatUrl })
</script>