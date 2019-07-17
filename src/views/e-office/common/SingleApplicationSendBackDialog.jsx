import React, { Component } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
  List,
  Slide,
  TextField,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import DetailViewRow from "./DetailViewRow";
import { getApplicationTitle } from "../files/dialog/common/ApplicationResolver";
import PropTypes from "prop-types";
import FileUpload from "../../../components/FileUpload";

const styles = {
  appBar: {
    position: "relative"
  },
  actionsContainer: {
    marginBottom: 6
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SingleApplicationSendBackDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: "",
      reason: "",
      attachment: null

    };
  }

  handleSend = (e) => {
    const { reason, attachment } = this.state;
    const { application } = this.props;
    let data = {
      application_id: application.id,
      application_type: application.type,
      text: reason,
      attachment
    };
    this.props.sendBackApplication(data);
  };

  render() {
    const { application, classes, onClose, open } = this.props;
    const { reason } = this.state;
    let detail = getApplicationTitle(application);
    return (
      <Dialog maxWidth={"md"} open={open} TransitionComponent={Transition} onClose={onClose} fullWidth={true}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close" href={"#"}>
              <Icon>close</Icon>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Send Back Application
            </Typography>
            <Button href={"#"} onClick={this.props.onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <List>
            <DetailViewRow primary={"TO"} secondary={detail.title}/>
          </List>
          <FileUpload
            required={true}
            applicationName={"sendback-messages"}
            onUploadSuccess={(data) => {
              this.setState(state => {
                state.attachment = data.location;
              });
            }} onUploadFailure={(e) => {
            console.log(e);
          }} document={
            { id: new Date().getTime(), name: "Attachment", mime: "application/pdf", mandatory: 0 }
          }/>
          <TextField label={"Reason"} value={reason} required={true} fullWidth={true} multiline={true} rows={5}
                     name={"reason"}
                     variant={"outlined"}
                     onChange={event => this.setState({ reason: event.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={!Boolean(reason)} href={"#"} variant={"contained"} color={"primary"}
                  onClick={e => this.handleSend()}>Send
            back</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SingleApplicationSendBackDialog.propTypes = {
  application: PropTypes.object.isRequired,
  sendBackApplication: PropTypes.func.isRequired
};
export default withStyles(styles)(SingleApplicationSendBackDialog);