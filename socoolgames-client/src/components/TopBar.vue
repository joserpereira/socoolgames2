<template>
  <nav class="bg-white shadow-md">
    <!-- <div class="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center"></div> -->
    <div class="space-x-6 text-sm ms-auto font-semibold max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
      <!-- Logo -->
      <a @click="closeAll" :href="'/'+data.selectedLanguage+'/'">
        <img style="height: 80px" src="@/assets/images/logo_horiz.webp" class="rounded-xl" />
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex gap-6">

        <a :href="item.link[data.selectedLanguage]" v-for="(item, index) in menu" :key="index"
            :target="item.target"
            :class="getStyle(item.button)" class="hover:scale-105 hover:underline">{{ item.text[data.selectedLanguage] }}</a>

        <!-- Dropdown -->

        <!-- 
        fica exemplo de sub menu
          <div class="relative">
          <button @click="toggleDropdown" class="hover:text-blue-500">
            Services
          </button>

          <div
            :class="[
              'absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 flex flex-col transition-all duration-200',
              isOpen
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 pointer-events-none'
            ]"
          >
            <a @click="closeAll" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item1</a>
            <a @click="closeAll" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item2</a>
            <a @click="closeAll" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item3</a>
          </div>
        </div> -->
      </div>

      <!-- Mobile Button -->
      <button
        aria-label="More Options" class="md:hidden text-gray-500 hover:text-primary focus:text-primary focus:outline-none"
        @click="isMobileMenuOpen = true"
      >
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <!--
              <path  fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
              -->
            <path  fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/> -->
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-50 shadow-xl transform transition-transform duration-300"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"      
      @click="closeAll"
    >
      <div
        class="bg-white w-64 h-full p-6"
        @click.stop
      >
        <button @click="closeAll" class="mb-4">✕</button>

        <div @click="closeAll" class="flex flex-col gap-4 text-sm">
          <a :href="item.link[data.selectedLanguage]" v-for="(item, index) in menu" :key="index"
            :class="getStyle(item.button)" class=" font-semibold hover:scale-105 hover:underline">{{ item.text[data.selectedLanguage] }}</a>
        </div>
      </div>
    </div>

  </nav>
</template>

<script setup>
  import { ref } from 'vue'
    import { watch, reactive, defineProps, defineExpose, onMounted } from 'vue'
    import { useI18n } from "vue-i18n";
    const { locale } = useI18n();

    const data = reactive({        
        selectedLanguage: "",
    })

  const isOpen = ref(false)
  const isMobileMenuOpen = ref(false)

  //fica exemplo de submenu
  // function toggleDropdown() {
  //   isOpen.value = !isOpen.value
  // }

  const getStyle = (type) => {

      switch (type) {
        case "0":
          return "hover:text-primary mt-2";
        case "1":
          return "text-primary hover:text-dark mt-2"
        case "2":
          return "bg-primary text-white text-center px-4 py-2 rounded-full hover:bg-darkgreen transition"
        default: 
          return "";
      }
    }

  function closeAll() {
    isOpen.value = false
    isMobileMenuOpen.value = false
  }

  function handleEsc(e) {
    if (e.key === 'Escape') {
      closeAll()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleEsc)
  })

  const props = defineProps({
      menu: Object,
        default() {
            return []
        }
    });

    watch(locale, (value) => {        
        data.selectedLanguage = value;
    });

    onMounted(() => {
      data.selectedLanguage = localStorage.selectedLanguage
    })

    defineExpose({ data, props })

</script>