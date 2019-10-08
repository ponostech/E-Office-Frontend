import axios from "axios";
import React from "react";
import { ApiRoutes } from "../config/ApiRoutes";
import moment from "moment";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";

const DATE_FORMAT = "YYY-MM-DD";
export class ShopService {

  async create(state, errorCallback, successCallback) {
    let data = {
      application_type: "New Application",
      name: state.shopName,
      phone: state.phone,
      type: state.type.value,
      email: state.email,
      owner: state.name,
      address: state.address,
      owner_address: state.ownerAddress,
      details: state.businessDetail,
      local_council_id: state.localCouncil.value,
      trade_id: state.tradeName.value,
      latitude: state.latitude,
      longitude: state.longitude,
      estd: moment(state.estd).format(DATE_FORMAT),
      tin_no: state.tinNo,
      cst_no: state.cstNo,
      gst_no: state.gstNo,
      pan_no: state.panNo,
      premise_type: state.premised,
      display_type: state.displayType,
      passport: state.passport.path,
      documents: state.uploadDocuments,
      addl_documents: state.additionalDocuments
    };
    try {
      let res = await axios.post(ApiRoutes.CREATE_SHOP_LICENSE, data);
      if (res.data.status) {
        if (res.data.data.challan)
          successCallback(res.data.data.challan, ArrayToString(res.data.messages));
        else
          successCallback(false, ArrayToString(res.data.messages));
      } else {
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages));
        }
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

  async resubmit(state, errorCallback, successCallback) {
    let data = {
      name: state.shopName,
      phone: state.phone,
      type: state.type.value,
      email: state.email,
      owner: state.name,
      address: state.address,
      owner_address: state.ownerAddress,
      details: state.businessDetail,
      local_council_id: state.localCouncil.value,
      trade_id: state.tradeName.value,
      latitude: state.latitude,
      longitude: state.longitude,
      estd: moment(state.estd).format(DATE_FORMAT),
      tin_no: state.tinNo,
      cst_no: state.cstNo,
      gst_no: state.gstNo,
      pan_no: state.panNo,
      premise_type: state.premised,
      display_type: state.displayType,
      passport: state.passport.location,
      documents: state.uploadDocuments,
      addl_documents: state.additionalDocuments

    };
    try {
      let res = await axios.post(ApiRoutes.UPDATE_SHOP_LICENSE(state.id), data);
      if (res.data.status) {
        if (res.data.data.challan)
          successCallback(res.data.data.challan, ArrayToString(res.data.messages));
        else
          successCallback(false, ArrayToString(res.data.messages));
      } else {
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages));
        }
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

  async renew(state, errorCallback, successCallback) {
    let data = {
      name: state.shopName,
      phone: state.phone,
      type: state.type.value,
      email: state.email,
      owner: state.name,
      address: state.address,
      owner_address: state.ownerAddress,
      details: state.businessDetail,
      local_council_id: state.localCouncil.value,
      trade_id: state.tradeName.value,
      latitude: state.latitude,
      longitude: state.longitude,
      estd: moment(state.estd).format(DATE_FORMAT),
      tin_no: state.tinNo,
      cst_no: state.cstNo,
      gst_no: state.gstNo,
      pan_no: state.panNo,
      premise_type: state.premised,
      display_type: state.displayType,
      passport: state.passport.location,
      documents: state.uploadDocuments
    };
    try {
      let res = await axios.post(ApiRoutes.RENEW_SHOP(state.id), data);
      if (res.data.status) {
        if (res.data.data.challan)
          successCallback(res.data.data.challan, ArrayToString(res.data.messages));
        else
          successCallback(false, ArrayToString(res.data.messages));
      } else {
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages));
        }
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }


  async fetch(status) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    let hoardings = [];
    try {
      if (status) {
        const res = await axios.get(ApiRoutes.STAFF_SHOP + `?status=${status}`, config);
        console.log(res);
        hoardings = res.data.data.shops;
      } else {
        const defRes = await axios.get(ApiRoutes.STAFF_SHOP, config);
        hoardings = defRes.data.data.shops;
      }
      return hoardings;

    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async changeField(application_id, data, errorCallback, successCalback) {
    try {
      const res = await axios.post(ApiRoutes.UPDATE_SHOP_LICENSE(application_id), data);
      if (res.data.status) {
        successCalback(res.data.messages);
      } else {
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages));
        }
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

  async get(id, errorCallback, successCallback) {
    try {
      const res = await axios.get(ApiRoutes.GET_SHOP(id));
      if (res.data.status) {
        successCallback(res.data.data.shop);
      } else {
        errorCallback(res.data.messages);
      }
    } catch (error) {
      console.error(error);
      errorCallback(errorCallback.toString());
    }
  }

}
