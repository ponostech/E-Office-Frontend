import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class StaffService {
  async create(state){
    const token = localStorage.getItem("access_token");
    const config={ headers: {"Authorization" : `Bearer ${token}`} }
    let data = {
      name:state.name,
      designation:state.designation.value,
      address:state.address,
      dob:state.dob,
      branch:state.branch.value,
      blood:state.blood,
      signature:state.signature.path
    };
    try {
      let res= await axios.post(ApiRoutes.CREATE_STAFF, data,config);
      return res.data;
    } catch (e) {
      console.log("Staff Creation Error ",e);
      throw new Error(e)
    }
  }

}