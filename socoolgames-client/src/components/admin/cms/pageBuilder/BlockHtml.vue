<template>
    <section>
      <span v-if="props.data.content?.raw && props.data.content.raw[props.selectedLang]?.length > 0 && props.data.content.raw[props.selectedLang] != '<p><br></p>'" class="my-5" v-html="props.data.content.raw[props.selectedLang]"></span>
      <span v-if="props.data.content?.html && props.data.content.html[props.selectedLang]?.length > 0" class="my-5" v-html="props.data.content.html[props.selectedLang]"></span>
      <!-- to mantain retro values, delete in the future -->
      <span v-else class="my-5" v-html="props.data.content[props.selectedLang]"></span>
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