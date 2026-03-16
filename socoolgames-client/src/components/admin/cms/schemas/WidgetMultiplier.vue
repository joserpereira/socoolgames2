<template>
    <div class="bg-gray-100 rounded p-3">
      <div class="p-2">Items</div>
        <div v-for="(item, index) in props.value" :key="index">
          <div class="mt-2"># {{ index+1 }}</div>
          <ComponentList :schema="props.schema" :data="item" :componentCache="props.componentCache" :selectedLang="props.selectedLang"></ComponentList>
        </div>
     </div>
</template>
<script setup lang="ts">
  import { defineProps /*, onMounted, reactive */ } from 'vue'
  import ComponentList from '../pageBuilder/ComponentList.vue';

  const props = defineProps({        
        schema: Object,        
        value: Object,
        componentCache: {} as Record<string, any>,
        selectedLang: String,
        data: {} as Object
   })
  // onMounted(() => {
  //   data.value = props.value;
  //   console.log("...", props.componentCache)
  // })    

  // const data = reactive({
  //   value: {} as any    
  // })
</script>