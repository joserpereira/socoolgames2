<template>
    <label class="block font-medium text-start text-sm mt-2">
        {{ props.schema.label }} {{ props.index ? '#' + props.index : '' }}
    </label>

    <select name="option" id="option"
            v-model="data.value"
            v-on:change="change"
            class="input rounded px-2 py-3 mt-4 peer w-full border">    
        <option v-for="value in props.schema.options" :value="value" :key="value">
            {{ value }}
        </option>
    </select>
</template>
<script setup lang="ts">
  import { reactive, onMounted } from 'vue'

  const emit = defineEmits(['update:value'])
  const props = defineProps({        
        schema: Object as any,        
        value: { type: String, default: '' },
        index: Number,
        selectedLang: String
   })

  onMounted(() => {
    data.value = props.value ?? '';
  })

  const change = () => {
    emit('update:value', data.value)
  }
  const data = reactive({
    value: {} as any    
  })
</script>