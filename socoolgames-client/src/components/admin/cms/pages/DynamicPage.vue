<template>
    <div v-for="block in data.item.blocks" :key="block._id">
       <component :is="{...getBlockComponent(block.type)}" :data="block.data" :selectedLang="data.selectedLanguage"></component> 
    </div>
</template>
<script setup>
    import { reactive, onMounted, watch } from 'vue'
    import pageService from '@/services/page.service';
    import { useRoute, useRouter } from 'vue-router';
    import componentsUtils from '@/utils/components.utils';
    import { useI18n } from "vue-i18n";
    const { locale } = useI18n();

    const route = useRoute();
    const router = useRouter()
    function getBlockComponent(type) {
        return data.components[type];
    }

    const data = reactive({        
        item: {},
        components: {},
        selectedLanguage: ""
    })

    watch(() => locale, (value) => {        
        data.selectedLanguage = value;
    });

    onMounted(async () => {
        data.selectedLanguage = localStorage.selectedLanguage;
        const slug = route.params.slug
        const result = await pageService.getItemByNameRef(slug);
        data.components = componentsUtils.getComponents();
        if (result.status == 200 && result.data.error == 0 && result.data.data)
        {
            data.item = result.data.data;
        } 
        else
        {
            router.push('/not-found');
        }
    })
    
</script>