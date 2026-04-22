import axiosApi from './common/api';
import utilsService from './common/utils.service';
const baseAPI = 'contactus/';

class ContactUsService {

  insertItem(item: any, type: string) {
    return axiosApi.post(baseAPI, { item, "type": type });
  }

  validData(item: any) {
    let result = "";
    if (!item.email) {
      result = "Please fill email. ";
    } else if (!utilsService.validateEmail(item.email)) {
      result = "Please enter a valid Email. ";
    }
    
    if (!item.message) {
      result += "Enter a small message.";
    }
    
    return result;
  }


}

export default new ContactUsService();