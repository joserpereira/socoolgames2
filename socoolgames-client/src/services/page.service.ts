
import api from '@/services/common/api';

const baseAPI = 'pages/';


class PageService {

  insertItem(item: any, type: string) {
    return api.post(baseAPI, { item, "type": type });
  }

  updateItem(id: string, item: any, type: string) {
    return api.put(`${baseAPI}${id}`, { item, "type": type });
  }

  getItems() {
    try {
        return api.get(baseAPI).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }    
  }

  getItem(id) {
    try {
        return api.get(`${baseAPI}${id}`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }    
  }

  getItemByNameRef(nameRef) {
    try {
        return api.get(`${baseAPI}nameref/${nameRef}`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }    
  }

  getStats() {
    return api.get(baseAPI + "count").then((response: any) => {
      return response;
    }).catch((error: any) => {
      throw error;
    });
  }
  
}


export default new PageService();
