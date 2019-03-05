import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class LocalCouncilService {
  async get() {
    try{
      let res=await axios.get(ApiRoutes.LOCAL_COUNCIL)
      return res.data
    }catch (e) {
      console.error("LocalCouncil request err ", e)
    }
  }

}