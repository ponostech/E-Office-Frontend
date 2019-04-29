import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import moment from "moment";

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
      email:state.email,
      phone_no:state.phone,
      password:state.password,
      name:state.name,
      designation:state.designation,
      address:state.address,
      dob:moment(state.dob).format("Y-M-D"),
      branch:state.branch.value,
      blood:state.blood,
      signature:state.signature.path,
      photo:state.passport.path
    };
        let res= await axios.post(ApiRoutes.CREATE_STAFF, data);
        return res
  }

  async fetch() {
    // const token = localStorage.getItem("access_token");
    // const config={ headers: {"Authorization" : `Bearer ${token}`} }
    const res=await axios.get(ApiRoutes.GET_STAFF);
    return res
  }

  async getBranch() {
        const res=await axios.get(ApiRoutes.BRANCHES)
        return res.data.data.branches

  }
}