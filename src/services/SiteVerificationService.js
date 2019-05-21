import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ErrorToString } from "../utils/ErrorUtil";
import React from "react";

export class SiteVerificationService {

  async fetch(status,errorCallback,successCallback) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    try {
        const res = await axios.get(ApiRoutes.STAFF_BANNER + `?status=${status}`, config);
      if (res.status) {
        successCallback(res.data.data)
      }else {
        errorCallback("error")
      }

    } catch (error) {
      console.error(error);
      errorCallback(error.toString())
    }
  }

}
