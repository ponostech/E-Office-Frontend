import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class CategoryServices {
  async get() {
      let res=await axios.get(ApiRoutes.CATEGORY)
      return res
  }

}