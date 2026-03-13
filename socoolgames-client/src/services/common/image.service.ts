import axiosApi from './api';

const baseAPI = 'images/';

class ImageService {

  getItems(skip: number, limit: number, search: string) {
    try {
        let url = baseAPI + `?__skip=${skip}&__limit=${limit}`;
        if (search?.length > 0) 
          url += `&__search=${search}`;
        return axiosApi.get(url).then((response: any) => {          
          return response;
        });
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }    
  }
  getImageInfo(path: string) {
    try {
        return axiosApi.get(baseAPI + `info/${encodeURIComponent(path)}`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error fetching image info:", error);
      throw error;
    }    
  }
  
  resize(path: string, width: number, height: number) {
    try {
        return axiosApi.post(baseAPI + `resize/${encodeURIComponent(path)}/${width}/${height}`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error fetching image info:", error);
      throw error;
    }    
  }
  
}

export default new ImageService();