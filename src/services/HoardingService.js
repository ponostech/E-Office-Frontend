import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class HoardingService {

  async create(state) {
    const token = localStorage.getItem("access_token");
    const config={ headers: {"Authorization" : `Bearer ${token}`} }

    let data = {
      local_council_id: state.localCouncil.value,
      address:state.address,
      both_side:state.bothSide?1:0,
      road_detail:state.roadDetail,
      length:state.length,
      height:state.height,
      ground_clearance:state.clearance,
      area_category_id:state.category.value,
      display_type:state.displayType.value,
      coordinate:'',
      longitude:state.longitude,
      latitude:state.latitude,
      land_owner_name:state.landLord,
      land_owner_type:state.landlordType,
      status:0,
      documents:state.uploadDocuments
    };
    console.log(data);
      let res= await axios.post(ApiRoutes.NEW_HOARDING, data,config);
      return res;
  }

  async get(advertiserId) {
    try {
      const res = await axios.get(ApiRoutes.GET_ADVERTISER_HOARDING, { advertiserId });
      return res.data;
    } catch (error) {
      throw new Error(error)
    }
  }

  async fetch() {
    try {
      const token = localStorage.getItem("access_token");
      const config={ headers: {"Authorization" : `Bearer ${token}`} }
      const res = await axios.get(ApiRoutes.GET_ADVERTISER_HOARDING,config );
      return res.data.data.hoarding_applications;

    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }


}
