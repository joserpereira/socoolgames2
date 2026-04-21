
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
  
  getItems(collectionName: string, skip: number, limit: number, search: string) {
    try {
        let url = `${collectionName}/?__skip=${skip}&__limit=${limit}`;
        if (search?.length > 0) 
          url += `&__search=${search}`;
        console.log(url)
        return api.get(url).then((response: any) => {
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
