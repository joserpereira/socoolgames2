<template>
    <label class="block font-medium text-start text-sm mt-2">
        {{ props.schema.label }}
    </label>
    <input type="text"
           class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
           v-model="value"
           @keyup="keyup"
      />
    
     <!-- <select class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"> -->
      <ul role="list" class="border divide-y">
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
  import { defineProps, defineEmits, onMounted, reactive } from 'vue'
  import { useVModel } from '@/utils/useVModel';
  import imageService from '@/services/common/image.service';

  const props = defineProps<{
    schema: Object,
    modelValue: string,
  }>()

  const data = reactive({
    items: [] as any[],
    selectIndex: null as any,
    timeoutID: -1 as number,
    prefix: "" as string
  })
  const emit = defineEmits(["update:modelValue"])

  const value = useVModel<string>(props, "modelValue", emit)
  
  onMounted(async () => {
    if (process.env.NODE_ENV === "development") {
      data.prefix = 'http://localhost:3000';
    }
    fillData();
  })

  const fillData = async () => {
    const result = await imageService.getItems(0, 5, value.value)
    if (result.status == 200 && result.data.data) {
      data.items = result.data.data;
    }    
  }

  const keyup = () => {
    clearTimeout(data.timeoutID);
    data.timeoutID = setTimeout( fillData, 450);
  }

  const selectImage = (item: any) => {
    value.value = item.original;
  }

</script>
