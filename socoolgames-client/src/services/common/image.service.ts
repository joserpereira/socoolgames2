import axiosApi from './api';

const baseAPI = 'images/';

class ImageService {

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