<template>
    <div
      v-for="(item, index) in data.schema"
      :key="index"
      class="space-y-2"
    >
      <component :is="getComponent(item.type)" :value="data.settings[item.field]" :schema="item" :selectedLang="props.selectedLang"></component> 
    </div>

    <!-- <div
      v-for="(value, key) in data.settings"
      :key="key"
      class="space-y-2"
    >
      <label class="block font-medium text-start text-sm mt-2">
        {{ key }}
      </label>
      

      <textarea
        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        v-if="key.indexOf('content') >= 0" v-model="data.settings[key][props.selectedLang]" rows="8"></textarea>
      <input v-else
        v-model="data.settings[key][props.selectedLang]"
        type="text"
        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        :placeholder="key"
      />
    </div> -->
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive, defineAsyncComponent } from 'vue'
  import componentsUtils from '@/utils/components.utils';

  const props = defineProps({        
        data: Object,
        componentType: String,
        selectedLang: String
        
   })

  onMounted(() => {
    data.settings = props.data;
    data.schema = componentsUtils.getSchema(props.componentType);
  })    
  const getComponent = (key) => {
    return defineAsyncComponent(() => import(`@/components/admin/cms/schemas/${key}.vue`));
  }

const data = reactive({
    settings: {} as any,
    schema: {} as any
})
</script>