import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import AddressField from "../../components/AddressField";
import OfficeSelect from "../../components/OfficeSelect";
import withStyles from "@material-ui/core/es/styles/withStyles";
import PinIcon from "@material-ui/icons/PinDrop";
import GMapDialog from "../../components/GmapDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import SubmitDialog from "../../components/SubmitDialog";

const style = {
  item: {
    padding: "10px 15px !important"
  }
};

class ShopRenewal extends Component {

  state = {
    name: "",
    licenseNo: "",
    shopName: "",
    tradeName: undefined,
    location: "",
    latitude: "",
    longitude: "",
    address: "",
    fees: "",

    nameError: "",
    licenseError: "",
    shopNameError: "",
    tradeNameError: "",
    locationsError: "",
    addressError: "",
    feesError: "",

    trades: [],

    openMap: false,

    submit: false,
    agree: false,

    errorMessage: ""
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleRequired = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ nameError: "Name of applicant is required" }) : this.setState({ nameError: "" });
        break;
      case "licenseNo":
        value.length === 0 ? this.setState({ licenseError: "License No is required" }) : this.setState({ licenseError: "" });
        break;
      case "shopName":
        value.length === 0 ? this.setState({ shopNameError: "Name of shop is required" }) : this.setState({ shopNameError: "" });
        break;
      case "tradeName":
        value === undefined ? this.setState({ tradeNameError: "Name of Trade is required" }) : this.setState({ tradeNameError: "" });
        break;
      case "location":
        value.length === 0 ? this.setState({ locationsError: "Location of shop is required" }) : this.setState({ locationsError: "" });
        break;
      case "address":
        value.length === 0 ? this.setState({ addressError: "Residential Address is required" }) : this.setState({ addressError: "" });
        break;
    }
  };

  handleSelectChange = (identifier, value) => {
    this.setState({
      [identifier]: value
    });
  };
  handleSelectRequired = (identifier, value) => {
    switch (identifier) {
      case "tradeName":
        this.state.tradeName === undefined ? this.setState({ tradeNameError: "Name of trade is required" }) : this.setState({ tradeNameError: "" });
        break;
    }
  };
  doSubmit = () => {

  };
  doClear = () => {

  };
  handleClick = (e) => {
    const { name } = e.target;
    switch (name) {
      case "submit":
        this.doSubmit();
        break;
      case  "reset":
        this.doClear();
        break;
      default:
        break;

    }
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={"flex-start"} style={{marginTop:10}}>
        <GridItem xs={12} sm={12} md={10}>
          <GridContainer>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <Typography variant={"headline"}>Application form for renewal of shop license</Typography>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <Divider color={"action"}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.name}
                name={"name"}
                variant={"outlined"}
                required={true}
                margin={"dense"}
                fullWidth={true}
                error={Boolean(this.state.nameError)}
                helperText={this.state.nameError}
                label={"Name of applicant"}
                onBlur={this.handleRequired.bind(this)}
                onChange={this.handleChange.bind(this)}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.licenseNo}
                name={"licenseNo"}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                label={"License No"}
                error={Boolean(this.state.licenseError)}
                helperText={this.state.licenseError}
                onBlur={this.handleRequired.bind(this)}
                onChange={this.handleChange.bind(this)}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.shopName}
                required={true}
                name={"shopName"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                label={"Name of Shop/Firm"}
                helperText={this.state.shopNameError}
                error={Boolean(this.state.shopNameError)}
                onBlur={this.handleRequired.bind(this)}
                onChange={this.handleChange.bind(this)}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <OfficeSelect
                label={"Trade"}
                required={true}
                value={this.state.tradeName}
                options={this.state.trades}
                name={"tradeName"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                error={Boolean(this.state.tradeNameError)}
                helperText={this.state.tradeNameError}
                onChange={this.handleSelectChange.bind(this,"tradeName")}
                onBlur={this.handleSelectRequired.bind(this,"tradeName")}

              />
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                name={"location"}
                value={this.state.location}
                error={Boolean(this.state.locationsError)}
                helperText={this.state.locationsError}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                required={true}
                label={"Location"}
                onBlur={this.handleRequired.bind(this)}
                onChange={this.handleChange.bind(this)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"end"}>
                      <Tooltip title={"click here to set the location of your shop"}>
                        <IconButton onClick={(e) => this.setState({ openMap: true })}>
                          <PinIcon/>
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <AddressField
                textFieldProps={{
                  name: "address",
                  margin: "dense",
                  fullWidth: true,
                  required: true,
                  variant: "outlined",
                  placeholder: "Address",
                  label: "Residential Address",
                  value: this.state.address,
                  error: Boolean(this.state.addressError),
                  helperText: this.state.addressError,
                  onBlur: this.handleRequired.bind(this),
                  onChange: this.handleChange.bind(this)
                }}
                onPlaceSelect={(address) => this.setState({ address: address.formatted_address })}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                name={"fees"}
                error={Boolean(this.state.feesError)}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                label={"Fees"}
                onBlur={this.handleRequired.bind(this)}
                onChange={this.handleChange.bind(this)}/>
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={12}>
              <FormControlLabel control={
                <Checkbox color={"primary"}
                          onChange={(val, checked) => this.setState({ agree: checked })}/>
              }
                                label={"I hereby pledge that i will abide the AMC Display of Advertisement and Hoarding Regulations 2013," +
                                " with specific reference of Regulation 7, Regulation 28 and Regulation 32, failing which i would be liable to get my registration / License cancelled"}/>
            </GridItem>

            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <GridContainer justify={"flex-end"}>
                <Button disabled={!this.state.agree} name={"submit"} variant={"outlined"} color={"primary"}
                        onClick={this.handleClick.bind(this)}>Submit</Button>
                {" "}
                <Button name={"reset"} variant={"outlined"} color={"secondary"}
                        onClick={this.handleClick.bind(this)}>Reset</Button>
              </GridContainer>
            </GridItem>


            <SubmitDialog open={this.state.submit} text={"Your application is submitting. Please wait ... "}/>
            <OfficeSnackbar open={Boolean(this.state.success)} onClose={(e) => this.setState({ success: false })}
                            variant={"success"} message={"Your application is submitted successfully"}/>
            <OfficeSnackbar open={Boolean(this.state.errorMessage)} onClose={(e) => this.setState({ errorMessage: "" })}
                            variant={"error"} message={this.state.errorMessage}/>
            <GMapDialog open={this.state.openMap} onClose={(lat, lng) => {
              let msg = `Latitude: ${lat} Longitude: ${lng}`;
              this.setState({ location:msg,openMap: false, latitude: lat, longitude: lng });
            }} isMarkerShown={true}/>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(ShopRenewal);