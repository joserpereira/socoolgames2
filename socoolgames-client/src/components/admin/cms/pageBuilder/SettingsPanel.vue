<template>
    <!-- Dynamic fields -->
    <div
      v-for="(value, key) in data.settings"
      :key="key"
      class="space-y-2"
    >
      <label class="block font-medium text-start text-sm mt-2">
        {{ key }}
      </label>

      <input
        v-model="data.settings[key][props.selectedLang]"
        type="text"
        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        :placeholder="key"
      />
    </div>
</template>
<script setup lang="ts">
  import { defineProps, onMounted, reactive } from 'vue'
   
  const props = defineProps({        
        data: Object,
        selectedLang: String
   })

  onMounted(() => {
    data.settings = props.data;
  })    

const data = reactive({
    settings: {} as any
})
</script>