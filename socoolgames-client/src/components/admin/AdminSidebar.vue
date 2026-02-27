<template>
  <aside class="h-screen min-h-screen
           transition-all duration-300 ease-in-out
           flex flex-col"
    :class="collapsed ? 'w-16' : 'w-56'">
      <!-- Links -->
    <nav class="flex-1 p-2 space-y-1">
      <RouterLink
        v-for="item in items"
        :key="item.label"
        :to="item.link"
        class="flex items-center gap-3 p-3 rounded-lg
               hover:text-white hover:bg-slate-800 over:bg-slate-800 transition"
        :title="collapsed ? item.label : ''"
      >
        <span
          class="w-6 h-6 flex items-center justify-center"
          v-html="item.icon"
        />
        <span
          v-if="!collapsed"
          class="whitespace-nowrap text-sm">
          {{ item.label }}
        </span>
      </RouterLink>
    </nav>
    <!-- Logout -->
    <nav class="mb-4 p-2 space-y-1">
      <a class="flex items-center gap-3 p-3 rounded-lg
                hover:text-white hover:bg-slate-800 transition" @click.prevent="logoutClick">
        <span
          class="w-6 h-6 flex items-center justify-center"
          v-html="collapsed ? logoutIcon.collapse : logoutIcon.expand" />
        <span
          v-if="!collapsed"
          class="whitespace-nowrap text-sm" >
          Logout
        </span>    
      </a>
    </nav>

     <!-- Toggle -->
    <button
      @click="toggle"
      class="h-14 border-t border-slate-700
             flex items-center justify-center
             hover:text-white hover:bg-slate-800 transition"
    >
      <span
        class="w-5 h-5"
        v-html="collapsed ? icons.expand : icons.collapse" />
    </button>
  </aside>
  <!-- <div>
    <div>
      <router-link to="/admin/">Dashboard</router-link>
    </div>
    <div>
      <router-link to="/admin/pages">Pages</router-link>
    </div>
    <div>
      So Cool Games
    </div>

    <div>
      So Cool Games
    </div>

    <div>
      So Cool Games
    </div>

    <div>
      So Cool Games
    </div>
    <div>
      So Cool Games
    </div>
    <div>
      <button @click.prevent="logOut">Logout</button>
    </div>

  </div> -->
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {  useRouter } from 'vue-router'
import EventBus from "@/common/EventBus";
import store from '@/store';

const collapsed = ref(false)
//const route = useRoute()
const router = useRouter()

// import UserService from "@/services/user.service";
const items = [
  {
    link: '/admin',
    label: 'Dashboard',
    icon: `
      <svg viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="13" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>`
  },
  {
    link: '/admin/pages',
    label: 'Pages',
    icon: `
      <svg viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
      </svg>`
  }
]

const icons = {
  collapse: `
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>`,
  expand: `
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>`
}

const logoutIcon = {
  collapse: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
    </svg>`,
  expand: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
    </svg>`
}

const logoutClick = async () => {
  try {
      store.dispatch('auth/logout');
      router.push('/admin/signin');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

/* Auto collapse em mobile */
const handleResize = () => {
  collapsed.value = window.innerWidth < 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const toggle = () => {
  collapsed.value = !collapsed.value
}

onMounted(() => {
    EventBus.on("logout", () => {
      this.logOut();
    });
  });

</script>