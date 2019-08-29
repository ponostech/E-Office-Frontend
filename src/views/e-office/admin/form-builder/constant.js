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
  TEXT_FIELD: "text_field",
  LOCAL_COUNCIL:"local_council",
  TRADE:"trade",
};

export const SHOP_FILLABLE=[
  { key: "owner", type: "text", label: "Name of Applicant", icon: "close" },
  { key: "owner_address", type: "address", label: "Address of Applicant", icon: "close" },
  { key: "phone", type: "text", label: "Applicant Phone No", icon: "close" },
  { key: "applicant_type", type: "text", label: "Type of Applicant", icon: "close" },
  { key: "name", type: "text", label: "Name of Shop", icon: "close" },
  { key: "address", type: "text", label: "Address of Shop", icon: "close" },
  { key: "local_council", type: "text", label: "Local Council of Shop", icon: "close" },
  { key: "location", type: "text", label: "Coordinate of Shop", icon: "close" },
  { key: "estd", type: "text", label: "Estd of Shop", icon: "close" },
  { key: "details", type: "text", label: "Detail of Business", icon: "close" },
  { key: "premised_type", type: "text", label: "Whether Premised is Owned or Leased", icon: "close" },
  { key: "passport", type: "text", label: "Photograph of Applicant", icon: "close" },
]