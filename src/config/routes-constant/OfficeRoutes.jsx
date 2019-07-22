export const EXPIRED_SHOP_LICENSE_CHECK = "/shop-license/expired/check";
export const RESUBMIT_SHOP_LICENSE_APPLICATION = (id) => `/shop-license/${id}/re-submit`;

export const FILE_HEAD = "/e-office/file-head";
export const ROOT = "/";
export const LOGIN = "/auth/login";
export const LOGOUT = "/auth/logout";
export const FORGOT_PASSWORD = "/auth/forgot-password";
export const HOME = "/";
export const E_OFFICE = "/e-office";

export const ADVERTISER_LOGIN = "/auth/login";
export const APPLY_ADVERTISER = "/register/advertiser";
// export const ADVERTISER_DETAIL = "/advertiser/:id/detail";

export const APPLY_SHOP_LICENSE = "/shop-license/new";
export const APPLY_HOTEL_LICENSE = "/hotel/new";
export const RENEW_SHOP_LICENSE = "/shop-license/:id/renew";


export const APPLY_BANNER = "/banner/new";
export const CHECK_LICENSE = "/license/check";
export const SEARCH_LICENSE = (mobile_no, type) => `/license/${mobile_no}/search/${type}`;


export const RESET_PASSWORD = "/reset-password";
export const NEW_STAFF = "/staff/new";
export const LIST_STAFF = "/staff";

export const ADVERTISER_DASHBOARD = "/dashboard/advertiser";

export const ADVERTISER_NEW_HOARDING = "/dashboard/advertiser/hoarding/new";
export const ADVERTISER_PROPOSED_HOARDING = "/dashboard/advertiser/hoarding/proposed";
export const ADVERTISER_AVAILABLE_HOARDING = "/dashboard/advertiser/hoarding/available";
export const ADVERTISER_ACTIVE_HOARDING = "/dashboard/advertiser/hoarding/active";
export const ADVERTISER_WITHDRAWN_HOARDING = "/dashboard/advertiser/hoarding/withdrawn";

export const ADVERTISER_NEW_KIOSK = "/dashboard/advertiser/kiosk/new";
export const ADVERTISER_PROPOSED_KIOSK = "/dashboard/advertiser/kiosk/proposed";
export const ADVERTISER_AVAILABLE_KIOSK = "/dashboard/advertiser/kiosk/available";
export const ADVERTISER_ACTIVE_KIOSK = "/dashboard/advertiser/kiosk/active";
export const ADVERTISER_WITHDRAWN_KIOSK = "/dashboard/advertiser/kiosk/withdrawn";

export const ADVERTISER_PROFILE = "/dashboard/advertiser/profile";
export const ADVERTISER_SETTING = "/dashboard/advertiser/setting";

/*E-Office routes*/
export const DESK = "/e-office/desk";
export const NEW_FILE = "/e-office/files/create";
export const CREATED_FILES = "/e-office/created";
export const SENT_FILE = "/e-office/sent";
export const CLOSE_FILE = "/e-office/sent";
export const FILE_DETAIL = "/e-office/file/:id/";
export const FILE_ACTIVE_LIST = "/e-office/files/active";
export const FILE_CLOSED_LIST = "/e-office/files/closed";
export const FILE_ARCHIVED_LIST = "/e-office/files/archived";
export const FILE_IN_ACTIVE_LIST = "/e-office/files/new";
export const FILE_DETAIL_ROUTE = (id) => {
  return `/e-office/file/${id}`;
};
export const SHOP_DETAIL_ROUTE = (id) => {
  return `/e-office/applications/shop-license/${id}/new`;
};
export const FILE_SEND = (id) => {
  return `/files/${id}/send`;
};
export const NEW_RECEIPT = "/e-office/receipt/new";
export const EDIT_RECEIPT = (id) => `/e-office/receipt/${id}/edit`;
export const RECEIPT_ATTACHED_LIST = "/e-office/receipt/attached-list";
export const RECEIPT_NEW_LIST = "/e-office/receipt/new-list";

export const NEW_HOARDINGS = "/e-office/applications/hoardings";
export const UNDER_PROCESS_HOARDINGS = "/e-office/applications/hoardings/under-process";
export const REJECTED_HOARDINGS = "/e-office/applications/hoardings/reject";
export const APPROVED_HOARDINGS = "/e-office/applications/hoardings/approved";
export const CANCELLED_HOARDINGS = "/e-office/applications/hoardings/cancelled";

export const NEW_KIOSKS = "/e-office/applications/kiosks/new";
export const UNDER_PROCESS_KIOSKS = "/e-office/applications/kiosks/under-process";
export const APPROVED_KIOSKS = "/e-office/applications/kiosks/approved";
export const REJECTED_KIOSKS = "/e-office/applications/kiosks/rejected";
export const CANCELLED_KIOSKS = "/e-office/applications/kiosks/cancelled";

export const NEW_BANNER = "/e-office/applications/banner/new";
export const UNDER_PROCESS_BANNER = "/e-office/applications/banner/under-process";
export const APPROVED_BANNER = "/e-office/applications/banner/approved";
export const REJECTED_BANNER = "/e-office/applications/banner/rejected";
export const CANCELLED_BANNER = "/e-office/applications/banner/cancelled";

export const UNPAID_SHOPLICENSE = "/e-office/applications/shop-license/unpaid";
export const NEW_SHOPLICENSE = "/e-office/applications/shop-license/new";
export const UNDER_PROCESS_SHOPLICENSE = "/e-office/applications/shop-license/under-process";
export const SENT_BACK_SHOPLICENSE = "/e-office/applications/shop-license/sent-back";
export const RE_SUBMIT_SHOPLICENSE = "/e-office/applications/shop-license/re-submit";
export const APPROVED_SHOPLICENSE = "/e-office/applications/shop-license/approve";
export const REJECTED_SHOPLICENSE = "/e-office/applications/shop-license/reject";
export const CANCELLED_SHOPLICENSE = "/e-office/applications/shop-license/cancelled";

export const NEW_HOTELLICENSE = "/e-office/applications/hotel-license/new";
export const UNDER_PROCESS_HOTELLICENSE = "/e-office/applications/hotel-license/under-process";
export const SENT_BACK_HOTELLICENSE = "/e-office/applications/hotel-license/sent-back";
export const RE_SUBMIT_HOTELLICENSE = "/e-office/applications/hotel-license/re-submit";
export const APPROVED_HOTELLICENSE = "/e-office/applications/hotel-license/approve";
export const REJECTED_HOTELLICENSE = "/e-office/applications/hotel-license/reject";
export const CANCELLED_HOTELLICENSE = "/e-office/applications/hotel-license/cancelled";

export const HOARDING_DETAILS = "/e-office/applications/hoardings/:id/detail";
export const OBPAS = "/e-office/applications/obpas";
export const TRADE_NEW = "/e-office/admin/trade-new";
export const TRADE_LIST = "/e-office/admin/trade-list";

//admin control menu item routes
export const STAFF_REGISTRATION = "/e-office/admin/new-staff";
export const STAFF_LIST = "/e-office/admin/staffs";
export const PERMIT_TEMPLATE = "/e-office/admin/permit-template";
export const LICENSE_TEMPLATE = "/e-office/admin/license-template";
export const REJECTED_TEMPLATE = "/e-office/admin/rejected-template";
export const CANCELLED_TEMPLATE = "/e-office/admin/cancelled-template";
export const RATE_LIST = "/e-office/admin/rates";

// site verification
export const SITE_VERIFICATION = "/e-office/admin/site-verification";
export const SITE_VERIFICATION_LIST = "/e-office/admin/site-verification/list";
export const SITE_VERIFICATION_EDIT = module => `/e-office/admin/site-verification/${module}/edit`;


export const SETTING = "/e-office/setting";
export const BRANCHES = "/setting/branches";
export const ADVERTISERS = "/e-office/advertisers";

export const ADVERTISER_DETAIL = `/e-office/advertisers/:id/details`;

export const ADVERTISER_NEW_LIST = "/e-office/applications/advertiser/new";
export const ADVERTISER_IN_PROCESS_LIST = "/e-office/applications/advertiser/in-process";
export const ADVERTISER_REJECT_LIST = "/e-office/applications/advertiser/reject";
export const ADVERTISER_CANCEL_LIST = "/e-office/applications/advertiser/cancel";
export const ADVERTISER_APPROVE_LIST = "/e-office/applications/advertiser/approved";

export const CHALLAN_LIST = "/e-office/challans";


export const GRIEVANCE_CREATE = "/grievance";

export const NOT_FOUND = "/404/not-found";
