
import api from '@/services/common/api';

const baseAPI = 'articles/';


class ArticleService {

  insertItem(item: any, type: string) {
    return api.post(baseAPI, { item, "type": type });
  }

  updateItem(id: string, item: any, type: string) {
    return api.put(`${baseAPI}${id}`, { item, "type": type });
  }

  getItems(limit = 10, active = false) {
    try {
      let url = baseAPI+`?__limit=${limit}`;
      if (active) {
        url += `&active=${active}`;
      }
      return api.get(url).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }    
  }

  getItem(id: any) {
    try {
        return api.get(`${baseAPI}${id}`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }    
  }

  getItemByNameRef(nameRef: any) {
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


export default new ArticleService();
