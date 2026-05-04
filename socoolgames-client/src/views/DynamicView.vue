<template>
    <DynamicPage :slugText="data.slugText" :language="data.language"></DynamicPage>
</template>

<script setup lang="ts">
    import DynamicPage from '@/components/admin/cms/pages/DynamicPage.vue';
    import { languages } from '../locales/index'
    import { onMounted, reactive } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    
    const route = useRoute();
    const router = useRouter()

    const data = reactive({        
        slugText: '' as any,
        language: '' as String,
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
    })
    
    const fixLang = (language: any) => {
        if (language in ["pt","en" ])
            return language;
        
        return localStorage.selectedLanguage
    }

</script>