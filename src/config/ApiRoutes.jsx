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
  static CREATE_BANNER="/banners";
  static TRADES="/trades";
  static VERIFY_OTP="/otp/verify";
  static REQUEST_OTP="/otp/request";
  static LOGOUT_ROUTE="/auth/logout";
  static FILE_DETAIL="/files/";
  static GET_STAFF="/staffs";
  static BRANCHES="/setting/branches";
  static STAFF_ROLE="/setting/roles";

  static ADVERTISER_LIST = '/staff/advertiser/applications';
  // static ADVERTISER_IN_PROCESS_LIST = '/staff/advertiser/applications/in-process';
  // static ADVERTISER_CANCEL_LIST = '/staff/advertiser/applications/cancelled';
  // static ADVERTISER_REJECT_LIST = '/staff/advertiser/applications/rejected';
  // static ADVERTISER_APPROVE_LIST = '/staff/advertiser/applications/approved';
}
