import React, {Component} from "reactn";
import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormLabel, Grid,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import FileUpload from "../../../../../components/FileUpload";
import {LoginService} from "../../../../../services/LoginService";
import OfficeSnackbar from "../../../../../components/OfficeSnackbar";
import TextEditor from "../../../common/Editor";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  editor: {
    minHeight: 200
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SendMessageDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      message: "",
      attachment: null,

      subjectError: "",
      messageError: "",

      document: {id: new Date().getTime(), name: "Attachment", mime: "application/pdf", mandatory: 0}

    };
  }

  clear = () => this.setState({
    subject: "",
    message: "",
    attachment: null,
    document: {id: new Date().getTime(), name: "Attachment", mime: "application/pdf", mandatory: 0}
  })


  onChange = (name, event) => this.setState({[name]: event.target.value});
  onBlur = (name, event) => {
    switch (name) {
      case "subject":
        event.target.value === "" ? this.setState({subjectError: "Subject is required"}) : this.setState({subjectError: ""});
        break;
      case "message":
        event.target.value === "" ? this.setState({messageError: "Message is required"}) : this.setState({messageError: ""});
        break;
      default:
        break;
    }
  };
  handleMessage = () => {
    const {application} = this.props;
    const {subject, message, attachment} = this.state;
    //type error might be occur
    let msg = {
      text: message,
      sender_id: LoginService.getCurrentUser().id,
      subject,
      messageable_id: application.id,
      messageable_type: application.file.fileable_type,
      attachment
    };
    this.clear()
    this.props.onMessageSend(msg);
  };

  render() {
    const {onMessageSend, open, onClose, classes} = this.props;
    const {errorMessage, successMessage, subject, message, attachment, messageError, subjectError} = this.state;

    return (
        <>
          <Dialog
              fullWidth={true}
              maxWidth={"md"}
              open={open}
              onClose={onClose}
              TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton href={"#"} color="inherit" onClick={event => onClose()} aria-label="Close">
                  <CloseIcon/>
                </IconButton>
                <Typography variant="subtitle2" color="inherit" className={classes.flex}>
                  Send Message
                </Typography>
                <Button href={"#"} onClick={event => onClose()} color="inherit">
                  Close
                </Button>
              </Toolbar>
            </AppBar>
            <DialogContent>

              <Grid container={true} spacing={3}>
                <Grid item={true} md={12}>
                  <TextField margin={"dense"}
                             value={subject}
                             variant={"outlined"}
                             label={"Subject"}
                             required={true}
                             fullWidth={true}
                             error={Boolean(subjectError)}
                             helperText={subjectError}
                             onChange={event => this.onChange("subject", event)}
                             onBlur={event => this.onBlur("subject", event)}
                  />
                </Grid>
                <Grid item={true} md={12}>
                  {/*<TextField margin={"dense"}*/}
                  {/*           value={message}*/}
                  {/*           multiline={true}*/}
                  {/*           rows={5}*/}
                  {/*           variant={"outlined"}*/}
                  {/*           label={"Message"}*/}
                  {/*           required={true}*/}
                  {/*           fullWidth={true}*/}
                  {/*           error={Boolean(messageError)}*/}
                  {/*           helperText={messageError}*/}
                  {/*           onChange={event => this.onChange("message", event)}*/}
                  {/*           onBlur={event => this.onBlur("message", event)}*/}
                  <TextEditor onChange={(e) => this.setState({content: e.target.getContent()})} default={message}/>
                </Grid>
                <Grid item={true} md={12}>
                  <FileUpload
                      required={true}
                      applicationName={"application-messages"}
                      onUploadSuccess={(data) => {
                        this.setState(state => {
                          state.attachment = data.location;
                        });
                      }} onUploadFailure={(e) => {
                    console.error(e);
                  }} document={
                    this.state.document
                  }/>
                </Grid>
              </Grid>

            </DialogContent>
            <Divider component={"li"}/>
            <DialogActions>
              <Button disabled={!Boolean(subject) || !Boolean(message)} href={"#"} color={"primary"}
                      variant={"contained"}
                      onClick={this.handleMessage.bind(this)}>Send</Button>
              <Button href={"#"} variant={"contained"} color={"secondary"} onClick={onClose}>Close</Button>
            </DialogActions>
          </Dialog>


        </>
    );
  }
}

SendMessageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  onMessageSend: PropTypes.func.isRequired
};
export default withStyles(styles)(SendMessageDialog);
