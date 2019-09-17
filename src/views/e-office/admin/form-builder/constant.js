export const WIDGET_TYPE = {
  TEXT_FIELD: "text_field",
  COORDINATE: "Ccoordinate",
  SELECT: "select",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  SWITCH: "switch",
  FILE_UPLOAD: "file_upload",
  IMAGE_LIST: "image_list",
  DATE_PICKER: "date_picker",
  NUMBER_FIELD: "number_field"

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
  { key: "owner", type: FILLABLE_TYPE.TEXT_FIELD, label: "Name of Applicant", icon: "keyboard_arrow_right" },
  { key: "owner_address", type: FILLABLE_TYPE.TEXT_FIELD, label: "Address of Applicant", icon: "keyboard_arrow_right" },
  { key: "phone", type: FILLABLE_TYPE.TEXT_FIELD, label: "Applicant Phone No", icon: "keyboard_arrow_right" },
  { key: "applicant_type", type: FILLABLE_TYPE.APPLICANT_TYPE, label: "Type of Applicant", icon: "keyboard_arrow_right" },
  { key: "name", type: FILLABLE_TYPE.TEXT_FIELD, label: "Name of Shop", icon: "keyboard_arrow_right" },
  { key: "address", type: FILLABLE_TYPE.TEXT_FIELD, label: "Address of Shop", icon: "keyboard_arrow_right" },
  { key: "local_council", type: FILLABLE_TYPE.LOCAL_COUNCIL, label: "Local Council of Shop", icon: "keyboard_arrow_right" },
  { key: "location", type: FILLABLE_TYPE.COORDINATE, label: "Coordinate of Shop", icon: "keyboard_arrow_right" },
  { key: "estd", type: FILLABLE_TYPE.DATE, label: "Estd of Shop", icon: "keyboard_arrow_right" },
  { key: "details", type: FILLABLE_TYPE.TEXT_FIELD, label: "Detail of Business", icon: "keyboard_arrow_right" },
  { key: "premised_type", type: FILLABLE_TYPE.RADIO, label: "Whether Premised is Owned or Leased", icon: "keyboard_arrow_right" },
  { key: "passport", type: FILLABLE_TYPE.PASSPORT, label: "Photograph of Applicant", icon: "keyboard_arrow_right" },
]
export const HOTEL_FILLABLE=[
  { key: "owner", type: FILLABLE_TYPE.TEXT_FIELD, label: "Name of Applicant", icon: "keyboard_arrow_right" },
  { key: "owner_address", type: FILLABLE_TYPE.TEXT_FIELD, label: "Address of Applicant", icon: "keyboard_arrow_right" },
  { key: "phone", type: FILLABLE_TYPE.TEXT_FIELD, label: "Applicant Phone No", icon: "keyboard_arrow_right" },
  { key: "applicant_type", type: FILLABLE_TYPE.APPLICANT_TYPE, label: "Type of Applicant", icon: "keyboard_arrow_right" },
  { key: "name", type: FILLABLE_TYPE.TEXT_FIELD, label: "Name of Shop", icon: "keyboard_arrow_right" },
  { key: "address", type: FILLABLE_TYPE.TEXT_FIELD, label: "Address of Shop", icon: "keyboard_arrow_right" },
  { key: "local_council", type: FILLABLE_TYPE.LOCAL_COUNCIL, label: "Local Council of Shop", icon: "keyboard_arrow_right" },
  { key: "location", type: FILLABLE_TYPE.COORDINATE, label: "Coordinate of Shop", icon: "keyboard_arrow_right" },
  { key: "estd", type: FILLABLE_TYPE.DATE, label: "Estd of Shop", icon: "keyboard_arrow_right" },
  { key: "details", type: FILLABLE_TYPE.TEXT_FIELD, label: "Detail of Business", icon: "keyboard_arrow_right" },
  { key: "ac_rooms", type: FILLABLE_TYPE.TEXT_FIELD, label: "No of AC Room", icon: "keyboard_arrow_right" },
  { key: "non_ac_rooms", type: FILLABLE_TYPE.TEXT_FIELD, label: "No of Non AC Room", icon: "keyboard_arrow_right" },
  { key: "conference_halls", type: FILLABLE_TYPE.TEXT_FIELD, label: "Conference Hall", icon: "keyboard_arrow_right" },
  { key: "banquet_halls", type: FILLABLE_TYPE.TEXT_FIELD, label: "Banquet Hall", icon: "keyboard_arrow_right" },
  { key: "other_facilities", type: FILLABLE_TYPE.TEXT_FIELD, label: "Facilities", icon: "keyboard_arrow_right" },
  { key: "premised_type", type: FILLABLE_TYPE.RADIO, label: "Whether Premised is Owned or Leased", icon: "keyboard_arrow_right" },
  { key: "passport", type: FILLABLE_TYPE.PASSPORT, label: "Photograph of Applicant", icon: "keyboard_arrow_right" },
]