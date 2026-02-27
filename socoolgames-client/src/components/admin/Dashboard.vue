<template>
  <div class="flex">

    <div class="w-48 flex-none">
      <AdminSidebar></AdminSidebar>
    </div>
    <div class="w-32 flex-1 ">
      <AdminMain></AdminMain>
    </div>
</div>
  
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