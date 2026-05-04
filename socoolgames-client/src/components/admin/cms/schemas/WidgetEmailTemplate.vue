<template>
  <label class="block font-medium text-start text-sm mt-2">
      {{ props.schema.label }} {{ props.index ? '#' + props.index : '' }}
  </label>
  <div class="flex items-center">
    <select name="selectedTemplate" id="selectedTemplate"
            v-model="data.selectedTemplate"   
            @change="selectTemplate"
            class="input rounded px-2 py-3 w-full border placeholder:text-transparent">
      <option v-for="value in data.items" :key="value._id" :value="value.templateName">{{ value.templateName }}</option>
    </select>
  </div>
  
</template>

<script setup lang="ts">
  import { onMounted, reactive, watch } from 'vue'
  import service from '@/services/emailTemplate.service';

  const props = defineProps<{
    schema: any,
    modelValue: String,
    selectedLang: String,
    index: Number
  }>()

  const data = reactive({
    items: [] as any[],
    selectIndex: null as any,
    timeoutID: -1 as number,    
    selectedTemplate: "" as String,
    value: "" as String,    
  })

  const emit = defineEmits(["update:modelValue"])
  
  watch(() => props.modelValue, (value) => {  
    data.selectedTemplate = "";
    data.value = undefined as any;
    if (value) {
      setValue(value);
    } else {
      fillData(); 
    }
  }, { deep: true });

  onMounted(async () => {
    setValue(props.modelValue);
  })

  const setValue = (value: any) => {
    data.value = value;
    data.selectedTemplate = value ?? "";
    fillData();    
  }
  
  const fillData = async () => {
    try {
      const result = await service.getItems(0, 100)
      if (result.status == 200 && result.data.data) {
        data.items = result.data.data;
      }    
    } catch {
      console.error("Problem ocurred on fill data")  
    }
  }

  const selectTemplate = () => {
    data.value = data.selectedTemplate;
    emit("update:modelValue", data.value)
  }

</script>