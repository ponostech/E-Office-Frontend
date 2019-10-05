import React from "reactn";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Icon
} from "@material-ui/core";
import axios from "axios";
import DialogWrapper from "../e-office/files/dialog/common/DialogWrapper";
import Grid from "@material-ui/core/Grid";
import {AttachFile} from "@material-ui/icons";
import ListSubheader from "@material-ui/core/ListSubheader";
import ApplicationService from "../../services/ApplicationService";
import SendMessageDialog from "../e-office/files/dialog/common/SendMessageDialog";
import SubmitDialog from "../../components/SubmitDialog";
import ApplicationResolver from "../e-office/files/dialog/common/ApplicationResolver";
import ImposedFineDialog from "../e-office/files/dialog/ImposedFineDialog";
import {LoginService} from "../../services/LoginService";
import Tooltip from "@material-ui/core/Tooltip"
import ApplicationFieldHistoriesDialog from "../e-office/applications/ApplicationFieldHistoriesDialog"

class ApplicationDetailsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: false,
      openFine: false,
      openFieldHistory: false,
      currentFieldDetails: null,
      submit: false,
      submitTitle: "Submit",

      errorMessage: "",
      successMessage: ""
    };
    this.applicationService = new ApplicationService();
  }

  sendMessage = (msg) => {
    this.setState({openMessage: false});
    this.setState({submit: true, submitTitle: "Sending Message"});
    this.applicationService.sendMessage(msg,
        errorMsg => this.setGlobal({errorMsg}),
        successMsg => this.setGlobal({successMsg}))
        .finally(() => this.setState({submit: false}));
    console.log(msg);
  };

  imposeFine = (data) => {
    this.setState({openFineDialog: false});
    this.setState({submit: true, submitTitle: "Impose Fine"});
    this.applicationService.imposeFine(data,
        errorMsg => this.setGlobal({errorMsg}),
        successMsg => this.setGlobal({successMsg}))
        .finally(() => this.setState({submit: false}));
  };

  checkFieldHistory = (value) => {
    axios.get(`application/${this.props.application.id}/logs`, {
      params: {
        type: this.props.type,
        field_name: value.field
      }
    })
        .then(res => {
          if (res.data) this.setState({openFieldHistory: true, currentFieldDetails: {response: res.data, field: value}})
          else console.log('Error')
        })
        .catch(err => console.log('Error'))
  }

  render() {
    const {application, open, title, file, type, onClose} = this.props;
    const {openMessage, submit, submitTitle, openFine, openFieldHistory, currentFieldDetails} = this.state;
    let allowed = LoginService.getCurrentUser() === null ? false : LoginService.getCurrentUser().id === file.current_user_id;

    const action = <>
      {allowed && <Button onClick={e => this.setState({openMessage: true})} color='primary'>Send Message</Button>}
      {allowed && <Button onClick={e => this.setState({openFine: true})} color='primary'>Impose Fine</Button>}
      <Button onClick={onClose} color='secondary'>Close</Button>
    </>;

    let LEFT_ITEMS = ApplicationResolver(application);

    let leftRow = LEFT_ITEMS.map(val => <DetailViewRow checkFieldHistory={this.checkFieldHistory} changed={val.changed}
                                                       field={val.field} key={val.key} primary={val.name}
                                                       secondary={val.value}/>);

    let documents = application === null ? [] : application.documents ?
        application.documents.map(val => <FileViewRow key={val.id} data={val}/>) : [];
    let additionalDocument = application === null ? [] : application.addl_documents ?
        application.addl_documents.map(val => <FileViewRow key={val.id} data={val}/>) : [];

    let content =
        <Grid container>
          <Grid item md>{leftRow}</Grid>
          <Grid item md>
            <img style={{width: 300}} src={application ? application.passport : ""} alt="Photograph of Applicant"/>
            <List subheader={<ListSubheader>Documents</ListSubheader>}><Divider/>{documents}</List>
            <List subheader={<ListSubheader>Additional Document</ListSubheader>}><Divider/>{additionalDocument}</List>
          </Grid>
        </Grid>;

    return (
        <>
          <DialogWrapper open={open} title={title} content={content} onClose={onClose} action={action}/>

          <SubmitDialog open={submit} text={"Please wait..."} title={submitTitle}/>
          <SendMessageDialog application={application} open={openMessage}
                             onClose={e => this.setState({openMessage: false})} onMessageSend={this.sendMessage}/>
          <ImposedFineDialog onClose={() => this.setState({openFine: false})} open={openFine} file={this.props.file}
                             application={application}
                             imposeFine={this.imposeFine}/>

          {openFieldHistory ? <ApplicationFieldHistoriesDialog data={currentFieldDetails} open={openFieldHistory}
                                                               onClose={() => this.setState({openFieldHistory: false})}/> : null}
        </>
    );
  }
}

export const DetailViewRow = (props) => {
  return (
      <>
        <ListItem onClick={() => props.checkFieldHistory(props)} button>
          <ListItemText primary={props.primary} secondary={props.secondary}/>
          {props.changed ? <ListItemSecondaryAction>
            <Tooltip title='Field changed. Click to view details'>
              <Icon color='secondary'>notification_important</Icon>
            </Tooltip>
          </ListItemSecondaryAction> : null}
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