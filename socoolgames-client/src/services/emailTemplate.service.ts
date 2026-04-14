import axiosApi from './common/api';

const baseAPI = 'email-templates/';

class EmailTemplateService {
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
      console.error("Error fetching emails:", error);
      throw error;
    }
  }

  getItem(id: string) {
    return axiosApi.get(baseAPI + id + '/');
  }
  
  insertItem(item: any /*, type */) {
    return axiosApi.post(baseAPI, { item });
  }

  updateItem(id: string, item: any) {
    try {
      return axiosApi.put(baseAPI + id + '/', { item }).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error update configuration:", error);
      throw error;
    }
  }

  deleteItem(id: string) {
    try {
        return axiosApi.delete(`${baseAPI}${id}/`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error deleting configuration:", error);
      throw error;
    }
  }

}

export default new EmailTemplateService();