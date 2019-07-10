import { ApiRoutes } from "../config/ApiRoutes";
import axios from "axios";

class ChallanService {

  async all(status = "Unpaid", errorCallback, successCallback) {
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
}

export default ChallanService