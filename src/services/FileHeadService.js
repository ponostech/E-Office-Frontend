import axios from "axios";
import {ApiRoutes, GET_GROUP_HEAD, GET_MAIN_HEAD, GET_SUB_HEAD} from "../config/ApiRoutes";
import moment from "moment";
import {ArrayToString, ErrorToString} from "../utils/ErrorUtil";

export class FileHeadService {
  async all(errorCallback, successCallback) {
    const token = localStorage.getItem("access_token");
    const config = {headers: {"Authorization": `Bearer ${token}`}};
    try {
      let main_res = await axios.get(ApiRoutes.GET_MAIN_HEAD, config);
      let group_res = await axios.get(ApiRoutes.GET_GROUP_HEAD, config);
      let sub_res = await axios.get(ApiRoutes.GET_SUB_HEAD, config);
      if (res.data.status) {
        successCallback(main_res.data.data.group-heads)
      } else {
        errorCallback("Something went wrong: Please try again later")
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString())
    }

  }

  async update(staff, errorCallback, successCallback) {
    try {
      let res = await axios.post(ApiRoutes.UPDATE_STAFF, staff);
      if (res.data.status) {
        successCallback("Staff info update successfully")
      } else {
        errorCallback(ErrorToString(res.data.messages))
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

  async create(state, errorCallback, successCallback) {
    const token = localStorage.getItem("access_token");
    const config = {headers: {"Authorization": `Bearer ${token}`}};
    let data = {
      email: state.email,
      phone_no: state.phone,
      password: state.password,
      name: state.name,
      designation: state.designation,
      address: state.address,
      dob: moment(state.dob).format("Y-M-D"),
      branch: state.branch.value,
      blood: state.blood,
      role: state.role,
      signature: state.signature.path,
      photo: state.passport.path
    };
    try {
      let res = await axios.post(ApiRoutes.CREATE_STAFF, data);
      if (res.data.status) {
        let msg = ArrayToString(res.data.messages);
        successCallback(msg);
      } else {
        errorCallback(ErrorToString(res.data.messages));
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString());
    }
  }

  async fetch(errorCallback, successCallback) {
    // const token = localStorage.getItem("access_token");
    // const config={ headers: {"Authorization" : `Bearer ${token}`} }
    try {
      const res = await axios.get(ApiRoutes.GET_STAFF);
      if (res.data.status) {
        successCallback(res.data.data.staffs);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString());
    }
  }

  async getBranch(errorCallback, successCallback) {
    let data = [];
    try {
      const res = await axios.get(ApiRoutes.BRANCHES);
      console.log(res);
      if (res.data.status) {
        const branches = res.data.data.branches;
        successCallback(branches);
      } else {
        const msg = ErrorToString(res.messages);
        errorCallback(msg);
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }

  async getRoles(errorCallback, successCallback) {
    let data = [];
    try {
      const res = await axios.get(ApiRoutes.STAFF_ROLE);
      if (res.data.status) {
        const roles = res.data.data.roles;
        successCallback(roles);
      } else {
        errorCallback("Something went wrong: Please try again later");
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }
}