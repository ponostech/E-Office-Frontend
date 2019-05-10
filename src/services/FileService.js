import axios from "axios";
import { ApiRoutes, FILE_TAKE } from "../config/ApiRoutes";
import { FILE_SEND } from "../config/routes-constant/OfficeRoutes";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";


export class FileService {
  async get(id) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    const data = { id: id };
    let res = await axios.get(ApiRoutes.FILE_DETAIL, data, config);
    return res.data.data;
  }

  async fetch(status,errorCallback,successCallback){
    let config = {
      params: {status}
    };
    let files=[]
    try{
     let res =await axios.get(ApiRoutes.FILE, config)
      if (res.data.status) {
        successCallback(res.data.data.files)
      }else{
        errorCallback(ArrayToString(res.data.messages))
      }
    }catch (e) {
      errorCallback(e.toString())
      console.error(e)
    }

  }
  async sendFile(file_id, recipient_id, errorCallback, successCallback) {

    try {
      let res = await axios.post(FILE_SEND(file_id), { recipient_id });
      console.log(res)
      if (res.data.status) {
        successCallback("File has been moved");
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }

  }
  async takeFile(file_id, errorCallback, successCallback) {

    try {
      let res = await axios.post(FILE_TAKE(file_id) );
      if (res.data.status) {
        successCallback("You have taken the file");
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }

  }
}