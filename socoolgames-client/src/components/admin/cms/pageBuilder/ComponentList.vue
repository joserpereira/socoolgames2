<template>  
    <div
      v-for="(item, index) in props.schema"
      :key="index"
      class="space-y-2"
    >
      <ComponentItem
        :item="item"
        :value="props.data"
        :componentCache="props.componentCache"
        :selectedLang="props.selectedLang">
      </ComponentItem>      
    </div>
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive } from 'vue'
  import ComponentItem from './ComponentItem.vue';
  
  const props = defineProps({        
    schema: Object,
    data: Object,
    selectedLang: String,
    componentCache: {} as Record<string, any>
  })

  onMounted(() => {
    data.settings = props.data;
  })   
  


const data = reactive({
  settings: {} as any,
  componentCache: {} as Record<string, any>
})
</script>