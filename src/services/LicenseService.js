import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString } from "../utils/ErrorUtil";

export class LicenseService {
  async checkShopLicense(phone_no, errorCallback, successCallback) {
    try {
      let res = await axios.get(ApiRoutes.WARDS);
      if (res.data.status) {
        successCallback(res.data.data);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }
  async checkHotelLicense(phone_no, errorCallback, successCallback) {
    try {
      let res = await axios.get(ApiRoutes.WARDS);
      if (res.data.status) {
        successCallback(res.data.data);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }
  async checkBanner(phone_no, errorCallback, successCallback) {
    try {
      let res = await axios.get(ApiRoutes.WARDS);
      if (res.data.status) {
        successCallback(res.data.data);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

}