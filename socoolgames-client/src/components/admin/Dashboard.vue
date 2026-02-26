<template>
  <AdminSidebar></AdminSidebar>
  <AdminMain></AdminMain>
</template>
<script lang="ts">

  import AdminSidebar from './AdminSidebar.vue';
  import AdminMain from './AdminMain.vue';
  export default {
    name: "DashboardComponent",
    components: {
      AdminSidebar,
      AdminMain
    }
  }

</script>