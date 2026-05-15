<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  perspective: 1000px; /* importante */
}

.inner {
  --w: 120px;
  --h: 160px;
  --quantity: 10;
  --rotateX: -15deg;

  position: relative;
  width: var(--w);
  height: var(--h);

  transform-style: preserve-3d;

  animation: rotating 20s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotateX(var(--rotateX)) rotateY(0deg);
  }
  to {
    transform: rotateX(var(--rotateX)) rotateY(360deg);
  }
}


.card {
  position: absolute;
  width: var(--w);
  height: var(--h);

  border: 2px solid rgba(var(--color-card), 0.6);
  border-radius: 12px;
  overflow: hidden;

  /* backface-visibility: hidden; */

  transform: 
    rotateY(calc((360deg / var(--quantity)) * var(--index)))
    translateZ(300px); /* valor fixo mais estável */
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: url("https://socoolgames.net/uploads/images/palavritas-thumb-1776947377129.webp") center/cover no-repeat;
}
</style>

<template>
  <div class="wrapper">
    <div class="inner">
      <div v-for="i in 10" :key="i"
        class="card"
        :style="{
          '--index': i - 1,
          '--color-card': '142, 249, 252'
        }"
      >
        <div class="img"></div>
      </div>
    </div>
  </div>
</template>