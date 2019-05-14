import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";


export class NotesheetService {

  async create(note, errorCallback, successCallback) {
    try {
      let res = await axios.post(ApiRoutes.NOTESHEET, note);
      if (res.data.status) {
        successCallback("New note is created");
      } else {
        errorCallback(ErrorToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }

  }

}