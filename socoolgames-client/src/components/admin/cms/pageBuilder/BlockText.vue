<template>
    <span v-html="props.data.content[props.selectedLang]"></span>
</template>
<script setup>
    import { defineProps, defineExpose, onMounted } from 'vue';
    import { formatUrl } from "@/utils/url.utils";

    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    onMounted(() => {
        console.log(formatUrl("./public/aaa/dddd"))
        console.log(props.data.content[props.selectedLang])
    })
    defineExpose({ formatUrl });

</script>