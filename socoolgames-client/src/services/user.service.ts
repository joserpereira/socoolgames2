
import api from '@/services/common/api';
import utilsService from './common/utils.service';

const baseAPI = 'users/';


class UserService {

  insertItem(item: any, type: string) {
    // console.log("insert item", baseAPI)
    return api.post(baseAPI, { item, "type": type });
    //, { headers: authHeader() } );
  }

  getUsers() {
    try {
        // console.log("get users", baseAPI, axiosApi)
        
        return api.get(baseAPI).then((response: any) => {
          // console.log("get users response:", response);
          return response;
        });
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }    
  }

  getStats() {
    return api.get(baseAPI + "count").then((response: any) => {
      return response;
    }).catch((error: any) => {
      throw error;
    });
  }
  
  validateData(errors: any, name: string, email: string, password: string, inviteCode: string) {     
      errors.name = errors.email = errors.pass = "";
      let result = true;
      if (name.trim() === "") {
          errors.name = "Please fill your name\r\n";
          result = false;
      }

      if (email.trim() === "") {
          errors.email = "Please fill your email\r\n";
          result = false;
      } else if (!utilsService.validateEmail(email)) {
          errors.email = "Please fill a valid email\r\n";
          result = false;
      }

      if (password.trim() === "") {
          errors.pass = "Please fill your password\r\n";
          result = false;
      }
      
      if (inviteCode.trim() === "") {
          errors.inviteCode = "Please fill your invite code\r\n";
          result = false;
      }
      return result;
    }
  getPublicContent() {
    return api.get('/users/test/all');
  }

  getUserBoard() {
    return api.get('/users/test/user');
  }

  getModeratorBoard() {
    return api.get('/users/test/mod');
  }

  getAdminBoard() {
    return api.get('/users/test/admin');
  }
}


export default new UserService();
