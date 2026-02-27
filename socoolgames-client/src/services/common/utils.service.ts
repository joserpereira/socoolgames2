//var API_URL = baseAPI // + ':4431/';

import axiosApi from '@/services/common/api';
const UtilsService = {

  forceFileDownload: function(response: any, title: string) {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', title)
    document.body.appendChild(link)
    link.click()
  },

  downloadWithAxios: function(url: string, title: string) {
    axiosApi.get(url, { responseType: 'arraybuffer' })
      .then((response: any) => {
        this.forceFileDownload(response, title)
      })
      .catch((error: any) => console.log('error occured axios download. ' + error.message))
  },

  camelCaseToString: function(text: string) {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  },

  validateEmail: function(input: string) {
    const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return (input !== undefined && input.match(validRegex));  
  }
  

}

export default UtilsService;