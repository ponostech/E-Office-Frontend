import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class HoardingService {

  async create(state) {
    const token = localStorage.getItem("token");
    console.log(token)
    const config={ headers: {"Authorization" : `Bearer ${token}`} }

    let data = {
      local_council_id: state.hoardingData.localCouncil.value,
      address:state.hoardingData.address,
      both_side:state.hoardingData.bothSide?1:0,
      road_details:state.hoardingData.roadDetail,
      length:state.hoardingData.length,
      height:state.hoardingData.height,
      ground_clearance:"not sure",
      area_category_id:state.hoardingData.category,
      display_type:state.hoardingData.displayType,
      coordinate:'',
      land_owner_name:state.hoardingData.landLord,
      land_owner_type:state.hoardingData.landlordType,
      status:0,
      documents:state.files
    };
    console.log(data);
    try {
      let res= await axios.post(ApiRoutes.NEW_HOARDING, data,config);
      console.log(res)
      return res;
    } catch (e) {
      console.log("Hoarding creation Error "+e);
    }
  }

  async get(advertiserId) {
    try {
      const res = await axios.get(ApiRoutes.GET_ADVERTISER_HOARDING, { advertiserId });
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
