import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ErrorToString } from "../utils/ErrorUtil";
import React from "react";

export class BannerService {

  async create(state, errorCallback, successCallback) {
    let data = {
      name: state.name,
      applicant_type: state.type.value,
      phone: state.phone,
      local_council_id: state.localCouncil.value,
      advertisement_type: state.displayType.value,
      advertisements: state.bannerDetails,
      advertisement_count: state.bannerDetails.length,
      address: state.address,
      details: state.details,
      status: "new",
      signature: state.signature.path,
      documents: state.uploadDocuments
    };
    try {
      let res = await axios.post(ApiRoutes.CREATE_BANNER, data);
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
      console.error("Error " + e);
      errorCallback(e.toString());
    }
  }

  async fetch(status) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    let banners = [];
    try {
      if (status) {
        const res = await axios.get(ApiRoutes.STAFF_BANNER + `?status=${status}`, config);
        banners = res.data.data.banners;
      } else {
        const defRes = await axios.get(ApiRoutes.STAFF_BANNER, config);
        banners = defRes.data.data.banners;
      }
      return banners;

    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

}
