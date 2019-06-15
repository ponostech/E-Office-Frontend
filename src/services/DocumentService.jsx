import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString } from "../utils/ErrorUtil";

export class DocumentService {

  async get(path) {
    let res = await axios.get(ApiRoutes.DOCUMENTS + "/" + path);
    return res.data;
  }

  async fetch(path, errorCallback, successCallback) {
    try {
      const res = await axios.get(ApiRoutes.DOCUMENTS + "/" + path);
      if (res.data.status) {
        const docs = res.data.data.documents;
        successCallback(docs);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }

}
