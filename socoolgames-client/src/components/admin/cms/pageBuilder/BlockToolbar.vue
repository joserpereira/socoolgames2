<template>
    <div class="grid auto-cols-max grid-flow-col gap-3">
      <div class="block w-full p-2 rounded">Components:</div>
      <button v-for="item in data.items" :key="item" @click.prevent="addBlock(item.nameRef)" class="block w-full bg-gray-100 p-2 rounded">
        {{ item.name }}
      </button>

      
    </div>
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