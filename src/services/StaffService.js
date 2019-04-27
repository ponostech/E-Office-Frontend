import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class StaffService {
  async all(){
    const token = localStorage.getItem("access_token");
    const config={ headers: {"Authorization" : `Bearer ${token}`} }

    let res=await axios.get(ApiRoutes.STAFFS, config);
    return res.data.data
  }
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
      let res= await axios.post(ApiRoutes.CREATE_STAFF, data,config);
      return res
  }

  async fetch() {
    // const token = localStorage.getItem("access_token");
    // const config={ headers: {"Authorization" : `Bearer ${token}`} }
    const res=await axios.get(ApiRoutes.GET_STAFF);
    return res
  }
}