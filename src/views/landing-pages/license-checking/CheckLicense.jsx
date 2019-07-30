import React, { Component } from "reactn";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import { Button, CardContent, Divider, Grid, TextField, Typography } from "@material-ui/core";
import CardFooter from "../../../components/Card/CardFooter";
import { HOME } from "../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { LicenseService } from "../../../services/LicenseService";
import SubmitDialog from "../../../components/SubmitDialog";
import { Validators } from "../../../utils/Validators";
import PropTypes from "prop-types";
import OtpDialog from "../../../components/OtpDialog";
import SweetAlert from "react-bootstrap-sweetalert";
import { OtpService } from "../../../services/OtpService";

class CheckLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,

      phoneError: "",

      openOtp:false,
      otpMessage:""
    };
    this.otpService=new OtpService();
  }


  componentDidMount() {
    this.setGlobal({ loading: false });
  }

  validatePhone = (e) => {
    if (e.target.value.length === 0) {
      this.setState({ phoneError: "Phone number is required" });
    } else if (!e.target.value.match(Validators.PHONE_REGEX)) {
      this.setState({ phoneError: "Phone number must be 10 digit number" });
    } else {
      this.setState({ phoneError: "" });
    }

    this.setState({ prestine: false });
  };


  onVerifiedOtp = (verified) => {
    const { history } = this.props;
    const { phone } = this.state;
    if (verified) {
      this.props.onCheck(phone);
    }
  };

  sendOtp = () => {
    var self = this;
    this.otpService.requestOtp(this.state.phone, "Check Application",
      errorMsg => {
        this.setGlobal({ errorMsg });
      },
      otpMessage => {
        this.setState({ openOtp: true });
        this.setState({ otpMessage });
      })
      .finally(() => console.log("Finish otp request"));

  };
  checkLicense = (e) => {
    // this.sendOtp();

    const { phone } = this.state;
    const { history } = this.props;
    this.props.onCheck(phone);
    // this.props.phone = phone;
  };

  render() {
    const { options } = this.state;
    const { history,checking } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={10} md={4}>
          <Card style={{ padding: "40px 20px" }} raised={true} pricing={true}>
            <CardContent>
              <Grid container={true} direction={"column"} spacing={3}>
                <Grid item={true}>
                  <Typography color={"textPrimary"} variant={"h5"}>Check your application status</Typography>
                </Grid>
                <Grid item={true}>
                  <Divider component={"li"}/>
                </Grid>
                <Grid item={true}>
                  <TextField fullWidth={true}
                             required={true}
                             name={"phone"}
                             error={Boolean(this.state.phoneError)}
                             helperText={this.state.phoneError}
                             onBlur={this.validatePhone.bind(this)}
                             onChange={e => {
                               this.setState({ phone: e.target.value });
                               this.validatePhone(e);
                             }}
                             value={this.state.phone}
                             label={"Enter Your Registered Mobile No"}
                             variant={"outlined"}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardFooter>
              <Button disabled={!Boolean(this.state.phone) || checking} href={"#"} onClick={this.checkLicense.bind(this)} color={"primary"}
                      variant={"outlined"} fullWidth={true}>Check</Button>
              <Button href={"#"} onClick={e => history.push(HOME)} color={"primary"} variant={"text"} fullWidth={true}>Back to home</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <OtpDialog successMessage={this.state.otpMessage} phone={this.state.phone} open={this.state.openOtp}
                   purposed={"Check Application"}
                   onClose={(value) => {
                     this.setState({ openOtp: false });
                     this.onVerifiedOtp(value);
                   }}/>
      </GridContainer>
    );
  }
}

CheckLicense.propTypes = {
  onCheck: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  checking: PropTypes.bool.isRequired,
};
export default withRouter(CheckLicense);