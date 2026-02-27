/*
import axios from "axios";
import { setInterceptors } from '../../interceptors/_axios'

class ApiService {
  api: any;
  constructor() {
    const url = process.env.NODE_ENV === 'development' ? "http://" + window.location.hostname + ":3000/api" : "/api"
    //console.log("url", ((process.env.NODE_ENV || 'development') == 'development') ? url : (document.location.protocol + '//' + document.location.host.split(':')[0] + ":" + document.location.port + "/api"))
    const ax =  axios.create({
      timeout: 10000, // opcional      
    });
    ax.defaults.baseURL = url;
    ax.defaults.withCredentials = true;
    ax.defaults.headers.common['Content-Type'] = 'application/json';
    ax.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
    ax.defaults.headers.common['Access-Control-Allow-Credentials'] = true
    this.api = ax;
    setInterceptors(this, ax)
  }

  getBaseUrl() {
    return this.api.defaults.baseURL;
  }

  get(url: string, params = {}) {
    if (process.env.NODE_ENV === "development")
      console.log("GET", url)
    return this.api.get(url, { params });
  }

  post(url: string, data: any = {}, params: any = {}) {
    // TODO: Added params again, it was not working
    if (process.env.NODE_ENV === "development")
      console.log("POST", url)
    if (params)
      return this.api.post(url, data, params);
    return this.api.post(url, data);
  }

  put(url: string , data: any) {
    if (process.env.NODE_ENV === "development")
      console.log("PUT", url)
    return this.api.put(url, data);
  }

  delete(url: string) {
    if (process.env.NODE_ENV === "development")
      console.log("DELETE", url)
    return this.api.delete(url);
  }

  request(original: any) {
    return this.api.request(original)
  }

  interceptors() {
    return this.api.interceptors;
  }

}

// Export instance
export default new ApiService();

*/