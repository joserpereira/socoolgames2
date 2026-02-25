<template>
    <!-- HERO -->
    <section :class="'bg-gradient-to-r1 from-green-100 to-green-200 py-20 bg-[url('+formatUrl('./public/images/header.png')+')] bg-cover'" >

    <!-- style="background-image: url('header.png'); background-size:cover;"> -->
    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center" >

        <div>
            <h1 class="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Jogos criativos para crianças longe dos ecrãs
            </h1>

            <p class="text-lg text-gray-700 mb-8">
                Brincar, aprender e imaginar.  
                Em casa ou na escola.
            </p>

            <a href="#produtos" 
                class="hover:scale-105 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-darkgreen transition">
                Ver jogos criativos
            </a>
            </div>

            <div>
            <!-- <img  -->
                <!-- src="header.png"  -->
                <!-- alt="Peças de madeira coloridas educativas"  -->
                <!-- class="rounded-3xl shadow-xl w-full" -->
                <!-- loading="lazy" -->
            <!-- /> -->
            </div>

        </div>
    </section>

    <!-- BENEFÍCIOS -->
    <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-6 text-center">

            <h2 class="text-3xl md:text-4xl font-bold mb-12">
            Aprender longe dos ecrãs é mais divertido!
            </h2>
            <h3 class="text-2xl md:text-2xl font-bold mb-12">
            Recursos gratuitos
            </h3>
            <div class="grid md:grid-cols-4 gap-8">

            <div>
                <div class="text-4xl mb-4">💡</div>
                <h3 class="font-bold mb-2">Desenvolve a criatividade</h3>
            </div>

            <div>
                <div class="text-4xl mb-4">🧠</div>
                <h3 class="font-bold mb-2">Estimula o pensamento crítico</h3>
            </div>

            <div>
                <div class="text-4xl mb-4">⏳</div>
                <h3 class="font-bold mb-2">Reduz o tempo de ecrã</h3>
            </div>

            <div>
                <div class="text-4xl mb-4">👨‍👩‍👧</div>
                <h3 class="font-bold mb-2">Promove brincadeira em família</h3>
            </div>

            </div>
        </div>
    </section>

    <!-- JOGOS POR IDADE -->
    <section id="produtos" class="py-20 bg-gray-50">
     <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Jogos Criativos por Idade
        </h2>
        <p class="text-gray-600">
            Atividades educativas adaptadas ao desenvolvimento infantil.
        </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">

        <!-- Card 1 -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/words_pt.png" alt="Jogo Caça Palavras" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">5 a 8 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Caça Palavras</h3>
            <p class="text-gray-600 mb-4">Atenção e vocabulário</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero experimentar
            </a>
            </div>
        </article>

        <!-- Card 2 -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/dots_pt.png" alt="Jogo Unir Pontos" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">4 a 7 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Unir os Pontos</h3>
            <p class="text-gray-600 mb-4">Coordenação motora</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero experimentar
            </a>
            </div>
        </article>

        <!-- Card 3 -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/loto_pt.png" alt="Loto de Natal" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">4 a 7 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Loto de Natal</h3>
            <p class="text-gray-600 mb-4">Reconhecimento visual</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero experimentar
            </a>
            </div>
        </article>

        <!-- Card 4 Ebook -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/ebook_pt.png" alt="Ebook Importância da Criatividade" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Para pais</span>
            <h3 class="text-xl font-bold mt-4 mb-2">A importância da Criatividade</h3>
            <p class="text-gray-600 mb-4">Guia prático para estimular o desenvolvimento infantil.</p>
            <a href="#" class="block text-center bg-secondary text-dark py-3 rounded-full font-semibold hover:opacity-90 transition">
                Quero receber
            </a>
            </div>
        </article>

        </div>
    </div>
    </section>

    <!-- CREATIVE BOX  -->
    <section :class="'relative py-20 px-6 text-center bg-[url('+formatUrl('./public/images/background_green.png')+')] bg-cover'">

    <div class="max-w-4xl mx-auto ">

        <h2 class="text-3xl md:text-4xl font-bold mb-6">
        Conhece a nossa <span class="text-primary font-bold">Caixa Criativa</span>
        </h2>

        <p class="text-lg text-gray-700 mb-6">
        Uma alternativa criativa e educativa ao excesso de tempo em frente aos ecrãs.
        </p>

        <p class="text-gray-700 max-w-3xl mx-auto">
        Descobre caixas temáticas com atividades lúdicas, educativas e muito divertidas,
        que ajudam o teu filho a crescer e aprender longe dos ecrãs.
        </p>

    </div>

    </section>

    <!-- MAiS PRODUTOS -->
    <section id="produtos" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Explora os nossos produtos
        </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">

        <!-- Card 1 -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/words_pt.png" alt="Jogo Caça Palavras" class="w-full h-100 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">5 a 8 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Panda Balance</h3>
            <p class="text-gray-600 mb-4">Atenção e vocabulário</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero experimentar
            </a>
            </div>
        </article>

        <!-- Card 2 -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img :src="formatUrl('./public/images/cardscaixacriativa.png')" alt="Jogo Unir Pontos" class="w-full h-100 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">4 a 7 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Caixa Criativa</h3>
            <p class="text-gray-600 mb-4">Coordenação motora</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero experimentar
            </a>
            </div>
        </article>

        <!-- Card 3 -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="@/assets/images/loto_pt.png" alt="Loto de Natal" class="w-full h-100 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">4 a 7 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Memory Color</h3>
            <p class="text-gray-600 mb-4">Reconhecimento visual</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero experimentar
            </a>
            </div>
        </article>

        </div>
      </div>
    </section>

    <!-- Livros -->
    <section id="produtos" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Explora os nossos Livros
        </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">

        <!-- Card 1 -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img :src="formatUrl('./public/images/ebook1.webp')" alt="Jogo Caça Palavras" class="w-full h-64 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">3 a 80 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Livro de Atividades</h3>
            <p class="text-gray-600 mb-4">Atenção e vocabulário</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero comprar
            </a>
            </div>
        </article>

        <!-- Card 2 -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img :src="formatUrl('./public/images/ebook2.webp')" alt="Jogo Unir Pontos" class="w-full h-64 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">4 a 7 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Animais</h3>
            <p class="text-gray-600 mb-4">Coordenação motora</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero comprar
            </a>
            </div>
        </article>

        <!-- Card 3 -->
        <article class="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img :src="formatUrl('./public/images/ebook3.webp')" alt="Loto de Natal" class="w-full h-64 object-cover" loading="lazy">
            <div class="p-6">
            <span class="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">4 a 7 anos</span>
            <h3 class="text-xl font-bold mt-4 mb-2">Natal</h3>
            <p class="text-gray-600 mb-4">Reconhecimento visual</p>
            <a href="#" class="block text-center bg-primary text-white py-3 rounded-full font-semibold hover:bg-darkgreen transition">
                Quero comprar
            </a>
            </div>
        </article>

        </div>
      </div>
    </section>

    <section class="relative w-full h-[600px] flex items-center justify-center text-center text-white">

    <!-- Background Image -->
    <div class="absolute inset-0">
        <img 
        src="@/assets/images/video-preview.png" 
        alt="Criança a utilizar jogo criativo no telemóvel"
        class="w-full h-full object-cover"
        loading="lazy"
        />
        <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-3xl px-6">

        <h2 class="text-3xl md:text-5xl font-bold mb-6">
        Veja como funcionam os nossos jogos criativos
        </h2>

        <p class="text-lg md:text-xl mb-10 text-gray-200">
        Descobre um mundo de possibilidades para aprender brincando!
        </p>

        <!-- Video Button -->
        <a 
        href="https://www.youtube.com/watch?v=h2IDctBX7OU" 
        target="_blank" 
        rel="noopener"
        class="inline-flex items-center gap-3 border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition"
        >
        <!-- Play Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
        </svg>
        Ver vídeo
        </a>

    </div>
    </section>

    <section :class="'py-16 bg-[url('+formatUrl('./public/images/block1.png')+')] bg-cover'">

    <!-- BLOCK 1 -->
    <div class="max-w-6xl mx-auto px-6 py-5 grid md:grid-cols-2 gap-12 items-center">

        <!-- Text -->
        <div 
        class="py-5">
        <h2 class="text-3xl md:text-4xl font-bold text-green-700 mb-4">
            O que podemos fazer em família?
        </h2>

        <p class="text-lg text-gray-700 mb-8">
            Ideias rápidas para tirar as crianças dos ecrãs e puxar 
            <span class="italic font-semibold">pela imaginação</span>.
        </p>

        <ul class="space-y-4 text-gray-800 text-lg">
            <li class="flex items-center gap-3">
            <span class="text-green-600 text-xl">✔</span> Independência
            </li>
            <li class="flex items-center gap-3">
            <span class="text-green-600 text-xl">✔</span> Resiliência
            </li>
            <li class="flex items-center gap-3">
            <span class="text-green-600 text-xl">✔</span> Metas realistas
            </li>
            <li class="flex items-center gap-3">
            <span class="text-green-600 text-xl">✔</span> Aceitação
            </li>
            <li class="flex items-center gap-3">
            <span class="text-green-600 text-xl">✔</span> Elogios específicos
            </li>
        </ul>

        <button class="mt-10 bg-primary hover:bg-darkgreen text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition">
            Quero as 5 dicas
        </button>
        </div>

        <!-- Imagem -->
        <div class="flex justify-center">
        <img 
            :src="formatUrl('./public/images/familia_criativa.png')" 
            alt="Crianças a desenvolver criatividade em atividades educativas"
            class="rounded-2xl shadow-xl w-full max-w-md"
            loading="lazy"
        />
        </div>

    </div>
    </section>

    <section :class="'py-16 bg-[url('+formatUrl('./public/images/block1.png')+')] bg-cover'">
        <div class="max-w-6xl mx-auto px-6 py-5 grid gap-12 items-center">

        <!-- BLOCK 2 - NEWSLETTER -->
        <div class="row mt-24 px-6 text-center">

            <h3 class="text-2xl md:text-3xl font-bold text-green-700 mb-6">
            Recebe ideias criativas e jogos para fazer em família
            </h3>

            <form class="flex flex-col md:flex-row gap-4 justify-center mb-3">
            <input 
                type="email" 
                placeholder="O teu melhor email"
                class="px-6 py-4 rounded-full border border-gray-300 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
            />
            <button 
                type="submit"
                class="bg-primary hover:bg-darkgreen text-white px-8 py-4 rounded-full font-semibold shadow-md transition"
            >
                Quero receber
            </button>
            </form>

            <p class="text-sm text-gray-600">
            Sem spam. Podes sair quando quiseres.
            </p>

        </div>

        <!-- BLOCK 3 - INSTAGRAM -->
        <div class="max-w-6xl mx-auto mt-20 px-6 text-center">

            <h3 class="text-2xl md:text-3xl font-bold text-green-700 mb-10">
            Junta-te à comunidade <span class="font-extrabold">So COOL Games</span>
            </h3>

            <div class="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">

            <img :src="formatUrl('./public/images/insta1.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
            <img :src="formatUrl('./public/images/insta2.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
            <img :src="formatUrl('./public/images/insta3.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
            <img :src="formatUrl('./public/images/insta4.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">
            <img :src="formatUrl('./public/images/insta5.webp')" class="rounded-xl shadow-md hover:scale-105 transition" alt="">

            </div>

            <a href="https://instagram.com" target="_blank"
            class="inline-block bg-primary hover:bg-darkgreen text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition">
            Ver no Instagram
            </a>

        </div>
        </div>
    </section>
</template>
<script lang="ts">

    export default {
        name: "HomeView"
    }
</script>
<script setup lang="ts">
    import { formatUrl } from "@/utils/url.utils";

    // eslint-disable-next-line no-undef
    defineExpose({ formatUrl });
</script>