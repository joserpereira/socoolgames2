<template>  
      <component v-if="(props.item.type === 'WidgetEmailTemplate' || props.item.type === 'WidgetImage' || props.item.type === 'WidgetFile' )" 
                  :is="getComponent(props.item.type)" 
                  :index="index"
                  :schema="item"
                  :selectedLang="props.selectedLang"
                  v-model="data.value[props.item.field]">
      </component>
      <component v-else-if="(props.item.type === 'WidgetColor' )" 
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
      <component v-else :is="getComponent(props.item.type)" :index="props.index" v-model:value="data.value[props.item.field]" :schema="item" :selectedLang="props.selectedLang"></component>  
</template>
<script setup lang="ts">
  import { onMounted, reactive, defineAsyncComponent, markRaw  } from 'vue'
  import WidgetMultiplier from '../schemas/WidgetMultiplier.vue';
  
  const props = defineProps({        
        item: {} as Object as any,
        value: Object,
        selectedLang: String,
        index: Number,
        componentCache: {} as any
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