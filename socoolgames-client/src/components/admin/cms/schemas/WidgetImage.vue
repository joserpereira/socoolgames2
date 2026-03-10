<template>
    <label class="block font-medium text-start text-sm mt-2">
        {{ props.schema.label }}
    </label>
    <input type="text"
           class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
           v-model="data.value"
      />
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive } from 'vue'
  // import FileUpload2 from "@/components/admin/FileUpload2.vue";

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
