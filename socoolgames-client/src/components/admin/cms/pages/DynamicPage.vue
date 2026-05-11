<template>
    <div v-if="data.isLoading" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
     <img  src="@/assets/eclipse.svg" alt="loaging" class="animate-spin">
    </div>
    <div v-if="!data.isLoading">
        <div  v-for="block in data.item.blocks" :key="block._id">
        <component v-if="!block.disabled" :is="{...getBlockComponent(block.type)}" :data="block.data" :selectedLang="data.selectedLanguage"></component> 
        </div>
    </div>
    <div v-if="data.errorMessage" class="text-red-500">
        {{ data.errorMessage }}
    </div>
</template>
<script setup>
    import { reactive, watch } from 'vue'
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
        selectedLanguage: "",
        isLoading: true,
        errorMessage: "",
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
        if (item.pageTitle?.[lang]) {
            MetaTagsService.setTitle(item.pageTitle[lang]);
        }
        if (item.pageDescription?.[lang]) {
            MetaTagsService.setDescription(item.pageDescription[lang]);
        }
        if (item.pageKeywords?.[lang]) {
            MetaTagsService.setKeywords(item.pageKeywords[lang]);
        }
        if (item.slug) {
            MetaTagsService.setCanonical(lang, 
                                     `${window.location.origin}/${lang}/${fixedHomeSlug(item.slug)}`, 
                                     `${window.location.origin}/${getAlternateLang(lang)}/${fixedHomeSlug(item.slug)}`)
        }
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
        try {
            data.isLoading = true;
            const result = await pageService.getItemByNameRef(slug);
            data.components = componentsUtils.getComponents();

            if (result.status == 200 && result.data.error == 0 && result.data.data)
            {
                data.item = result.data.data;
                setLangsAndTranslations(data.item, data.selectedLanguage);
                data.isLoading = false;
            } 
            else
            {
                router.push('/not-found');
            }

        } catch (error) {
          data.isLoading = false;    
          data.errorMessage = "An error occurred while fetching the page data.";        
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