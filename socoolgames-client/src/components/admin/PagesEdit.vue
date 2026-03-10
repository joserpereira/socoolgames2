<template>
    <div class="flex items-center justify-between mb-6 mt-4 ">
        <h1 class="text-2xl font-bold">Page edit</h1>
    </div>
    <div class="grid grid-cols-1">

        <div class="relative mt-4">
            <input type="text" class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="(data.item || {}).name"
                    required
                    maxlength="100"
                    id="name"
                    placeholder="Name" />
            <label for="name" 
                    class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Name</label>
        </div>

        <div class="relative mt-4">
            <input type="text" class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="(data.item || {}).slug"
                    required
                    maxlength="100"
                    id="slug"
                    placeholder="Name" />
                    
            <label for="slug" 
                   class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Slug</label>
        </div>

        <div class="mt-4">
            <label class="relative flex items-center group p-2">
                Active Link
                <input v-model="data.item.active" type="checkbox" class="absolute left-1/2  w-auto h-full peer appearance-none rounded-md" />
                <span class="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-300 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1" style="height: 18px;"></span>
            </label>    
        </div>
        <div class="mt-4">
            <div class="p-2"> Preview </div>
            <a :href="'/p/' + data.item.slug" target="_blank" v-if="data.item.slug"
                class="ms-4 text-blue-600 hover:text-blue-800 visited:text-purple-600 no-underline hover:underline">
                {{  getLocation() + '/p/' + data.item.slug }}
            </a>  
            <span class="ms-4 text-sm p-1 bg-yellow-100"  v-else>Please fill slug</span>
        </div>
        <div class="mt-4">
            <PageBuilder :pageId="data.item._id" :blocks="data.item.blocks" @changeBlocks="changeBlocks"></PageBuilder>
        </div>
        <div class="mt-4">
            <div class="py-2 text-red-400" v-if="data.error">{{ data.error }}</div>
        </div>
        <div class="mt-4">
            <button @click.prevent="saveItem"
                    class="hover:ring-1 bg-blue-600 text-white px-4 py-2 rounded-lg
                            hover:bg-blue-700 transition">
                    Save
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import pageService from "@/services/page.service";
    import { watch, defineProps, onMounted, reactive } from 'vue'
    import PageBuilder from "./cms/pageBuilder/PageBuilder.vue";

    const props = defineProps({
        item: Object,
        saved: Function
    })

    //watch(props.item, (value) => {
    watch(() => props.item, (value) => {        
        if (props?.item && value) {
            data.item = value;
        }
    }, { deep: true });

    var data = reactive({
        item: {
            name: "",
            slug: "",
            blocks: [],
            active: false,
            _id: undefined
        },
        error: ""

    })

    onMounted(() => {
        if (props.item) {
            data.item = props.item;
        }
    })

    const changeBlocks = async (value) => {
        data.item.blocks = value;
    }
    const getLocation = () => {
        return window.location.origin;
    }
    const saveItem = async () => {

        data.error = "";
        try
        {
            if ((data.item.name ?? "").length == 0 || (data.item.slug ?? "").length == 0 )
            {
                data.error = "Please fill page name and slug."
            }

            if (data.item._id === undefined) {
                const result = await pageService.insertItem(data.item, "page");
                if (result.status !== 200 || result.data.error !== 0) {
                    data.error = "Problem adding page";
                }
            } else  {
                const result = await pageService.updateItem(data.item._id, data.item, "page");
                if (result.status !== 200 || result.data.error !== 0) {
                    data.error = "Problem updating page";
                }
            }
            if (props.saved)
                props.saved();
        } catch (error) {
            data.error = "Unexpected error.";
        }
        
    }
</script>