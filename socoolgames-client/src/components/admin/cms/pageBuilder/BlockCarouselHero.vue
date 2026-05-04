<template>

<div class="relative overflow-hidden">

  <div
    class="flex  transition-transform duration-500 ease-in-out"
    :style="{ transform: `translateX(-${data.currentIndex * 100}%)` }"
  >
    <section
      v-for="(item, i) in props.data.items"
      :key="i"
      class="w-full min-h-[40rem] px-6 flex flex-shrink-0 py-20 md:bg-cover bg-cover bg-center "
      :style="getBgImage(item)"
    >
      <div class="px-16 max-w-7xl mx-auto grid md:grid-cols-2  items-center">

        <div>
          <h1 class="text-4xl backdrop-blur-sm md:text-5xl font-black leading-tight rounded-lg p-4 inline-block">
            {{ item.title?.[props.selectedLang] }}
          </h1>
        </div>
        <div>
        </div>
        <div class="mb-6 py-4 ">
          <p class="backdrop-blur-sm font-medium text-lg text-gray-900 mb-8 rounded-lg p-4 inline-block" v-html="formatText(item.subTitle?.[props.selectedLang])"></p>

          <div>
            <a
              :href="item?.buttonLink?.[props.selectedLang]"
              class="hover:scale-105 bg-primary text-white px-8 py-4 rounded-full inline-block font-bold hover:bg-darkgreen transition"
            >
              {{ item.buttonText?.[props.selectedLang] }}
            </a>
          </div>
        </div>

      </div>
    </section>
  </div>

  <button
    @click="prev"
    class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/40 text-white backdrop-blur flex items-center justify-center hover:bg-white/10"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>

  </button>

  <button
    @click="next"
    class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/40 text-white backdrop-blur flex items-center justify-center hover:bg-white/10"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>

  </button>

  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
    <button
      v-for="(item, i) in props.data.items"
      :key="i"
      @click="goTo(i)"
      class="w-3 h-3 rounded-full border border-white transition-all"
      :class="{
        'bg-white scale-125': data.currentIndex === i,
        'opacity-50': data.currentIndex !== i
      }"
    />
  </div>

</div>
</template>
<script setup>
    import { onMounted, reactive } from 'vue';
    import { formatUrl } from "@/utils/url.utils";
    import { formatText } from '@/utils/html.utils';

    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    const data = reactive({
        currentIndex: 0,
        item: props.data.items[0],
        timeoutID: -1
    })

    const scheduleNext = () => {
        data.timeoutID = setTimeout(() => {
            next();
        }, 4000)
    }
    onMounted(() => {
        scheduleNext();
    })

    const next = () => {
        clearTimeout(data.timeoutID);
        data.currentIndex= (data.currentIndex + 1) % props.data.items.length
        data.item = props.data.items[data.currentIndex]
        scheduleNext();
    }

    const prev = () => {
        clearTimeout(data.timeoutID);
        data.currentIndex =
            (data.currentIndex - 1 + props.data.items.length) % props.data.items.length
        data.item = props.data.items[data.currentIndex]
        scheduleNext();
    }

    const goTo = (index) => {
        clearTimeout(data.timeoutID);
        data.currentIndex = index
        data.item = props.data.items[data.currentIndex]
        
    }

    const getBgImage = (item) => {
        const images = item?.image?.[props.selectedLang] || item?.image
        const isMobile = window.innerWidth < 768
        const url = formatUrl(baseUrl + (isMobile ? images?.medium : images?.large))
        return { backgroundImage: `url('${url}')` }
      }

    defineExpose({ formatUrl, next, prev, goTo, getBgImage })
</script>