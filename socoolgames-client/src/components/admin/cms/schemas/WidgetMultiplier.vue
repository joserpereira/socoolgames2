<template>
  <div class="bg-gray-100 rounded p-3">
    <div class="p-2 flex items-center">
      <span class="text-center flex-1">Items</span>
      <span class="flex-none">
        <button type="button" class="flex items-center text-xs border px-4 py-2 rounded-full hover:bg-primary hover:text-white"
                @click.prevent="addItem">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pe-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                Add Item</button>
      </span>
    </div>
    <div class="mt-3 relative pt-5" v-for="(item, index) in data.value" :key="item">
      <ComponentList :schema="props.schema" :data="item" :index="index+1" :componentCache="props.componentCache" :selectedLang="props.selectedLang"></ComponentList>
       <!-- Botão sobreposto -->
      <button type="button" class="flex items-center absolute border text-xs top-2 right-2 z-10 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white"
              @click.prevent="removeItem(index)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pe-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
        Remove
    </button>
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
  
  const removeItem = (index) => {
    data.value.splice(index, 1)
  }

</script>