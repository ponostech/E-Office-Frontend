import React, { Component } from "react";
import { Button, Dialog, DialogContent, TextField, Typography } from "@material-ui/core";
import GridContainer from "./Grid/GridContainer";
import { RequestOtp, VerifyOtp } from "../services/OtpService";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";
import GridItem from "./Grid/GridItem";

var timeout = null;

class OtpDialog extends Component {

  state = {
    otp: "",

    errorMessage: "",
    submit: false,
    successMessage: ""
  };

  handleVerify = () => {
    this.verifyOtp();
    // this.props.onClose();
  };

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  handleResend = () => {
    const { phone } = this.props;
    this.setState({ submit: true });
    RequestOtp(phone)
      .then(res => {
        if (res.data.status) {
          let str = ArrayToString(res.data.messages);
          this.setState({
            successMessage: str,
            errorMessage: ""
          });

        } else {
          let msg = ErrorToString(res.data.messages);
          this.setState({
            errorMessage: msg,
            successMessage: ""
          });
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: err
        });
      })
      .then(() => {
        this.setState({ submit: false });
      });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { successMessage } = nextProps;
    this.setState({ successMessage });
  }

  verifyOtp = () => {
    const { phone, onClose } = this.props;
    this.setState({ submit: true });
    VerifyOtp(phone, this.state.otp)
      .then(res => {
        console.log(res);
        if (res.data.status) {
          this.setState({ successMessage: ArrayToString(res.data.messages), errorMessage: "" });
          timeout = setTimeout(function() {
            onClose(true);
          }, 3000);
        } else {
          let msg = res.data.messages;
          this.setState({ errorMessage: ArrayToString(msg), successMessage: "" });
        }
      })
      .catch(err => {
        this.setState({ errorMessage: err });
      })
      .then(() => {
        this.setState({ submit: false });
      });
  };

  render() {
    const { open, onClose } = this.props;
    const { successMessage } = this.state;

    return (
      <Dialog fullWidth={true} maxWidth={"sm"} open={open}>
        <DialogContent>

          <GridContainer spacing={16}>
            <GridItem xs={12}>
              <Typography variant={"h5"}>Please Enter One Time Password</Typography>
            </GridItem>

            <GridItem xs={12}>
              <TextField variant={"outlined"}
                         error={Boolean(this.state.errorMessage)}
                         helperText={this.state.errorMessage}
                         value={this.state.otp}
                         fullWidth={true}
                         onChange={(e) => {
                           this.setState({
                             otp: e.target.value
                           });
                         }}/>
            </GridItem>

            <GridItem xs={12}>
              <Button disabled={this.state.submit} onClick={this.handleResend.bind(this)} variant={"text"}
                      color={"primary"}>
                Resent OTP
              </Button>
              <Button disabled={this.state.submit} onClick={this.handleVerify.bind(this)}
                      variant={"outlined"} color={"primary"}>
                verify OTP
              </Button>
            </GridItem>
            <GridItem xs={12}>
              {
                Boolean(successMessage) ? <p style={{ color: "green" }}>{successMessage}</p> : undefined
              }
            </GridItem>


          </GridContainer>

        </DialogContent>
      </Dialog>
    );
  }
}

export default OtpDialog;