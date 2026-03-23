<template>
    <div v-for="block in data.item.blocks" :key="block._id">
       <component :is="{...getBlockComponent(block.type)}" :data="block.data" :selectedLang="data.selectedLanguage"></component> 
    </div>
</template>
<script setup>
    import { reactive, watch, defineProps, defineExpose } from 'vue'
    import pageService from '@/services/page.service';
    import componentsUtils from '@/utils/components.utils';
    import { useRouter } from 'vue-router';
    import { useI18n } from "vue-i18n";
    const router = useRouter()
    const { locale } = useI18n();


    function getBlockComponent(type) {
        return data.components[type];
    }

    const data = reactive({        
        item: {},
        components: {},
        selectedLanguage: ""
    })

    const props = defineProps({
        slugText: String
    })

    watch(locale, (value) => {        
        data.selectedLanguage = value;
    });

    const setValue = (async (slug) => {
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
    
    watch(() => props.slugText, (newValue) => {
        if (newValue) {
            data.selectedLanguage = localStorage.selectedLanguage;
            setValue(props.slugText);
        }    
    }, { immediate: true })

    

    defineExpose({ props })
    
</script>