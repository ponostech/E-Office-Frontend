import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class BannerService {

  async create(state) {
    let data = {
      name: state.name,
      applicant_type: state.type.value,
      phone: state.phone,
      local_council_id: state.localCouncil.value,
      advertisement_type: state.displayType.value,
      advertisements: state.bannerDetails,
      advertisement_count: state.bannerDetails.length,
      address: state.address,
      details: state.details,
      status: 0,
      signature: state.signature.path,
      documents: state.uploadDocuments
    };
    try {
      let res = await axios.post(ApiRoutes.CREATE_BANNER, data);
      return res;
    } catch (e) {
      console.log("Error " + e);
    }
  }

  async fetch(status) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    let banners = [];
    try {
      if (status) {
        const res = await axios.get(ApiRoutes.STAFF_BANNER, {
          params: {
            status
          }
        }, config);
        banners = res.data.data.banners;
      } else {
        const defRes = await axios.get(ApiRoutes.STAFF_BANNER, config);
        banners = defRes.data.data.banners;
      }
      console.log(banners);
      return banners;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

}
