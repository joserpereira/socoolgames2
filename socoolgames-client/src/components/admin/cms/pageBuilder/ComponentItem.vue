<template>  
      <component v-if="(props.item.type === 'WidgetImage' || props.item.type === 'WidgetColor' )" 
                  :is="getComponent(props.item.type)" 
                  :index="index"
                  :schema="item"
                  v-model="data.value[props.item.field]">
      </component>
       
      <WidgetMultiplier v-else-if="props.item.type === 'WidgetMultiplier'" 
                        :schema="props.item.items"
                        :value="data.value.items"
                        :componentCache="props.componentCache"
                        :selectedLang="props.selectedLang"
                        ></WidgetMultiplier> 
      <component v-else :is="getComponent(props.item.type)" :index="props.index" :value="data.value[props.item.field]" :schema="item" :selectedLang="props.selectedLang"></component>  
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive, defineAsyncComponent, markRaw  } from 'vue'
  import WidgetMultiplier from '../schemas/WidgetMultiplier.vue';
  
  //import componentsUtils from '@/utils/components.utils';

  const props = defineProps({        
        item: {} as Object,
        value: Object,
        selectedLang: String,
        index: Number,
        componentCache: {} as Record<string, any>
   })

  onMounted(() => {
    data.componentCache = props.componentCache;
    data.value = props.value;
  })   
  

  const getComponent = (key: string) => {
    if (data.componentCache == undefined)
      return;

    if (!data.componentCache[key]) {
      data.componentCache[key] = markRaw(defineAsyncComponent(
        () => import(`@/components/admin/cms/schemas/${key}.vue`)
      ))
    }

    return data.componentCache[key]
  }

const data = reactive({
    value: {} as any,
    componentCache: {} as Record<string, any>
})
</script>