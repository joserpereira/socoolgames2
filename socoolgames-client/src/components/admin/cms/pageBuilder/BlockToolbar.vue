<template>
    <div class="grid auto-cols-max grid-flow-col gap-3">
      <div class="block w-full p-2 rounded">Components:</div>
      <button v-for="item in Object.keys(data.items)" :key="item" @click="addBlock(item)" class="block w-full bg-gray-100 p-2 rounded">
        {{ data.items[item].name }}
      </button>

      
    </div>
</template>
<script setup lang="ts">
    import { defineExpose, defineProps, onMounted, reactive } from 'vue'
    import componentsService from '@/utils/components.utils';

    const props = defineProps({        
        blockAdded: Function
    })

    var data = reactive({
        items: {},    
    })

    onMounted(() => {
        data.items = componentsService.getComponents();
        // console.log("zzz", data.items)
    })

    const addBlock = async (name: string) => {
        if (props?.blockAdded !== undefined) {
            props.blockAdded(name);
        }
    }

    defineExpose({ data });
</script>