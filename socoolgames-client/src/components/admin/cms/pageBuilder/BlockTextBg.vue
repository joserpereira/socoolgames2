<template>
    <section :class="'relative py-20 px-6 text-center md:bg-[url('+formatUrl(baseUrl+(props.data?.backgroundImage?.[props.selectedLang] || props.data?.backgroundImage).large)+')] bg-[url('+formatUrl(baseUrl+(props.data?.backgroundImage?.[props.selectedLang] || props.data?.backgroundImage).medium)+')]  bg-cover'">

        <div class="max-w-4xl mx-auto ">

            <h2 class="text-3xl md:text-4xl font-bold mb-6" v-html="props.data.title?.[props.selectedLang]">
            </h2>

            <p class="text-lg text-gray-700 mb-6">
                {{ props.data.subTitle?.[props.selectedLang] }}
            </p>

            <p class="text-gray-700 max-w-3xl mx-auto">
                {{ formatText(props.data.text?.[props.selectedLang]) }}
            </p>

        </div>
    </section>
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