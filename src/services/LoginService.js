import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class LoginService {
  static async getCurrentUser() {
    let userData=await localStorage.getItem("current_user");
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