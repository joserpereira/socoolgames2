import { createI18n } from 'vue-i18n'

import { languages } from '../locales/index'
import { defaultLocale } from '../locales/index'

class LocalizationUtils {
    private i18n: any;
    create() {
        const messages = Object.assign(languages)

        this.i18n = createI18n({
            // something vue-i18n options here ...
            locale: defaultLocale,
            warnHtmlInMessage: 'off', 
            fallbackLocale: 'en',
            messages: messages,
        })
        
        let usersLanguage;

        if (localStorage.selectedLanguage) {
            usersLanguage = localStorage.selectedLanguage;
        } else {    
            usersLanguage = window.navigator.language.split('-')[0];
        }

        if (Object.keys(languages).includes(usersLanguage)) {
            this.i18n.global.locale = usersLanguage;
        } else {
            this.i18n.global.locale = 'en';
        }
        
        return this.i18n;
    }

    setLanguage(locale: string) {
        if (Object.keys(languages).includes(locale)) {
             this.i18n.global.locale = locale;
            localStorage.selectedLanguage = locale;
        }
    }
}

export default new LocalizationUtils();