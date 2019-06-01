import React from 'react';
import {Button, Divider, ListItem, ListItemIcon, ListItemText, List} from "@material-ui/core";
import DialogWrapper from "../e-office/files/dialog/common/DialogWrapper";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import {AttachFile} from "@material-ui/icons";
import ListSubheader from "@material-ui/core/ListSubheader";

const ApplicationDetailsDialog = (props) => {
  const action = <Button onClick={props.onClose} color='secondary'>Close</Button>;
  let leftRow = '';

  if (props.content.hoarding) {
    const HOARDING = [
      {key: 'License No.', value: props.content.applicant.advertiser.license_no},
      {key: 'Name of Applicant', value: props.content.applicant.advertiser.name},
      {key: 'Address of Applicant', value: props.content.applicant.advertiser.address},
      {key: 'Applicant Type', value: props.content.applicant.advertiser.type},
      {key: 'Applicant Status', value: props.content.status.toUpperCase()},
      {key: 'Application Date', value: moment(props.content.created_at).format('Do MMMM YYYY')},
    ];

    leftRow = HOARDING.map(val => <DetailViewRow key={val.key} primary={val.key} secondary={val.value}/>);
  }
  let documents = props.content.documents.map(val => <FileViewRow key={val.id} data={val}/>);

  let content =
      <Grid container>
        <Grid item md>{leftRow}</Grid>
        <Grid item md>
          <List subheader={<ListSubheader>Documents</ListSubheader>}>{documents}</List></Grid>
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
      <ListItem onClick={() => openDocs(props.data.path)}>
        <ListItemIcon>
          <AttachFile/>
        </ListItemIcon>
        <ListItemText primary={props.data.name}/>
      </ListItem>
  )
};

export default ApplicationDetailsDialog;