import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class BannerService {

  async create(state) {
    let data = {
      name: state.name,
      type:state.type,
      phone_no: state.phone,
      local_council_id:state.localCouncil.value,
      display_type: state.display_type,
      address:state.address,
      detail:state.details,
      signature: [state.signature],
      documents: state.uploadDocuments
    };
    try {
      let res=await axios.post(ApiRoutes.CREATE_BANNER, data);
      return res.data;
    } catch (e) {
      console.log("Error "+e);
    }
  }


}
