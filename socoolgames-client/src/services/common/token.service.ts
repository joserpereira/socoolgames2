type User = {
  accessToken?: string
  refreshToken?: string
  [key: string]: any
}

class TokenService {
  private getStoredUser(): User | null {
    const data = localStorage.getItem('user')
    if (!data) return null

    try {
      return JSON.parse(data)
    } catch {
      return null
    }
  }

  private setStoredUser(user: User | null) {
    if (!user) {
      localStorage.removeItem('user')
    } else {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  getLocalRefreshToken(): string | undefined {
    return this.getStoredUser()?.refreshToken
  }

  getLocalAccessToken(): string | undefined {
    return this.getStoredUser()?.accessToken
  }

  updateLocalAccessToken(token: string) {
    const user = this.getStoredUser()
    if (!user) return

    user.accessToken = token
    this.setStoredUser(user)
  }

  getUser(): User | null {
    return this.getStoredUser()
  }

  setUser(user: User) {
    this.setStoredUser(user)
  }

  removeUser() {
    this.setStoredUser(null)
  }
}

export default new TokenService()