import { ApiRoutes } from "../config/ApiRoutes";
import axios from "axios";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";

class ChallanService {

  async all(status = "unpaid", errorCallback, successCallback) {
    try {
      let res=await axios.get(ApiRoutes.LIST_CHALLAN(status));
      if (res.data.status) {
          successCallback(res.data.data.challans)
      }else{
         errorCallback(res.data.messages)
      }
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

  async createPayment(data,errorCallback,successCallback){
    try{
      let res=await axios.post(ApiRoutes.CREATE_PAYMENT,data)
      if (res.data.status) {
          successCallback(res.data.messages)
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages));
        } else {
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

  async cancelChallan(id, errorCallback, successCallback) {
    try{
      let res=await axios.post(ApiRoutes.CANCEL_CHALLAN(id))
      if (res.data.status) {
        successCallback(res.data.messages)
      }else
        errorCallback(res.data.messages)
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
  async getUserChallan(phone, errorCallback, successCallback) {
    try{
      let res=await axios.get(ApiRoutes.USER_CHALLAN_LIST(phone))
      if (res.data.status) {
        const { shop_challans, hotel_challans, banner_challans } = res.data.data;
        successCallback([...shop_challans,...hotel_challans,...banner_challans])
      }else
        errorCallback(res.data.messages)
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }


}

export default ChallanService