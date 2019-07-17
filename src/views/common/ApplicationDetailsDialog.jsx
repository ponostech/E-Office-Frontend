import React from "reactn";
import { Button, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DialogWrapper from "../e-office/files/dialog/common/DialogWrapper";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { AttachFile } from "@material-ui/icons";
import ListSubheader from "@material-ui/core/ListSubheader";
import ApplicationService from "../../services/ApplicationService";
import SendMessageDialog from "../e-office/files/dialog/common/SendMessageDialog";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import ApplicationResolver from "../e-office/files/dialog/common/ApplicationResolver";

class ApplicationDetailsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: false,
      submit: false,
      submitTitle: "Submit",

      errorMessage: "",
      successMessage: ""
    };
    this.applicationService = new ApplicationService();
  }

  sendMessage = (msg) => {
    this.setState({ openMessage: false });
    this.setState({ submit: true, submitTitle: "Sending Message" });
    this.applicationService.sendMessage(msg,
      errorMsg => this.setGlobal({ errorMsg }),
      successMsg => this.setGlobal({ successMsg }))
      .finally(() => this.setState({ submit: false }));
    console.log(msg);
  };

  render() {
    const { application, open, title, type, onClose } = this.props;
    const { openMessage, submit, submitTitle, errorMessage, successMessage } = this.state;

    const action = <>
      <Button onClick={onClose} color='primary'>Approve Application</Button>
      <Button onClick={e => this.setState({ openMessage: true })} color='primary'>Send Message</Button>
      <Button onClick={onClose} color='secondary'>Close</Button>
    </>;
    let LEFT_ITEMS = ApplicationResolver(application)

    let leftRow = LEFT_ITEMS.map(val => <DetailViewRow key={val.key} primary={val.key} secondary={val.value}/>);

    let documents = application.documents ? application.documents.map(val => <FileViewRow key={val.id}
                                                                                          data={val}/>) : [];

    let content =
      <Grid container>
        <Grid item md>{leftRow}</Grid>
        <Grid item md>
          <img style={{ width: 300 }} src={application.passport} alt="Photograph of Applicant"/>
          <List subheader={<ListSubheader>Documents</ListSubheader>}><Divider/>{documents}</List>
        </Grid>
      </Grid>;


    return (
      <>
        <DialogWrapper open={open} title={title} content={content} onClose={onClose} action={action}/>

        <SubmitDialog open={submit} text={"Please wait..."} title={submitTitle}/>
        <SendMessageDialog application={application} open={openMessage}
                           onClose={e => this.setState({ openMessage: false })} onMessageSend={this.sendMessage}/>

        <OfficeSnackbar open={Boolean(errorMessage)} onClose={e => this.setState({ errorMessage: "" })}
                        variant={"error"} message={errorMessage}/>
        <OfficeSnackbar open={Boolean(successMessage)} onClose={e => this.setState({ errorMessage: "" })}
                        variant={"error"} message={successMessage}/>
      </>
    );
  }
}

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