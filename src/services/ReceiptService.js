import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";
import axios from "axios";

export default class ReceiptService {

  async fetchResource(errorCallback,sucessCallback){
    try{
      let classificationPromise=await axios.get(ApiRoutes.CLASSIFICATIONS);
      let branchesPromise=await axios.get(ApiRoutes.BRANCHES);
      const [classification, branches] = await Promise.all([classificationPromise, branchesPromise]);

          if (classification.data.status && branches.data.status) {
             let c=classification.data.data.classifications;
             let b=branches.data.data.branches;
              sucessCallback(b,c)
          }else{
            errorCallback(ArrayToString(classification.data.messages))
          }
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

  async create(data, errorCallback, successCallback) {
    try{
      let res=await axios.post(ApiRoutes.CREATE_RECEIPT,data)
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages))
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages))
        }else{
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
  async update(id,data, errorCallback, successCallback) {
    try{
      let res=await axios.post(ApiRoutes.UPDATE_RECEIPT(id),data)
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages))
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages))
        }else{
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
  async all( status,errorCallback, successCallback) {
    try{
      let res=await axios.get(ApiRoutes.LIST_RECEIPT)
      if (res.data.status) {
        successCallback(res.data.data.receipts)
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages))
        }else{
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
  async get( id,errorCallback, successCallback) {
    try{
      let res=await axios.get(ApiRoutes.RETRIEVE_RECEIPT(id))
      if (res.data.status) {
        successCallback(res.data.data.receipt)
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages))
        }else{
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

  async attachToFile(receiptId, fileId,errorCallback,successCallback) {
    try{
      let res=await axios.post(ApiRoutes.ATTACH_FILE(receiptId,fileId));
      if (res.data.status) {
        successCallback(ArrayToString(res.data.messages))
      }else{
        if (res.data.validation_error) {
          errorCallback(ErrorToString(res.data.messages))
        }else{
          errorCallback(ArrayToString(res.data.messages))
        }
      }
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }
};