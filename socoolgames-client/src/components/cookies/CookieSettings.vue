<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div class="bg-white p-6 rounded w-96">

      <h2 class="text-lg font-bold mb-4">{{$t('cookiePreferences.title')}}</h2>

      <label class="flex justify-between mb-3">
        <span>{{$t('cookiePreferences.essential')}}</span>
        <input type="checkbox" checked disabled />
      </label>

      <label class="flex justify-between mb-3">
        <span>{{$t('cookiePreferences.marketing')}}</span>
        <input type="checkbox" v-model="prefs.marketing" />
      </label>

      <label class="flex justify-between mb-3">
        <span>{{$t('cookiePreferences.analytics')}}</span>
        <input type="checkbox" v-model="prefs.analytics" />
      </label>

      <div class="flex justify-end gap-2 mt-4">
        <button class="px-3 py-2 border border-black"
                @click="$emit('close')">
          {{$t('cookiePreferences.close')}}
        </button>

        <button class="px-3 py-2 bg-white text-black border border-black"
                @click="save">
          {{$t('cookiePreferences.save')}}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useCookieStore } from '@/stores/cookieStore'

const store = useCookieStore()

const prefs = reactive({
  analytics: store.preferences.analytics,
  marketing: store.preferences.marketing,
})

const save = () => {
  store.update(prefs)
}
</script>