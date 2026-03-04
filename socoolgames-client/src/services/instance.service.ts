
import api from '@/services/common/api';

class InstanceService {

  insertItem(collectionName: string, item: any, type: string) {
    return api.post(`${collectionName}/`, { item, "type": type });
  }

  updateItem(collectionName: string, id: string, item: any, type: string) {
    return api.put(`${collectionName}/${id}`, { item, "type": type });
  }

  deleteItem(collectionName: string, id: string) {
    return api.delete(`${collectionName}/${id}`);
  }
  
  getItems(collectionName: string) {
    try {
        return api.get(`${collectionName}/`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }    
  }

  getStats(collectionName: string) {
    return api.get(`${collectionName}/count`).then((response: any) => {
      return response;
    }).catch((error: any) => {
      throw error;
    });
  }
  
}

export default new InstanceService();
