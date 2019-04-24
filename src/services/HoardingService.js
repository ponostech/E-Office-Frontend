import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class HoardingService {

  async create(state) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };

    let data = {
      local_council_id: state.localCouncil.value,
      address: state.address,
      both_side: state.bothSide ? 1 : 0,
      road_detail: state.roadDetail,
      length: state.length,
      height: state.height,
      ground_clearance: state.clearance,
      area_category_id: state.category.value,
      display_type: state.displayType.value,
      coordinate: "",
      longitude: state.longitude,
      latitude: state.latitude,
      land_owner_name: state.landLord,
      land_owner_type: state.landlordType,
      status: 0,
      documents: state.uploadDocuments
    };
    console.log(data);
    let res = await axios.post(ApiRoutes.NEW_HOARDING, data, config);
    return res;
  }

  async get() {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    try {
      const res = await axios.get(ApiRoutes.GET_ADVERTISER_HOARDING, config );
      if (res.status) {
        return res.data.data.hoarding_applications;
      }else{
        throw new Error("Error:Server problem")
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetch(status) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    let hoardings = [];
    try {
      if (status) {
        const res = await axios.get(ApiRoutes.STAFF_HOARDING+`?status=${status}`, config);
        hoardings = res.data.data.hoarding_applications;
      } else {
        const defRes = await axios.get(ApiRoutes.STAFF_HOARDING, config);
        hoardings = defRes.data.data.hoarding_applications;
      }
      return hoardings;

    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }


}
