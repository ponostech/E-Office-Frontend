import { ApiRoutes, FILE_DRAFT_LIST } from "../config/ApiRoutes";
import axios from "axios";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";

class MessageService {


  async sendMessage(phone_no,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.SEND_MESSAGE,{phone_no})
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

  async all(file_id,errorCallback,successCallback){
    try{
       let res=await axios.get(FILE_DRAFT_LIST(file_id));
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
  async getSent(phone_no,errorCallback,successCallback){
    try{
      // let res=await axios.get(FILE_DRAFT_LIST(phone_no));
      // if (res.data.status) {
      //   successCallback(res.data.data.drafts)
      // }else{
      //   errorCallback(res.data.messages)
      // }
        successCallback([
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
          {id:1,to:"9898787878",message:"test",created_at:new Date()},
        ])
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }


}

export default MessageService