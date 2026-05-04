import axiosInstance from "../services/common/api"
import TokenService from "../services/common/token.service"
import { useAuthStore } from "@/stores/auth"

const setupInterceptors = () => {
  const auth = useAuthStore()

  // 🔐 REQUEST
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken()

      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  // 🔁 RESPONSE
  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalConfig = error.config as any

      if (!error.response) {
        return Promise.reject(error)
      }

      // evita loop infinito
      if (
        error.response.status === 401 &&
        !originalConfig._retry &&
        originalConfig.url !== "/auth/login"
      ) {
        originalConfig._retry = true

        try {
          const refreshToken = TokenService.getLocalRefreshToken()

          if (!refreshToken) {
            auth.logout()
            return Promise.reject(error)
          }

          const response = await axiosInstance.post("/auth/refresh", {
            refreshToken
          })

          const { accessToken } = response.data

          // 🔥 atualiza Pinia + localStorage
          auth.refreshToken(accessToken)
          TokenService.updateLocalAccessToken(accessToken)

          // retry request
          return axiosInstance(originalConfig)

        } catch (refreshError) {
          auth.logout()
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )
}

export default setupInterceptors