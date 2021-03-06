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
export const FILE_DRAFT_LIST = (id, type = "general") => {
  return `/files/${id}/drafts/${type}`;
};
export const GET_DRAFT = (id) => {
  return `/drafts/${id}`;
};
export const UPDATE_DRAFT = (id) => {
  return `/drafts/${id}`;
};

export const UPDATE_FILE_APPLICATION = (fileId, applicationId) => {
  return `applications/${applicationId}/update-status`;
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
  static CLASSIFICATIONS = "/setting/classifications";
  static STAFF_ROLE = "/setting/roles";
  static ADVERTISER_LIST = "/staff/advertiser/applications";

  static NOTESHEET = "/notesheets";
  static FILE = "/files";
  static FILE_SEND = "/files/send";
  static FILE_DETAIL = "/files";
  static CREATE_TRADE = "/trades";
  static GET_TRADE=(type) => `/trades/${type}`;
  static CREATE_LICENSE_TEMPLATE = "/permit-templates";
  static CREATE_PERMIT_TEMPLATE = "/permit-templates";
  static CREATE_FILE_HEAD = "/file-index";
  static GET_GROUP_HEAD = "/file-index/group-heads";
  static GET_MAIN_HEAD = "/file-index/main-heads/{group_id}";
  static GET_SUB_HEAD = "/file-index/sub-heads/{main_id}";
  static DELETE_SITE_VERIFICATION = "site-verification-templates";
  static CREATE_RECEIPT = "/receipts";
  static LIST_RECEIPT = "/receipts";
  static CREATE_FILE = "/files";
  static CHECK_LICENSE = "/check-license";
  static CREATE_RATE = "advertisement-rate";
  static CREATE_PAYMENT = "payments/cash";
  static CREATE_CANCEL_TEMPLATE = "/cancel-templates";
  static CREATE_REJECT_TEMPLATE = "/reject-templates";
  static CREATE_SITE_VERIFICATION_TEMPLATE = "/site-verification-templates";
  static GET_ALL_SITE_VERIFICATION_TEMPLATE = "/site-verifications/templates";

  static UPDATE_TRADE = (id) => {
    return `/trades/${id}`;
  };

  //template
  static GET_LICENSE_TEMPLATE = (module) => {
    return `permit-templates/${module}`;
  };

  static UPDATE_RECEIPT = (id) => `/receipts/${id}`;

  static RETRIEVE_RECEIPT = (id) => `/receipts/${id}`;

  static ATTACH_FILE = (id, file_id) => `receipts/${id}/attach/${file_id}`;

  static FILE_ENCLOSURES = (id) => `/files/${id}/receipts`;

  static UPDATE_NOTESHEET = (id) => `/notesheets/${id}`;

  static LIST_CHALLAN = (status) => `/challans/${status}`;
  static SEND_BACK_APPLICATION="/application/sent-back";
  static SEND_MESSAGE=`application/sent-sms`;
  static IMPOSE_FINE="impose-fine";
  static UPDATE_SHOP_LICENSE=id=>`/shops/${id}`;
  static UPDATE_HOTEL_LICENSE=id=>`/hotels/${id}`;
  static KIOSKS="/kiosks";

  static UPDATE_LICENSE_TEMPLATE(id) {
    return `/permit-templates/${id}`;
  }

  static GET_PERMIT_TEMPLATE = (module) => {
    return `/permit-templates/${module}`;
  };

  static UPDATE_PERMIT_TEMPLATE(id) {
    return `/permit-templates/${id}`;
  }

  static UPDATE_CANCEL_TEMPLATE = (id) => `/cancel-templates/${id}`;

  static GET_CANCEL_TEMPLATE = (module) => `/cancel-templates/${module}`;

  static UPDATE_REJECT_TEMPLATE = (id) => `/reject-templates/${id}`;

  static GET_REJECT_TEMPLATE = (module) => `/reject-templates/${module}`;

  static GET_SITE_VERIFICATION_TEMPLATE(module) {
    return `site-verification-templates/${module}`;
  }

  static GET_SITE_VERIFICATION(id) {
    return `site-verifications/${id}/all`;
  }

  static EDIT_SITE_VERIFICATION_TEMPLATE(id) {
    return `/site-verification-templates/${id}`;
  }


  static CANCEL_CHALLAN(id) {
    return `/challan/${id}`;
  }

  static APPROVE_APPLICATION=(id,type)=>`${type}/${id}/approve`;
  static REJECT_APPLICATION=(id,type)=>`${type}/${id}/reject`;
  static CANCEL_APPLICATION=(id,type)=>`${type}/${id}/cancel`;

  static USER_PERMIT_LIST(phone) {
    return `/user/${phone}/permits`;
  }
  static USER_PERMIT_RENEWABLE_LIST (phone) {
    return `/user/${phone}/renewable-permits`;
  }

  static USER_CHALLAN_LIST=(phone) =>`/user/${phone}/challans`;

  static FILE_APPLICATIONS=(file_id) => `files/${file_id}/applications`;

  static GET_SHOP=(id)=>`/shops/${id}`
  static RENEW_SHOP=(id)=>`/shops/${id}/renew`

  static GET_HOTEL=(id)=>`/hotels/${id}`
  static RENEW_HOTEL=(id)=>`/hotels/${id}/renew`

  static GET_STAFF_BY_ID=(id) => `/staff/${id}`;
  
}

