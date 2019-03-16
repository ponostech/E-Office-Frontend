import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class KioskService {

  async create(state) {
    const token = localStorage.getItem("token");
    console.log(token)
    const config={ headers: {"Authorization" : `Bearer ${token}`} }

    let data = {
      local_council_id: state.kioskData.localCouncil.value,
      address:state.kioskData.address,
      both_side:state.kioskData.bothSide?1:0,
      collapsible:state.kioskData.collapsible?1:0,
      road_details:state.kioskData.roadDetail,
      ground_clearance:state.kioskData.clearance,
      area_category_id:1,
      display_type:state.kioskData.displayType,
      coordinate:'',
      land_owner_name:state.kioskData.landLord,
      land_owner_type:state.kioskData.landlordType,
      status:0,
      documents:state.files
    };
    try {
      let res= await axios.post(ApiRoutes.NEW_KIOSK, data,config);
      return res;
    } catch (e) {
      console.log("Kiosk creation Error "+e);
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
