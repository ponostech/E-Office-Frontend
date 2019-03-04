import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class HoardingService {

  async create(state) {
    // const token = localStorage.getItem("token");
    let data = {
      local_council_id: state.applicantData.localCouncil.value,
      address:state.applicantData.address,
      both_side:state.applicantData.bothSide,
      road_details:state.applicantData.roadDetail,
      length:state.applicantData.length,
      height:state.applicantData.height,
      ground_clearance:"not sure",
      area_category_id:state.applicantData.category,
      display_type:state.applicantData.displayType,
      coordinate:state.applicantData.coordinate,
      land_owner_name:state.applicantData.landLord,
      land_owner_type:state.applicantData.landlordType,
      status:0
    };
    console.log("who call me")
    try {
      let res= await axios.post(ApiRoutes.NEW_HOARDING, data);
      return res;
    } catch (e) {
      console.log("Error "+e);
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
