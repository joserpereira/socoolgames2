
<template>

  <TopBar :menu="data.menu"></TopBar>
  <router-view></router-view>
  <FooterBar :menu="data.menu"></FooterBar>
</template>

<script lang="ts" setup>

import TopBar from '@/components/TopBar.vue';
import FooterBar from '@/components/FooterBar.vue';
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