import  axios  from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString } from "../utils/ErrorUtil";

export default class RejectTemplateService {

  async update(template,errorCallback,successCallback) {
    try {
      let res = await axios.post(ApiRoutes.UPDATE_REJECT_TEMPLATE(template.id),template);
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages));
      } else {
        errorCallback("Something went wrong: Please try again later");
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

  async create(template,errorCallback,successCallback) {
    try {
      let res =  await axios.post(ApiRoutes.CREATE_REJECT_TEMPLATE,template);
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages),res.data.data.template.id);
      } else {
        errorCallback("Something went wrong: Please try again later");
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }
  async get(module, errorCallback, successCallback) {

    try {
      let res = await axios.get(ApiRoutes.GET_REJECT_TEMPLATE(module));
      if (res.data.status) {
        successCallback(res.data.data.template);
      } else {
        successCallback(null);
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }
  }

};