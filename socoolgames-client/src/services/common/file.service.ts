import axiosApi from './api';

const baseAPI = 'files/';

class FileService {

  getItems(skip: number, limit: number, search: string) {
    try {
        let url = baseAPI + `?__skip=${skip}&__limit=${limit}`;
        if (search?.length > 0) 
          url += `&__search=${search}`;
        return axiosApi.get(url).then((response: any) => {          
          return response;
        });
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }    
  }

  deleteItem(id: string) {
    try {
        return axiosApi.delete(`${baseAPI}${id}`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }

  
}

export default new FileService();