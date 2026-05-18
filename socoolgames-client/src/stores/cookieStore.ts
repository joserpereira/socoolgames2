import { defineStore } from 'pinia'

type CookiePrefs = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

export const useCookieStore = defineStore('cookies', {
  state: () => ({
    consentGiven: false,
    preferences: {
      necessary: true,
      analytics: false,
      marketing: false,
    } as CookiePrefs,
  }),

  actions: {
    load() {
      const saved = localStorage.getItem('cookie-consent')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.consentGiven = true
        this.preferences = parsed
      }
    },

    acceptAll() {
      this.preferences = {
        necessary: true,
        analytics: true,
        marketing: true,
      }
      this.save()
    },

    rejectAll() {
      this.preferences = {
        necessary: true,
        analytics: false,
        marketing: false,
      }
      this.save()
    },

    save() {
      this.consentGiven = true
      const consentData = {
        preferences : this.preferences,
        consentGiven: true,
      }
      localStorage.setItem('cookie-consent', JSON.stringify(consentData))
    },

    update(prefs: Partial<CookiePrefs>) {
      this.preferences = {
        ...this.preferences,
        ...prefs,
      }
      this.save()
    },
  },
})