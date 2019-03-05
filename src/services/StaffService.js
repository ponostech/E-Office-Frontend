import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class StaffService {
  async create(state){
    let data = {
      name:state.name,
      designation:state.designation,
      address:state.address,
      dob:state.dob,
      branch:state.branch,
      blood:state.blood,
      signature:state.signature
    };
    try {
      let res= await axios.post(ApiRoutes.CREATE_STAFF, data);
      return res.data;
    } catch (e) {
      console.log("Staff Creation Error ",e);
    }
  }

}