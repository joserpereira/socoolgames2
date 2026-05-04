<template>
    <!-- ══════════════════ HERO ══════════════════ -->
    <section class="blob-bg relative overflow-hidden pt-12 pb-16" style="background:#f2edda">

    <!-- decorative stars -->
    <span class="absolute top-8 text-2xl star" style="right: 42%;">⭐</span>
    <span class="absolute top-20 text-xl star" style="right: 12%; animation-delay:-3s">✦</span>
    <span class="absolute bottom-10 text-lg star" style="left: 8%; animation-delay:-5s">⭐</span>
    <span class="absolute top-6 text-sm star" style="left:20%; animation-delay:-2s">✦</span>

    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <!-- LEFT TEXT -->
        <div class="fade d1">
        <h1 class="font-display font-black text-4xl md:text-[2.7rem] leading-tight text-[#1a1808] mb-4"
            v-html="formatText(props.data.title?.[props.selectedLang])">
            
        </h1>
        <p class="text-[#4a4428] text-base leading-relaxed mb-7 max-w-sm"
            v-html="formatText(props.data.subTitle?.[props.selectedLang])">
        </p>

        <!-- CTA -->
        <a :href="props.data?.buttonLink?.[props.selectedLang]" class="btn-pulse inline-block bg-primary hover:bg-secondary transition-colors text-white font-display font-black text-lg tracking-widest uppercase px-10 py-4 rounded-full shadow-lg mb-5">
            {{ props.data?.buttonText?.[props.selectedLang] }}
        </a>

        <!-- trust badges -->
        <div class="flex items-center gap-5 mb-4"> 
            <span v-for="(value, index) in props.data.items" :key="index" class="flex items-center gap-1.5 text-sm font-bold text-[#3a6418]">
                <span class="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">✓</span>
                {{ value?.thrustBadge?.[props.selectedLang] }}
            </span>
        </div>

        <!-- urgency badge -->
        <div class="inline-block bg-secondary text-[#5a3800] font-bold text-sm px-5 py-2 rounded-full shadow-sm">
            {{ props.data?.urgencyBadge?.[props.selectedLang] }}
        </div>
        </div>

        <!-- RIGHT – BOOK MOCKUP -->
        <div class="fade d2 flex justify-center">
        
            <picture>
            <source media="(width < 640px)" :srcset="formatUrl(baseUrl + props.data?.image?.[props.selectedLang].thumb)"  alt="" />
            <source media="(width <= 768px)" :srcset="formatUrl(baseUrl + props.data?.image?.[props.selectedLang].medium)" alt="" />
            <img class="rounded-xl" :src="formatUrl(baseUrl + props.data?.image?.[props.selectedLang].large)" alt="" />
        </picture>
        </div>

    </div>
    </section>
</template>
<script setup>
    import { onMounted } from 'vue';
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

    onMounted(() => {
    })

    defineExpose({ formatUrl })
</script>