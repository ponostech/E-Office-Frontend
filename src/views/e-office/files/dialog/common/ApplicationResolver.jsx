import {FILEABLE_TYPE} from "../../details/Views/FileApplicationDetails";
import moment from "moment";

export const getApplicantDetail = (application) => {

}

export const getApplicationTitle = (application, fileableType) => {
  let title = "";
  let subtitle = "";

  if (!Boolean(application)) {
    return {title: "", subtitle: ""}
  }
  switch (fileableType) {
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
  return {title, subtitle};
}
export const ApplicationResolver = (application, fileableType) => {
  // console.log('app', application)
  if (application === null)
    return [];
  // const {fileableType} = application.file;
  let rows = [];

  switch (fileableType) {
    case FILEABLE_TYPE.KIOSK:
      rows.push(
          {name: "Date of Application", value: moment(application.application_date).format("Do MMM YYYY (\dddd\)")},
          {name: "Address of Proposed Kiosk", value: application.address},
          {name: "Local Council", value: application.local_council.name},
          {name: "Length", value: application.length + " ft"},
          {name: "Height", value: application.height + " ft"},
          {name: "Ground Clearance", value: application.ground_clearance ? application.ground_clearance : "N/A"},
          {name: "Road Detail", value: application.road_detail ? application.road_detail : "N/A"},
          {name: "Both Sided", value: application.both_side ? "Yes" : "No"},
          {name: "Collapsible", value: application.collapsible ? "Yes" : "No"},
          {name: "Display Type", value: application.display_type},
          {name: "Name of Landowner", value: application.land_owner_name},
          {name: "Type of Landowner", value: application.land_owner_type ? "Public" : "Private"}
      );
      break;
    case FILEABLE_TYPE.HOARDING:
      rows.push(
          {name: "Date of Application", value: moment(application.application_date).format("Do MMM YYYY (\dddd\)")},
          {name: "Address of Proposed Hoarding", value: application.address},
          {name: "Local Council", value: application.local_council.name},
          {name: "Length", value: application.length + " ft"},
          {name: "Height", value: application.height + " ft"},
          {name: "Ground Clearance", value: application.ground_clearance ? application.ground_clearance : "N/A"},
          {name: "Road Detail", value: application.road_detail ? application.road_detail : "N/A"},
          {name: "Both Sided", value: application.both_side ? "Yes" : "No"},
          {name: "Display Type", value: application.display_type},
          {name: "Name of Landowner", value: application.land_owner_name},
          {name: "Type of Landowner", value: application.land_owner_type ? "Public" : "Private"}
      );
      break;
    case FILEABLE_TYPE.BANNER:
      rows.push(
          {name: "Date of Application", value: moment(application.application_date).format("Do MMM YYYY (\dddd\)")},
          {name: "Name of Applicant", value: application.name},
          {name: "Phone", value: application.phone},
          {name: "Type of Applicant", value: application.applicant_type},
          {name: "Address", value: application.address},
          {name: "Type of Advertisement", value: application.advertisement_type},
          {name: "Content/Wording", value: application.content ? application.content : "N/A"},
          {name: "Detail", value: application.detail ? application.detail : "N/A"}
      );
      let tableData = [];
      application.advertisements.map(item => tableData.push(
          [item.length, item.height, item.locations, moment(item.from).format("Do MMM YYYY (\dddd\)"), moment(item.to).format("Do MMM YYYY (\dddd\)")]
      ));
      break;
    case FILEABLE_TYPE.SHOP:
      rows.push(
          {
            name: "Application Status",
            value: application.status.toUpperCase()
          },
          {
            changed: application.field_changes.indexOf('application_date') !== -1,
            field: 'application_date',
            name: "Date of Application",
            value: moment(application.application_date).format("Do MMM YYYY (\dddd\)")
          },
          {
            changed: application.field_changes.indexOf('owner') !== -1,
            field: 'owner',
            name: "Name of Owner",
            value: application.owner
          },
          {
            changed: application.field_changes.indexOf('phone') !== -1,
            field: 'phone',
            name: "Phone",
            value: application.phone
          },
          {
            changed: application.field_changes.indexOf('email') !== -1,
            field: 'email',
            name: "Email",
            value: application.email
          },
          {
            changed: application.field_changes.indexOf('owner_address') !== -1,
            field: 'owner_address',
            name: "Address of Applicant",
            value: application.owner_address
          },
          {
            changed: application.field_changes.indexOf('type') !== -1,
            field: 'type',
            name: "Type of Applicant",
            value: application.type.toUpperCase()
          },
          {
            changed: application.field_changes.indexOf('name') !== -1,
            field: 'name',
            name: "Name of Shop",
            value: application.name
          },
          {
            changed: application.field_changes.indexOf('trade_id') !== -1,
            field: 'trade_id',
            name: "Name of Trade",
            value: application.trade.name
          },
          {
            changed: application.field_changes.indexOf('address') !== -1,
            field: 'address',
            name: "Proposed Location",
            value: application.address
          },
          {
            changed: application.field_changes.indexOf('local_council_id') !== -1,
            field: 'local_council_id',
            name: "Local Council",
            value: application.local_council.name
          },
          {
            changed: application.field_changes.indexOf('details') !== -1,
            field: 'details',
            name: "Details of Business",
            value: application.details ? application.details : "N/A"
          },
          {
            changed: application.field_changes.indexOf('estd') !== -1,
            field: 'estd',
            name: "ESTD",
            value: moment(application.estd).format("Do MMM YYYY (\dddd\)")
          },
          {
            changed: application.field_changes.indexOf('tin_no') !== -1,
            field: 'tin_no',
            name: "TIN",
            value: application.tin_no ? application.tin_no : "N/A"
          },
          {
            changed: application.field_changes.indexOf('cst_no') !== -1,
            field: 'cst_no',
            name: "CST",
            value: application.cst_no ? application.cst_no : "N/A"
          },
          {
            changed: application.field_changes.indexOf('gst_no') !== -1,
            field: 'gst_no',
            name: "GST",
            value: application.gst_no ? application.gst_no : "N/A"
          },
          {
            changed: application.field_changes.indexOf('pan_no') !== -1,
            field: 'pan_no',
            name: "PAN",
            value: application.pan_no ? application.pan_no : "N/A"
          },
          {
            changed: application.field_changes.indexOf('premise_type') !== -1,
            field: 'premise_type',
            name: "Type of Premised",
            value: application.premise_type
          }
      );
      break;
    case FILEABLE_TYPE.HOTEL:
      rows.push(
          {name: "Date of Application", value: moment(application.application_date).format("Do MMM YYYY (\dddd\)")},
          {name: "Name of Owner", value: application.owner},
          {name: "Phone", value: application.phone},
          {name: "Email", value: application.email},
          {name: "Address of Applicant", value: application.owner_address},
          {name: "Type of Applicant", value: application.type},
          {name: "Name of the Shop", value: application.name},
          // {name: "Name of Trade", value: application.trade.name},
          {name: "Proposed Location", value: application.address},
          {name: "Local Council", value: application.local_council.name},
          {name: "Details of Business", value: application.details ? application.details : "N/A"},
          {name: "ESTD", value: moment(application.estd).format("Do MMM YYYY (\dddd\)")},
          {name: "TIN", value: application.tin_no ? application.tin_no : "N/A"},
          {name: "CST", value: application.cst_no ? application.cst_no : "N/A"},
          {name: "GST", value: application.gst_no ? application.gst_no : "N/A"},
          {name: "PAN", value: application.pan_no ? application.pan_no : "N/A"},
          {name: "No of AC Room", value: application.ac_rooms},
          {name: "No of Non AC Room", value: application.non_ac_rooms},
          {name: "No of Conference Hall", value: application.conference_halls},
          {name: "No of Banquet", value: application.banquet_halls},
          {name: "Facilities", value: application.facilities ? application.facilities : "N/A"},
          {name: "Type of Premised", value: application.premise_type}
      );
      break;
  }
  return rows;
}
export default ApplicationResolver