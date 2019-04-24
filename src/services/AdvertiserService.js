import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class AdvertiserService {

  async create(state) {
    let data = {
      name: state.name,
      email: state.email,
      type:state.type.value,
      password: state.password,
      phone_no: state.phone,
      registered:0,
      address:state.address,
      signature: [state.signature],
      documents: state.documentsUpload
    };
    try {
      let res=await axios.post(ApiRoutes.CREATE_ADVERTISER, data);
      return res.data;
    } catch (e) {
      console.log("Error "+e);
    }
  }
  async fetch(status) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    let advertisers = [];
    try {
      if (status) {
        const res = await axios.get(ApiRoutes.STAFF_ADVERTISER, {
          params: {
            status
          }
        }, config);
        kiosks = res.data.data.kiosk_applications;
      } else {
        const defRes = await axios.get(ApiRoutes.STAFF_ADVERTISER, config);
        kiosks = defRes.data.data.kiosk_applications;
      }
      console.log(kiosks)
      return kiosks;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
