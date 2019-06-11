import axios from "axios";
import { ApiRoutes, FILE_TAKE } from "../config/ApiRoutes";
import { FILE_SEND } from "../config/routes-constant/OfficeRoutes";
import { ArrayToString } from "../utils/ErrorUtil";
import { FILEABLE_TYPE } from "../views/e-office/files/details/Views/FileApplicationDetails";


export class FileService {
  async get(id) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    const data = { id: id };
    let res = await axios.get(ApiRoutes.FILE_DETAIL, data, config);
    return res.data.data;
  }

  async fetch(status, errorCallback, successCallback) {
    let config = {
      params: { status }
    };
    let files = [];
    try {
      let res = status ? await axios.get(ApiRoutes.FILE, config): await axios.get(ApiRoutes.FILE);
      if (res.data.status) {
        successCallback(res.data.data.files);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      errorCallback(e.toString());
      console.error(e);
    }

  }
  async all( errorCallback, successCallback) {

    try {
      let res = await axios.get(ApiRoutes.FILE,{params:{status:"all"}});
      if (res.data.status) {
        successCallback(res.data.data.files);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      errorCallback(e.toString());
      console.error(e);
    }

  }

  async sendFile(file_id, recipient_id, errorCallback, successCallback) {

    try {
      let res = await axios.post(FILE_SEND(file_id), { recipient_id });
      console.log(res);
      if (res.data.status) {
        successCallback("File has been moved");
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }

  }

  async takeFile(file_id, errorCallback, successCallback) {

    try {
      let res = await axios.post(FILE_TAKE(file_id));
      if (res.data.status) {
        successCallback("You have taken the file");
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }

  }

  async getApplication(id, type, errorCallback, successCallback) {
    let url = "";
    switch (type) {
      case FILEABLE_TYPE.KIOSK:
        url = `/kiosks/${id}`;
        break;
      case FILEABLE_TYPE.HOARDING:
        url = `/hoardings/${id}`;
        break;
      case FILEABLE_TYPE.BANNER:
        url = `/banners/${id}`;
        break;
      case FILEABLE_TYPE.SHOP:
        url = `/shops/${id}`;
        break;
      case FILEABLE_TYPE.HOTEL:
        url = `/hotels/${id}`;
        break;
      default:
        alert(type)
        break;
    }
    try {
      let res = await axios.get(url);
        console.log(res);
      if (res.data.status) {
        switch (type) {
          case FILEABLE_TYPE.KIOSK:
            successCallback(res.data.data.kiosk);
            break;
          case FILEABLE_TYPE.HOARDING:
            successCallback(res.data.data.hoarding);
            break;
          case FILEABLE_TYPE.BANNER:
            successCallback(res.data.data.banner);
            break;
          case FILEABLE_TYPE.SHOP:
            successCallback(res.data.data.shop);
            break;
          case FILEABLE_TYPE.HOTEL:
            successCallback(res.data.data.hotel);
            break;
        }
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString());
    }

  }
}