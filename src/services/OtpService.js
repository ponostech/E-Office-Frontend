import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export const RequestOtp = async (phone_no,purpose) => {
  return await axios.post(ApiRoutes.REQUEST_OTP, {phone_no ,purpose});
};

export const VerifyOtp = async (phone_no, otp) => {
  return await axios.post(ApiRoutes.VERIFY_OTP, { otp, phone_no });
};