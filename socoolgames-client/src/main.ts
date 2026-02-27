import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import localizationUtils from './utils/localization.utils'
import store from "@/store";
import setupInterceptors from '@/services/common/setupInterceptors';

const i18n = localizationUtils.create();

setupInterceptors(store);

createApp(App).use(router).use(store).use(i18n).mount('#app')
