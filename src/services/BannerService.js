import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class BannerService {

  async create(state) {
    const token = localStorage.getItem("access_token");
    const config={ headers: {"Authorization" : `Bearer ${token}`} }
    let data = {
      name: state.name,
      applicant_type:state.type.value,
      phone: state.phone,
      local_council_id:state.localCouncil.value,
      advertisement_type: state.displayType.value,
      advertisements:state.bannerDetails,
      advertisement_count:state.bannerDetails.length,
      address:state.address,
      details:state.details,
      status:0,
      signature: state.signature.path,
      documents: state.uploadDocuments
    };
    try {
      let res=await axios.post(ApiRoutes.CREATE_BANNER, data,config);
      return res;
    } catch (e) {
      console.log("Error "+e);
    }
  }


}
