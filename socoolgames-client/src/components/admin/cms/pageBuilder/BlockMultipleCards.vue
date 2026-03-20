<template>
    <section id="produtos" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-14">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">
                    {{ props.data.title?.[props.selectedLang] }}
                </h2>
                <p class="text-gray-600">
                    {{ props.data.subTitle?.[props.selectedLang] }}
                </p>
            </div>

            <div :class="props.data.items.length % 4 == 0 ? 'md:grid-cols-4' : 'md:grid-cols-3'" class="grid gap-8 items-stretch">                
                <article v-for="(item, index) in props.data.items" :key="index"
                    class="flex flex-col bg-white hover:scale-105 rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
                    <img :src="formatUrl(baseUrl+item?.image?.thumb)" alt="Jogo Caça Palavras" 
                        :class="props.data.items.length % 4 == 0 ? 'h-48' : 'h-100'" 
                        class="w-full object-cover" loading="lazy">
                    <span v-if="item.header?.[props.selectedLang]" 
                        :class="(item.headerColor ?? '').length > 0 ? item.headerColor : 'bg-yellow-100 text-yellow-700'"
                        class="w-fit mx-6 mt-6 text-xs px-3 py-1 rounded-full">{{ item.header?.[props.selectedLang] }}</span>
                    <h3 v-if="item.title?.[props.selectedLang]" class="px-6 text-xl font-bold mt-4 mb-2">{{ item.title?.[props.selectedLang] }}</h3>
                    <p v-if="item.subTitle?.[props.selectedLang]" class="flex-1 px-6 flex-1 text-gray-600 mb-4">{{ item.subTitle?.[props.selectedLang] }}</p>
                    <div class="px-6 pb-6">
                        <a :href="item.buttonLink?.[props.selectedLang]" v-if="item.buttonText?.[props.selectedLang]"
                        :class="(item.buttonColor ?? '').length > 0 ? item.buttonColor : 'bg-primary text-white'"
                        class="mt-auto block text-center py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                            {{ item.buttonText?.[props.selectedLang] }}
                        </a>
                    </div>
                </article>

            </div>
        </div>
    </section>
</template>
<script setup>
    import { defineProps, /* defineEmits,*/ onMounted } from 'vue';
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

    // const formatText = (text) => {
    //     if (text)
    //         return text.replaceAll('\n', '<br />')
    //     return "";
    // }

    onMounted(() => {
    })

    // defineEmits({ formatUrl })
</script>