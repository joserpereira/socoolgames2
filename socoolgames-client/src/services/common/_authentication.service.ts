
// import axios from 'axios';
// import axiosAPI from '@/services/common/_api';
// import store from '@/store/_index';
// import ipInfo from '@/services/common/ipInfo.service';
// // login
// export const login = async (email: string, password: string): Promise<any> => {
//     const ip = await ipInfo.ipInfo();
//     const data = { email, password, ipInfo: ip }
//     try {
//         const response = await axiosAPI.post('/auth/login', data, {withCredentials: true});
//         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//         await store.dispatch("setAuth", true);
//         await store.dispatch("setUser", response.data.user);

//         return {auth: true, user: response.data.user};
//     } catch (error: any) {
//         await store.dispatch("setAuth", false);
//         await store.dispatch("setUser", null);
//         const message = error.response?.data?.data?.message
        
//         return {auth: false, user: null, data: { message } };
//     }
// }

// export const recoverpass = async (email: string): Promise<any> => {
//     const data = { email }
//     try {
//         const response = await axiosAPI.post('/auth/recover-pass', data);
//         console.debug("recover pass", response)
//         return {result: response.data.error === 0};
//     } catch (error) {        
//         return {result: false};
//     }
// }

// export const resetpass = async (email: string, activation: string, password: string): Promise<any> => {
//     const data = { email, activation, password }
//     try {
//         const result = await axiosAPI.post('/auth/reset-pass', data);
//         return {result: result.data ? result.data.error === 0 : result.response.data.error === 0, message: result.data ? result.data.message : result.response.data.message};
//     } catch (error) {        
//         return {result: false};
//     }
// }
// // logout
// export const logout = async () => {
//   try {
//     await axiosAPI.get('/auth/logout');
//     axios.defaults.headers.common['Authorization'] = ``;
//     await store.dispatch("setAuth", false);
//     await store.dispatch("setUser", null);
//     //await store.dispatch("setCompany", null);
//   } catch (error) {
//     console.error('Error during logout:', error);
//   }
// };

// // authentication initialization
// export const initAuthentication = async (): Promise<any> => {
//       try {
//         const {data} = await axiosAPI.get('/auth/user');
//         if (data?.user) {
//           await store.dispatch("setAuth", true);
//           await store.dispatch("setUser", data.user);
//           return {auth: true, user: data.user};
//         }
//         return {auth: false, user: null};
//       } catch (error) {
//         console.debug('An problem occurred during the authentication process:', error);
//         await store.dispatch("setAuth", false);
//         await store.dispatch("setUser", null);
//         //await store.dispatch("setCompany", null);

//         return {auth: false, user: null};
//       }
// }

