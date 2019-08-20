import React, { Component } from "react";
import {
  AppBar,
  Button,
  CardHeader,
  Dialog, DialogActions,
  DialogContent,
  Divider, Grid,
  IconButton, Slide,
  TextField,
  Toolbar, Typography
} from "@material-ui/core";
import GridContainer from "./Grid/GridContainer";
import { OtpService } from "../services/OtpService";
import GridItem from "./Grid/GridItem";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
var timeout = null;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const style = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
};

class OtpDialog extends Component {
  otpService = new OtpService();

  state = {
    otp: "",

    errorMessage: "",
    submit: false,
    successMessage: ""
  };

  handleVerify = () => {
    this.verifyOtp();
    this.setState({ otp: "" });
    // this.props.onClose();
  };

  doClear=()=>{
    this.setState({
      otp: "",
      errorMessage: "",
      submit:false,
      successMessage:""
    })
  }

  handleResend = () => {
    const self = this;
    const { phone, purposed } = this.props;
    this.setState({ successMessage: "" });
    this.setState({ submit: true });
    timeout = setTimeout(function(resolve, reject) {
      self.otpService.requestOtp(phone, purposed,
        errorMessage => {
          self.setState({ errorMessage, successMessage: "" });
        },
        successMessage => self.setState({ successMessage, errorMessage: "" }))
        .finally(() => self.setState({ submit: false }));
    }, 3000);

  };

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { successMessage } = nextProps;
    this.setState({ successMessage });
  }

  verifyOtp = () => {
    const { phone, onClose } = this.props;
    this.setState({ submit: true });

    this.otpService.veriftOtp(phone, this.state.otp,
      errorMessage => {
        this.setState({ errorMessage });
      },
      successMessage => {
        this.setState({ successMessage });
        this.doClear();
        onClose(true);
      })
      .finally(() => this.setState({ submit: false }));
  };

  render() {
    const { open, onClose,classes } = this.props;
    const { successMessage } = this.state;

    return (
      <Dialog TransitionComponent={Transition} open={open} onClose={e=>onClose(null)} fullWidth={true} maxWidth={"sm"}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={e=>onClose(null)} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Enter OTP (One Time Password)
            </Typography>
            <Button href={"#"} onClick={event => onClose(null)} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <Divider component={"div"}/>

        <DialogContent>

              <TextField variant={"outlined"}
                         margin={"dense"}
                         placeholder={"Enter OTP"}
                         error={Boolean(this.state.errorMessage)}
                         helperText={this.state.errorMessage}
                         value={this.state.otp}
                         fullWidth={true}
                         onChange={(e) => {
                           this.setState({
                             otp: e.target.value
                           });
                         }}/>

              {
                Boolean(successMessage) ?
                  <p style={{ color: "green", marginTop: 20 }}>{successMessage}</p> : undefined
              }


        </DialogContent>
        <Divider component={"div"}/>
        <DialogActions>
          <Button fullWidth={true} disabled={this.state.submit} onClick={this.handleResend.bind(this)}
                  variant='text'
                  color={"secondary"}>
            Resend OTP
          </Button>
          <Button fullWidth={true} disabled={this.state.submit} onClick={this.handleVerify.bind(this)}
                  variant={"outlined"} color={"primary"}>
            verify OTP
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
OtpDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired
}

export default withStyles(style)(OtpDialog);