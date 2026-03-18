
<template>

  <TopBar></TopBar>
  <router-view></router-view>
  <FooterBar></FooterBar>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TopBar from '@/components/TopBar.vue';
import FooterBar from '@/components/FooterBar.vue';
@Options({
  components: {
    TopBar,
    FooterBar
  },
})
export default class App extends Vue {}
</script>

<style>
</style>

<!-- <template>
    <main role="main" class="pt-2">
        <router-view />
    </main>
</template> -->