
export const FILE_STATUS ={
  NEW:"new",
  INACTIVE:"in-active",
  ACTIVE:"active"
}
export const APPLICATION_NAME ={
  HOARDING:"hoarding",
  KIOSK:"kiosk",
  BANNER:"banner",
  SHOP:"shop",
  HOTEL:"hotel",
  ADVERTISER:"advertiser"
}
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