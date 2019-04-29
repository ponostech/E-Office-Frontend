import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

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
        errorCallback("Something went wrong: Please try again later");
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }

}
