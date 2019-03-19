import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class ShopService {

  async create(state) {
    let data = {
      name: state.applicantData.name,
      email: state.applicantData.email,
      type:state.applicantData.type,
      password: state.applicantData.password,
      phone_no: state.applicantData.phone,
      registered:0,
      address:state.applicantData.address,
      signature: [state.applicantData.signature],
      documents: state.files
    };
    try {
      let res=await axios.post(ApiRoutes.CREATE_SHOP_LICENSE, data);
      return res.data;
    } catch (e) {
      console.log("Error "+e);
    }
  }

}
