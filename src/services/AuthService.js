import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export default class AuthService {

  async getUser(id){

  }

  async login(email, password) {
    return await axios.post(ApiRoutes.LOGIN_ROUTE,{email,password});
  }

};