import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";
import axios from "axios";

export default class RateService{

  async create(data, errorCallback, successCallback) {
    try{
      let res=await axios.post(ApiRoutes.CREATE_RATE,data)
      if (res.data.status) {
          successCallback(res.data.messages)
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages))
        }
      }

    }catch (e) {
      console.error(e)
       errorCallback(e.toString())
    }

  }
}