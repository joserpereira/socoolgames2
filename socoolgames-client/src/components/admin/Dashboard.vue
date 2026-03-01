<template>
  <div>
    <header class="line-b fixed inset-x-0 top-0 z-20 mr-[calc(100%-100vw)] flex h-14 items-center justify-between bg-white px-4 text-black after:-bottom-px sm:px-6 dark:bg-gray-950 dark:text-white">
      So COOL Games
      <div class="@container flex flex-1 justify-start pl-8">
        
      </div>
      <div v-if="currentUser" >

        <div class="flex items-center gap-5 max-md:hidden lg:gap-6">        
          <div class="rounded-full bg-gray-950 px-2.5 py-0.5 text-sm/6 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950 dark:bg-gray-700 dark:text-white dark:focus-visible:outline-white">
            {{ currentUser.email }}
          </div>
        </div>
        <div class="flex items-center gap-2.5 md:hidden">        
          <div class="rounded-full bg-gray-950 px-2.5 py-0.5 text-sm/6 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950 dark:bg-gray-700 dark:text-white dark:focus-visible:outline-white">
            {{ currentUser.email.substring(0,2).toUpperCase() }}
          </div>
        </div>
      </div>
    </header>
  </div>
  <div class="flex pt-16 min-h-screen ">
    <div class1="w-48 flex-none ps-2">
      <AdminSidebar></AdminSidebar>
    </div>
    <main class="flex-1 min-h-screen p-2">
      <router-view />
      
    </main>
</div>
  
</template>
<script>

  import AdminSidebar from './AdminSidebar.vue';
  // import AdminMain from './AdminMain.vue';
  import EventBus from "@/common/EventBus";
  export default {
    name: "DashboardComponent",
    components: {
      AdminSidebar
    },
    
    data() {
      return {
        content: "",
      };
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      showAdminBoard() {
        if (this.currentUser && this.currentUser['roles']) {
          return this.currentUser['roles'].includes('ROLE_ADMIN');
        }

        return false;
      },
      showModeratorBoard() {
        if (this.currentUser && this.currentUser['roles']) {
          return this.currentUser['roles'].includes('ROLE_MODERATOR');
        }

        return false;
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/admin/signin');
      }
    },
    mounted() {
      EventBus.on("logout", () => {
        this.logOut();
      });
    },
    beforeUnmount() {
      EventBus.remove("logout");
    }
};
</script>