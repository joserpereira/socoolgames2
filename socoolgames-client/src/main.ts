import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import localizationUtils from './utils/localization.utils'
import setupInterceptors from '@/interceptors/setupInterceptors';
//import store from "@/store";
//

import { createPinia } from 'pinia'

const pinia = createPinia()
const i18n = localizationUtils.create();

createApp(App).use(pinia).use(router).use(i18n).mount('#app')
setupInterceptors();
