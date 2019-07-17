import { ApiRoutes } from "../config/ApiRoutes";
import axios from "axios";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";

class ApplicationService {

  async sendBack(data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.SEND_BACK_APPLICATION,data)
      if (res.data.status) {
          successCallback(res.data.messages)
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
  async sendMessage(data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.SEND_MESSAGE,data)
      if (res.data.status) {
          successCallback(res.data.messages)
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
  async getDraft(id,params,errorCallback,successCallback){
    try{
      let res=await axios.get(`drafts/${id}`,{params})
      if (res.data.status) {
          successCallback(res.data.data.draft)
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
  async imposeFine(data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.IMPOSE_FINE,data)
      if (res.data.status) {
          successCallback(res.data.messages)
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

}

export default ApplicationService