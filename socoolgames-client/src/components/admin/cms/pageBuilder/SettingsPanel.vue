<template>
    <ComponentList :schema="data.schema" :data="props.data" :componentCache="GetComponents()" :selectedLang="props.selectedLang"></ComponentList>
</template>
<script setup lang="ts">
  import { onMounted, reactive } from 'vue'
  import ComponentList from './ComponentList.vue';  
  import componentsUtils from '@/utils/components.utils';

  const props = defineProps({        
        data: Object as any,
        componentType: String as any,
        selectedLang: String as any        
   })

  onMounted(() => {
    data.schema = componentsUtils.getSchema(props.componentType);
    data.settings = props.data;
  })   

  const GetComponents = () => {
    return componentCache;
  }
  const componentCache: Record<string, any> = {}

  const data = reactive({
    settings: {} as any,
    schema: {} as any
  })
</script>