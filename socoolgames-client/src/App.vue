<template>

  <TopBar></TopBar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TopBar from './components/TopBar.vue';
import Footer from './components/Footer.vue';
@Options({
  components: {
    TopBar,
    Footer
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
