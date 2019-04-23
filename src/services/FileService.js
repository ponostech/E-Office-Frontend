import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class FileService {
  async get(id){
    const token = localStorage.getItem("access_token");
    const config={ headers: {"Authorization" : `Bearer ${token}`} }
    const data={id:id}
    let res=await axios.get(ApiRoutes.FILE_DETAIL,data,config);
    return res.data.data
  }

}