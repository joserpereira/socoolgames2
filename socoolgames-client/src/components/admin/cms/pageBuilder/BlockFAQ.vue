<template>
  <div class="faq-wrapper max-w-5xl mx-auto px-6 py-16">

    <!-- Header -->
    <div class="faq-header">
      <span class="faq-emoji">❓</span>
      <h1 class="faq-title">{{ props.data.title?.[props.selectedLang || 'en'] }}</h1>
      <p class="faq-subtitle">{{ props.data.subtitle?.[props.selectedLang || 'en'] }}</p>
    </div>

    <!-- Search -->
    <div class="faq-search-wrap">
      <span class="search-icon">🔍</span>
      <input
        v-model="search"
        type="text"
        class="faq-search"
        :placeholder="props.data.searchPlaceholder?.[props.selectedLang || 'en']"
      />
      <button v-if="search" class="search-clear" @click="search = ''">✕</button>
    </div>

    <!-- No results -->
    <div v-if="filteredCategories.length === 0" class="faq-empty">
      <span class="faq-empty-icon">🤔</span>
      <p>{{ t.search.empty.replace('{q}', search) }}</p>
    </div>

    <!-- Categories -->
    <div class="faq-categories">
      <div
        v-for="category in filteredCategories"
        :key="category.title"
        class="faq-category"
      >
        <div class="category-header">
          <span class="category-emoji">{{ category.emoji }}</span>
          <h2 class="category-title">{{ category.title }}</h2>
        </div>

        <div class="faq-list">
          <div
            v-for="(item, index) in category.items"
            :key="index"
            class="faq-item"
            :class="{ 'faq-item--open': isOpen(category.title, index) }"
            @click="toggle(category.title, index)"
          >
            <div class="faq-question">
              <span class="faq-question-text" v-html="highlight(item.q)"></span>
              <span class="faq-chevron">
                {{ isOpen(category.title, index) ? '▲' : '▼' }}
              </span>
            </div>
            <transition name="slide">
              <div v-if="isOpen(category.title, index)" class="faq-answer">
                <p v-html="highlight(item.a)"></p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <!-- <div class="faq-cta">
      <span class="faq-cta-emoji">💬</span>
      <p>{{ t.cta.text }}</p>
      <a href="#contacto" class="faq-cta-btn bg-primary hover:bg-secondary text-white"> {{ t.cta.btn }} </a>
    </div> -->

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// ─── Props ────────────────────────────────────────────────────────────────────
const props = defineProps({
  data: {
    type: Object
  },
  selectedLang: {
      type: String
  }
})

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  pt: {
    search: {
      empty: 'Nenhuma pergunta encontrada para "{q}"'
    },
    cta: {
      text: 'Ainda tens dúvidas? Fala connosco!',
      btn: 'Contactar a So COOL Games →'
    },
    categories: [
      {
        emoji: '✨',
        title: 'Sobre a So COOL Games',
        items: [
          { q: 'O que é a So COOL Games?', a: 'A So COOL Games é uma marca dedicada a criar jogos e atividades criativas para crianças, com foco na imaginação, aprendizagem e diversão longe dos ecrãs.' },
          { q: 'Qual é a missão da So COOL Games?', a: 'Promover o desenvolvimento das crianças através da criatividade, oferecendo alternativas saudáveis ao uso excessivo de ecrãs.' },
          { q: 'Para quem são os produtos?', a: 'Os produtos são pensados para crianças, mas também para pais e educadores que valorizam atividades educativas e criativas.' }
        ]
      },
      {
        emoji: '🧩',
        title: 'Produtos',
        items: [
          { q: 'O que é a Caixa Criativa?', a: 'A Caixa Criativa é uma caixa criativa com atividades, jogos educativos e materiais para desenhar e explorar a imaginação.' },
          { q: 'O que está incluído na Caixa Criativa?', a: 'Inclui um livro de atividades, lápis e canetas e jogos educativos pensados para estimular o pensamento criativo.' },
          { q: 'Os ebooks são digitais ou físicos?', a: 'Os ebooks são digitais e podem ser descarregados após a compra.' },
          { q: 'Posso imprimir os ebooks?', a: 'Sim, podes imprimir as páginas as vezes que quiseres para uso pessoal.' },
          { q: 'Os produtos são educativos?', a: 'Sim. Todos os produtos são pensados para desenvolver competências como criatividade, concentração e resolução de problemas.' }
        ]
      },
      {
        emoji: '👶',
        title: 'Idades e benefícios',
        items: [
          { q: 'Para que idades são os produtos?', a: 'Os produtos são ideais para crianças em idade pré-escolar e escolar, podendo variar conforme a atividade.' },
          { q: 'Como ajudam no desenvolvimento das crianças?', a: 'Através de jogos e desafios criativos que estimulam o pensamento, a autonomia e a coordenação motora.' },
          { q: 'Os produtos ajudam a reduzir o tempo de ecrãs?', a: 'Sim. Foram criados precisamente para oferecer alternativas divertidas e educativas fora dos ecrãs.' }
        ]
      },
      {
        emoji: '💳',
        title: 'Encomendas e pagamentos',
        items: [
          { q: 'Como posso comprar?', a: 'Podes comprar diretamente no site, de forma simples e rápida.' },
          { q: 'Que métodos de pagamento aceitam?', a: 'Aceitamos os métodos de pagamento disponíveis na plataforma no momento da compra.' },
          { q: 'É seguro comprar no site?', a: 'Sim. O site utiliza sistemas seguros para proteger os teus dados.' }
        ]
      },
      {
        emoji: '🚚',
        title: 'Entregas',
        items: [
          { q: 'Quanto tempo demora a entrega?', a: 'O tempo de entrega varia consoante a localização, mas será indicado no momento da compra.' },
          { q: 'Fazem envios para todo o país?', a: 'Sim, enviamos para todo o país.' },
          { q: 'Os ebooks têm tempo de entrega?', a: 'Não. Os ebooks ficam disponíveis para download imediato após a compra.' }
        ]
      },
      {
        emoji: '🎁',
        title: 'Outras dúvidas',
        items: [
          { q: 'Posso oferecer como presente?', a: 'Sim. Os produtos são perfeitos para oferecer em aniversários, Natal ou outras ocasiões especiais.' },
          { q: 'Há novos produtos a caminho?', a: 'Sim. Estamos sempre a criar novas atividades e jogos criativos.' },
          { q: 'Como posso contactar a So COOL Games?', a: 'Podes entrar em contacto através do formulário no site ou pelas redes sociais.' }
        ]
      }
    ]
  },

  en: {
    header: {
      title: 'FAQ - So COOL Games',
      subtitle: 'Find answers to the most frequently asked questions'
    },
    search: {
      placeholder: 'Search question...',
      empty: 'No question found for "{q}"'
    },
    cta: {
      text: 'Still have questions? Get in touch!',
      btn: 'Contact So COOL Games →'
    },
    categories: [
      {
        emoji: '✨',
        title: 'About So COOL Games',
        items: [
          { q: 'What is So COOL Games?', a: 'So COOL Games is a brand dedicated to creating games and creative activities for children, focused on imagination, learning and fun away from screens.' },
          { q: "What is So COOL Games' mission?", a: "To promote children's development through creativity, offering healthy alternatives to excessive screen use." },
          { q: 'Who are the products for?', a: 'The products are designed for children, but also for parents and educators who value educational and creative activities.' }
        ]
      },
      {
        emoji: '🧩',
        title: 'Products',
        items: [
          { q: 'What is the Creative Box?', a: 'The Creative Box is a creative kit with activities, educational games and materials for drawing and exploring the imagination.' },
          { q: 'What is included in the Creative Box?', a: 'It includes an activity book, pencils and pens, and educational games designed to stimulate creative thinking.' },
          { q: 'Are the ebooks digital or physical?', a: 'The ebooks are digital and can be downloaded after purchase.' },
          { q: 'Can I print the ebooks?', a: 'Yes, you can print the pages as many times as you like for personal use.' },
          { q: 'Are the products educational?', a: 'Yes. All products are designed to develop skills such as creativity, concentration and problem solving.' }
        ]
      },
      {
        emoji: '👶',
        title: 'Ages & benefits',
        items: [
          { q: 'What ages are the products for?', a: 'The products are ideal for pre-school and school-age children, and may vary depending on the activity.' },
          { q: "How do they help children's development?", a: 'Through creative games and challenges that stimulate thinking, autonomy and motor coordination.' },
          { q: 'Do the products help reduce screen time?', a: 'Yes. They were created precisely to offer fun and educational alternatives away from screens.' }
        ]
      },
      {
        emoji: '💳',
        title: 'Orders & payments',
        items: [
          { q: 'How can I buy?', a: 'You can buy directly on the website, quickly and easily.' },
          { q: 'What payment methods do you accept?', a: 'We accept the payment methods available on the platform at the time of purchase.' },
          { q: 'Is it safe to buy on the site?', a: 'Yes. The site uses secure systems to protect your data.' }
        ]
      },
      {
        emoji: '🚚',
        title: 'Delivery',
        items: [
          { q: 'How long does delivery take?', a: 'Delivery time varies depending on location and will be indicated at the time of purchase.' },
          { q: 'Do you ship nationwide?', a: 'Yes, we ship throughout the country.' },
          { q: 'Do ebooks have a delivery time?', a: 'No. Ebooks are available for immediate download after purchase.' }
        ]
      },
      {
        emoji: '🎁',
        title: 'Other questions',
        items: [
          { q: 'Can I give it as a gift?', a: 'Yes. The products are perfect for giving on birthdays, Christmas or other special occasions.' },
          { q: 'Are new products coming?', a: 'Yes. We are always creating new activities and creative games.' },
          { q: 'How can I contact So COOL Games?', a: 'You can get in touch through the contact form on the website or via social media.' }
        ]
      }
    ]
  }
}

// ─── Active translation (reactive to prop changes) ───────────────────────────
const t = computed(() => translations[props.selectedLang] ?? translations.pt)

// Reset search and open items when language changes
watch(() => props.selectedLang, () => {
  search.value = ''
  openItems.value = {}
})

// ─── Search ───────────────────────────────────────────────────────────────────
const search = ref('')

const filteredCategories = computed(() => {
  if (!search.value.trim()) return t.value.categories
  const q = search.value.toLowerCase()
  return t.value.categories
    .map(cat => ({
      ...cat,
      items: cat.items.filter(
        item =>
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q)
      )
    }))
    .filter(cat => cat.items.length > 0)
})

function highlight(text) {
  if (!search.value.trim()) return text
  const escaped = search.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>')
}

// ─── Accordion ───────────────────────────────────────────────────────────────
const openItems = ref({})

function key(categoryTitle, index) {
  return `${categoryTitle}__${index}`
}
function isOpen(categoryTitle, index) {
  return !!openItems.value[key(categoryTitle, index)]
}
function toggle(categoryTitle, index) {
  const k = key(categoryTitle, index)
  openItems.value[k] = !openItems.value[k]
}
</script>

<style scoped>
.faq-wrapper {
  /* max-width: 760px; */
  /* margin: 0 auto; */
  /* padding: 48px 20px 64px; */
  font-family: 'Nunito', sans-serif;
  color: #2a2a1a;
}

/* ── Header ── */
.faq-header { text-align: center; margin-bottom: 32px; }
.faq-emoji  { font-size: 40px; display: block; margin-bottom: 8px; }
.faq-title  {
  font-family: 'Nunito', sans-serif;
  font-size: 2rem; font-weight: 900;
  color: #3a7d3a; margin-bottom: 6px;
}
.faq-subtitle { font-size: 15px; color: #6a6a4a; }

/* ── Search ── */
.faq-search-wrap { position: relative; margin-bottom: 36px; }
.search-icon {
  position: absolute; left: 14px; top: 50%;
  transform: translateY(-50%);
  font-size: 16px; pointer-events: none;
}
.faq-search {
  width: 100%;
  padding: 12px 42px;
  border: 2px solid #c8e0a0;
  border-radius: 30px;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  background: #ffffff;
  color: #2a2a1a;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.faq-search:focus {
  border-color: #5aaa4a;
  box-shadow: 0 0 0 3px rgba(90,170,74,0.15);
}
.search-clear {
  position: absolute; right: 14px; top: 50%;
  transform: translateY(-50%);
  background: #e0e0d0; border: none; border-radius: 50%;
  width: 22px; height: 22px;
  font-size: 11px; cursor: pointer; color: #4a4a2a;
  display: flex; align-items: center; justify-content: center;
}
.search-clear:hover { background: #c0c0b0; }

/* ── Empty ── */
.faq-empty { text-align: center; padding: 48px 0; color: #8a8a6a; font-size: 15px; }
.faq-empty-icon { font-size: 40px; display: block; margin-bottom: 12px; }

/* ── Category ── */
.faq-category { margin-bottom: 36px; }
.category-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 2px solid #eaf2d8;
}
.category-emoji { font-size: 22px; }
.category-title {
  font-family: 'Nunito', sans-serif;
  font-size: 1.1rem; font-weight: 800; color: #3a7d3a;
}

/* ── FAQ item ── */
.faq-item {
  background: #ffffff;
  border: 1.5px solid #eaf2d8;
  border-radius: 14px;
  margin-bottom: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.faq-item:hover       { border-color: #a8d87a; box-shadow: 0 2px 12px rgba(90,140,40,0.10); }
.faq-item--open       { border-color: #5aaa4a; box-shadow: 0 4px 18px rgba(90,140,40,0.12); }

.faq-question {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
  padding: 16px 20px;
}
.faq-question-text { font-weight: 700; font-size: 15px; color: #2a2a1a; line-height: 1.4; }
.faq-chevron       { font-size: 11px; color: #5aaa4a; flex-shrink: 0; }

.faq-answer {
  padding: 12px 20px 16px;
  font-size: 14px; color: #4a4a2a; line-height: 1.7;
  border-top: 1px solid #f0f5e8;
}

:deep(mark) {
  background: #f5c842; color: #2a2a1a;
  border-radius: 3px; padding: 0 2px;
}

/* ── Slide transition ── */
.slide-enter-active, .slide-leave-active {
  transition: max-height 0.28s ease, opacity 0.22s ease;
  max-height: 300px; overflow: hidden;
}
.slide-enter-from, .slide-leave-to { max-height: 0; opacity: 0; }

/* ── CTA ── */
/* .faq-cta {
  margin-top: 48px; text-align: center;
  background: linear-gradient(135deg, #edf8d0 0%, #fff9e0 100%);
  border: 2px solid #a8d87a;
  border-radius: 18px; padding: 28px 24px;
}
.faq-cta-emoji { font-size: 32px; display: block; margin-bottom: 10px; }
.faq-cta p     { font-size: 16px; color: #2a2a1a; margin-bottom: 16px; }
.faq-cta-btn {
  display: inline-block;
  font-family: 'Nunito', sans-serif;
  font-weight: 800; font-size: 15px;
  padding: 11px 28px; border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(58,125,58,0.25);
  transition: background 0.2s, transform 0.15s;
}
.faq-cta-btn:hover { transform: translateY(-2px); } */
</style>