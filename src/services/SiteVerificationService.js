import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";
import React from "react";

export class SiteVerificationService {

  async createTemplate(type,data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.CREATE_SITE_VERIFICATION_TEMPLATE,{type,data});
      console.log(res)
      if (res.data.status) {
          successCallback(ArrayToString(res.data.messages))
      }else{
        errorCallback(ArrayToString(res.data.messages))
      }
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

  async fetch(type,data,template,errorCallback,successCallback){
    try{
       let res=await axios.post(ApiRoutes.CREATE_HOARDING_VERIFICATION)
    }catch (error) {
      console.error(error);
      errorCallback(errorCallback.toString())
    }
  }

  async getTemplate(module,errorCallback,successCallback) {

    try {
        const res = await axios.get(ApiRoutes.GET_SITE_VERIFICATION_TEMPLATE(module));
      if (res.data.status) {
        console.log(res.data.data.template.data)
        successCallback(res.data.data.template.data)
      }else {
        errorCallback(ArrayToString(res.data.messages))
      }

    } catch (error) {
      console.error(error);
      errorCallback(error.toString())
    }
  }

  async createSiteVerification(url, formData,template,errorCallback,successCallback) {
    try {
      const res = await axios.post(url,{
        data:formData,
        template,
        draft:0
      });
      if (res.data.status) {
        console.log(res)
        successCallback(ArrayToString(res.data.messages))
      }else {
        errorCallback(ArrayToString(res.data.messages))
      }

    } catch (error) {
      console.error(error);
      errorCallback(error.toString())
    }
  }
}
