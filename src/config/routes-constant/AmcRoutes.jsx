export class AmcRoutes {
  static ROOT="/"
  static LOGIN = "/login";
  static HOME = "/home";
  static E_OFFICE = "/e-office";

  static APPLY_ADVERTISER = "/advertiser/new";
  static RENEW_ADVERTISER = "/advertiser/:id/renew";
  static ADVERTISER_DETAIL = "/advertiser/:id";

  static APPLY_SHOP_LICENSE = "/shopping-license/new";
  static RENEW_SHOP_LICENSE = "/shopping-license/:id/renew";
  static SHOP_LICENSE_DETAIL = "/shopping-license/:id";

  static APPLY_HOARDING = "/hoarding/new";
  static RENEW_HOARDING = "/hoarding/:id/renew";
  static PROPOSED_HOARDING = "/hoarding/propose";

  static NEW_KIOSK = "/kiosk/new";
  static PROPOSED_KIOSK = "/kiosk/propose";
  static RENEW_KIOSK = "/kiosk/:id/renew";
  static KIOSK_DETAIL = "/kiosk/:id";

  static APPLY_BANNER="/banner/new";

  static DESK = "/e-office/desk";
  static NEW_FILE = "/e-office/file/new";
  static CREATED_FILES = "/e-office/created";
  static SENT_FILE = "/e-office/sent";
  static CLOSE_FILE = "/e-office/sent";
  static FILE_DETAIL = "/e-office/files/:id";

  static NEW_RECEIPT = "/e-office/receipts/new";
  static CREATED_RECEIPT = "/e-office/receipts/created";
  static SENT_RECEIPT = "/e-office/receipts/sent";
  static CLOSE_RECEIPT = "/e-office/receipts/close";
  static RECEIPT_DETAIL = "/e-office/receipts/:id";

}