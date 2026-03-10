<template>
    <!-- Drag & Drop Zone -->
    <div>
        <div class="border rounded p-4  hover:bg-blue-700 hover:border-dashed"
                :class="data.isDragging
            ? 'bg-blue-700 border-dashed hover:bg-blue-700 hover:border-dashed'
            : 'bg-blue-900 border'"
                @dragenter.prevent="data.isDragging = true"
                @dragover.prevent="data.isDragging = true"
                @dragleave.prevent="data.isDragging = false"
                @drop.prevent="onDrop"
                @click="triggerFileInput"
                style="cursor: pointer;">
            <div>
                <div class="flex justify-center pb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                    </svg>
                </div>
                <!-- <p class="m-0 text-center">Browse or Drop here file to Upload</p> -->
                <p class="m-0 text-center"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="mt-2 text-sm text-center">Maximum file size 5MB</p>
                <input
                    ref="fileInput"
                    type="file"
                    
                    class="hidden"
                    accept="image/*"
                    @change="onFileChange" />
                  <!-- Botão fake -->
            </div>
        </div>
        <!-- <div class="border rounded p-4 mt-4 hover:bg-blue-700 hover:border-dashed
                    bg-blue-900 border-dashed "
                @click="pasteUrl"
                style="cursor: pointer;">
            <div>
                <p class="m-0 text-center flex justify-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                    </span>
                    <span class="font-semibold ps-2 pe-1">Click to paste url</span> from clipboard
                </p>
            </div>
            
        </div> -->
        <div v-if="data.allFiles" class="flex items-start items-center flex-wrap">
            <div v-for="(item, index) in data.allFiles" :key="index" class="mt-4 space-x-4 relative inline-block">
                <img 
                    :src="item.preview"

                    @error="onError" 

                    class="w-24 object-scale-down border rounded"
                    alt="Image Preview"
                    />
                <button type="button" class="absolute top-1 right-5 p-1 size-6
                                                bg-white text-gray-700
                                                rounded-full shadow
                                                flex items-center justify-center
                                                hover:bg-red-500 hover:text-white
                                                transition"
                    @click="removeImage(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>                
            </div>
        </div>
        <div v-if="data.allFiles" class="row" style="background-color: red;" cla1ss="flex items-start items-center flex-wrap">
            <div class="grid grid-cols-[auto_6rem_6rem_7rem_7rem]" style="background-color: green; width: 100%;">
                    <div>Name</div>
                    <div>size</div>
                    <div>suggested</div>
                    <div></div>
                    <div></div>
            </div>
                <div class="grid grid-cols-[auto_6rem_6rem_7rem_7rem]" v-for="(item, index) in data.allFiles" :key="index">
                    <div>{{ item.path }}</div>
                    <div>{{ item.w ? item.w + " / " + item.h : ""  }}</div>
                    <div>{{ item.w ? item.sw + " / " + item.sh : ""  }}</div>
                    <div><button type="button" @click="getinfo(item)">Get info</button></div>
                    <div><button type="button" @click="resize(item)">resize</button></div>

                </div>
                
        </div>
    
    </div>
    <div class="loading-bar" v-if="data.progress > 0 && data.progress <= 100">
        <div class="loading" :style="'width: '+data.progress+'%'"></div>
    </div>
</template>


<script setup>
import { ref, reactive, watch, defineProps, defineExpose } from 'vue'
import axiosAPI from '@/services/common/api';
import { formatUrl } from "@/utils/url.utils";
import imageService from '@/services/common/image.service';

const fileInput = ref(null)
const data = reactive({
    allFiles: [],
    progress: 0,
    isDragging: false
})

const props = defineProps({
  maxUploadedFiles: {
    type: String,
    default: "1"
  },
  files: {
    default: []
  },

});

function handleFile(file) {
    const maxFiles = parseInt(props.maxUploadedFiles);
    if (data.allFiles.length >= maxFiles || (file ?? "") == "")
        return;

    const item = {
        preview: URL.createObjectURL(file),
        file: file
    }
    if (maxFiles == 1 && data.allFiles.length == 1) {
         data.allFiles[0] = item;
    } else {
        data.allFiles.push(item);
    }
}

function onFileChange(e) {
    handleFile(e.target.files[0])
}


function onDrop(e) {
    data.isDragging = false;
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
}

function triggerFileInput() {
    fileInput.value?.click()
}


watch(() => props.files, (newvalue) => {
    data.allFiles = []

    const files = newvalue
    files.forEach((element) => {
        const item = {
            preview: formatUrl(element),
            path: element
        }
        data.allFiles.push(item);
    })
}, 
{
    immediate: true,
    deep: true 
});

const setOriginalImage = (target, value) => {
    target.src = value;
}
const onError = (event) => {
    // this.onerror=null; 
    var oldvalue = event.target.src;
    event.target.src='/images/logo_url.png';

    setTimeout(function() {
        setOriginalImage(event.target, oldvalue);
    }, 1500)
}

const addFile = (file, index, path) => {

    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('file', file);

    return axiosAPI.post(path + "/" + index,  
                             formData,
                             {
                                 onUploadProgress: (loaded) => {
                                    var prog = Math.floor(loaded.loaded / loaded.total * 100);
                                    data.progress = prog
                                    if (data.progress == 100) {
                                        setTimeout(() => {
                                            if (data.progress == 100) {
                                                 data.progress = 0;
                                             }
                                        }, 1500)
                                    }
                                },
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                }
                             }); 
}

const getFiles = () => {
    return data.allFiles;
}

const uploadFiles = async (path) => {

    var index = 0;
    let results = [];
    for (const item of data.allFiles) {
        try {
            if (!item) {
               continue;
            }
             
            if (item.file !== undefined) {
               const fileResult = await addFile(item.file, index, path)
               if (fileResult?.data?.data?.length > 0) {
                  results.push(fileResult.data.data)
               }
            }
            else {
                results.push(item.path)
             }
        } catch (err) {
            console.log("err", err)
        }
        index = index + 1;
    }
    return results;
}

const removeImage = (index) => {
    if (data.allFiles?.length > 0 && index < data.allFiles.length) {
        data.allFiles.splice(index, 1);
    }
}

const getinfo = async (file) => {
    var result = await imageService.getImageInfo(file.path);

    if (result.status == 200 && result.data.error == 0 && result.data.data) {
        const data = result.data.data;
        file.w = data.width;
        file.h = data.height;
        file.sw = 522;
        file.sh = Math.round((522 * data.height) / data.width);
    }
}

const resize = async (file) => {
    var result = await imageService.resize(file.path, file.sw, file.sh);

    if (result.status == 200 && result.data.error == 0 && result.data.data) {
        const data = result.data.data;
        console.log("resize", data)
        //file.w = data.width;
        //file.h = data.height;
        //file.sw = 522;
        //file.sh = Math.round(data.height / (data.width/data.height));
    }
}

// window.addEventListener('paste', (e) => {
//   const text = e.clipboardData.getData('text')
//   if (text.indexOf("\n") == -1 && isValidHttpUrl(text)) {
//     console.log("paste", text)
//     pasteUrl(text)
//   }
// })

// const pasteUrl = async (url) => {
//     console.log("pasteUrl", url)    
// }

defineExpose({ removeImage, uploadFiles, addFile, onDrop, triggerFileInput, /* pasteUrl,*/ onError, getFiles, getinfo })

</script>


<style scoped>

.loading-bar {
    height: 6px ;
    width: 100% ;
    margin-top: 4px;
    background-color: gray;
    border-radius: 30px;
}

.loading-bar .loading {
    width: 1%;
    height: 100%;
    background-color: #0d6efd;
    border-radius: inherit;
}

</style>