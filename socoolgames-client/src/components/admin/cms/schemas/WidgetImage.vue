<template>
  <label class="block font-medium text-start text-sm mt-2">
      {{ props.schema.label }} {{ props.index ? '#' + props.index : '' }}
  </label>
  <div class="flex items-center">
    <img v-if="data.value?.[props.selectedLang]?.thumb" class="size-9 flex-none rounded-full bg-gray-50 me-3 ms-3" 
        :src="data.prefix + data.value?.[props.selectedLang]?.thumb" alt="thumbnail">
    <span v-else>
      <svg title="Please select image" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
           class="size-9 flex-none rounded-full bg-gray-50 me-3 ms-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    </span>
    <input type="text"
            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            v-model="data.selectedImage"
            @keyup="keyup"
      />
    
  </div>
  
  <!-- <select class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"> -->
  <ul role="list" class="border divide-y rounded">
    <div v-if="data.items.length > 0" class="text-xs">
      Available images
    </div>
    <li v-for="(item, index) in data.items" :key="index" :value="index"
        @click.prevent="selectImage(item)"
        class="flex justify-between py-2 px-5 cursor-pointer items-center">
        <img class="size-9 flex-none rounded-full bg-gray-50" 
        :src="data.prefix + item.thumb" alt="">
        <div class="min-w-0 flex-auto justify-center">
          <p class="text-sm">{{ item.original }}</p>
        </div>
    </li>
  </ul>

</template>
<script setup lang="ts">
  import { onMounted, reactive, watch } from 'vue'
  import { languages } from '../../../../locales/index'
  import imageService from '@/services/common/image.service';

  const props = defineProps<{
    schema: any,
    modelValue: String
    index: Number,
    selectedLang: string
  }>()

  const data = reactive({
    items: [] as any[],
    selectIndex: null as any,
    timeoutID: -1 as number,    
    selectedImage: "" as String,
    value: "" as any,    
    prefix: "" as String
  } as any)
  const emit = defineEmits(["update:modelValue"])


  watch(() => props.selectedLang, (value) => {        
    data.selectedImage = data.value?.[value]?.original ?? "";
    fillData(); 
  }, { deep: true });

  watch(() => props.modelValue, (value) => {        
    data.selectedImage = "";
    // data.value = undefined as any;
    if (value) {
      setValue(value);
    } else {
      fillData(); 
    }
  }, { deep: true });

  onMounted(async () => {
    if (import.meta.env.NODE_ENV === "development") {
      data.prefix = import.meta.env.VITE_APP_API_URL;
    }
    setValue(props.modelValue);
  })

  const setValue = (value: any) => {
    if (value) {
      let dict = {} as any;
      Object.keys(languages).forEach(l => {
        if (!(l in dict)) {
          dict[l] = value[l];
        }
      })
      
      value = dict;
    }
    data.value = value;
    data.selectedImage = value?.[props.selectedLang]?.original ?? "";
    fillData();    
  }
  const fillData = async () => {
    try {
      const result = await imageService.getItems(0, 5, data.selectedImage ?? "")
      if (result.status == 200 && result.data.data) {
        data.items = result.data.data;
      }    
    } catch {
      console.error("Problem ocurred on fill data")  
    }
  }

  const fillAndSelect = () =>{
    fillData();
    if (data.value?.[props.selectedLang]?._id === undefined && data.selectedImage.length > 0) {
      const found = data.items.find((item: any) => item.original === data.selectedImage);
      if (found) {
        selectImage(found);
      }
    }
  }

  const keyup = () => {
    try {
      if (data.selectedImage !== data.value?.[props.selectedLang]?.original) {
        data.value[props.selectedLang] = {}
      }
      clearTimeout(data.timeoutID);
      data.timeoutID = setTimeout( fillAndSelect, 450);
    } catch {
      console.error("Problem ocurred on keyup event")
    }
  }

  const selectImage = (item: any) => {
    data.selectedImage = item.original;
    if (!data.value) {
      data.value = {}
    }
    data.value[props.selectedLang] = item;
    emit("update:modelValue", data.value)
  }

</script>
