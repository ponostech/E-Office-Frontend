import React from "react";
import {Button, Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import DialogWrapper from "../e-office/files/dialog/common/DialogWrapper";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import {AttachFile} from "@material-ui/icons";
import ListSubheader from "@material-ui/core/ListSubheader";

const ApplicationDetailsDialog = (props) => {
  const action = <>
    <Button onClick={props.onClose} color='primary'>Approve Application</Button>
    <Button onClick={props.onClose} color='primary'>Send Message</Button>
    <Button onClick={props.onClose} color='secondary'>Close</Button>
  </>;
  let LEFT_ITEMS = [];
  switch (props.type) {
    case "App\\Banner" :
      LEFT_ITEMS = [
        {key: "Date", value: moment(props.content.created_at).format("Do MMM YYYY")},
        {key: "Name", value: props.content.name},
        {key: "Phone", value: props.content.phone},
        {key: "Type of Applicant", value: props.content.applicant_type},
        {key: "Address", value: props.content.address},
        {key: "Type of Advertisement", value: props.content.advertisement_type},
        {key: "Content/Wording", value: props.content.content ? props.content.content : "NA"},
        {key: "Detail", value: props.content.detail ? props.content.detail : "NA"},
        {key: "Application Date", value: moment(props.content.created_at).format("Do MMMM YYYY")},
        {key: "Applicant Status", value: props.content.status.toUpperCase()}
      ];
      break;
    case "App\\Kiosk" :
      LEFT_ITEMS = [
        {key: "License No.", value: props.content.applicant.advertiser.license_no},
        {key: "Name of Applicant", value: props.content.applicant.advertiser.name},
        {key: "Applicant Type", value: props.content.applicant.advertiser.type.toUpperCase()},
        {key: "Date", value: moment(props.content.kiosk.created_at).format("Do MMM YYYY")},
        {key: "Address", value: props.content.applicant.advertiser.address},
        {key: "Local Council", value: props.content.kiosk.local_council.name},
        {key: "Length", value: props.content.kiosk.length + " ft"},
        {key: "Height", value: props.content.kiosk.height + " ft"},
        {key: "Both Sided", value: props.content.kiosk.both_side ? "Yes" : "No"},
        {key: "Collapsible", value: props.content.kiosk.collapsible ? "Yes" : "No"},
        {
          key: "Ground Clearance",
          value: props.content.kiosk.ground_clearance ? props.content.kiosk.ground_clearance : "NA"
        },
        {
          key: "Road Detail",
          value: props.content.kiosk.road_detail ? props.content.kiosk.road_detail : "NA"
        },
        {key: "Both Sided", value: props.content.kiosk.both_side ? "Yes" : "No"},
        {key: "Display Type", value: props.content.kiosk.display_type},
        {key: "Name of Landowner", value: props.content.kiosk.land_owner_name},
        {key: "Type of Landowner", value: props.content.kiosk.land_owner_type ? "Public" : "Private"},
        {key: "Application Date", value: moment(props.content.created_at).format("Do MMMM YYYY")},
        {key: "Applicant Status", value: props.content.kiosk.status.toUpperCase()}
      ];
      break;
    case "App\\Hoarding" :
      LEFT_ITEMS = [
        {key: "License No.", value: props.content.applicant.advertiser.license_no},
        {key: "Name of Applicant", value: props.content.applicant.advertiser.name},
        {key: "Applicant Type", value: props.content.applicant.advertiser.type.toUpperCase()},
        {key: "Date", value: moment(props.content.hoarding.created_at).format("Do MMM YYYY")},
        {key: "Address", value: props.content.applicant.advertiser.address},
        {key: "Local Council", value: props.content.hoarding.local_council.name},
        {key: "Length", value: props.content.hoarding.length + " ft"},
        {key: "Height", value: props.content.hoarding.height + " ft"},
        {key: "Both Sided", value: props.content.hoarding.both_side ? "Yes" : "No"},
        {key: "Collapsible", value: props.content.hoarding.collapsible ? "Yes" : "No"},
        {
          key: "Ground Clearance",
          value: props.content.hoarding.ground_clearance ? props.content.hoarding.ground_clearance : "NA"
        },
        {
          key: "Road Detail",
          value: props.content.hoarding.road_detail ? props.content.hoarding.road_detail : "NA"
        },
        {key: "Both Sided", value: props.content.hoarding.both_side ? "Yes" : "No"},
        {key: "Display Type", value: props.content.hoarding.display_type},
        {key: "Name of Landowner", value: props.content.hoarding.land_owner_name},
        {key: "Type of Landowner", value: props.content.hoarding.land_owner_type ? "Public" : "Private"},
        {key: "Application Date", value: moment(props.content.created_at).format("Do MMMM YYYY")},
        {key: "Applicant Status", value: props.content.hoarding.status.toUpperCase()}
      ];
      break;
    case "App\\Hotel" :
      LEFT_ITEMS = [
        {key: "Name of Applicant", value: props.content.owner},
        {key: "Address of Applicant", value: props.content.owner_address},
        {key: "Owner Type", value: props.content.type.toUpperCase()},
        {key: "Phone", value: props.content.phone},
        {key: "Email", value: props.content.email},
        {key: "Tin No.", value: props.content.tin_no},
        {key: "CST No.", value: props.content.cst_no},
        {key: "PAN No.", value: props.content.pan_no},
        {key: "GST No.", value: props.content.gst_no},
        {key: "Premise Type", value: props.content.premise_type},
        {key: "Details", value: props.content.details},
        {key: "Date of Establishment", value: props.content.estd},
        {key: "Name of Shop", value: props.content.name},
        {key: "Address of Shop", value: props.content.address},
        {key: "Application Date", value: moment(props.content.created_at).format("Do MMMM YYYY")}
      ];
      break;
    case "App\\Shop" :
      LEFT_ITEMS = [
        {key: "Name of Applicant", value: props.content.owner},
        {key: "Address of Applicant", value: props.content.owner_address},
        {key: "Owner Type", value: props.content.type.toUpperCase()},
        {key: "Phone", value: props.content.phone},
        {key: "Email", value: props.content.email},
        {key: "Tin No.", value: props.content.tin_no},
        {key: "CST No.", value: props.content.cst_no},
        {key: "PAN No.", value: props.content.pan_no},
        {key: "GST No.", value: props.content.gst_no},
        {key: "Premise Type", value: props.content.premise_type},
        {key: "Details", value: props.content.details},
        {key: "Date of Establishment", value: props.content.estd},
        {key: "Name of Shop", value: props.content.name},
        {key: "Address of Shop", value: props.content.address},
        {key: "Application Date", value: moment(props.content.created_at).format("Do MMMM YYYY")}
      ];
      break;
    default:
      LEFT_ITEMS = [
        {key: "Not Found", value: "Not found"}
      ];
      break;
  }

  let leftRow = LEFT_ITEMS.map(val => <DetailViewRow key={val.key} primary={val.key} secondary={val.value}/>);

  let documents = props.content.documents ? props.content.documents.map(val => <FileViewRow key={val.id}
                                                                                            data={val}/>) : [];

  let content =
      <Grid container>
        <Grid item md>{leftRow}</Grid>
        <Grid item md>
          <img style={{width: 300}} src={props.content.passport} alt="Photograph of Applicant"/>
          <List subheader={<ListSubheader>Documents</ListSubheader>}><Divider/>{documents}</List>
        </Grid>
      </Grid>;

  return (
      <>
        <DialogWrapper open={props.open} title={props.title} content={content} onClose={props.onClose} action={action}/>
      </>
  );
};


export const DetailViewRow = (props) => {
  return (
      <>
        <ListItem onClick={props.click ? props.click.bind(this, props.value) : null} button>
          <ListItemText primary={props.primary} secondary={props.secondary}/>
        </ListItem>
        <Divider/>
      </>
  );
};

export const openDocs = (url) => window.open(url).focus();

export const FileViewRow = (props) => {
  return (
      <>
        <ListItem onClick={() => openDocs(props.data.path)}>
          <ListItemIcon>
            <AttachFile/>
          </ListItemIcon>
          <ListItemText primary={props.data.name}/>
        </ListItem>
        <Divider/>
      </>
  );
};

export default ApplicationDetailsDialog;