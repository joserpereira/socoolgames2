import api from "./api";
import TokenService from "@/services/common/token.service";

class AuthService {
  login(email, password) {
    return api
      .post("/auth/login", {
        email,
        password
      })
      .then((response) => {

        if (response.data.token) {
          TokenService.setUser(response.data.user);
        }

        return response.data;
      });   
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, email, password }) {
    return api.post("/auth/signup", {
      username,
      email,
      password
    });
  }
}

export default new AuthService();