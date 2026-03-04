<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal z-50 " >
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner text-center bg-gradient-to-br from-[#2a0d4f] via-[#1b1240] to-[#0f172a] text-white rounded-xl">
          <div class="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <!-- Modal Content -->
          <slot>
            <div class="model-content mt-5">
              <h1>{{ props.title }}</h1>
              <p class="mt-5" v-html="props.message" />
            </div>
          </slot>
          <div class="my-4 flex justify-end">
            <button type="button" 
                class="hover:ring-1 bg-blue-950 text-white mx-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                   @click="close(true)">
              Yes
            </button>
            <button type="button" 
                class="hover:ring-1 bg-blue-600 text-white mx-2 px-4 py-2 rounded-lg hover:bg-blue-950 transition"
                @click="close(false)">
              <strong>No</strong>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: "ConfirmationModel",
};
</script>
<script setup lang="ts">

import { defineProps, defineExpose, defineEmits } from "vue"
const props = defineProps({
  id: { type: String, default: "confirmModal" },
  title: { type: String, default: "Confirmation" },
  message: { type: String, default: "Are you sure?" },
  modalActive: { type: Boolean, default: false },
});

defineExpose({ props });

function close(answer: boolean) {
  emits("close", answer);
}

const emits = defineEmits(["close"]);
</script>
<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-inner {
  position: relative;
  max-width: 640px;
  width: 80%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 30px 16px 10px 16px;
}

</style>
