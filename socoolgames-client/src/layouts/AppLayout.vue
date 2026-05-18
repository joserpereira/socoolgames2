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
