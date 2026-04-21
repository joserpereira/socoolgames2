import axiosApi from './common/api';
//import authHeader from './auth-header';

const baseAPI = 'email-subscriptions/';

class EmailSubscriptionService {
  getItems(skip: number, limit: number, search: string) {
    try {
      let url = baseAPI + `?__skip=${skip}&__limit=${limit}`;
      if (search?.length > 0) 
        url += `&__search=${search}`;
      return axiosApi.get(url).then((response: any) => {          
            return response;
        });
    }
    catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  }

  getItem(id: string) {
    return axiosApi.get(baseAPI + id + '/' /*, { headers: authHeader() } */ );
  }

  getItemByEmail(email: string) {
    return axiosApi.get(baseAPI+"?email=" + email);
  }
  
  insertItem(item: any /*, type */) {
    return axiosApi.post(baseAPI, { item } /*, "type": type }, { headers: authHeader() }*/ );
  }

  updateItem(id: string, item: any) {
    try {
      return axiosApi.put(baseAPI + id + '/', { item } /*, { headers: authHeader() }*/).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error update subscription:", error);
      throw error;
    }
  }

  deleteItem(id: string) {
    try {
        return axiosApi.delete(`${baseAPI}${id}/`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error deleting subscription:", error);
      throw error;
    }
  }

  unsubscribe(email) {
    const emailSubscription = this.getItemByEmail(email) as any;
    
    emailSubscription.isActive = false;
    emailSubscription.unsubscriptionDate = Date.UTC.toString()
    return axiosApi.put(baseAPI + emailSubscription._id + '/', { emailSubscription } /*, { headers: authHeader() } */ );
  }

  getStats() {
    return axiosApi.get(baseAPI + "count").then((response: any) => {
      return response;
    }).catch((error: any) => {
      throw error;
    });
  }
  
}

export default new EmailSubscriptionService();