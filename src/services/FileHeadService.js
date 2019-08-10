import axios from "axios";
import {ApiRoutes, GET_GROUP_HEAD, GET_MAIN_HEAD, GET_SUB_HEAD} from "../config/ApiRoutes";
import moment from "moment";
import {ArrayToString, ErrorToString} from "../utils/ErrorUtil";

export class FileHeadService {

  async create(data, errorCallback, successCallback) {
    try {
      let res = await axios.post(ApiRoutes.CREATE_FILE_HEAD, data);
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages))
      } else {
        errorCallback(ErrorToString(res.data.messages))
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

  async getHead(errorCallback, successCallback) {
    try {
      const res = await  axios.get("file-index/group-heads");
      if (res.data.status) {
        const heads = res.data.data.group_heads;
        successCallback(heads);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }async getMain(group_id,errorCallback, successCallback) {
    try {
      const res = await  axios.get(`file-index/main-heads/${group_id}`);
      if (res.data.status) {
        const heads = res.data.data.main_heads;
        successCallback(heads);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }
async getAllMain(errorCallback, successCallback) {
    try {
      const res = await  axios.get(`file-index/main-heads`);
      if (res.data.status) {
        const heads = res.data.data.main_heads;
        successCallback(heads);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }

}