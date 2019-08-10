import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class WardServices {
  async get() {
      let res=await axios.get(ApiRoutes.WARDS)
      return res.data
  }

}