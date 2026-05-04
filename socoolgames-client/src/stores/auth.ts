import { defineStore } from 'pinia'
import AuthService from '@/services/common/auth.service'

const storedUser = localStorage.getItem('user')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    status: {
      loggedIn: storedUser ? true : false
    },
    user: storedUser ? JSON.parse(storedUser) : null
  }),

  actions: {
    async login(user: any) {
      try {
        const result = await AuthService.login(user.email, user.password)

        this.loginSuccess(result.user)
        return result.user

      } catch (error) {
        this.loginFailure()
        throw error
      }
    },

    logout() {
      AuthService.logout()
      this.logoutState()
    },

    async register(user: any) {
      try {
        const response = await AuthService.register(
          user.username,
          user.email,
          user.password
        )

        this.registerSuccess()
        return response.data

      } catch (error) {
        this.registerFailure()
        throw error
      }
    },

    refreshToken(accessToken: any) {
      this.refreshTokenState(accessToken)
    },

    // 👇 equivalente às mutations

    loginSuccess(user: any) {
      this.status.loggedIn = true
      this.user = user
    },

    loginFailure() {
      this.status.loggedIn = false
      this.user = null
    },

    logoutState() {
      this.status.loggedIn = false
      this.user = null
    },

    registerSuccess() {
      this.status.loggedIn = false
    },

    registerFailure() {
      this.status.loggedIn = false
    },

    refreshTokenState(accessToken: any) {
      this.status.loggedIn = true
      this.user = {
        ...this.user,
        accessToken
      }
    }
  }
})