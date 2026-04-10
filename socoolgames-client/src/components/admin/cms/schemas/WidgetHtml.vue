<template>
    <label class="block font-medium text-start text-sm mt-2">
        {{ props.schema.label }} {{ props.index ? '#' + props.index : '' }}
    </label>
    <button>
        <span class="px-4 py-2 bg-gray-100 rounded-l hover:bg-gray-300" :class="data.mode === 'visual' ? 'bg-gray-300' : ''" @click="data.mode = 'visual'">Visual</span>
        <span class="px-4 py-2 bg-gray-100 rounded-r hover:bg-gray-300" :class="data.mode === 'code' ? 'bg-gray-300' : ''" @click="data.mode = 'code'">Code</span>
    </button>
    <div v-if="data.mode === 'visual'" class="h-64">
      <HtmlEditorQuill class="mb-4 h-56" :value="data.value[props.selectedLang]" />
    </div>
    <!-- HTML -->
    <textarea
    rows="12"
    class="w-full h-80 p-4 rounded-xl font-mono text-sm  bg-[#1e1e1e] text-[#d4d4d4]
         border border-[#3c3c3c]
         placeholder:text-[#6a9955]
         focus:outline-none focus:ring-2 focus:ring-[#007acc]"
      v-else
      v-model="data.value[props.selectedLang]"></textarea>
   <!-- <textarea
        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        rows="8" v-model="data.value[props.selectedLang]">
    </textarea> -->
    <div class="h-4">
      
    </div>
    <div class="border m-4">
     <div v-html="data.value[props.selectedLang]"></div>
    </div>
</template>
<script setup lang="ts">
  import { onMounted, reactive, defineProps, defineEmits } from 'vue'
  import { languages } from '../../../../locales/index'
  const emit = defineEmits(['update:value'])

  import HtmlEditorQuill from '@/components/admin/cms/schemas/HtmlEditorQuill.vue'
/*
  import DOMPurify from 'dompurify'
  const clean = DOMPurify.sanitize(html)
*/

  const props = defineProps({        
        schema: Object,        
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
    value: {} as any,
    mode: 'visual' // 'visual' or 'code'    
  })
</script>