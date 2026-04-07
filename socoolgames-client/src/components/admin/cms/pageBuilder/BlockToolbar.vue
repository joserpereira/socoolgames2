<template>
    <!-- <div class="grid auto-cols-max grid-flow-row-dense grid-cols-5  gap-3"> -->
    <div class="flex">

      <div class="p-2 rounded flex-none">Components:</div>
      <div class="flex flex-wrap gap-2 col-span-5 flex-1">
        <button v-for="item in data.items" :key="item" @click.prevent="addBlock(item.nameRef)" class="block w-auto bg-gray-100 p-2 rounded">
        {{ item.name }}
        </button>
      </div>
    </div>

      
    <!-- </div> -->
</template>
<script setup lang="ts">
    import { defineExpose, defineProps, onMounted, reactive } from 'vue'
    import componentsUtils from '@/utils/components.utils';

    const props = defineProps({        
        blockAdded: Function
    })

    var data = reactive({
        items: [] as any[]
    })

    onMounted(async () => {
        data.items = componentsUtils.getList();
    })

    const addBlock = async (name: string) => {
        if (props?.blockAdded !== undefined) {
            props.blockAdded(name);
        }
    }

    defineExpose({ data });
</script>