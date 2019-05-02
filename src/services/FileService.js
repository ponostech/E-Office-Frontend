import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
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
}