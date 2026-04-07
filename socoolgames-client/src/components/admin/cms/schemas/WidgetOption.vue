<template>
    <label class="block font-medium text-start text-sm mt-2">
        {{ props.schema.label }} {{ props.index ? '#' + props.index : '' }}
    </label>

    <!-- <input type="text"
           class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
           v-model="data.value"
      /> -->

    <select name="option" id="option"
            class="input rounded px-2 py-3 mt-4 peer w-full border">    
        <option v-for="value in props.schema.options" :value="value" :key="value">
            {{ value }}
        </option>
    </select>
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive } from 'vue'

  const props = defineProps({        
        schema: Object,        
        value: Object,
        index: Number,
        selectedLang: String
   })

  onMounted(() => {
    data.value = props.value ?? "";
    console.log("mounted", props);
  })    

  const data = reactive({
    value: {} as any    
  })
</script>