export const FILE_STATUS = {
  NEW: "new",
  INACTIVE: "in-active",
  ACTIVE: "active"
};
export const APPLICATION_NAME = {
  HOARDING: "hoardings",
  KIOSK: "kiosks",
  BANNER: "banners",
  SHOP: "shops",
  HOTEL: "hotels",
  ADVERTISER: "advertisers",
  RECEIPT: "receipts"
};
export const FormatStaff = (staffs) => {
  const user_id = JSON.parse(localStorage.getItem('current_user')).id;
  return staffs.filter(function (obj) {
    console.log('role', obj)
    return obj.id !== user_id && obj.roles[0].slug !== 'administrator';
  })
      .map(obj => {
        let temp = {};
        temp['value'] = obj.id;
        temp['label'] = obj.staff.name + " (" + obj.staff.designation + ")";
        return temp;
      });
};