<template>
    <!-- <section>
        <span class="my-5" v-html="props.data.title[props.selectedLang]"></span>
    </section> -->
<!-- ════════════════════════════════ ARTICLES SECTION ════════════════════════════════ -->
  <section class="py-14 animate-fadeup delay-200">
    <div class="max-w-5xl mx-auto px-5">

      <h2 class="font-display font-black text-3xl text-center text-[#1e1a10] mb-2"
          v-html="props.data.title[props.selectedLang]">
      </h2>
      <div class="flex justify-center mb-10">
        <div class="h-1 w-32 rounded-full bg-yellow-500"></div>
      </div>

      <!-- Main content + sidebar grid -->
      <div class="grid md:grid-cols-3 gap-8">

        <!-- ── ARTICLES GRID (2-col inside) ── -->
        <div class="md:col-span-2 space-y-6">

          <!-- Top 3 cards row -->
          <div class="grid sm:grid-cols-3 gap-5">

            <!-- Card 1 – featured -->
            <div class="article-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8e0cc] sm:col-span-1">
              <div class="h-36 bg-[#d8e8c0] flex items-center justify-center text-5xl">🖼️</div>
              <div class="p-4">
                <p class="text-yellow-500 font-black text-xs mb-1">🎨 Destaque</p>
                <h3 class="font-display font-black text-sm leading-snug text-[#1e1a10] mb-2">
                  Pintura Livre para Crianças: Benefícios e Dicas para Aplicar em Casa
                </h3>
                <p class="text-[#6a6050] text-xs leading-relaxed mb-3">
                  Descubra os benefícios da pintura livre e como implementá-la de forma educativa e divertida.
                </p>
                <p class="text-[#9a9080] text-xs mb-3">April 2024</p>
                <a href="#" class="block text-center bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-secondary transition-colors">Ler artigo</a>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="article-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8e0cc]">
              <div class="h-36 bg-[#e0d8f0] flex items-center justify-center text-5xl">✂️</div>
              <div class="p-4">
                <h3 class="font-display font-black text-sm leading-snug text-[#1e1a10] mb-2">
                  Ideias de Colagens Criativas para Desenvolver a Imaginação
                </h3>
                <p class="text-[#6a6050] text-xs leading-relaxed mb-3">
                  Aprenda atividades de colagens que estimulam a criatividade e coordenação nas crianças.
                </p>
                <p class="text-[#9a9080] text-xs mb-3">April 2024 — P121</p>
                <a href="#" class="block text-center bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-secondary transition-colors">Ler artigo</a>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="article-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8e0cc]">
              <div class="h-36 bg-[#fce8d0] flex items-center justify-center text-5xl">😊</div>
              <div class="p-4">
                <p class="text-orange-500 font-black text-xs mb-1">⚡ Popular</p>
                <h3 class="font-display font-black text-sm leading-snug text-[#1e1a10] mb-2">
                  Ensinar Emoções através do Desenho Infantil
                </h3>
                <p class="text-[#6a6050] text-xs leading-relaxed mb-3">
                  Saiba como ajudar as crianças a expressar emoções e desenvolver inteligência emocional através do desenho.
                </p>
                <p class="text-[#9a9080] text-xs mb-3">2024</p>
                <a href="#" class="block text-center bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-secondary transition-colors">Ler artigo</a>
              </div>
            </div>
          </div>

          <!-- Bottom 2 cards row -->
          <div class="grid sm:grid-cols-2 gap-5">

            <!-- Card 4 -->
            <div class="article-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8e0cc]">
              <div class="h-36 bg-[#d8f0e0] flex items-center justify-center text-5xl">♻️</div>
              <div class="p-4">
                <h3 class="font-display font-black text-base leading-snug text-[#1e1a10] mb-1">
                  Brinquedos Reciclados:
                </h3>
                <p class="text-[#4a4030] text-sm font-semibold mb-2">Como Criar e Aprender Brincando</p>
                <p class="text-[#6a6050] text-xs leading-relaxed mb-3">
                  Descubra ideias criativas para transformar materiais reciclados em brinquedos didáticos.
                </p>
                <p class="text-[#9a9080] text-xs mb-3">April 2024</p>
                <a href="#" class="block text-center bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-secondary transition-colors">Ler artigo</a>
              </div>
            </div>

            <!-- Card 5 -->
            <div class="article-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8e0cc]">
              <div class="h-36 bg-[#f0e8d0] flex items-center justify-center text-5xl">📖</div>
              <div class="p-4">
                <p class="text-primary font-black text-xs mb-1">3.</p>
                <h3 class="font-display font-black text-base leading-snug text-[#1e1a10] mb-1">
                  Histórias Ilustradas |
                </h3>
                <p class="text-[#4a4030] text-sm font-semibold mb-2">Como Criar e Desenhar com as Crianças.</p>
                <p class="text-[#6a6050] text-xs leading-relaxed">
                  Vamos explorar como criar e ilustrar histórias a estimular a linguagem e a imaginação infantil.
                </p>
              </div>
            </div>

          </div>
        </div>

        <!-- ── SIDEBAR ── -->
        <aside class="space-y-6">
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-[#e8e0cc]">
            <h3 class="font-display font-black text-base text-[#1e1a10] mb-4">
              Artigos <span class="text-primary">Relacionados</span>
            </h3>
            <ul class="space-y-1">
              <li>
                <a href="#" class="sidebar-link flex items-center justify-between gap-2 py-3 px-3 rounded-xl text-sm font-semibold text-[#3a3020] hover:text-primary transition-all">
                  <span>13 Atividades <strong>Criativas para</strong> Fomentar o Pensamento</span>
                  <span class="text-primary text-lg shrink-0">›</span>
                </a>
              </li>
              <li class="border-t border-[#f0e8d8]">
                <a href="#" class="sidebar-link flex items-center justify-between gap-2 py-3 px-3 rounded-xl text-sm font-semibold text-[#3a3020] hover:text-primary transition-all">
                  <span>Atividades Artísticas para Estimular a Autonomia das Crianças</span>
                  <span class="text-primary text-lg shrink-0">›</span>
                </a>
              </li>
              <li class="border-t border-[#f0e8d8]">
                <a href="#" class="sidebar-link flex items-center justify-between gap-2 py-3 px-3 rounded-xl text-sm font-semibold text-[#3a3020] hover:text-primary transition-all">
                  <span>Como Organizar uma Tarde Criativa em Família</span>
                  <span class="text-primary text-lg shrink-0">›</span>
                </a>
              </li>
              <li class="border-t border-[#f0e8d8]">
                <a href="#" class="sidebar-link flex items-center justify-between gap-2 py-3 px-3 rounded-xl text-sm font-semibold text-[#3a3020] hover:text-primary transition-all">
                  <span>Atividades Simples para Estimular a Imaginação Infantil.</span>
                  <span class="text-primary text-lg shrink-0">›</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Newsletter mini CTA -->
          <div class="bg-[#edf5e0] rounded-2xl p-5 border border-[#c8e0a0]">
            <p class="font-display font-black text-sm text-primary mb-2">📩 Newsletter</p>
            <p class="text-xs text-[#4a6030] leading-relaxed mb-3">Recebe atividades criativas todas as semanas diretamente no teu email.</p>
            <input type="email" placeholder="O teu email…" class="w-full text-xs bg-white border border-[#c8e0a0] rounded-lg px-3 py-2 mb-2 outline-none focus:ring-2 focus:ring-[--color-brand-green-light]" />
            <button class="w-full bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-secondary transition-colors">Subscrever</button>
          </div>
        </aside>

      </div>
    </div>
  </section>    
</template>
<script setup>
    import { defineProps, defineExpose, onMounted, reactive } from 'vue';
    import { formatUrl } from "@/utils/url.utils";
    import articleService from '@/services/article.service';

    const data = reactive({
        articles: []
    });
    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    onMounted(() => {
      articleService.getItems(4).then(res => {
        if (res.data && res.data.error == 0 && res.data.data) {
          data.articles = res.data.data;
          // console.log("Articles:", data.articles);
        }
      }).catch(err => {
        console.error("Error fetching articles:", err);
      })
    })

    defineExpose({ formatUrl });

</script>