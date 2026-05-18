
<template>
  <div class="min-h-screen flex flex-col">
    <TopBar :menu="data.menu"></TopBar>
    <div class="flex-1">
      <router-view></router-view>
    </div>    
    <FooterBar :menu="data.menu"></FooterBar>
    <CookieBanner />
  </div>
</template>

<script lang="ts" setup>

import TopBar from '@/components/TopBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import CookieBanner from '@/components/cookies/CookieBanner.vue';
import { onMounted, reactive } from 'vue';
import menusService from '@/services/menus.service';

const data = reactive({
  menu: {} as any
})

onMounted(async () => {
    const result = await menusService.getMainItem()
    if (result.status == 200 && result.data.error == 0 && result.data?.data?.items) {
      data.menu = result.data.data.items;
    }
      
})

</script>