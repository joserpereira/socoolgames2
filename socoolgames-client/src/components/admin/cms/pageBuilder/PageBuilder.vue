<template>
    <BlockToolbar :blockAdded="blockAdded"></BlockToolbar>
     <!-- CENTER: Canvas -->
    <div class="flex-1 overflow-auto bg-gray-50 mt-4">
      <div class="max-w-4xl mx-auto bg-white shadow rounded p-6 space-y-6 drag-container">
        <draggable
            class="dragArea list-group"
            :list="data.blocks"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @change="log">
            <div v-for="component in data.blocks" :key="component"
            class="list-group-item text-center text-white border p-2 bg-sky-950">
                {{ component.type }}
            </div>
        </draggable>
      </div>
    </div>
</template>
<script setup lang="ts">
    import { v4 as uuid } from 'uuid'
    import { watch, reactive, defineExpose, defineProps, onMounted } from 'vue'
    import { VueDraggableNext } from 'vue-draggable-next'

    import BlockToolbar from './BlockToolbar.vue';
    import BlockHero from './BlockHero.vue';
    import BlockText from './BlockText.vue';
    const draggable = VueDraggableNext;
    /*
    const page = ref({
        slug: '',
        blocks: []
        })
    */
    const props = defineProps({        
        blocks: {
            type: Array as () => any[],
            default: () => []
        }
    })

    watch(props, () => {
        console.log("props", props)
        if (props?.blocks) {
            data.blocks = props?.blocks;
        }
    }, { deep: true });

    var data = reactive({
        blocks: [],
        error: "",
        currentLang: "",

    })

    onMounted(() => {
        data.blocks = props.blocks;
    })
    // Handle changes
    // const onListChange = (event: any) => {
    //     console.log('List changed:', event)
    // }

    const blockAdded = async(type: string) => {
        const base = {
            id: uuid(),
            type,
            data: {}
        }

        if (type === 'hero') {
            base.data = {
            title: { pt: '', en: '' },
            subtitle: { pt: '', en: '' }
            }
        }

        if (type === 'text') {
            base.data = {
            content: { pt: '', en: '' }
            }
        }

        data.blocks.push(base)
    }

    const log = async() => {
        console.log("log")
    }

    function resolveComponent(type) {
        const result = {
            hero: BlockHero,
            text: BlockText
        }[type]
        return result;
    }
    

    defineExpose({ resolveComponent })
</script>