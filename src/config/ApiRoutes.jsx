export const ADVERTISER_NEW_LIST = "/staff/advertiser/applications";

export const FILE_TAKE = (id) => {
  return `/file/${id}/take`;
};
export const FILE_CALL = (id) => {
  return `/file/${id}/call`;
};
export const FILE_NOTESHEET = (id) => {
  return `/file/${id}/notesheets`;
};

export class ApiRoutes {
  static BASE_URL = "http://139.59.26.3/api/v1";
  static LOGIN_ROUTE = "/auth/login";
  static LOCAL_COUNCIL = "/local-councils";
  static WARDS = "/wards";
  static CATEGORY = "/area-categories";

  static DESK = "/desk/files";

  static CREATE_STAFF = "/register/staff";
  static CREATE_ADVERTISER="/register/advertiser";

  static GET_ADVERTISER_HOARDING="/advertiser/hoardings/applications";
  static GET_ADVERTISER_KIOSKS="/advertiser/kiosks/applications";

  static HOARDINGS="/hoardings";

  static STAFF_KIOSK="/kiosks/applications";
  static STAFF_HOARDING="/hoardings/applications";

  static STAFF_ADVERTISER="/staff/advertiser/applications";
  static STAFF_BANNER="/banners";
  static STAFF_SHOP="/shops";
  static STAFF_HOTEL = "/hotels";

  static NEW_HOARDING="/advertiser/hoardings";
  static NEW_KIOSK="/advertiser/kiosks";
  static DOCUMENTS="/documents";
  static CREATE_SHOP_LICENSE="shops";
  static CREATE_HOTEL_LICENSE="hotels";

  static CREATE_BANNER="/banners";
  static TRADES="/trades";
  static VERIFY_OTP="/otp/verify";
  static REQUEST_OTP="/otp/request";
  static LOGOUT_ROUTE="/auth/logout";
  static GET_STAFF="/staffs";
  static BRANCHES="/setting/branches";
  static STAFF_ROLE="/setting/roles";
  static ADVERTISER_LIST = '/staff/advertiser/applications';

  static NOTESHEET = '/notesheets';
  static FILE="/files";
  static FILE_SEND = '/file/send';
  static FILE_DETAIL="/files";
}
