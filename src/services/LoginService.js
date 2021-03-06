import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
// import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";

export class LoginService {
  static token = localStorage.getItem("access_token");
  static user = JSON.parse(localStorage.getItem("current_user"));
  static isGuest() {
    return !this.user;
  }
  static isLogin() {
    return this.token != null;
  }
  static isStaff() {
    return this.user && this.user.staff;
  }
  static isAdvertiser() {
    return this.user && this.user.advertiser;
  }
  static getRole() {
    return this.isLogin() ? this.user.roles[0].slug : "guest";
  }
  static hasRole(roleName) {
    let userData = localStorage.getItem("current_user");
    let user = JSON.parse(userData);
    let found = false;
    if (!user) {
      return found;
    } else {
      const roles = user.roles;
      roles.forEach(function(role, index) {
        if (role.slug === roleName || role.name === roleName) {
          found = true;
        }
      });
      return found;
    }
  }
  static getCurrentUser() {
    let userData = localStorage.getItem("current_user");
    return JSON.parse(userData);
  }

  async logout(errorCallback, successCallback) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      let res = await axios.post(ApiRoutes.LOGOUT_ROUTE, {}, config);
      if (res.data.status) {
        localStorage.clear();
        successCallback("Log out");
      } else {
        errorCallback("Something went wrong: Please try again later");
      }
    } catch (e) {
      localStorage.clear();
      window.location.replace(ApiRoutes.LOGIN_ROUTE);
      console.error(e);
      errorCallback(e.toString());
    }
  }

  async login(credential, errorCallback, successCallback) {
    // const token = localStorage.getItem("access_token");
    // const config = { headers: { "Authorization": `Bearer ${token}` } };
    try {
      let res = await axios.post(ApiRoutes.LOGIN_ROUTE, credential);
      console.log("login request result", res);
      const { access_token } = res.data;
      if (res.data.status) {
        localStorage.clear();
        localStorage.setItem("access_token", access_token);
        localStorage.setItem(
          "current_user",
          JSON.stringify(res.data.data.user)
        );
        successCallback(res);
      } else {
        errorCallback(res.data.messages);
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

  forgotPassword(email, errorCallback, successCallback) {
    setTimeout(function(handler) {
      successCallback("scuk");
    }, 3000);
  }
}
