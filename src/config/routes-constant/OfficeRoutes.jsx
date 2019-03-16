export class OfficeRoutes {
  static ROOT = "/";
  static LOGIN = "/login";
  static HOME = "/home";
  static FORM = "/form";
  static E_OFFICE = "/e-office";

  static ADVERTISER_LOGIN = "/auth/advertiser/login";
  static APPLY_ADVERTISER = "/register/advertiser";
  static RENEW_ADVERTISER = "/advertiser/:id/renew";
  // static ADVERTISER_DETAIL = "/advertiser/:id/detail";

  static APPLY_SHOP_LICENSE = "/shop-license/new";
  static RENEW_SHOP_LICENSE = "/shop-license/:id/renew";
  static SHOP_LICENSE_DETAIL = "/shop-license/:id/detail";

  static PROPOSED_KIOSK = "/advertiser/kiosk/propose";
  static RENEW_KIOSK = "/advertiser/kiosk/:id/renew";
  static KIOSK_DETAIL = "/advertiser/kiosk/:id/details";

  static APPLY_BANNER = "/banner/new";


  static LOGIN = "/login";
  static RESET_PASSWORD = "/reset-password";
  static NEW_STAFF = "/staff/new";
  static LIST_STAFF = "/staff";

  static ADVERTISER_DASHBOARD = "/advertiser";
  static ADVERTISER_HOARDING = "/advertiser/hoarding/list";
  static ADVERTISER_NEW_HOARDING = "/advertiser/hoarding/new";
  static ADVERTISER_KIOSK = "/advertiser/kiosk";
  static ADVERTISER_NEW_KIOSK = "/advertiser/kiosk/new";
  static ADVERTISER_PROFILE = "/advertiser/profile";
  static ADVERTISER_SETTING = "/advertiser/setting";

  /*E-Office routes*/
  static DESK = "/e-office/desk";
  static NEW_FILE = "/e-office/file/new";
  static CREATED_FILES = "/e-office/created";
  static SENT_FILE = "/e-office/sent";
  static CLOSE_FILE = "/e-office/sent";
  static FILE_DETAIL = "/e-office/file/:id/detail";

  static NEW_RECEIPT = "/e-office/receipt/new";
  static CREATED_RECEIPT = "/e-office/receipt/created";
  static SENT_RECEIPT = "/e-office/receipt/sent";
  static CLOSE_RECEIPT = "/e-office/receipt/close";
  static RECEIPT_DETAIL = "/e-office/receipt/:id/details";

  static SHOP_LICENSES = "/e-office/applications/shop-license";
  static HOARDINGS = "/e-office/applications/hoardings";
  static HOARDING_DETAILS = "/e-office/applications/hoardings/:id/detail";
  static BANNERS = "/e-office/applications/banners";
  static KIOSKS = "/e-office/applications/kiosks";
  static OBPAS = "/e-office/applications/obpas";

  static SETTING = "/e-office/setting";
  static ADVERTISERS = "/e-office/advertisers";

  static ADVERTISER_DETAIL = `/e-office/advertisers/:id/details`;

}
