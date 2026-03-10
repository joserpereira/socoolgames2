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
      accept="image/*"
      class="hidden"
      @change="handleFile"
    />

    <p class="text-gray-600">
      Drag & Drop image here
    </p>

    <p class="text-sm text-gray-400 mt-1">
      or click to upload
    </p>

  </div>

  <!-- preview -->

  <div v-if="preview" class="mt-6">

    <img
      :src="preview"
      class="rounded-xl shadow max-h-80 mx-auto"
    />

    <button
      @click="upload"
      class="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
    >
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

</div>
</template>

<script setup>
import { ref } from "vue"

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

  if (!selected) return

  file.value = selected
  preview.value = URL.createObjectURL(selected)

}

const upload = () => {
  const formData = new FormData()
  formData.append("file", file.value)

  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
      progress.value = Math.round((e.loaded / e.total) * 100)
    }
  })
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      console.log(JSON.parse(xhr.responseText))
    }
  }
  xhr.open("POST", "http://localhost:3000/api/images/upload")
  xhr.send(formData)
console.log("15")  

}
</script>