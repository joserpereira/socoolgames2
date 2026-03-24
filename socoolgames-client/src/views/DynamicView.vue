<template>
    <DynamicPage :slugText="data.slugText" :language="data.language"></DynamicPage>
</template>

<script setup lang="ts">
    import DynamicPage from '@/components/admin/cms/pages/DynamicPage.vue';
    import { onMounted, reactive } from 'vue'
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    
    const data = reactive({        
        slugText: '' as String,
        language: '' as String
    })

    
    onMounted(() => {   
        data.slugText = (route.params.slug ?? "").length > 0 ? route.params.slug : "home";
        data.language = fixLang(route.params.lang);
    })
    
    const fixLang = (language) => {
        if (language in ["pt","en" ])
            return language;
        
        return localStorage.selectedLanguage
    }

</script>