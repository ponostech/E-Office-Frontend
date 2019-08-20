import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";
import React from "react";

export class SiteVerificationService {

  async createTemplate(type,data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.CREATE_SITE_VERIFICATION_TEMPLATE,{type,data});
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
  async editTemplate(id,data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.EDIT_SITE_VERIFICATION_TEMPLATE(id),data);
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
  //
  // async fetch(type,data,template,errorCallback,successCallback){
  //   try{
  //      let res=await axios.post(ApiRoutes.CREATE_HOARDING_VERIFICATION)
  //   }catch (error) {
  //     console.error(error);
  //     errorCallback(errorCallback.toString())
  //   }
  // }

  async getTemplate(module,errorCallback,successCallback) {

    try {
        const res = await axios.get(ApiRoutes.GET_SITE_VERIFICATION_TEMPLATE(module));
      if (res.data.status) {
        successCallback(res.data.data.template)
      }else {
        errorCallback(ArrayToString(res.data.messages))
      }

    } catch (error) {
      console.error(error);
      errorCallback(error.toString())
    }
  }
  async getVerification(id,errorCallback,successCallback) {

    try {
        const res = await axios.get(ApiRoutes.GET_SITE_VERIFICATION(id));
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
  async getSiteVerifications(id,type,errorCallback,successCallback) {

    try {
        const res = await axios.get(ApiRoutes.GET_SITE_VERIFICATION(id),{params:{type}});
      if (res.data.status) {
        console.log(res.data)
        successCallback(res.data.data.verifications)
      }else {
        errorCallback(ArrayToString(res.data.messages))
      }

    } catch (error) {
      console.error(error);
      errorCallback(error.toString())
    }
  }
  async all(url,errorCallback,successCallback){
    try{
      let res=await axios.get(url);
      if (res.data.status) {
        // let verificationData =[]
        // res.data.data.verifications.forEach(function(item, index) {
        //   verificationData.push(item.data)
        // });
          successCallback(res.data.data.verifications)
      }else{
        errorCallback(ArrayToString(res.data.messages))
      }
    }catch (e) {
      console.error(e);
      errorCallback(e.toString())
    }
  }

  async updateSiteVerification(url, data,template,errorCallback,successCallback) {
    try {
      const res = await axios.post(url,{
        data,
        template,
        draft:0
      });
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages))
      }else {
        errorCallback(ArrayToString(res.data.messages))
      }

    } catch (error) {
      console.error(error);
      errorCallback(error.toString())
    }
  }
  async createSiteVerification(url,type, data,template,errorCallback,successCallback) {
    try {
      const res = await axios.post(url,{
        data,
        type,
        template,
        draft:0
      });
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages))
      }else {
        errorCallback(ArrayToString(res.data.messages))
      }

    } catch (error) {
      console.error(error);
      errorCallback(error.toString())
    }
  }

  async allTemplate(errorCallback, successCallback) {
    try{
      let res=await axios.get(ApiRoutes.GET_ALL_SITE_VERIFICATION_TEMPLATE)
      if (res.data.status) {
        successCallback(res.data.data.templates)
      }else{
        errorCallback(ArrayToString(res.data.messages))
      }
    }catch (e) {
      console.error(e);
      errorCallback(e.toString)
    }
  }
  async delete(data,errorCallback, successCallback) {
    try{
      let res=await axios.get(ApiRoutes.DELETE_SITE_VERIFICATION+'/id');
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages))
      }else{
        errorCallback(ArrayToString(res.data.messages))
      }
    }catch (e) {
      console.error(e);
      errorCallback(e.toString)
    }
  }


}
