import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class DocumentService {

  async get(path) {
      let res=await axios.get(ApiRoutes.DOCUMENTS+"/"+path);
      return res.data;
  }

}
