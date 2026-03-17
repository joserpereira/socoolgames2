<template>  
    <div
      v-for="(item, index) in props.schema"
      :key="index"
      class="space-y-2"
    >
      <ComponentItem
        :item="item"
        :value="props.data"
        :index="props.index"
        :componentCache="props.componentCache"
        :selectedLang="props.selectedLang">
      </ComponentItem>      
    </div>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue'
  import ComponentItem from './ComponentItem.vue';
  
  const props = defineProps({        
    schema: Object,
    data: Object,
    selectedLang: String,
    index: Number,
    componentCache: {} as Record<string, any>
  })

</script>