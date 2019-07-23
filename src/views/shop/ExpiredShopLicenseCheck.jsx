import React, { Component } from "reactn";
import { Button, CardContent, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import SubmitDialog from "../../components/SubmitDialog";
import CardFooter from "../../components/Card/CardFooter";
import OfficeSelect from "../../components/OfficeSelect";
import Card from "../../components/Card/Card";
import { HOME } from "../../config/routes-constant/OfficeRoutes";
import { Validators } from "../../utils/Validators";
import { ShopService } from "../../services/ShopService";

class ExpiredShopLicenseCheck extends Component {
  constructor(props) {
    super(props);
    this.state={
      licenseNo:"",
      licenseNoError:""
    }
    this.shopService=new ShopService()
  }

  componentDidMount() {
    this.setGlobal({loading:false})
  }

  checkLicense=()=>{
    const { licenseNo } = this.state;
    // this.shopService.
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


  render() {
    const { licenseNo,licenseNoError } = this.state;
    const { history } = this.props;
    return (
      <Grid container={true} spacing={3} justify={"center"}>
        <Grid item={true} xs={12} sm={10} md={4}>
          <Card style={{ padding: "40px 20px" }} raised={true} pricing={true}>
            <CardContent>
              <Grid container={true} direction={"column"} spacing={3}>
                <Grid item={true}>
                  <Typography color={"textPrimary"} variant={"h5"}>Check Your Shop License</Typography>
                </Grid>
                <Grid item={true}>
                  <Divider component={"li"}/>
                </Grid>
                <Grid item={true}>
                  <TextField fullWidth={true}
                             required={true}
                             name={"phone"}
                             error={Boolean(licenseNoError)}
                             helperText={licenseNoError}
                             onBlur={event=>Boolean(event.target.value)?this.setState({licenseNoError:""}):this.setState({licenseNoError:"License no is required"})}
                             onChange={e => {
                               this.setState({ licenseNo: e.target.value })
                             }}
                             value={licenseNo}
                             label={"Enter Your Shop License No"}
                             variant={"outlined"}
                  />
                </Grid>

              </Grid>
            </CardContent>
            <CardFooter>
              <Button disabled={!Boolean(licenseNo)} href={"#"} onClick={this.checkLicense} color={"primary"} variant={"outlined"} fullWidth={true}>Check</Button>
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