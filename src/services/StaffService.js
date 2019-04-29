import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import moment from "moment";
import { ErrorToString } from "../utils/ErrorUtil";

export class StaffService {
  async all() {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };

    let res = await axios.get(ApiRoutes.STAFFS, config);
    return res.data.data;
  }

  async create(state, errorCallback, successCallback) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    let data = {
      email: state.email,
      phone_no: state.phone,
      password: state.password,
      name: state.name,
      designation: state.designation,
      address: state.address,
      dob: moment(state.dob).format("Y-M-D"),
      branch: state.branch.val,
      blood: state.blood,
      signature: state.signature.path,
      photo: state.passport.path
    };
    try {
      let res = await axios.post(ApiRoutes.CREATE_STAFF, data);
      console.log(res)
      if (res.data.status) {
        successCallback("suc")
      }else {
        errorCallback(ErrorToString(res.data.messages))
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }

  async fetch() {
    // const token = localStorage.getItem("access_token");
    // const config={ headers: {"Authorization" : `Bearer ${token}`} }
    const res = await axios.get(ApiRoutes.GET_STAFF);
    return res;
  }

  async getBranch(errorCallback, successCallback) {
    let data = [];
    try {
      const res = await axios.get(ApiRoutes.BRANCHES);
      console.log(res)
      if (res.status) {
      const branches = res.data.data.branches;
      branches.forEach(function(item, index) {
        let temp = {
          val: item,
          label: item
        };
        data.push(temp);
      });
      } else {
        const msg=ErrorToString(res.messages);
        errorCallback(msg);
      }
      successCallback(data);
    } catch (e) {
      errorCallback(e.toString());
    }
  }
}