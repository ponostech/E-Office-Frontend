export const FILE_STATUS = {
  NEW: "new",
  INACTIVE: "in-active",
  ACTIVE: "active"
};
export const APPLICATION_NAME = {
  HOARDING: "HOARDING",
  KIOSK: "KIOSK",
  BANNER: "BANNER",
  SHOP: "SHOP",
  HOTEL: "HOTEL",
  ADVERTISER: "ADVERTISER"
};
export const FormatStaff = (staffs) => {
  const user_id = JSON.parse(localStorage.getItem('current_user')).id;
  return staffs.filter(function (obj) {
    return obj.id !== user_id;
  })
      .map(obj => {
        let temp = {};
        temp['value'] = obj.id;
        temp['label'] = obj.staff.name + " (" + obj.staff.designation + ")";
        return temp;
      });
};