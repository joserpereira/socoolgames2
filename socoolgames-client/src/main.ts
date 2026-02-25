import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import localizationUtils from './utils/localization.utils'

const i18n = localizationUtils.create();

createApp(App).use(router).use(i18n).mount('#app')
