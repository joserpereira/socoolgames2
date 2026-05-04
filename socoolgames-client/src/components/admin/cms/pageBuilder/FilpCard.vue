
<template>
  <div class="card" @click="nextImage">
    <div class="card-inner" 
        :class="{ flipped: isFlipped, 'no-transition': noTransition }"
          >
        <div 
        class="card-face card-front"
        :style="{ backgroundImage: `url(${props.images[currentIndex]})` }"
        >
        <span class="content">asasaa</span>
        </div>

        <div 
        class="card-face card-back"
        :style="{ backgroundImage: `url(${props.images[nextIndex]})` }"
        >
        <span class="content">vvv</span>
        </div>
        <!-- <span>asasaa</span> -->

      <!-- <img :src="props.images[currentIndex]" /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true
  }
})

const currentIndex = ref(0)
const nextIndex = ref(1)
const isFlipped = ref(false)
const isAnimating = ref(false)
const noTransition = ref(false)

function nextImage() {
  if (isAnimating.value) return

  isAnimating.value = true

  // prepara próxima imagem
  nextIndex.value = (currentIndex.value + 1) % props.images.length

  // ativa animação
  isFlipped.value = true




  setTimeout(() => {
    currentIndex.value = nextIndex.value

    // 🔴 reset SEM animação
    noTransition.value = true
    isFlipped.value = false

    // força reflow (hack necessário)
    void document.querySelector<HTMLElement>('.card-inner')?.offsetHeight

    // volta a ligar animação
    noTransition.value = false
    isAnimating.value = false
  }, 600)
}

</script>

<style scoped>
    .card {
    perspective: 1000px;
    width: 100%;
    height: 400px;
      overflow: hidden;
    }

    .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
     will-change: transform;
     transform-origin: center;
    transition: transform 0.6s  ease-in-out;
    transform-style: preserve-3d;
      backface-visibility: hidden;
    }

    .card-inner.flipped {
        transform: rotateX(180deg) scale(1.02);
    }

    .card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        will-change: transform;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        backface-visibility: hidden;
        border-radius: 12px;

        display: flex;
        align-items: center;
        justify-content: center;
    }


    /* frente visível */
    .card-front {
        z-index: 2;
    }

    /* verso já preparado */
    .card-back {
        transform: rotateX(180deg);
    }
    .card-inner.no-transition {
        transition: none !important;
    }
</style>