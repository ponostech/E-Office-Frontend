export class ApiRoutes {
  static LOGIN_ROUTE = "/auth/login";
  static BASE_URL = "http://localhost:8000/api/v1";
  static LOCAL_COUNCIL = "/local-councils";
  static WARDS = "/wards";
  static CATEGORY = "/area-categories";
  static CREATE_STAFF = "/register/staff";
  static CREATE_ADVERTISER="/register/advertiser";

  static GET_ADVERTISER_HOARDING="/advertiser/hoardings/applications";
  static GET_ADVERTISER_KIOSKS="/advertiser/kiosks/applications";


  static HOARDINGS="/hoardings";


  static NEW_HOARDING="/advertiser/hoardings";
  static NEW_KIOSK="/advertiser/kiosks";
  static DOCUMENTS="/documents";
  static CREATE_SHOP_LICENSE="shops";
  static CREATE_BANNER="/banners";
  static TRADES="/trades";
  static VERIFY_OTP="/otp/verify";
  static REQUEST_OTP="/otp/request";
  static LOGOUT_ROUTE="/auth/logout";

}