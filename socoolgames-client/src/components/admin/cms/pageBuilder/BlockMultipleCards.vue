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

        <div class="grid md:grid-cols-4 gap-8">

        
        <!-- Cards -->
        <article v-for="(item, index) in props.data.items" :key="index"
            class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img :src="formatUrl(baseUrl+item?.image?.thumb)" alt="Jogo Caça Palavras" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-6">
                <span v-if="item.header?.[props.selectedLang]" 
                      :class="(item.headerColor ?? '').length > 0 ? item.headerColor : 'bg-yellow-100 text-yellow-700'"
                      class="text-xs px-3 py-1 rounded-full">{{ item.header?.[props.selectedLang] }}</span>
                
                <h3 v-if="item.title?.[props.selectedLang]" class="text-xl font-bold mt-4 mb-2">{{ item.title?.[props.selectedLang] }}</h3>
                <p v-if="item.subTitle?.[props.selectedLang]" class="text-gray-600 mb-4">{{ item.subTitle?.[props.selectedLang] }}</p>
                <a :href="item.buttonLink?.[props.selectedLang]" v-if="item.buttonText?.[props.selectedLang]"
                   :class="(item.buttonColor ?? '').length > 0 ? item.buttonColor : 'bg-primary text-white'"
                   class="block text-center   py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                    {{ item.buttonText?.[props.selectedLang] }}
                </a>
            </div>
        </article>

        <!-- Card 1 -->
        <!-- <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/words_pt.png" alt="Jogo Caça Palavras" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">5 a 8 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Caça Palavras</h3>
            <p class="text-gray-600 mb-4">Atenção e vocabulário</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero experimentar
            </a>
            </div>
        </article> -->

        <!-- Card 2 -->
        <!-- <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/dots_pt.png" alt="Jogo Unir Pontos" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">4 a 7 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Unir os Pontos</h3>
            <p class="text-gray-600 mb-4">Coordenação motora</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero experimentar
            </a>
            </div>
        </article> -->

        <!-- Card 3 -->
        <!-- <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/loto_pt.png" alt="Loto de Natal" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">4 a 7 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Loto de Natal</h3>
            <p class="text-gray-600 mb-4">Reconhecimento visual</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero experimentar
            </a>
            </div>
        </article> -->

        <!-- Card 4 Ebook -->
        <!-- <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/ebook_pt.png" alt="Ebook Importância da Criatividade" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Para pais</span>
            <h3 class="text-xl font-bold mt-4 mb-2">A importância da Criatividade</h3>
            <p class="text-gray-600 mb-4">Guia prático para estimular o desenvolvimento infantil.</p>
            <a href="#" class="block text-center bg-secondary py-3 rounded-full font-semibold hover:opacity-90 transition">
                Quero receber
            </a>
            </div>
        </article> -->

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