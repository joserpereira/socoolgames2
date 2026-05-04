import api from "./api"
import TokenService from "@/services/common/token.service"

type LoginResponse = {
  user: {
    id: number
    email: string
    accessToken: string
    refreshToken: string
  }
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post("/auth/login", {
        email,
        password
      })

      const data: LoginResponse = response.data

      // 🔥 importante: usar accessToken (consistência)
      if (data.user?.accessToken) {
        TokenService.setUser(data.user)
      }

      return data

    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  logout() {
    TokenService.removeUser()
  }

  async register(username: string, email: string, password: string) {
    try {
      return await api.post("/auth/signup", {
        username,
        email,
        password
      })
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  }
}

export default new AuthService()