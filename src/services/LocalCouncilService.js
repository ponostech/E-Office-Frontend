import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class LocalCouncilService {
  async all(errorCallback, successCallback) {
    try {

      let res = axios.get(ApiRoutes.LOCAL_COUNCIL);
      console.log(res);
    } catch (e) {
      errorCallback(e.toString());
    }
  }

  async fetch(errorCallback, successCallback) {
    let newLocalCouncils = [];
    try {
      let res = await axios.get(ApiRoutes.LOCAL_COUNCIL);
      if (res.data.status) {
        res.data.data.local_councils.forEach(function(item) {
          let lc = {
            value: item.id,
            label: item.name
          };
          newLocalCouncils.push(lc);
        });
        successCallback(newLocalCouncils);
      } else {
        errorCallback("Something went wrong: please try again later");
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }

  async get() {
    try {
      let res = await axios.get(ApiRoutes.LOCAL_COUNCIL);
      return res.data;
    } catch (e) {
      console.error("LocalCouncil request err ", e);
    }
  }

}