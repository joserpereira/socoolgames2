<template>
  
  <div v-if="!store.consentGiven"
       class="fixed border-t-1 items-center border-black bottom-0 left-0 w-full bg-white text-black p-5 flex flex-col md:flex-row justify-between gap-4">

    <div class="text-sm">
      {{ $t('cookieBanner.message') }}
    </div>

    <div class="flex gap-2">
      <button class="px-4 py-2 rounded"
              @click="openSettings = true">
        {{ $t('cookieBanner.configure') }}
      </button>

      <button class="px-4 py-2 bg-white text-black  border border-black"
              @click="store.acceptAll">
        {{ $t('cookieBanner.acceptAll') }}
      </button>

      <button class="px-4 py-2 border border-black"
              @click="store.rejectAll">
        {{ $t('cookieBanner.rejectAll') }}
      </button>

    </div>

    <CookieSettings v-if="openSettings" @close="openSettings = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCookieStore } from '@/stores/cookieStore'
import CookieSettings from './CookieSettings.vue'

const store = useCookieStore()
store.load();
const openSettings = ref(false)
</script>