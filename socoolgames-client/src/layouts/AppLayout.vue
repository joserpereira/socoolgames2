<template>
  <div class="flex min-h-screen">
    <!-- <Sidebar /> -->
    <main class="flex-1 min-h-screen">
      <router-view />
    </main>
  </div>
</template>
<script>
  export default {
    name: 'AdminLayout',
    components: {
    },
  };
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCookieStore } from '@/stores/cookieStore'
import { loadGoogleAnalytics } from '@/utils/cookieScripts'

onMounted(() => {

  const store = useCookieStore()
  store.load()
  if (store.preferences.analytics) {
    loadGoogleAnalytics('G-98F5CT1RM9')
  }
})

</script>