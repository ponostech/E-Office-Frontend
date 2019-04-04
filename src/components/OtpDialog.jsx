import React, { Component } from "react";
import { Button, Card, CardContent, Dialog, DialogContent, TextField } from "@material-ui/core";
import GridContainer from "./Grid/GridContainer";
import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
class OtpDialog extends Component {

  state={
    otp: "",

    submit:false
  }

  handleVerify = () => {

    this.props.onClose();
  };

  verifyOtp=()=>{
    const { phone, } = this.props;
    const data={
      phone:phone,
      otp: this.state.otp
    }
      this.setState({submit:true})
      axios.post(ApiRoutes.VERIFY_OTP,data)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        .then(()=>{
          this.setState({submit:false})
        })
  }

  render() {
    const { open, onClose,successMessage } = this.props;
    return (
      <Dialog fullWidth={true} maxWidth={"sm"} open={open}>
        <DialogContent>
          <Card>
            <CardContent>
              <GridContainer>
                <p style={{color:"green"}}>{successMessage}</p>
                <TextField
                  value={this.state.otp}
                  onChange={(e)=>{
                    this.setState({otp:e.target.value})
                  }}
                  type={"number"}
                  autoComplete={"off"}
                  variant={"outlined"}
                  label={"Enter OTP"}
                  fullWidth={true}
                />

                <Button fullWidth={true} variant={"text"} color={"primary"}>
                  Resent OTP
                </Button>
                <Button disabled={this.state.submit} fullWidth={true} onClick={this.handleVerify.bind(this)} variant={"outlined"} color={"primary"}>
                  verify OTP
                </Button>
              </GridContainer>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }
}

export default OtpDialog;