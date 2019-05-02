import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class LoginService {
  static checkRole(roleName) {
    let userData=localStorage.getItem("current_user");
    let user=JSON.parse(userData)
    let found=false;
    if (!user) {
       return found
    }else{
       const roles=user.roles;
       roles.forEach(function(role, index) {
         if (role.slug === roleName || role.name === roleName) {
           found= true
         }
       })
      return found
    }
  }
  static  getCurrentUser() {
    let userData=localStorage.getItem("current_user");
    return JSON.parse(userData)
  }

  async logout(errorCallback, successCallback) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    try {
      let res = await axios.post(ApiRoutes.LOGOUT_ROUTE, {}, config);
      if (res.data.status) {
        localStorage.clear()
        successCallback("Log out");
      } else {
        errorCallback("Something went wrong: Please try again later");
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

  async login(credential,errorCallback, successCallback) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    try {
      let res = await axios.post(ApiRoutes.LOGOUT_ROUTE, credential);
      if (res.data.status) {
        localStorage.clear()
        successCallback("Log out");
      } else {
        errorCallback("Something went wrong: Please try again later");
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

}