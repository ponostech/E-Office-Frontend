import React, {Component} from "react";
import {Button, Dialog, DialogContent, Divider, TextField, Typography} from "@material-ui/core";
import GridContainer from "./Grid/GridContainer";
import { OtpService, RequestOtp, VerifyOtp } from "../services/OtpService";
import {ArrayToString, ErrorToString} from "../utils/ErrorUtil";
import GridItem from "./Grid/GridItem";

var timeout = null;

class OtpDialog extends Component {
    otpService=new OtpService();

    state = {
        otp: "",

        errorMessage: "",
        submit: false,
        successMessage: ""
    };

    handleVerify = () => {
        this.verifyOtp();
        this.setState({otp: ""})
        // this.props.onClose();
    };


    handleResend = () => {
        const self=this;
        const {phone, purposed} = this.props;
        this.setState({successMessage: ""});
        this.setState({submit: true});
        timeout = setTimeout(function (resolve, reject) {
            self.otpService.requestOtp(phone,purposed,
                errorMessage=>{self.setState({errorMessage,successMessage:""})},
                successMessage=>self.setState({successMessage,errorMessage:""}))
              .finally(()=>self.setState({submit:false}))
        }, 3000);

    };

    componentWillUnmount() {
        clearTimeout(timeout);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {successMessage} = nextProps;
        this.setState({successMessage});
    }

    verifyOtp = () => {
        const {phone, onClose} = this.props;
        this.setState({submit: true});

        this.otpService.veriftOtp(phone,this.state.otp,
            errorMessage=>{
            this.setState({errorMessage})
            },
            successMessage=>{
            this.setState({successMessage});
            console.log("call me bitch")
            onClose(true)
            })
          .finally(()=>this.setState({submit:false}));
    };

    render() {
        const {open} = this.props;
        const {successMessage} = this.state;

        return (
            <Dialog fullWidth={true} maxWidth={"sm"} open={open}>
                <DialogContent>

                    <GridContainer justify={"space-between"} spacing={16}>
                        <GridItem xs={12} md={12}>
                            <Typography variant={"h5"}>Enter One Time Password</Typography>
                        </GridItem>
                        <GridItem md={12}>
                            <Divider style={{marginTop: 10, marginBottom: 10}}/>
                        </GridItem>

                        <GridItem xs={12} md={12}>
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
                        </GridItem>

                        <GridItem sm={12} md={12}>
                            <Divider style={{marginBottom: 10, marginTop: 10}}/>
                        </GridItem>
                        <GridItem xs={12} md={6}>
                            <Button fullWidth={true} disabled={this.state.submit} onClick={this.handleResend.bind(this)}
                                    variant={"outlined"}
                                    color={"primary"}>
                                Resend OTP
                            </Button>
                        </GridItem>
                        <GridItem xs={12} md={6}>
                            <Button fullWidth={true} disabled={this.state.submit} onClick={this.handleVerify.bind(this)}
                                    variant={"outlined"} color={"primary"}>
                                verify OTP
                            </Button>
                        </GridItem>
                        <GridItem xs={12}>
                            {
                                Boolean(successMessage) ?
                                    <p style={{color: "green", marginTop: 20}}>{successMessage}</p> : undefined
                            }
                        </GridItem>


                    </GridContainer>

                </DialogContent>
            </Dialog>
        );
    }
}

export default OtpDialog;