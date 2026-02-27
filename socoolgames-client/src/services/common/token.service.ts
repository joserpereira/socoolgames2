class TokenService {
  getLocalRefreshToken() {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null;
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null;
    return user?.accessToken;
  }

  updateLocalAccessToken(token) {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null;
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user) || "");
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user") || "");
  }

  setUser(user) {    
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();