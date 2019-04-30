import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ErrorToString } from "../utils/ErrorUtil";

export default class AuthService {


  async login(email, password,errorCallback,successCallback) {
    try{
      let res=await axios.post(ApiRoutes.LOGIN_ROUTE,{email,password});
      if (res.data.status) {
        successCallback(res)
      }else{
        errorCallback(res.data.messages);
      }
    }catch (e) {
      console.error(e)
      errorCallback("Something went wrong: Please try again later")
    }
  }

};