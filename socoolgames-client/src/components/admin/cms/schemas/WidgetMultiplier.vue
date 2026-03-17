<template>
  <div class="bg-gray-100 rounded p-3">
    <div class="p-2 flex items-center">
      <span class="text-center flex-1">Items</span>
      <span class="flex-none">
        <button type="button" class="bg-primary px-4 py-2 rounded-full text-white hover:bg-secondary hover:text-black"
                @click.prevent="addItem"
                >Add Item</button>
      </span>
    </div>
    <div class="mt-3" v-for="(item, index) in data.value" :key="index">
      <ComponentList :schema="props.schema" :data="item" :index="index+1" :componentCache="props.componentCache" :selectedLang="props.selectedLang"></ComponentList>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive, watch } from 'vue'
  import ComponentList from '../pageBuilder/ComponentList.vue';
  import componentsUtils from '@/utils/components.utils';

  const props = defineProps({        
        schema: Object,        
        value: Object,
        componentCache: {} as Record<string, any>,
        selectedLang: String,
        data: {} as Object
   })
   onMounted(() => {
     data.value = props.value;
   })    

   watch(() => props.value, () => {
     data.value = props.value;
   })

   const data = reactive({
     value: [] as any[]
   })

   const addItem = () => {
     var defaults = componentsUtils.getDefaultFromSchema(props.schema, ["en"]);
     data.value.push(defaults);
   }
</script>