<template>
    <label class="block font-medium text-start text-sm mt-2">
       {{ props.schema.label }} {{ props.index ? '#' + props.index : '' }}
    </label>
    <input type="text"
           class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
           v-model="data.value[props.selectedLang || 'en']"
      />
</template>
<script setup lang="ts">
  import { onMounted, reactive } from 'vue'
  import { languages } from '../../../../locales/index'
  const emit = defineEmits(['update:value'])

  const props = defineProps({        
        schema: Object as any,        
        value: Object,
        index: Number,
        selectedLang: String
   })

  const setDefaultValue = () => {
    let d = props.value ?? {};
    Object.keys(languages).forEach(l => {
      if (!(l in d)) {
        d[l] = "";
      }
    })
    data.value = d;
    emit('update:value', data.value)
  }
  
  onMounted(() => {
    setDefaultValue();    
  })   

  const data = reactive({
    value: {} as any    
  })
</script>