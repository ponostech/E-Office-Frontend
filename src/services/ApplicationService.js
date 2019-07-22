import { ApiRoutes, FILE_DRAFT_LIST } from "../config/ApiRoutes";
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

  async getFileDrafts(file_id,type,errorCallback,successCallback){
    try{
       let res=await axios.get(FILE_DRAFT_LIST(file_id, type));
      if (res.data.status) {
         successCallback(res.data.data.drafts)
      }else{
        errorCallback(res.data.messages)
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
  async approve(application_id,data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.APPROVE_APPLICATION(application_id),data)
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
  async reject(application_id,data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.REJECT_APPLICATION(application_id),data)
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
  async cancel(application_id,data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.CANCEL_APPLICATION(application_id),data)
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