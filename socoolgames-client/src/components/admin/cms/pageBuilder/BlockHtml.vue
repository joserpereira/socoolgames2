<template>
    <section>
        <span class="my-5" v-html="props.data.content[props.selectedLang]"></span>
    </section>
    
</template>
<script setup>
    import { defineProps, defineExpose } from 'vue';
    import { formatUrl } from "@/utils/url.utils";

    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    // onMounted(() => {
    // })

    defineExpose({ formatUrl });

</script>