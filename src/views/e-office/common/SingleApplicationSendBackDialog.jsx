import React, { Component } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton, Slide,
  TextField,
  Toolbar,List,
  Typography, withStyles
} from "@material-ui/core";
import DetailViewRow from "./DetailViewRow";
import { getApplicationTitle } from "../files/dialog/common/ApplicationResolver";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";

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
      reason: ""
    };
  }

  handleSend = (e) => {
    const { reason } = this.state;
    this.props.sendBackApplication(reason);
  };

  render() {
    const { application,classes,onClose,open } = this.props;
    const { reason } = this.state;
    let detail = getApplicationTitle(application);
    return (
      <Dialog  maxWidth={"md"} open={open} TransitionComponent={Transition} onClose={onClose} fullWidth={true}>

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
            <TextField label={"Reason"} value={reason} required={true} fullWidth={true} multiline={true} rows={5} name={"reason"}
                       variant={"outlined"}
                       onChange={event => this.setState({ reason: event.target.value })}
            />
        </DialogContent>
        <DialogActions>
          <Button disabled={!Boolean(reason)} href={"#"} variant={"contained"} color={"primary"} onClick={this.handleSend.bind(this)}>Send
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
export default withStyles(styles) (SingleApplicationSendBackDialog);