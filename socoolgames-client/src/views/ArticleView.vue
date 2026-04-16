<template>
    <div class="max-w-5xl mx-auto my-auto px-5 grid gap-10 items-center m-10">
        <div v-if="data.article?.image" class="h-96  mt-5 flex items-center justify-center text-5xl">
            <picture>
                <source class="h-96 bg-[#d8e8c0]" media="(width < 640px)" :srcset="formatUrl(baseUrl + data.article.image.thumb)" />
                <source class="h-96 bg-[#d8e8c0]" media="(width <= 768px)" :srcset="formatUrl(baseUrl + data.article.image.medium)" />
                <img loading="lazy" class="h-96 bg-[#d8e8c0] rounded-t-2xl shadow-xl " alt="Criança a utilizar jogo criativo no telemóvel"
                        :src="formatUrl(baseUrl + data.article.image.large)" />
            </picture>

        </div>
        <div v-else class="h-36 mt-5 rounded-2xl bg-[#d8e8c0] flex items-center justify-center text-5xl">            
            🖼️
        </div>
        <div class="p-4">
            <p class="text-yellow-500 font-black mb-1" v-if="data.article?.header?.[data.language]">
                 <!-- > -->
                {{ data.article?.header?.[data.language] ?? "" }}
            </p>
            <h1 class="font-black text-[#1e1a10] mt-4 mb-2">
                {{ data.article?.title?.[data.language] ?? "" }}
            </h1>
            <p class="text-[#6a6050] leading-relaxed mb-3" v-html="formatText(data.article?.content?.[data.language] ?? '')">
            </p>
            <p class="text-[#9a9080] text-xs mt-4 mb-3" :title="dateTimeUtils.formatUTCDateOptionalToUser(data.article?.updatedAt ?? data.article?.createdAt)">{{ dateTimeUtils.getDateText(data.article?.updatedAt ?? data.article?.createdAt, false) }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">    
    import { languages } from '../locales/index'
    import { onMounted, reactive } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import { formatUrl } from "@/utils/url.utils";
    import { formatText } from '@/utils/html.utils';
    import dateTimeUtils from '@/utils/dateTime.utils';
    import articleService from '@/services/article.service';

    const baseUrl = process.env.VUE_APP_API_URL;    
    const route = useRoute();
    const router = useRouter()

    const data = reactive({
        slugText: '' as String,
        language: '' as String,
        article: {} as any,
        languages: ["en", "pt"],
    })

    onMounted(() => {   
        const lang = route.params.lang as string;
        if (!Object.keys(languages).includes(lang)) {
            
            router.push('/'+localStorage.selectedLanguage+'/'+route.params.lang);
            data.slugText = route.params.lang as string;
            data.language = localStorage.selectedLanguage;
        } else {
            data.slugText = (route.params.slug ?? "").length > 0 ? route.params.slug : "home";
            data.language = fixLang(route.params.lang);
        }
        articleService.getItemByNameRef(data.slugText).then(result => {
            if (result.status === 200 && result.data.error === 0) {
                data.article = result.data.data;
            }
        })
    })
    
    const fixLang = (language) => {
        if (language in ["pt","en" ])
            return language;
        
        return localStorage.selectedLanguage
    }

</script>