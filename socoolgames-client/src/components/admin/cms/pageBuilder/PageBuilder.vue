<template>
    <BlockToolbar :blockAdded="blockAdded"></BlockToolbar>
     <!-- CENTER: Canvas -->
    <div class="flex-1 overflow-auto bg-gray-50 mt-4">
      <div class="max-w-4xl mx-auto bg-white shadow rounded p-6 space-y-6 drag-container">
        <div v-if="data.blocks.length === 0" class="text-center m-5">
            No Items
        </div>
        <draggable v-else
            class="dragArea list-group"
            :list="data.blocks"
            :group="{ name: 'people', pull: 'clone', put: false }"
            animation="200"
            handle=".cursor-move"
            @change="log">
            <div v-for="(component, index) in data.blocks" :key="index">
                <div class="list-group-item text-center text-white border pt-2 px-2 flex" :class="component?.disable ? 'bg-sky-950/80' : 'bg-sky-950'">
                    <div class="cursor-move">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </div>
                    <div class="px-3 grow" :class="component?.disable ? 'italic': ''">{{ getName(component.type) }}</div>
                    <div class=" relative inline-block text-left dropdown">
                        <span class="rounded-md shadow-sm">
                            <button
                             @click="toggleMenu(index)"
                             aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                </svg>
                            </button>
                        </span>
                        <div v-show="openMenu === index" class="dropdown-menu">
                            <div class="absolute right-0 z-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none w-36 " 
                                 aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                <div class="py-1 ">
                                    <button @click="editBlock(index)" class="flex text-black text-sm px-4 py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4  flex-none">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <span class="ms-2 grow">Settings</span>                                        
                                    </button>
                                </div>
                                <div class="py-1">
                                    <button @click="disableBlock(index)" class="flex text-black text-sm px-4 py-2">
                                        <div class="flex">
                                            <span v-if="component?.disable" class="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                                <span class="ms-2">
                                                    Activate
                                                </span>
                                            </span>
                                            <span v-else class="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>

                                                <span class="ms-2">
                                                    Disable
                                                </span>
                                            </span>
                                        </div>                                        
                                    </button>
                                </div>
                                <div class="py-1">
                                    <button @click="removeBlock(index)" class="flex text-red-500 text-sm px-4 py-2">
                                        <div class="flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            <span class="ms-2">
                                                Remove
                                            </span>
                                        </div>                                        
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="data.selectedIndex == index">
                    <div class="text-center">Settings</div>
                    <div class="text-center mb-2">
                        <SettingsPanel :data="data.blocks[data.selectedIndex].data" :selectedLang="data.currentLang"></SettingsPanel>
                    </div>
                </div>
            </div>
        </draggable>
      </div>
    </div>
</template>
<script setup lang="ts">
    import { v4 as uuid } from 'uuid'
    import { ref, watch, reactive, defineEmits, defineExpose, defineProps, onMounted } from 'vue'
    import { VueDraggableNext } from 'vue-draggable-next'
    import BlockToolbar from './BlockToolbar.vue';
    import componentsService from '@/utils/components.utils';
    import SettingsPanel from './SettingsPanel.vue';

    interface Block {
        id: string;
        type: string;
        data: any;
        disable?: boolean;
    }
    
    const emit = defineEmits(['changeBlocks'])

    const openMenu = ref(null)

    function toggleMenu(index) {
    openMenu.value = openMenu.value === index ? null : index
    }

    function closeMenu() {
    openMenu.value = null
    }

    const draggable = VueDraggableNext;
    /*
    const page = ref({
        slug: '',
        blocks: []
        })
    */
    const props = defineProps({        
        blocks: {
            type: Array as () => Block[],
            default: () => []
        }
    })

    watch(props, () => {        
        data.selectedIndex = -1;
        if (props?.blocks) {
            data.blocks = props?.blocks;
        }
    }, { deep: true });

    var data = reactive({
        blocks: [] as Block[],
        selectedIndex: -1,
        error: "",
        currentLang: "en",

    })

    onMounted(() => {
        data.blocks = props.blocks;
    })
    // Handle changes
    // const onListChange = (event: any) => {
    //     console.log('List changed:', event)
    // }

    const blockAdded = async(type: string) => {
        const dict = componentsService.getComponents();
        const base = {
            id: uuid(),
            type,
            data: {}
        }

        if (!dict[type])
            return null;

        base.data = dict[type].data;
        
        data.blocks.push(base)
        emit("changeBlocks", data.blocks);
    }

    const getName = (key) => {
        return componentsService.getComponents()?.[key]?.name ?? key; 
    }
    const editBlock = async (index) => {
        data.selectedIndex = index;
        closeMenu();
    }

    const removeBlock = async (index) => {
        data.blocks.splice(index, 1);
        closeMenu();
    }

    const disableBlock = async (index) => {
        if (data.blocks[index]?.disable === true)
            data.blocks[index].disable = false;
        else
            data.blocks[index].disable = true;
        closeMenu();
    }

    const log = async() => {
        console.log("log")
    }

    
    

    defineExpose({ editBlock, getName, removeBlock, disableBlock })
</script>
<style scoped>
    .dropdown:focus-within .dropdown-menu {
    /* @apply block; */
    display:block;
    }
</style>