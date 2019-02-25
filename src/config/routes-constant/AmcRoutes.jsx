export class AmcRoutes {
  static ROOT = "/";
  static LOGIN = "/login";
  static HOME = "/home";
  static E_OFFICE = "/e-office";

  static APPLY_ADVERTISER = "/advertiser/new";
  static RENEW_ADVERTISER = "/advertiser/:id/renew";
  static ADVERTISER_DETAIL = "/advertisers/:id";

  static APPLY_SHOP_LICENSE = "/shop-license/new";
  static RENEW_SHOP_LICENSE = "/shop-license/:id/renew";
  static SHOP_LICENSE_DETAIL = "/shop-license/:id";

  static APPLY_HOARDING = "/hoarding/new";
  static RENEW_HOARDING = "/hoarding/:id/renew";
  static PROPOSED_HOARDING = "/hoarding/propose";

  static NEW_KIOSK = "/kiosk/new";
  static PROPOSED_KIOSK = "/kiosk/propose";
  static RENEW_KIOSK = "/kiosk/:id/renew";
  static KIOSK_DETAIL = "/kiosk/:id";

  static APPLY_BANNER = "/banner/new";

  static DESK = "/e-office/desk";
  static NEW_FILE = "/e-office/file/new";
  static CREATED_FILES = "/e-office/file";
  static SENT_FILE = "/e-office/file/sent";
  static CLOSE_FILE = "/e-office/file/close";
  static FILE_DETAIL = "/e-office/file/:id";

  static NEW_RECEIPT = "/e-office/receipt/new";
  static CREATED_RECEIPT = "/e-office/receipt/created";
  static SENT_RECEIPT = "/e-office/receipt/sent";
  static CLOSE_RECEIPT = "/e-office/receipt/close";
  static RECEIPT_DETAIL = "/e-office/receipt/:id";

}