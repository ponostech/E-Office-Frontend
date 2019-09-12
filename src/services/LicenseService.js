import axios from "axios";
import {ApiRoutes} from "../config/ApiRoutes";
import {ArrayToString} from "../utils/ErrorUtil";

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

  async cancelShopLicense(id, errorCallback, successCallback) {
    try {
      let res = await axios.post("")
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages))
      } else {
        errorCallback(ArrayToString(res.data.messages))
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString())
    }
  }

  async getApplications(phone, errorCallback, successCallback) {
    try {
      let res = await axios.get(`/user/${phone}/applications`)
      if (res.data.status) {
        successCallback(res.data.data)
      } else {
        errorCallback(ArrayToString(res.data.messages))
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString())
    }
  }

  async getLicenses(phone, errorCallback, successCallback) {
    try {
      let shops = [];
      let banners = [];
      let hotels = [];
      let res = await axios.get(ApiRoutes.USER_PERMIT_LIST(phone))
      if (res.data.status) {

        if (`App\\Shop` in res.data.data.permits)
          shops = res.data.data.permits["App\\Shop"]
        if (`App\\Hotel` in res.data.data.permits)
          hotels = res.data.data.permits["App\\Hotel"]
        if (`"App\\Banner"` in res.data.data.permits)
          banners = res.data.data.permits["App\\Banner"]
        successCallback(shops, hotels, banners)
      } else {
        errorCallback(ArrayToString(res.data.messages))
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

  async getRenewablePermitList(phone, errorCallback, successCallback) {
    try {
      let res = await axios.get(ApiRoutes.USER_PERMIT_RENEWABLE_LIST(phone))
      if (res.data.status)
        successCallback(res.data.data.renewable_permits)
      else
        errorCallback(res.data.message)
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
}