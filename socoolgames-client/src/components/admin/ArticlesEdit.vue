<template>
    <div class="flex items-center justify-between mb-6 mt-4 ">
        <h1 class="text-2xl font-bold">Article edit</h1>
    </div>
    <div class="grid grid-cols-1">
        <!-- Languages -->
        <div class="relative bg-white tab-group mt-4">
            <div class="flex border-b border-stone-200 relative" role="tablist">
                <div class="absolute bottom-0 h-0.5 bg-stone-800 transition-transform duration-300 transform scale-x-0 translate-x-0 tab-indicator"></div>

                <button v-for="lang in data.languages" :key="lang" 
                    @click.prevent="data.currentLang = lang"
                    :class="data.currentLang == lang ? 'bg-stone-800 text-white rounded-xl' : ''" class="tab-link text-sm active inline-block py-2 px-4 hover:text-blue transition-colors duration-300 mr-1" data-dui-tab-target="tab1-group4">
                    {{ lang }}
                </button>
            </div>
        </div>
        <div class="relative mt-4">
            <input type="text" class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="data.item.header[data.currentLang]"
                    required
                    maxlength="100"
                    id="header"
                    placeholder="Header" />
            <label for="header" 
                    class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Header</label>
        </div>

        <div class="relative mt-4">
            <input type="text" class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="data.item.title[data.currentLang]"
                    required
                    maxlength="100"
                    id="title"
                    placeholder="Title" />
                    
            <label for="title" 
                   class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Title</label>
        </div>

        <div class="relative mt-6">
            <textarea
                    class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    rows="8" v-model="data.item.content[data.currentLang]"
                    id="content"
                    placeholder="Content">
                </textarea>                    
            <label for="content" 
                   class="absolute rounded mt-7 left-0 ml-3 -translate-y-10 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Content</label>
        </div>

        <div class="mt-4">
            <label class="relative flex items-center group p-2">
                Active Link
                <input v-model="data.item.active" type="checkbox" class="absolute left-1/2  w-auto h-full peer appearance-none rounded-md" />
                <span class="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-300 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1" style="height: 18px;"></span>
            </label>    
        </div>
        <div class="mt-4">
            <div class="py-2 text-red-400" v-if="data.error">{{ data.error }}</div>
        </div>
        <div class="mt-4">
            <button @click.prevent="saveItem"
                    class="bg-primary px-4 py-2 rounded-full text-white hover:bg-secondary hover:text-black transition">
                Save
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import service from "@/services/article.service";
    import { watch, defineProps, onMounted, reactive } from 'vue'

    const props = defineProps({
        item: Object,
        saved: Function
    })

    watch(() => props.item, (value) => {        
        if (props?.item && value) {
            data.item = value;
        }
    }, { deep: true });

    var data = reactive({
        item: {
            header: {},
            title: {},
            content: {},
            active: false,
            _id: undefined
        },
        currentLang: "en",
        languages: ["en", "pt"],
        error: ""

    })

    onMounted(() => {
        if (props.item) {
            data.item = props.item;
        }
    })

    const saveItem = async () => {

        data.error = "";
        try
        {
            var isValid = true;
            for (const lang of data.languages) {
                if ((data.item.header?.[lang] ?? "").length == 0 || (data.item.title?.[lang] ?? "").length == 0 || (data.item.content?.[lang] ?? "").length == 0 )
                {
                    isValid = false;
                    break;
                }
            }
            if (!isValid) {
                data.error = "Please fill all required fields."
            }

            if (data.item._id === undefined) {
                const result = await service.insertItem(data.item, "article");
                if (result.status !== 200 || result.data.error !== 0) {
                    data.error = "Problem adding article";
                } else {
                    data.item = result.data.data;
                }
            } else  {
                const result = await service.updateItem(data.item._id, data.item, "article");
                if (result.status !== 200 || result.data.error !== 0) {
                    data.error = "Problem updating article";
                } else {
                    data.item = result.data.data;
                }
            }
            if (props.saved)
                props.saved();
        } catch (error) {
            data.error = "Unexpected error.";
        }
        
    }
</script>