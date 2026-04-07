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
  },
  {
    link: '/admin/articles',
    label: 'Articles',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
      </svg>`
  },
  {
    link: '/admin/images',
    label: 'Images',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
      </svg>`
  },
  {
    link: '/admin/menus',
    label: 'Menus',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
      </svg>`
  },
  {
    link: '/admin/subscriptions',
    label: 'Subscriptions',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>`
  },
  {
    link: '/admin/email-configs',
    label: 'Email Configs',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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