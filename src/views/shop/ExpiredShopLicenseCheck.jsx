import React, { Component } from "reactn";
import { Button, CardContent, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import SubmitDialog from "../../components/SubmitDialog";
import CardFooter from "../../components/Card/CardFooter";
import OfficeSelect from "../../components/OfficeSelect";
import Card from "../../components/Card/Card";
import { HOME } from "../../config/routes-constant/OfficeRoutes";
import { Validators } from "../../utils/Validators";

class ExpiredShopLicenseCheck extends Component {
  state = {
    phone: null,
    type: undefined,

    phoneError: "",
    typeError: "",

    submit: false,
    prestine: true,
    options: [
      { value: "shop", label: "Shop License Application" },
      { value: "hotel", label: "Hotel & Lodging License Application" },
      { value: "banner", label: "Banner Application" }
    ]
  };
  componentDidMount() {
    this.setGlobal({loading:false})
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
  validateType = (val) => {
    if (!this.state.type)
      this.setState({ typeError: "Please Select type of application" });
    else
      this.setState({ typeError: "" });
    this.setState({ prestine: false });
  };

  checkLicense = (e) => {

    const { phone,type } = this.state;
    const { history } = this.props;

    if (Boolean(this.state.phoneError) || Boolean(this.state.typeError) || this.state.prestine) {
      this.setGlobal({ errorMsg: "Please fill all the required field" });
      return;
    }
  };

  render() {
    const { options } = this.state;
    const { history } = this.props;
    return (
      <Grid container={true} spacing={3} justify={"center"}>
        <Grid item={true} xs={12} sm={10} md={4}>
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
              <Button disabled={!Boolean(this.state.phone) || this.state.type===undefined} href={"#"} onClick={this.checkLicense} color={"primary"} variant={"outlined"} fullWidth={true}>Check</Button>
              <Button href={"#"} onClick={e => history.push(HOME)} color={"primary"} variant={"text"} fullWidth={true}>Back to
                home</Button>
            </CardFooter>
          </Card>
        </Grid>

        <SubmitDialog open={Boolean(this.state.submit)} text={"Please wait..."} title={"Checking License"}/>

      </Grid>
    );
  }
}

export default withRouter(ExpiredShopLicenseCheck);