/*
export const setInterceptors = (api: any, ax: any) => {
  let refresh = false
  ax.interceptors.response.use(
    (response: any) => {
      // Handle successful responses
      return response;
    },
    async (error: any) => {
      // Handle errors
      if (error.response && error.response.status === 401 && !refresh) {
          refresh = true;
          try
          {
            const response = await api.get('auth/refresh', {}, { withCredentials: true })
              .catch((errorRefresh) => {
                  return Promise.reject(errorRefresh);  
              })
            if (response?.status === 200) {  
                ax.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                return ax(error.config);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
      }
      refresh = false;
      if ((error.response?.status === 400 || error.response?.status === 401) && 
          (window.location.href.indexOf("/admin/sign") === -1) &&
          (window.location.href.indexOf("/admin/") !== -1)) {
        // handle error: inform user, go to login, etc
        window.location.href = '/admin/signin';        
      } 
      else {
        return Promise.reject(error);
      }
    }
  );
}
*/