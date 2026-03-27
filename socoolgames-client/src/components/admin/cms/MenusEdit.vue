<template>
    <div class="flex items-center justify-between mb-6 mt-4 ">
        <h1 class="text-2xl font-bold">Menus edit</h1>
    </div>
    <div class="grid grid-cols-1">

        <div class="relative mt-2">
            <input type="text" class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="(data.item || {}).name"
                    required
                    maxlength="100"
                    id="name"
                    placeholder="Name" />
            <label for="name" 
                    class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Name</label>
        </div>
        <div class="relative my-4 ms-2">
            <input type="checkbox" class1="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="(data.item || {}).isMainMenu"
                    id="isMainMenu"
                    placeholder="Is Main Menu" />
            <label for="isMainMenu" 
                    class="ps-2">Is Main Menu</label>
        </div>

        <div class="relative bg-white tab-group mt-2">
            <div class="flex border-b border-stone-200 relative" role="tablist">
                <div class="absolute bottom-0 h-0.5 bg-stone-800 transition-transform duration-300 transform scale-x-0 translate-x-0 tab-indicator"></div>

                <button v-for="lang in data.languages" :key="lang" 
                    @click.prevent="data.currentLang = lang"
                    :class="data.currentLang == lang ? 'bg-stone-800 text-white rounded-xl' : ''" class="tab-link text-sm active inline-block py-2 px-4 hover:text-blue transition-colors duration-300 mr-1" data-dui-tab-target="tab1-group4">
                    {{ lang }}
                </button>
                <span class="flex-none">

                    <button type="button" class="absolute inset-y-0 right-0 flex items-center text-xs border px-4 py-2 rounded-full hover:bg-primary hover:text-white"
                    @click.prevent="addItem">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pe-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add Item</button>
                </span>
            </div>
        </div>
        <div v-for="(item, index) in data.item.items" :key="index" >
            <div class="relative mt-4 mx-8">
                <button type="button" class="flex items-center absolute border text-xs top-2 right-2 z-10 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white"
                        @click.prevent="removeItem(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pe-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                    </svg>
                    Remove
                </button>
                <label class="block font-medium text-start text-sm mt-2">
                    Text #{{ index + 1 }}
                </label>
                <input type="text"
                    class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    v-model="(item || {}).text[data.currentLang]"
                /> 
            </div>
            <div class="relative mt-4 mx-8">
                <label class="block font-medium text-start text-sm mt-2">
                    Link #{{ index + 1 }}
                </label>
                <input type="text"
                    class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    v-model="(item || {}).link[data.currentLang]"
                />
            </div>
            <div class="relative mt-4 mx-8 flex bg-white py-3 px-3 rounded-xl">
                <span>Button #{{ index + 1 }}</span>
                <div class="timeslot-1 ps-3">
                    <input type="radio" :name="'button'+index" :id="'Normal'+index" value="0" v-model="(item || {}).button" />
                    <label class="ps-2" :for="'Normal'+index" >Normal</label>
                </div>
                <div class="timeslot-2 ps-3">
                    <input type="radio" :name="'button'+index" :id="'Highlight'+index" value="1" v-model="(item || {}).button"  />
                    <label :for="'Highlight'+index" class="ps-2 text-primary hover:text-dark mt-2 hover:underline">Highlight</label>
                </div>
                <div class="timeslot-2 ps-3">
                    <input type="radio" :name="'button'+index" :id="'Button'+index" value="2" v-model="(item || {}).button"  />
                    <label :for="'Button'+index" class="ms-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-darkgreen hover:underline">Button</label>
                </div>
            </div>
            <div class="relative mt-4 mx-8 flex bg-white py-3 px-3 rounded-xl">
                <span>Active #{{ index + 1 }}</span>
                <div class="timeslot-1 ps-3">
                    <input type="checkbox" name="activeHeader" :id="'Header'+index" v-model="(item || {}).activeHeader" />
                    <label class="ps-2" :for="'Header'+index" >Header</label>
                </div>
                <div class="timeslot-2 ps-3">
                    <input type="checkbox" name="activeFooter" :id="'Footer'+index" v-model="(item || {}).activeFooter"  />
                    <label class="ps-2" :for="'Footer'+index">Footer</label>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <div class="py-2 text-red-400" v-if="data.error">{{ data.error }}</div>
        </div>
        <div class="mt-4">
            <button @click.prevent="saveItem"
            class="bg-primary px-4 py-2 rounded-full text-white hover:bg-secondary hover:text-black transition"
                    >
                    Save
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import service from "@/services/menus.service";
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
            items: [] as any[],
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

    const addItem = () =>  {
        
        const item = {
            text: {
                "pt":"",
                "en":""
            },
            link: {
                "pt":"",
                "en":""
            },
            button: 0,
            activeHeader : true, 
            activeFooter : true 
        }

        if (data.item.items == undefined) {
            data.item.items = [];
        }
        data.item.items.push(item);
    }
    
    const removeItem = (index) => {
        data.item.items.splice(index, 1);
    }

    const saveItem = async () => {

        data.error = "";
        try
        {
            if ((data.item.name ?? "").length == 0)
            {
                data.error = "Please fill name."
            }

            if (data.item._id === undefined) {
                const result = await service.insertItem(data.item);
                if (result.status !== 200 || result.data.error !== 0) {
                    data.error = "Problem adding configuration";
                } else {
                    data.item = result.data.data;
                }
            } else  {
                const result = await service.updateItem(data.item._id, data.item);
                if (result.status !== 200 || result.data.error !== 0) {
                    data.error = "Problem updating configuration";
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