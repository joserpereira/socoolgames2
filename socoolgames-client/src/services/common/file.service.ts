import { languages } from '@/locales';
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
      console.error("Error fetching files:", error);
      throw error;
    }    
  }

  deleteItem(id: string) {
    try {
        return axiosApi.delete(`${baseAPI}${id}`).then((response: any) => {
          return response;
        });
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  async downloadItem(id: string) {
    try {
      const response = await axiosApi.get(`${baseAPI}${id}/download`, { responseType: 'blob' } );

      // 👉 try to get original filename
      let filename = "file.pdf";
      const disposition = response.headers["content-disposition"];
      if (disposition) {
        const match = disposition.match(/filename\*?=(?:UTF-8'')?"?([^\\";]+)"?/i);
        if (match?.[1]) {
          filename = match?.[1]?.trim()
        }
      }

      // create blob and link
      const blob = new Blob([response.data], { type: "application/pdf" });

      // create link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();

      // cleanup
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

    } catch (err) {
      console.error("Error downloading file:", err);
    }
  }

  async submit(id, email, emailTemplate, language: string) {
    const response = await axiosApi.post(`${baseAPI}${id}/submit`, { email, emailTemplate, language } );
    return response.data;
  }
}
export default new FileService();