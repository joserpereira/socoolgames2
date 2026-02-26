<template>
  <div class="flex min-h-screen">
    <!-- <Sidebar /> -->
    <main class="flex-1 min-h-screen">
      <router-view />
    </main>
  </div>
</template>
<script>
//  import Sidebar from "@/components/admin/Sidebar.vue"

  export default {
    name: 'AdminLayout',
    components: {
//      Sidebar
    },
  };
</script>