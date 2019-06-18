import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString } from "../utils/ErrorUtil";

export class LicenseService {
  async checkShopLicense(phone_no, errorCallback, successCallback) {
    try {
      let res = await axios.get(ApiRoutes.STAFF_SHOP);
      if (res.data.status) {
        successCallback(res.data.data.shops);
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
      let res = await axios.get(ApiRoutes.CHECK_LICENSE);
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
      let res = await axios.get(ApiRoutes.STAFF_BANNER);
      if (res.data.status) {
        successCallback(res.data.data.banners);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

}