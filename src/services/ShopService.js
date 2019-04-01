import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class ShopService {

  async create(state) {
    let data = {
      name: state.name,
      phone: state.phone,
      type: state.type,
      email: state.email,
      address: state.address,
      places: state.places,
      trade_name: state.tradeName,
      shop_name: state.shopName,
      latitude: state.latitude,
      longitude: state.longitude,
      business_detail:state.businessDetail,
      estd: state.estd,
      tin_no: state.tinNo,
      cst_no: state.cstNo,
      gst_no: state.gstNo,
      pan_no: state.panNo,
      premised: state.premised,
      display_type: state.displayType,
      signature: [state.signature],
      documents: state.uploadDocuments
    };
    try {
      let res=await axios.post(ApiRoutes.CREATE_SHOP_LICENSE, data);
      return res.data;
    } catch (e) {
      console.log("Error "+e);
    }
  }

}
