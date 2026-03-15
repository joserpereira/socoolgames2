<template>
    <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-6 text-center">

            <h2 class="text-3xl md:text-4xl font-bold mb-12">
            {{ props.data.title?.[props.selectedLang] }}
            </h2>
            <h3 class="text-2xl md:text-2xl font-bold mb-12">
            {{ props.data.subTitle?.[props.selectedLang] }}
            </h3>
            <div class="grid md:grid-cols-4 gap-8">

            <div>
                <div class="text-4xl mb-4">{{ props.data.title1?.[props.selectedLang] }}</div>
                <h3 class="font-bold mb-2">{{ props.data.subTitle1?.[props.selectedLang] }}</h3>
            </div>

            <div>
                <div class="text-4xl mb-4">{{ props.data.title2?.[props.selectedLang] }}</div>
                <h3 class="font-bold mb-2">{{ props.data.subTitle2?.[props.selectedLang] }}</h3>
            </div>

            <div>
                <div class="text-4xl mb-4">{{ props.data.title3?.[props.selectedLang] }}</div>
                <h3 class="font-bold mb-2">{{ props.data.subTitle3?.[props.selectedLang] }}</h3>
            </div>

            <div>
                <div class="text-4xl mb-4">{{ props.data.title4?.[props.selectedLang] }}</div>
                <h3 class="font-bold mb-2">{{ props.data.subTitle4?.[props.selectedLang] }}</h3>
            </div>

            </div>
        </div>
    </section>
</template>
<script setup>
    import { defineProps, /* defineEmits,*/ onMounted } from 'vue';
    // import { formatUrl } from "@/utils/url.utils";

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