import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class ShopService {

  async create(state) {
    let data = {
      name: state.shopName,
      phone: state.phone,
      type: state.type.value,
      email: state.email,
      owner:state.name,
      address: state.address,
      owner_address:state.ownerAddress,
      details:state.businessDetail,
      local_council_id:state.localCouncil.value,
      trade_id: state.tradeName.value,
      latitude: state.latitude,
      longitude: state.longitude,
      estd: state.estd,
      tin_no: state.tinNo,
      cst_no: state.cstNo,
      gst_no: state.gstNo,
      pan_no: state.panNo,
      premise_type: state.premised,
      display_type: state.displayType,
      signature: state.signature.path,
      passport: state.passport.path,
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
