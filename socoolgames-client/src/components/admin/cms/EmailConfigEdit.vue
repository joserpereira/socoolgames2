<template>
    <div class="flex items-center justify-between mb-6 mt-4 ">
        <h1 class="text-2xl font-bold">Email Configuration edit</h1>
    </div>
    <div class="grid grid-cols-1">

        <div class="relative mt-2">
            <input type="text" class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="(data.item || {}).configName"
                    required
                    maxlength="100"
                    id="name"
                    placeholder="Name" />
            <label for="name" 
                    class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Name</label>
        </div>

        <div class="relative mt-2">
            <select name="service" id="service"
                    placeholder="Name"
                    v-model="(data.item || {}).emailType"
                    class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent">
                <option value="gmail">gmail</option>
            </select>
                    
            <label for="service" 
                   class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Type</label>
        </div>

        <div class="relative mt-2">
            <input type="email" class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="(data.item || {}).emailFrom"
                    required
                    maxlength="100"
                    id="slug"
                    placeholder="Name" />
                    
            <label for="slug" 
                   class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Email From</label>
        </div>
        <div class="relative mt-2">
            <input type="text" class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="(data.item || {}).emailUsername"
                    required
                    maxlength="100"
                    id="slug"
                    placeholder="Name" />
                    
            <label for="slug" 
                   class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Username</label>
        </div>        
        <div class="relative mt-2">
            <input type="password" class="input rounded-xl px-2 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    v-model="(data.item || {}).emailPass"
                    required                    
                    maxlength="100"
                    id="slug"
                    placeholder="Name" />
                    
            <label for="slug" 
                   class="absolute rounded mt-7 left-0 ml-3 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Password</label>
        </div>
        <div class="relative bg-white tab-group mt-2">
            <div class="flex border-b border-stone-200 relative" role="tablist">
                <div class="absolute bottom-0 h-0.5 bg-stone-800 transition-transform duration-300 transform scale-x-0 translate-x-0 tab-indicator"></div>

                <button v-for="lang in data.languages" :key="lang" 
                    @click.prevent="data.currentLang = lang"
                    :class="data.currentLang == lang ? 'bg-stone-800 text-white rounded-xl' : ''" class="tab-link text-sm active inline-block py-2 px-4 hover:text-blue transition-colors duration-300 mr-1" data-dui-tab-target="tab1-group4">
                    {{ lang }}
                </button>
            </div>
        </div>
        <div class="relative mt-4 mx-8">
            <label class="block font-medium text-start text-sm mt-2">
                Email Name
            </label>
            <input type="text"
                class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                v-model="(data.item || {}).emailName[data.currentLang]"
            /> 
        </div>
        <div class="relative mt-4 mx-8">
            <label class="block font-medium text-start text-sm mt-2">
                Email Subject
            </label>
            <input type="text"
                class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                v-model="(data.item || {}).emailSubject[data.currentLang]"
            />
        </div>
        <div class="relative mt-4 mx-8">
            <label class="block font-medium text-start text-sm mt-2">
                Content
            </label>
            <textarea
                class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
                id="description"
                v-model="(data.item || {}).emailContent[data.currentLang]"
                placeholder="Content"
                rows="10"></textarea>
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
    import service from "@/services/emailConfig.service";
    import { watch, defineProps, onMounted, reactive } from 'vue'

    const props = defineProps({
        item: Object,
        saved: Function
    })

    watch(() => props.item, (value) => {        
        if (props?.item && value) {                        
            data.item = setProperties(value);
            
        }
    }, { deep: true });

    var data = reactive({
        item: {
            emailSubject: {},
            emailName: {},
            emailContent: {},
            _id: undefined
        },
        currentLang: "en",
        languages: ["en", "pt"],
        error: ""
    })

    onMounted(() => {
        
        if (props.item) {
            const value = props.item;
            data.item = setProperties(value);
        }
    })

    const defaultValues = {
            emailSubject: {
                "pt":"",
                "en":""
            },
            emailName: {
                "pt":"",
                "en":""
            },
            emailContent: {
                "pt": "",
                "en": "",
            }
        }

    const setProperties = (item) => {
        
        const keys = Object.keys(defaultValues);

        for (let i = 0; i < keys.length; i++) {
            if (item[keys[i]] === undefined || typeof(item[keys[i]]) !== typeof(defaultValues[keys[i]])) {
                item[keys[i]] = defaultValues[keys[i]];
            }    
        }
        return item;
    }

    const saveItem = async () => {

        data.error = "";
        try
        {
            if ((data.item.configName ?? "").length == 0 || (data.item.emailType ?? "").length == 0 ||
                (data.item.emailFrom ?? "").length == 0)
            {
                data.error = "Please fill config name, email type and email from."
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