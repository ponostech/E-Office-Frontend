import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";

export const RequestOtp = async (phone_no, purpose) => {
  return await axios.post(ApiRoutes.REQUEST_OTP, { phone_no, purpose });
};

export const VerifyOtp = async (phone_no, otp) => {
  return await axios.post(ApiRoutes.VERIFY_OTP, { otp, phone_no });
};

export class OtpService {

  async requestOtp(phone_no, purpose, errorCallback, successCallback) {

    try {

      let res = await axios.post(ApiRoutes.REQUEST_OTP, { phone_no, purpose });

      if (res.data.status) {
        let str = ArrayToString(res.data.messages);
        successCallback(str);
      } else {
        if (res.data.validation) {
          errorCallback( ErrorToString(res.data.messages) );
        } else {
          errorCallback( ArrayToString(res.data.messages) );
        }
        errorCallback("Something went wrong:Please try again later")
      }
    } catch (e) {
        errorCallback(e.toString())
    }
  }
  async veriftOtp(phone_no, otp, errorCallback, successCallback) {
    try {

      let res = await await axios.post(ApiRoutes.VERIFY_OTP, { otp, phone_no });
      if (res.data.status) {

      } else {
        errorCallback("Something went wrong:Please try again later")
      }
    } catch (e) {
      errorCallback(e.toString())
    }
  }

}