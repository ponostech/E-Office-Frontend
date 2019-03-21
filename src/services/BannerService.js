import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class BannerService {

  async create(state) {
    let data = {
      name: state.name,
      email: state.email,
      type:state.type,
      password: state.password,
      phone_no: state.phone,
      registered:0,
      address:state.address,
      signature: [state.signature],
      documents: state.files
    };
    try {
      let res=await axios.post(ApiRoutes.CREATE_BANNER, data);
      return res.data;
    } catch (e) {
      console.log("Error "+e);
    }
  }


}