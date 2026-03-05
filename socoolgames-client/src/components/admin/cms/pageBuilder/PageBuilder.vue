<template>
    <BlockToolbar :blockAdded="blockAdded"></BlockToolbar>
     <!-- CENTER: Canvas -->
    <div class="flex-1 overflow-auto bg-gray-50 mt-4">
      <div class="max-w-4xl mx-auto bg-white shadow rounded p-6 space-y-6 drag-container">
        <draggable
            class="dragArea list-group"
            :list="data.blocks"
            :group="{ name: 'people', pull: 'clone', put: false }"
            animation="200"
            handle=".cursor-move"
            @change="log">
            <div v-for="component in data.blocks" :key="component"
            class="list-group-item text-center text-white border p-2 bg-sky-950 flex">
                <div class="cursor-move text-gray-400">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div>
                <div class="px-3 grow">{{ component.type }}</div>
                <button @click="edit(component)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>

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

    const edit = async (item) => {
        console.log("item", item);
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
    

    defineExpose({ resolveComponent, edit })
</script>