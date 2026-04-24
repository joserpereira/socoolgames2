<template>
    <section class="relative w-full h-[600px] flex items-center justify-center text-center text-white">

        <!-- Background Image -->
        <div class="absolute inset-0">
            <picture>
                <source media="(width < 640px)" :srcset="formatUrl(baseUrl + (props.data?.backgroundImage?.[props.selectedLang] || props.data?.backgroundImage).thumb)" />
                <source media="(width <= 768px)" :srcset="formatUrl(baseUrl + (props.data?.backgroundImage?.[props.selectedLang] || props.data?.backgroundImage).medium)" />
                <img loading="lazy" class="w-full h-full object-cover" alt=""
                     :src="formatUrl(baseUrl + (props.data?.backgroundImage?.[props.selectedLang] || props.data?.backgroundImage)?.large)" />
            </picture>
            <div class="absolute inset-0 bg-black/50"></div>
        </div>

        <!-- Content -->
        <div v-if="!data.playVideo" class="relative z-10 max-w-3xl px-6">

            <h2 class="text-3xl md:text-5xl font-bold mb-6">
            {{ props.data.title?.[props.selectedLang] }}
            </h2>

            <p class="text-lg md:text-xl mb-10 text-gray-200">
            {{ props.data.subTitle?.[props.selectedLang] }}
            </p>

            <!-- Video Button -->
             <button  @click="playVideo"
                class="inline-flex items-center gap-3 border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition">
                <!-- Play Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                {{ props.data.buttonText?.[props.selectedLang] }}                
             </button>
            <!-- <a :href="props.data.buttonLink?.[props.selectedLang]" 
               target="_blank" 
               rel="noopener"
               class="inline-flex items-center gap-3 border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition">
                {{ props.data.buttonText?.[props.selectedLang] }}
            </a> -->
            
        </div>
        <iframe
            v-if="data.playVideo"
            :src="fixUrl(props.data.buttonLink?.[props.selectedLang], '&autoplay=1&mute=' + data.muted)"
            style="position:absolute;top:0;left:0;width:100%;height:100%;"
            title="YouTube video player"
            class="w-full"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen>
        </iframe>
    </section>
</template>
<script setup>
    import { defineProps, reactive } from 'vue';
    const baseUrl = process.env.VUE_APP_API_URL;
    import { formatUrl } from "@/utils/url.utils";

    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    const data = reactive({
        playVideo: false,
        muted: 1
    })

    const playVideo = () => {
        data.playVideo = true;
        data.muted = 0; // Unmute the video when play button is clicked
        
    }

    const fixUrl = (url, params) => {
        if (!url) return '';
        if (url.includes('youtube.com')) {
            // Convert to embed URL
            const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
            const videoId = videoIdMatch ? videoIdMatch[1] : null;
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}?${params}&playlist=${videoId}&loop=1`;
            }
        }
        // For other URLs, just append params
        return url + (url.includes('?') ? '&' : '?') + params;
    }

</script>