<template>
  <!-- NAVBAR -->
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
      <!-- <div class="text-2xl font-black text-primary">So COOL Games</div> -->
    
      <img style="height: 80px" src="@/assets/images/logo_horiz.webp" class="rounded-xl" />
      <div class="md:hidden">
        <!-- @click="data.isOpen = !data.isOpen"  -->
        <button type="button" aria-label="More Options" class="block text-gray-500 hover:text-primary focus:text-primary focus:outline-none">
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <!--
              <path  fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
              -->
            <path  fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/> -->
          </svg>
        </button>
      </div>
      <nav class="hidden md:flex space-x-6 text-sm font-semibold">
        <a href="#" class="hover:scale-105 hover:text-primary mt-2 hover:underline">Blog Criativo</a>
        <a href="#" class="hover:scale-105 hover:text-primary mt-2 hover:underline">Missão SCG</a>
        <a href="#" class="hover:scale-105 hover:text-primary mt-2 hover:underline">Artigos</a>
        <a href="#" class="hover:scale-105 text-primary hover:text-dark mt-2 hover:underline">Ebook Grátis</a>
        <a href="#" class="hover:scale-105 bg-primary text-white px-4 py-2 rounded-full hover:bg-darkgreen hover:underline transition">
          Loja
        </a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
</script>

