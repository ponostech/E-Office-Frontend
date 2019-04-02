import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class KioskService {
  async create(state) {
    const token = localStorage.getItem("access_token");
    console.log(token);
    const config = { headers: { "Authorization": `Bearer ${token}` } };

    let data = {
      local_council_id: state.localCouncil.value,
      area_category_id:state.category.value,
      address: state.address,
      both_side: state.bothSide ? 1 : 0,
      collapsible: state.collapsible ? 1 : 0,
      road_detail: state.roadDetail,
      length: state.length,
      height: state.height,
      clearance: state.clearance,
      display_type: state.displayType.value,
      land_owner_name: state.landLord,
      land_owner_type: state.landlordType,
      latitude:state.latitude,
      longitude:state.longitude,
      status: 0,
      documents: []
    };
    console.log(data);
    let res = await axios.post(ApiRoutes.NEW_HOARDING, data, config);
    return res;
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
