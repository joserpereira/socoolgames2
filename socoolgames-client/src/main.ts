import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import localizationUtils from './utils/localization.utils'
import setupInterceptors from '@/interceptors/setupInterceptors';

import { createPinia } from 'pinia'

const pinia = createPinia()

if ((localStorage.selectedLanguage || "").toLowerCase().includes("pt-pt")) {
    localStorage.selectedLanguage = "pt";
}

const i18n = localizationUtils.create();


createApp(App).use(pinia).use(router).use(i18n).mount('#app')
setupInterceptors();
