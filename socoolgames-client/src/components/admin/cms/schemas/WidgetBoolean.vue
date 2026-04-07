<template>
    <label class="block font-medium text-start text-sm mt-2">
        {{ props.schema.label }} {{ props.index ? '#' + props.index : '' }}
    </label>
    <div class="text-start">
      <input type="checkbox"
            class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            v-model="data.value"
        />
    </div>
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive } from 'vue'

  const props = defineProps({        
        schema: Object,        
        value: Object,
        index: Number,
        selectedLang: String
   })

  onMounted(() => {
    data.value = props.value ?? false;    
  })    

  const data = reactive({
    value: {} as any    
  })
</script>