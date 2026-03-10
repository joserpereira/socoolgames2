<template>
    <label class="block font-medium text-start text-sm mt-2">
        {{ props.schema.label }}
    </label>
   <textarea
        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        rows="8" v-model="data.value[props.selectedLang]">
    </textarea>
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive } from 'vue'

  const props = defineProps({        
        schema: Object,        
        value: Object,
        selectedLang: String
   })

  onMounted(() => {
    data.value = props.value;
  })    

  const data = reactive({
    value: {} as any    
  })
</script>