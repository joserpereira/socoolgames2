import { useCookieStore } from '@/stores/cookieStore'

export function useCookies() {
  const store = useCookieStore()

  const hasConsent = (type: 'analytics' | 'marketing') => {
    return store.preferences[type]
  }

  return {
    store,
    hasConsent,
  }
}