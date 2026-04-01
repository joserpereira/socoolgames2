<template>
  <div class="w-full">
    
    <!-- Toolbar -->
    <div ref="toolbar" class="border rounded-t-2xl bg-gray-50 p-2">
      <span class="ql-formats">
        <select class="ql-header"></select>
        <select class="ql-font"></select>
      </span>

      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
      </span>

      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
      </span>

      <span class="ql-formats">
        <button class="ql-link"></button>
        <button class="ql-image"></button>
      </span>

      <span class="ql-formats">
        <button class="ql-clean"></button>
      </span>
    </div>

    <!-- Editor -->
    <div
      ref="editor"
      class="h-[500px] border border-t-0 rounded-b-2xl bg-white"
    ></div>

  </div>
</template>

<script setup>
import { onMounted, ref, watch, defineProps, defineEmits } from 'vue'
import Quill from 'quill'

// estilos obrigatórios
import 'quill/dist/quill.snow.css'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:value'])

const editor = ref(null)
const toolbar = ref(null)
let quill = null

onMounted(() => {
  quill = new Quill(editor.value, {
    theme: 'snow',
    modules: {
      toolbar: toolbar.value
    }
  })

  // valor inicial
  quill.root.innerHTML = props.value || ''

  // emitir alterações
  quill.on('text-change', () => {
    const html = quill.root.innerHTML
    emit('update:value', html)
  })
})

// sync externo → editor
watch(() => props.value, (value) => {
  if (!quill) return
  if (value !== quill.root.innerHTML) {
    quill.root.innerHTML = value || ''
  }
})
</script>