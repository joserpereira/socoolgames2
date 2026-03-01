<template>
    <div class="flex items-center justify-between mb-6 mt-4 ">
        <h1 class="text-2xl font-bold">Page edit</h1>
    </div>
    <div class="grid grid-cols-1">

        <input
            id="name"
            v-model="(data.item || {}).name"
            type="text"
            required
            maxlength="100"
            placeholder="Name"
            class="input rounded-xl backdrop-blur px-2 py-3 mt-4"
        />

        <input
            id="name"
            v-model="(data.item || {}).nameRef"
            type="text"
            required
            maxlength="100"
            placeholder="Name Ref"
            class="input rounded-xl backdrop-blur px-2 py-3 mt-4"
        />

        <div class="mt-4">
            <label class="relative flex items-center group p-2">
                Active Link
                <input v-model="data.item.active" type="checkbox" class="absolute left-1/2 -translate-x-1/2 w-auto h-full peer appearance-none rounded-md" />
                <span class="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-300 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1" style="height: 18px;"></span>
            </label>    
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
    import { reactive } from 'vue'
    var data = reactive({
        item: {
            name: "",
            nameRef: "",
            active: false
        },
        error: ""

    })

    const saveItem = (item: any) => {
        if ((data.item.name ?? "").length == 0 || (data.item.nameRef ?? "").length == 0 )
        {
            data.error = "Please fill page name and name ref."
        } else {
            data.item = item;
        }
        
    }
</script>

<!-- <script>
import ListItems from './cms/ListItems.vue';
 export default {
    name: "PagesComponent",
    components: {
        ListItems
    },
    data() {
        return {
            cols: ["name", "nameRef"]
        }
    }
 }
    
</script> -->