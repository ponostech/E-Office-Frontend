import { FILEABLE_TYPE } from "../../details/Views/FileApplicationDetails";
import moment from "moment";

export const getApplicantDetail = (application)=>{

}
export const getApplicationTitle=(application)=>{
  let title = "";
  let subtitle = "";

  if (!Boolean(application)){
    return {title:"",subtitle:""}
  }
  switch (application.file.fileable_type) {
    case "App\\Shop":
      title = "Applicant: " + application.owner;
      subtitle = "Name of Shop: " + application.name;
      break;
    case "App\\Hotel":
      title = "Applicant: " + application.owner;
      subtitle = "Name of Hotel: " + application.name;
      break;
    case "App\\Hoarding":
      title = "Applicant: " + application.applicant.advertiser.name;
      subtitle = "Contact: " + application.applicant.phone_no;
      break;
    case "App\\Kiosk":
      title = "Applicant: " + application.applicant.advertiser.name;
      subtitle = "Contact: " + application.applicant.phone_no;
      break;
    case "App\\Banner":
      title = "Applicant: " + application.name;
      subtitle = "Contact: " + application.phone;
      break;
    default:
      title = "Not Found";
      subtitle = "Not found";
      break;
  }
  return {title,subtitle};
}
export const ApplicationResolver=(application)=> {
  if (application === null)
    return [];
  const { fileable_type } =application.file;
  let rows = [];

  switch (fileable_type) {
    case FILEABLE_TYPE.KIOSK:
      rows.push(
        { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
        { name: "Address", value: application.length },
        { name: "Local Council", value: application.local_council.name },
        { name: "Length", value: application.length + " ft" },
        { name: "Height", value: application.height + " ft" },
        { name: "Ground Clearance", value: application.ground_clearance ? application.ground_clearance : "NA" },
        { name: "Road Detail", value: application.road_detail ? application.road_detail : "NA" },
        { name: "Both Sided", value: application.both_side ? "Yes" : "No" },
        { name: "Collapsible", value: application.collapsible ? "Yes" : "No" },
        { name: "Display Type", value: application.display_type },
        { name: "Name of Landowner", value: application.land_owner_name },
        { name: "Type of Landowner", value: application.land_owner_type ? "Public" : "Private" }
      );
      break;
    case FILEABLE_TYPE.HOARDING:
      rows.push(
        { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
        { name: "Address", value: application.length },
        { name: "Local Council", value: application.local_council.name },
        { name: "Length", value: application.length + " ft" },
        { name: "Height", value: application.height + " ft" },
        { name: "Ground Clearance", value: application.ground_clearance ? application.ground_clearance : "NA" },
        { name: "Road Detail", value: application.road_detail ? application.road_detail : "NA" },
        { name: "Both Sided", value: application.both_side ? "Yes" : "No" },
        { name: "Display Type", value: application.display_type },
        { name: "Name of Landowner", value: application.land_owner_name },
        { name: "Type of Landowner", value: application.land_owner_type ? "Public" : "Private" }
      );
      break;
    case FILEABLE_TYPE.BANNER:
      rows.push(
        { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
        { name: "Name", value: application.name },
        { name: "Phone", value: application.phone },
        { name: "Type of Applicant", value: application.applicant_type },
        { name: "Address", value: application.address },
        { name: "Type of Advertisement", value: application.advertisement_type },
        { name: "Content/Wording", value: application.content ? application.content : "NA" },
        { name: "Detail", value: application.detail ? application.detail : "NA" }
      );
      let tableData = [];
      application.advertisements.map(item => tableData.push(
        [item.length, item.height, item.locations, moment(item.from).format("Do MMM YYYY"), moment(item.to).format("Do MMM YYYY")]
      ));
      break;
    case FILEABLE_TYPE.SHOP:
      rows.push(
        { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
        { name: "Name of Owner", value: application.owner },
        { name: "Phone", value: application.phone },
        { name: "Email", value: application.email },
        { name: "Address of Applicant", value: application.owner_address },
        { name: "Type of Applicant", value: application.type },
        { name: "Name of the Shop", value: application.name },
        // { name: "Name of Trade", value:application.trade.name},
        { name: "Proposed Location", value: application.address },
        { name: "Local Council", value: application.local_council.name },
        { name: "Details of Business", value: application.details ? application.details : "NA" },
        { name: "ESTD", value: moment(application.estd).format("Do MMM YYYY") },
        { name: "TIN", value: application.tin_no ? application.tin_no : "NA" },
        { name: "CST", value: application.cst_no ? application.cst_no : "NA" },
        { name: "GST", value: application.gst_no ? application.gst_no : "NA" },
        { name: "PAN", value: application.pan_no ? application.pan_no : "NA" },
        { name: "Type of Premised", value: application.premise_type }
      );
      break;
    case FILEABLE_TYPE.HOTEL:
      rows.push(
        { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
        { name: "Name of Owner", value: application.owner },
        { name: "Phone", value: application.phone },
        { name: "Email", value: application.email },
        { name: "Address of Applicant", value: application.owner_address },
        { name: "Type of Applicant", value: application.type },
        { name: "Name of the Shop", value: application.name },
        // { name: "Name of Trade", value:application.trade.name},
        { name: "Proposed Location", value: application.address },
        { name: "Local Council", value: application.local_council.name },
        { name: "Details of Business", value: application.details ? application.details : "NA" },
        { name: "ESTD", value: moment(application.estd).format("Do MMM YYYY") },
        { name: "TIN", value: application.tin_no ? application.tin_no : "NA" },
        { name: "CST", value: application.cst_no ? application.cst_no : "NA" },
        { name: "GST", value: application.gst_no ? application.gst_no : "NA" },
        { name: "PAN", value: application.pan_no ? application.pan_no : "NA" },
        { name: "No of AC Room", value: application.ac_rooms },
        { name: "No of Non AC Room", value: application.non_ac_rooms },
        { name: "No of Conference Hall", value: application.conference_halls },
        { name: "No of Banquet", value: application.banquet_halls },
        { name: "Facilities", value: application.facilities ? application.facilities : "NA" },
        { name: "Type of Premised", value: application.premise_type }
      );
      break;

  }
  return rows;
}
export default ApplicationResolver