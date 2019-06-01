export const HOARDING_LIST = "/hoardings/applications";
export const HOARDING_APPLICATIONS = (id) => `/hoarding/${id}/applications`;
export const KIOSK_LIST = "/kiosks/applications";
export const LOCAL_COUNCIL = "/local-councils";

export const ADVERTISER_LIST = "/staff/advertiser/applications";
export const HOTEL_LIST = "/hotels";
export const SHOP_LIST = "/shops";
export const BANNER_LIST = "/banners";

export const FILE_TAKE = (id) => {
  return `/files/${id}/take`;
};
export const FILE_CALL = (id) => {
  return `/files/${id}/call`;
};
export const FILE_NOTESHEET = (id) => {
  return `/files/${id}/notesheets`;
};

export const FILE_MOVEMENTS = (id) => {
  return `/files/${id}/movements`;
};

export const FILE_DRAFT_VIEW = (id) => {
  return `/e-office/file/${id}/view/drafts`;
};
export const FILE_DRAFT_PERMIT_VIEW = (id) => {
  return `/e-office/file/${id}/view/draft-permit`;
};
export const FILE_DRAFT_LIST = (id, type = 'general') => {
  return `/files/${id}/drafts/${type}`;
};
export const GET_DRAFT = (id) => {
  return `/drafts/${id}`;
};
export const DELETE_NOTE_DRAFT = (id) => `/notesheets/${id}`;
export const DRAFT_CREATE = "drafts";
export const FILE_ACTION_TYPES = "setting/notesheet/actions";
export const FILE_PRIORITIES = "setting/notesheet/priorities";
export const GET_STAFF = "/staffs";
export const GET_PERMIT_TEMPLATE = (type) => `/permit-templates/${type}`;
export const GET_LICENSE_TEMPLATE = (type) => `/license-templates/${type}`;
export const GET_REJECT_TEMPLATE = (type) => `/reject-templates/${type}`;
export const GET_CANCEL_TEMPLATE = (type) => `/cancel-templates/${type}`;
export const GET_NOTE = (id) => `/notesheets/${id}`;
export const FILE_STATUS_UPDATE = (id) => `files/${id}/update/status`;
export class ApiRoutes {
  static BASE_URL = "http://139.59.26.3/api/v1";
  static LOGIN_ROUTE = "/auth/login";
  static LOCAL_COUNCIL = "/local-councils";
  static WARDS = "/wards";
  static CATEGORY = "/area-categories";

  static DESK = "/desk/files";

  static CREATE_STAFF = "/register/staff";
  static CREATE_ADVERTISER = "/register/advertiser";

  static GET_ADVERTISER_HOARDING = "/advertiser/hoardings/applications";
  static GET_ADVERTISER_KIOSKS = "/advertiser/kiosks/applications";

  static HOARDINGS = "/hoardings";

  static STAFF_KIOSK = "/kiosks/applications";
  static STAFF_HOARDING = "/hoardings/applications";

  static STAFF_ADVERTISER = "/staff/advertiser/applications";
  static STAFF_BANNER = "/banners";
  static STAFF_SHOP = "/shops";
  static STAFF_HOTEL = "/hotels";

  static NEW_HOARDING = "/advertiser/hoardings";
  static NEW_KIOSK = "/advertiser/kiosks";
  static DOCUMENTS = "/documents";
  static CREATE_SHOP_LICENSE = "shops";
  static CREATE_HOTEL_LICENSE = "hotels";

  static CREATE_BANNER = "/banners";
  static VERIFY_OTP = "/otp/verify";
  static REQUEST_OTP = "/otp/request";
  static LOGOUT_ROUTE = "/auth/logout";
  static GET_STAFF = "/staffs";
  static BRANCHES = "/setting/branches";
  static STAFF_ROLE = "/setting/roles";
  static ADVERTISER_LIST = "/staff/advertiser/applications";

  static NOTESHEET = "/notesheets";
  static FILE = "/files";
  static FILE_SEND = "/files/send";
  static FILE_DETAIL = "/files";
  static CREATE_TRADE = "/trades";
  static GET_TRADE = "/trades";
  static CREATE_LICENSE_TEMPLATE = "/license-templates";
  static CREATE_PERMIT_TEMPLATE = "/permit-templates";

  static UPDATE_TRADE = (id) => {
    return `/trades/${id}`;
  };

  //template
  static GET_LICENSE_TEMPLATE = (module) => {
    return `license-templates/${module}`;
  };
  static DELETE_SITE_VERIFICATION="site-verification-templates";

  static UPDATE_LICENSE_TEMPLATE(id) {
    return `/license-templates/${id}`;
  }

  static GET_PERMIT_TEMPLATE = (module) => {
    return `/permit-templates/${module}`;
  };

  static UPDATE_PERMIT_TEMPLATE(id) {
    return `/permit-templates/${id}`;
  }

  static CREATE_CANCEL_TEMPLATE="/cancel-templates"
  static UPDATE_CANCEL_TEMPLATE=(id)=> `/cancel-templates/${id}`;
  static GET_CANCEL_TEMPLATE=(module)=> `/cancel-templates/${module}`;

  static CREATE_REJECT_TEMPLATE="/reject-templates";
  static UPDATE_REJECT_TEMPLATE=(id)=> `/reject-templates/${id}`;
  static GET_REJECT_TEMPLATE=(module)=> `/reject-templates/${module}`;

  static CREATE_SITE_VERIFICATION_TEMPLATE="/site-verification-templates";
  static GET_ALL_SITE_VERIFICATION_TEMPLATE="/site-verifications/templates";

  static GET_SITE_VERIFICATION_TEMPLATE(module) {
    return 	`site-verification-templates/${module}`
  }

  static GET_SITE_VERIFICATION(id) {
    return `site-verifications/${id}`;
  }

  static EDIT_SITE_VERIFICATION_TEMPLATE(id) {
    return `/site-verification-templates/${id}`;
  }
}
