import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import { Button, CardContent, Divider, Grid, TextField, Typography } from "@material-ui/core";
import CardFooter from "../../../components/Card/CardFooter";
import OfficeSelect from "../../../components/OfficeSelect";
import { HOME } from "../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { LicenseService } from "../../../services/LicenseService";
import SubmitDialog from "../../../components/SubmitDialog";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import { Validators } from "../../../utils/Validators";

class CheckLicense extends Component {

  licenseService = new LicenseService();
  state = {
    phone: null,
    type: undefined,

    phoneError: "",
    typeError: "",

    errorMessage: "",
    submit: false,
    prestine: true,
    options: [
      { value: "shop", label: "Shop License Application" },
      { value: "hotel", label: "Hotel & Lodging License Application" },
      { value: "banner", label: "Banner Application" }
    ]
  };

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
  validateType = (val) => {
    if (!this.state.type)
      this.setState({ typeError: "Please Select type of application" });
    else
      this.setState({ typeError: "" });
    this.setState({ prestine: false });
  };

  checkLicense = (e) => {

    const { phone } = this.state;

    if (Boolean(this.state.phoneError) || Boolean(this.state.typeError) || this.state.prestine) {
      this.setState({ errorMessage: "Please fill all the required field" });
      return;
    }

    this.setState({ submit: true });
    switch (this.state.type.value) {
      case "shop":
        this.licenseService.checkShopLicense(phone, errorMessage => this.setState({ errorMessage }),
          shops => console.log(shops)).finally(() => this.setState({ submit: false }));
        break;
      case "banner":
        this.licenseService.checkBanner(phone, errorMessage => this.setState({ errorMessage }),
          shops => console.log(shops)).finally(() => this.setState({ submit: false }));
        break;
      case "hotel":
        this.licenseService.checkHotelLicense(phone, errorMessage => this.setState({ errorMessage }),
          shops => console.log(shops)).finally(() => this.setState({ submit: false }));
        break;
      default:
        break;
    }
  };

  render() {
    const { options } = this.state;
    const { history } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={10} md={4}>
          <Card style={{ padding: "40px 20px" }} raised={true} pricing={true}>
            <CardContent>
              <Grid container={true} direction={"column"} spacing={16}>
                <Grid item={true}>
                  <Typography color={"textPrimary"} variant={"h5"}>Check your application status</Typography>
                </Grid>
                <Grid item={true}>
                  <Divider/>
                </Grid>
                <Grid item={true}>
                  <TextField fullWidth={true}
                             required={true}
                             name={"phone"}
                             error={Boolean(this.state.phoneError)}
                             helperText={this.state.phoneError}
                             onBlur={this.validatePhone.bind(this)}
                             onChange={e => {
                               this.setState({ phone: e.target.value })
                               this.validatePhone(e)
                             }}
                             value={this.state.phone}
                             label={"Enter Your Registered Mobile No"}
                             variant={"outlined"}
                  />
                </Grid>

                <Grid item={true}>
                  <OfficeSelect
                    required={true}
                    fullWidth={true}
                    variant={"outlined"}
                    name={"type"}
                    error={Boolean(this.state.typeError)}
                    onBlur={this.validateType}
                    helperText={this.state.typeError}
                    value={this.state.type}
                    label={"Select Type of Application"}
                    onChange={val => this.setState({ type: val })}
                    options={options}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardFooter>
              <Button onClick={this.checkLicense} color={"primary"} variant={"outlined"} fullWidth={true}>Check</Button>
              <Button onClick={e => history.push(HOME)} color={"primary"} variant={"text"} fullWidth={true}>Back to
                home</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <SubmitDialog open={Boolean(this.state.submit)} text={"License Checking ..."} title={"Checking License"}/>
        <OfficeSnackbar open={Boolean(this.state.errorMessage)} variant={"error"} message={this.state.errorMessage}
                        onClose={() => this.setState({ errorMessage: "" })}/>

      </GridContainer>
    );
  }
}

export default withRouter(CheckLicense);