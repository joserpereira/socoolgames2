/*
import { createStore, ActionContext } from 'vuex'
//import { ICompany } from '@/store/interfaces';

const moduleAuth = {
  state: {
    auth: false
  },
  getters: {
  },
  mutations: {
    setAuth(state: {auth: boolean}, auth: boolean) {
      state.auth = auth;
    }
  },
  actions: {
    setAuth(context: ActionContext<any,any>, auth: boolean) {
      context.commit('setAuth', auth)
    }
  }
}
const moduleUser = {
  state: {
    user: {} as any
  },
  getters: {
  },
  mutations: {
    setUser(state: {user: any}, user: any) {
      state.user = user;
    }
  },
  actions: {
    setUser(context: ActionContext<any,any>, user: any) {
      context.commit('setUser', user)
    }
  }
}

// const moduleCompany = {
//   state: {
//     company: {} as ICompany
//   },
//   getters: {
//   },
//   mutations: {
//     setCompany(state: {company: ICompany}, company: ICompany) {
//       state.company = company;
//     }
//   },
//   actions: {
//     setCompany(context: ActionContext<any,any>, company: ICompany) {
//       context.commit('setCompany', company)
//     }
//   }
// }


export default createStore({
  modules: {
    auth: moduleAuth,
    user: moduleUser,
    // company: moduleCompany
  }
})
*/