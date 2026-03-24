import axiosApi from './common/api';
//import authHeader from './auth-header';

const baseAPI = 'email-subscriptions/';

class EmailSubscriptionService {
  getItems() {
    return axiosApi.get(baseAPI);
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
    return axiosApi.put(baseAPI + id + '/', { item } /*, { headers: authHeader() }*/);
  }

  deleteItem(id: string) {
    return axiosApi.delete(baseAPI + id + '/' /* , { headers: authHeader() }*/ );
  }

  unsubscribe(email) {
    const emailSubscription = this.getItemByEmail(email) as any;
    
    emailSubscription.isActive = false;
    emailSubscription.unsubscriptionDate = Date.UTC.toString()
    return axiosApi.put(baseAPI + emailSubscription._id + '/', { emailSubscription } /*, { headers: authHeader() } */ );
  }
}

export default new EmailSubscriptionService();