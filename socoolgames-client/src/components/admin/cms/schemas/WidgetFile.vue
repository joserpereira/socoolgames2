<template>
  <label class="block font-medium text-start text-sm mt-2">
      {{ props.schema.label }} {{ props.index ? '#' + props.index : '' }}
  </label>
  <div class="flex items-center">
    <input type="text"
            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            v-model="data.selectedFile"
            @keyup="keyup"
      />
    
  </div>
  
  <!-- <select class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"> -->
  <ul role="list" class="border divide-y rounded">
    <div v-if="data.items.length > 0" class="text-xs">
      Available Files
    </div>
    <li v-for="(item, index) in data.items" :key="index" :value="index"
        @click.prevent="selectFile(item)"
        class="flex justify-between py-2 px-5 cursor-pointer items-center">
        <div class="size-9 flex-none rounded-full bg-gray-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
          </svg>
        </div>
        <div class="min-w-0 flex-auto justify-center">
          <p class="text-sm">{{ item.original }}</p>
        </div>
    </li>
  </ul>

</template>
<script setup lang="ts">
  import { defineProps, defineEmits, onMounted, reactive, watch } from 'vue'
  import fileService from '@/services/common/file.service';

  const props = defineProps<{
    schema: Object,
    modelValue: String
    index: Number,
    selectedLang: String
  }>()

  const data = reactive({
    items: [] as any[],
    selectIndex: null as any,
    timeoutID: -1 as number,    
    selectedFile: "" as String,
    value: {} as any,    
    prefix: "" as String
  })
  const emit = defineEmits(["update:modelValue"])


  watch(() => props.selectedLang, () => {        
    if (data.value && (Object.keys(data.value).indexOf(props.selectedLang) == -1)) {
      data.value[props.selectedLang] = undefined;
    }
    setValue(data.value);
  }, { deep: true });

  watch(() => props.modelValue, (value) => {        
    data.selectedFile = "";
    if (value) {
      setValue(value);
    } else {
      fillData(); 
    }
  }, { deep: true });

  onMounted(async () => {
    if (process.env.NODE_ENV === "development") {
      data.prefix = process.env.VUE_APP_API_URL;
    }
    setValue(props.modelValue);
  })

  const setValue = (value: any) => {
    if (value == undefined || typeof(value) === 'string' )
      value = {};
    data.value = value;
    data.selectedFile = value?.[props.selectedLang]?.original ?? "";
    fillData();    
  }
  const fillData = async () => {
    try {
      const result = await fileService.getItems(0, 5, data.selectedFile ?? "")
      if (result.status == 200 && result.data.data) {
        data.items = result.data.data;
      }    
    } catch {
      console.error("Problem ocurred on fill data")  
    }
  }

  const fillAndSelect = () =>{
    fillData();
    if (data.value?.[props.selectedLang]?._id === undefined && data.selectedFile.length > 0) {
      const found = data.items.find((item) => item.original === data.selectedFile);
      if (found) {
        selectFile(found);
      }
    }
  }

  const keyup = () => {
    try {
      if (data.value == undefined)
        data.value = {};
      if (data.selectedFile !== data.value?.original) {
        data.value[props.selectedLang] = ""
      }
      clearTimeout(data.timeoutID);
      data.timeoutID = setTimeout( fillAndSelect, 450);
    } catch {
      console.error("Problem ocurred on keyup event")
    }
  }

  const selectFile = (item: any) => {
    data.selectedFile = item.original;
    data.value[props.selectedLang] = item;

    emit("update:modelValue", data.value)
  }

</script>
