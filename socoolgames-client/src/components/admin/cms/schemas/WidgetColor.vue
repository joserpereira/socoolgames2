<template>
    <label class="block font-medium text-start text-sm mt-2">
       {{ props.schema.label }} {{ props.index ? '#' + props.index : '' }}
    </label>
    <input type="text"
           class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
           @keyup.prevent="change"
           v-model="data.value"
      />
</template>
<script setup lang="ts">
  import { reactive, onMounted } from 'vue'

  const props = defineProps({        
        schema: Object as any,        
        modelValue: String,
        index: Number
   })

   onMounted(() => {
     data.value = props.modelValue;
   })    

   const emit = defineEmits(["update:modelValue"])

   const change = () => {
    emit("update:modelValue", data.value)
   }
  const data = reactive({
    value: "" as String as any
  })
</script>