export const ROOT = "/";
export const LOGIN = "/auth/login";
export const LOGOUT = "/auth/logout";
export const HOME = "/home";
export const FORM = "/form";
export const E_OFFICE = "/e-office/desk";

export const ADVERTISER_LOGIN = "/auth/login";
export const APPLY_ADVERTISER = "/register/advertiser";
// export const ADVERTISER_DETAIL = "/advertiser/:id/detail";

export const APPLY_SHOP_LICENSE = "/shop-license/new";
export const APPLY_HOTEL_LICENSE = "/hotel/new";
export const RENEW_SHOP_LICENSE = "/shop-license/:id/renew";


export const APPLY_BANNER = "/banner/new";


export const RESET_PASSWORD = "/reset-password";
export const NEW_STAFF = "/staff/new";
export const LIST_STAFF = "/staff";

export const PROPOSED_KIOSK = "/advertiser/kiosk/propose";
export const RENEW_KIOSK = "/advertiser/kiosk/:id/renew";
export const KIOSK_DETAIL = "/advertiser/kiosk/:id/details";

export const ADVERTISER_DASHBOARD = "/dashboard/advertiser";
export const ADVERTISER_HOARDING = "/dashboard/advertiser/hoarding/list";
export const ADVERTISER_NEW_HOARDING = "/dashboard/advertiser/hoarding/new";
export const ADVERTISER_KIOSK = "/dashboard/advertiser/kiosk";
export const ADVERTISER_NEW_KIOSK = "/dashboard/advertiser/kiosk/new";
export const ADVERTISER_PROFILE = "/dashboard/advertiser/profile";
export const ADVERTISER_SETTING = "/dashboard/advertiser/setting";

/*E-Office routes*/
export const DESK = "/e-office/desk";
export const NEW_FILE = "/e-office/file/new";
export const CREATED_FILES = "/e-office/created";
export const SENT_FILE = "/e-office/sent";
export const CLOSE_FILE = "/e-office/sent";
export const FILE_DETAIL = "/e-office/file/:id/detail";
export const FILE_ACTIVE_LIST = "/e-office/files/active";
export const FILE_CLOSED_LIST = "/e-office/files/closed";
export const FILE_ARCHIVED_LIST = "/e-office/files/archived";
export const FILE_IN_ACTIVE_LIST = "/e-office/files/in-active";

export const FILE_DETAIL_ROUTE = (id) => {
    return `/e-office/file/${id}/detail`
};
export const NEW_RECEIPT = "/e-office/receipt/new";
export const CREATED_RECEIPT = "/e-office/receipt/created";
export const SENT_RECEIPT = "/e-office/receipt/sent";
export const CLOSE_RECEIPT = "/e-office/receipt/close";
export const RECEIPT_DETAIL = "/e-office/receipt/:id/details";

export const NEW_HOARDINGS = "/e-office/applications/hoardings";
export const UNDER_PROCESS_HOARDINGS = "/e-office/applications/hoardings/under-process";
export const REJECTED_HOARDINGS = "/e-office/applications/hoardings/reject";
export const APPROVED_HOARDINGS = "/e-office/applications/hoardings/approved";

export const NEW_KIOSKS = "/e-office/applications/kiosks/new";
export const UNDER_PROCESS_KIOSKS = "/e-office/applications/kiosks/under-process";
export const APPROVED_KIOSKS = "/e-office/applications/kiosks/approved";
export const REJECTED_KIOSKS = "/e-office/applications/kiosks/rejected";

export const NEW_BANNER = "/e-office/applications/banner/new";
export const UNDER_PROCESS_BANNER = "/e-office/applications/banner/under-process";
export const APPROVED_BANNER = "/e-office/applications/banner/approved";
export const REJECTED_BANNER = "/e-office/applications/banner/rejected";

export const NEW_SHOPLICENSE = "/e-office/applications/shop-license/new";
export const UNDER_PROCESS_SHOPLICENSE = "/e-office/applications/shop-license/under-process";
export const APPROVED_SHOPLICENSE = "/e-office/applications/shop-license/approved";
export const REJECTED_SHOPLICENSE = "/e-office/applications/shop-license/rejected";

export const NEW_HOTELLICENSE = "/e-office/applications/hotel-license/new";
export const UNDER_PROCESS_HOTELLICENSE = "/e-office/applications/hotel-license/under-process";
export const APPROVED_HOTELLICENSE = "/e-office/applications/hotel-license/approved";
export const REJECTED_HOTELLICENSE = "/e-office/applications/hotel-license/rejected";

export const HOARDING_DETAILS = "/e-office/applications/hoardings/:id/detail";
export const BANNERS = "/e-office/applications/banners";
export const OBPAS = "/e-office/applications/obpas";
export const NEW_TRADE = "/e-office/admin/new-trade";

export const STAFF_REGISTRATION = "/e-office/admin/new-staff";
export const STAFF_LIST = "/e-office/admin/staffs";

export const SETTING = "/e-office/setting";
export const BRANCHES = "/setting/branches";
export const ADVERTISERS = "/e-office/advertisers";

export const ADVERTISER_DETAIL = `/e-office/advertisers/:id/details`;

export const ADVERTISER_NEW_LIST = '/e-office/applications/advertiser/new';
export const ADVERTISER_IN_PROCESS_LIST = '/e-office/applications/advertiser/in-process';
export const ADVERTISER_REJECT_LIST = '/e-office/applications/advertiser/reject';
export const ADVERTISER_CANCEL_LIST = '/e-office/applications/advertiser/cancel';
export const ADVERTISER_APPROVE_LIST = '/e-office/applications/advertiser/cancel';
