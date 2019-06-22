import React from 'react';
import {Button, Divider, ListItem, ListItemIcon, ListItemText, List} from "@material-ui/core";
import DialogWrapper from "../e-office/files/dialog/common/DialogWrapper";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import {AttachFile} from "@material-ui/icons";
import ListSubheader from "@material-ui/core/ListSubheader";
import {FILEABLE_TYPE} from "../e-office/files/details/Views/FileApplicationDetails"

const ApplicationDetailsDialog = (props) => {
  const action = <Button onClick={props.onClose} color='secondary'>Close</Button>;
  let LEFT_ITEMS = [];
  switch (props.type) {
    case 'App\\Banner' :
      break
    case 'App\\Kiosk' :
      break
    case 'App\\Hoarding' :
      LEFT_ITEMS = [
        {key: 'License No.', value: props.content.applicant.advertiser.license_no},
        {key: 'Name of Applicant', value: props.content.applicant.advertiser.name},
        {key: 'Address of Applicant', value: props.content.applicant.advertiser.address},
        {key: 'Applicant Type', value: props.content.applicant.advertiser.type},
        {key: 'Applicant Status', value: props.content.status.toUpperCase()},
        {key: 'Application Date', value: moment(props.content.created_at).format('Do MMMM YYYY')},
      ];
      break;
    case 'App\\Hotel' :
      break
    case 'App\\Shop' :
      LEFT_ITEMS = [
        {key: 'Name of Applicant', value: props.content.owner},
        {key: 'Address of Applicant', value: props.content.owner_address},
        {key: 'Owner Type', value: props.content.type.toUpperCase()},
        {key: 'Phone', value: props.content.phone},
        {key: 'Email', value: props.content.email},
        {key: 'Tin No.', value: props.content.tin_no},
        {key: 'CST No.', value: props.content.cst_no},
        {key: 'PAN No.', value: props.content.pan_no},
        {key: 'GST No.', value: props.content.gst_no},
        {key: 'Premise Type', value: props.content.premise_type},
        {key: 'Details', value: props.content.details},
        {key: 'Date of Establishment', value: props.content.estd},
        {key: 'Name of Shop', value: props.content.name},
        {key: 'Address of Shop', value: props.content.address},
        {key: 'Application Date', value: moment(props.content.created_at).format('Do MMMM YYYY')},
      ];
      break
    default:
      LEFT_ITEMS = [
        {key: 'Not Found', value: 'Not found'},
      ];
      break
  }

  let leftRow = LEFT_ITEMS.map(val => <DetailViewRow key={val.key} primary={val.key} secondary={val.value}/>);

  let documents = props.content.documents.map(val => <FileViewRow key={val.id} data={val}/>);

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
  )
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
  )
};

export default ApplicationDetailsDialog;