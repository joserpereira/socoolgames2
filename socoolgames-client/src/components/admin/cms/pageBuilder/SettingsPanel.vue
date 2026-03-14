<template>
  
    <div
      v-for="(item, index) in data.schema"
      :key="index"
      class="space-y-2"
    >
      <component v-if="item.field === 'backgroundImage'" 
                  :is="getComponent(item.type)" 
                  :schema="item"
                  v-model="data.settings[item.field]">
      </component>
      <component v-else :is="getComponent(item.type)" :value="data.settings[item.field]" :schema="item" :selectedLang="props.selectedLang"></component> 
    </div>
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive, defineAsyncComponent  } from 'vue'
  
  import componentsUtils from '@/utils/components.utils';

  const props = defineProps({        
        data: Object,
        componentType: String,
        selectedLang: String
        
   })

  onMounted(() => {
    data.schema = componentsUtils.getSchema(props.componentType);
    data.settings = props.data;
  })   
  
  const componentCache: Record<string, any> = {}

 const getComponent = (key: string) => {

  if (!componentCache[key]) {
    componentCache[key] = defineAsyncComponent(
      () => import(`@/components/admin/cms/schemas/${key}.vue`)
    )
  }

  return componentCache[key]
}

const data = reactive({
    settings: {} as any,
    schema: {} as any
})
</script>