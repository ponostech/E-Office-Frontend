export const WIDGET_TYPE = {
  TEXT_FIELD: "text_field",
  SELECT: "select",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  SWITCH: "switch",
  FILE_UPLOAD: "file_upload",
  IMAGE_LIST: "image_list",
  DATE_PICKER: "date_picker",
};

export const FILLABLE_TYPE = {
  TEXT_FIELD: "fillable_text_field",
  LOCAL_COUNCIL:"local_council",
  TRADE:"trade",
  RADIO:"radio",
  CHECKBOX:"fillable_checkbox",
  APPLICANT_TYPE:"applicant_type",
  COORDINATE:"coordinate",
  DATE:"fillable_date",
  FILE:"file", PASSPORT: "passport",
  PREMISED: "premised"

};

export const SHOP_FILLABLE=[
  { key: "owner", type: FILLABLE_TYPE.TEXT_FIELD, label: "Name of Applicant", icon: "close" },
  { key: "owner_address", type: FILLABLE_TYPE.TEXT_FIELD, label: "Address of Applicant", icon: "close" },
  { key: "phone", type: FILLABLE_TYPE.TEXT_FIELD, label: "Applicant Phone No", icon: "close" },
  { key: "applicant_type", type: FILLABLE_TYPE.APPLICANT_TYPE, label: "Type of Applicant", icon: "close" },
  { key: "name", type: FILLABLE_TYPE.TEXT_FIELD, label: "Name of Shop", icon: "close" },
  { key: "address", type: FILLABLE_TYPE.TEXT_FIELD, label: "Address of Shop", icon: "close" },
  { key: "local_council", type: FILLABLE_TYPE.LOCAL_COUNCIL, label: "Local Council of Shop", icon: "close" },
  { key: "location", type: FILLABLE_TYPE.COORDINATE, label: "Coordinate of Shop", icon: "close" },
  { key: "estd", type: FILLABLE_TYPE.DATE, label: "Estd of Shop", icon: "close" },
  { key: "details", type: FILLABLE_TYPE.TEXT_FIELD, label: "Detail of Business", icon: "close" },
  { key: "premised_type", type: FILLABLE_TYPE.RADIO, label: "Whether Premised is Owned or Leased", icon: "close" },
  { key: "passport", type: FILLABLE_TYPE.PASSPORT, label: "Photograph of Applicant", icon: "close" },
]