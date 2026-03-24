<template>
    <div v-for="block in data.item.blocks" :key="block._id">
       <component :is="{...getBlockComponent(block.type)}" :data="block.data" :selectedLang="data.selectedLanguage"></component> 
    </div>
</template>
<script setup>
    import { reactive, watch, defineProps, defineExpose } from 'vue'
    import componentsUtils from '@/utils/components.utils';
    import pageService from '@/services/page.service';
    import MetaTagsService from '@/services/common/metatags.service'; 
    import localizationUtils from '@/utils/localization.utils';

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
        slugText: String,
        language: String
    })

    watch(locale, (value) => {        
        data.selectedLanguage = value;
        setLangsAndTranslations(data.item, data.selectedLanguage);
    });

    const setLangsAndTranslations = (item, lang) => {
        MetaTagsService.setTitle(item.pageTitle[lang]);
        MetaTagsService.setDescription(item.pageDescription[lang]);
        MetaTagsService.setKeywords(item.pageKeywords[lang]);
        console.log(`${window.location.origin}/${lang}/${item.slug}`)

        MetaTagsService.setCanonical(lang, 
                                     `${window.location.origin}/${lang}/${fixedHomeSlug(item.slug)}`, 
                                     `${window.location.origin}/${getAlternateLang(lang)}/${fixedHomeSlug(item.slug)}`)
    }

    const getAlternateLang = (lang) => {
        if (lang == "en")
            return "pt";
        return "en";
    }

    const fixedHomeSlug = (slug) => {
        if (slug == "home")
            return "";
        return slug;
    }

    const setValue = (async (slug) => {
            const result = await pageService.getItemByNameRef(slug);
            data.components = componentsUtils.getComponents();

            if (result.status == 200 && result.data.error == 0 && result.data.data)
            {
                data.item = result.data.data;
                setLangsAndTranslations(data.item, data.selectedLanguage);
            } 
            else
            {
                router.push('/not-found');
            }
    })
    
    watch(() => props.slugText, (newValue) => {
        if (newValue) {
            if (props.language !== undefined && props.language !== localStorage.selectedLanguage) {
                localizationUtils.setLanguage(data.language)
                data.selectedLanguage = props.language
            } else {
                data.selectedLanguage = localStorage.selectedLanguage;
            }
            setValue(props.slugText);
        }    
    }, { immediate: true })

    

    defineExpose({ props })
    
</script>