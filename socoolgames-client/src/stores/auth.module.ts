import AuthService from '@/services/common/auth.service';

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || "") : null;
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }: any, user: any) {
      return AuthService.login(user.email, user.password).then(
        result => {
          commit('loginSuccess', result.user);
          return Promise.resolve(result.user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }: any) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }: any, user: any) {
      return AuthService.register(user.username, user.email, user.password).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshToken({ commit }: any, accessToken: any) {
      commit('refreshToken', accessToken);
    }
  },
  mutations: {
    loginSuccess(state: any, user: any) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state: any) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state: any) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state: any) {
      state.status.loggedIn = false;
    },
    registerFailure(state: any) {
      state.status.loggedIn = false;
    },
    refreshToken(state: any, accessToken: any) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    }
  }
};