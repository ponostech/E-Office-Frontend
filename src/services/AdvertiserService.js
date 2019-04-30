import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ErrorToString } from "../utils/ErrorUtil";
import React from "react";

export class AdvertiserService {

  async create(state, errorCallback, successCallback) {
    let data = {
      name: state.name,
      type: state.type.value,
      phone_no: state.phone,
      email: state.email,
      password: state.password,
      address: state.address,
      registered: 1,
      signature: state.signature.path,
      documents: state.documentsUpload
    };

    try {
      let res = await axios.post(ApiRoutes.CREATE_ADVERTISER, data);
      if (res.data.status) {
        let msgs = [];
        res.data.messages.forEach(function(msg) {
          let temp = <p>{`${msg}.`}</p>;
          msgs.push(temp);
        });
        successCallback(msgs);
      } else {
        errorCallback(ErrorToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

  async fetch(status) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    let advertisers = [];
    let kiosks = null;
    try {
      if (status) {
        const res = await axios.get(ApiRoutes.STAFF_ADVERTISER, {
          params: {
            status
          }
        }, config);
        kiosks = res.data.data.kiosk_applications;
      } else {
        const defRes = await axios.get(ApiRoutes.STAFF_ADVERTISER, config);
        kiosks = defRes.data.data.kiosk_applications;
      }
      console.log(kiosks);
      return kiosks;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
