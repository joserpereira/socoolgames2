<template>
<div class="max-w-xl mx-auto">

  <div
    class="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition hover:bg-gray-50"
    @dragover.prevent
    @drop.prevent="handleDrop"
    @click="openFile"
  >

    <input
      ref="fileInput"
      type="file"
      accept="file/*"
      class="hidden"
      @change="handleFile"
    />

    <p class="text-gray-600">
      Drag & Drop file here
    </p>

    <p class="text-sm text-gray-400 mt-1">
      or click to upload
    </p>

  </div>

  <!-- preview -->

  <div v-if="preview" class="mt-6">

    <img
      :src="preview" v-if="data.isImage"
      class="rounded-xl shadow max-h-80 mx-auto"
    />
    <div v-else class="flex items-center justify-center h-20 bg-gray-100 rounded-xl text-gray-600">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
          <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
        </svg>
      </span>
      <span class="ms-4">
        {{ file.name }}
      </span>  
      
      
    </div>

    <button
      @click="upload"
      class="mt-4 bg-primary px-4 py-2 rounded-full text-white hover:bg-secondary hover:text-black">
      Upload
    </button>

  </div>

  <!-- progress -->

  <div v-if="progress > 0" class="mt-4">

    <div class="w-full bg-gray-200 rounded">
      <div
        class="bg-green-500 text-xs text-white text-center py-1 rounded"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>

  </div>
  <div v-if="data.errorMessage" class="mt-5 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
    <p class="font-bold">Be Warned</p>
    <p>{{ data.errorMessage }}</p>
  </div>
</div>
</template>

<script setup>
import { ref, defineProps, reactive } from "vue"
import axiosAPI from '@/services/common/api';

 const props = defineProps({
    newItem: {
      type: Function
    }
  });

 const data = reactive({
    isImage: false,
    errorMessage: ""
 });


const baseAPI = 'files/';

const preview = ref(null)
const file = ref(null)
const progress = ref(0)

const fileInput = ref(null)

const openFile = () => {
  fileInput.value.click()
}

const handleFile = (e) => {
  setFile(e.target.files[0])
}

const handleDrop = (e) => {
  const dropped = e.dataTransfer.files[0]
  setFile(dropped)
}

function setFile(selected) {

  data.errorMessage = "";
  if (!selected) return

  data.isImage = selected.type.startsWith("image/")
  if (!data.isImage && !selected.type.startsWith("video/") && !selected.type.startsWith("audio/") &&
      !(selected.type == "application/pdf")) {
    data.errorMessage = "Only image and pdf files are allowed";
    return;
  }
  file.value = selected
  preview.value = URL.createObjectURL(selected)

}

const upload = async () => {
  data.errorMessage = "";
  const formData = new FormData()
  formData.append("file", file.value)

  try {
    const res = await axiosAPI.post(baseAPI + 'upload',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (event) => {

          progress.value = Math.round(
            (event.loaded * 100) / event.total
          )
          if (progress.value >= 100) {
            setTimeout(() => {
              if (props?.newItem != null) {
                props?.newItem(); 
                preview.value = null;
                file.value = null;
                progress.value = 0;
              }                
            }, 1000);

          }

        }
      });
      if (res.status !== 200) {
        data.errorMessage = "Oops. Failed to upload file, please try again.";
      }
  } catch (err) {
    data.errorMessage = "Ooops. Failed to upload file, please try again.";
  }

}
</script>