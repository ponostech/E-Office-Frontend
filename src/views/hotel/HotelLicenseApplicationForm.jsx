import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@material-ui/core";

import { ShopLicenseViewModel } from "../model/ShopLicenseViewModel";
import GridItem from "../../components/Grid/GridItem";
import OfficeSelect from "../../components/OfficeSelect";
import GridContainer from "../../components/Grid/GridContainer";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import FileUpload from "../../components/FileUpload";
import { DocumentService } from "../../services/DocumentService";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { ShopService } from "../../services/ShopService";
import { ErrorToString } from "../../utils/ErrorUtil";
import PlaceIcon from "@material-ui/icons/PinDrop";
import GMapDialog from "../../components/GmapDialog";
import { Validators } from "../../utils/Validators";
import AddressField from "../../components/AddressField";

const style = {
  root: {
    padding: "10px 15px !important"
  }
};

class HotelLicenseApplicationForm extends Component {
  documentService = new DocumentService();
  shopService = new ShopService();
  state = {
    name: "",
    phone: "",
    type: "",
    email: "",
    address: "",
    places: "",
    tradeName: undefined,
    shopName: "",
    coordinate: "",
    businessDetail: "",
    estd: undefined,
    acRoomNo: "",
    nonAcRoomNo: "",
    otherFacilities: "",
    tinNo: "",
    cstNo: "",
    gstNo: "",
    panNo: "",
    premised: "Owned",
    displayType: undefined,

    latitude: undefined,
    longitude: undefined,
    uploadDocuments: [],

    nameError: "",
    typeError: "",
    addressError: "",
    tradeNameError: "",
    coordinateError: "",
    phoneError: "",
    shopNameError: "",
    displayTypeError: "",
    acRoomNoError: "",
    nonAcRoomNoError: "",
    estdError: "",

    display_types: [
      { value: "vehicle", label: "Vehicle" },
      { value: "umbrella", label: "Umbrella" },
      { value: "balloons", label: "Balloons" },
      { value: "video", label: "Video" },
      { value: "audio/sound", label: "Audio/Sound" },
      { value: "others", label: "Others" }
    ],
    types: [
      { value: "proprietor", label: "Proprietor" },
      { value: "partnership", label: "Partnership" },
      { value: "private limited", label: "Private Limited" }
    ],
    trades: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" }
    ],

    agree: false,
    submit: false,
    success: false,
    documents: [],

    openMap: false,
    prestine: true,
    errorMessage: ""

  };

  componentDidMount() {
    document.title = "e-AMC | Hotel and lodging License Application Form";
    // this.state.ownership = this.state.ownerships[0];
    // this.state.display_type = this.state.display_types[0];
    // this.state.trade = this.state.trades[0];
    console.log(this.state.estd);
    this.fetchDocuments();
  }

  fetchDocuments = () => {
    this.documentService.get("shop_license")
      .then(res => {
        if (res.status) {
          this.setState({
            documents: res.data.documents
          });
        }
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
      });
  };
  handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "phone":
        !Validators.PHONE_REGEX.test(value) ? this.setState({ phoneError: "Mobile No must be 10 digit number" }) : this.setState({ phoneError: "" });
        break;
    }

    this.setState({
      [name]: value
    });
    this.setState({ prestine: false });
  };

  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "trade":
        this.setState({ tradeName: value });
        break;
      case "type":
        this.setState({ type: value });
        break;
      case "displayType":
        this.setState({ displayType: value });
        break;
      default:
        break;
    }
  };

  onSubmit = (e) => {
    const invalid = Boolean(this.state.nameError) || Boolean(this.state.typeError) || Boolean(this.state.addressError)
      || Boolean(this.state.coordinateError) || Boolean(this.state.phoneError) || Boolean(this.state.shopNameError)
      || Boolean(this.state.businessDetailError) || Boolean(this.state.estdError) || Boolean(this.state.prestine);

    this.setState({ submit: true });
    if (invalid) {
      this.shopService.create(this.state)
        .then(data => {
          if (data.status) {
            this.setState({ success: true });
          } else {
            const msg = ErrorToString(data.data.messages);
            this.setState({ errorMessage: msg });
          }
          console.log(data);
        })
        .catch(err => {
          console.error(err);
          this.setState({ errorMessage: err.toString() });
        })
        .then(() => {
          this.setState({ submit: false });
        });
    } else {
      this.setState({ errorMessage: "Please fill out the required fields" });
    }
  };
  handleRadio = (e) => {
    this.setState({
      premised: e.target.value
    });
  };

  handleClick = (e) => {
    const name = e.target.name;
    switch (name) {
      case "primary":
        this.onSubmit();
        break;
      case "secondary":
        this.setState({
          name: "",
          phone: "",
          type: "",
          email: "",
          address: "",
          places: "",
          tradeName: "",
          shopName: "",
          coordinate: undefined,
          businessDetail: "",
          estd: undefined,
          tinNo: "",
          cstNo: "",
          gstNo: "",
          panNo: "",
          premised: "Owned",
          displayType: undefined,

          uploadDocuments: []
        });
        break;
      default:
        break;
    }
  };

  handleSelectBlur = (identifier, e) => {

    switch (identifier) {
      case "type":
        this.state.type ? this.setState({ typeError: "" }) : this.setState({ typeError: "Type of applicant is required" });
        break;

      case "tradeName":
        this.state.tradeName === undefined ? this.setState({ tradeNameError: "Trade is required" }) : this.setState({ tradeNameError: "" });
        break;
      case "displayType":
        this.state.displayType === undefined ? this.setState({ displayTypeError:"Type of display is required" }) : this.setState({ displayTypeError: "" });
        break;
      default:
        break;
    }
  };
  handleBlur = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ nameError: "Name of applicant is required" }) : this.setState({ nameError: "" });
        break;
      case "shopName":
        value.length === 0 ? this.setState({ shopNameError: "Name of hotel is required" }) : this.setState({ shopNameError: "" });
        break;
      case "address":
        value.length === 0 ? this.setState({ addressError: "Address is required" }) : this.setState({ addressError: "" });
        break;
      case "phone":
        value.length === 0 ? this.setState({ phoneError: "Mobile no is required" }) : this.setState({ phoneError: "" });
        break;
      case "estd":
        value.length === 0 ? this.setState({ estdError: "Date of establishment is required" }) : this.setState({ estdError: "" });
        break;
      case "details":
        value.length === 0 ? this.setState({ detailsError: "Business Details is required" }) : this.setState({ detailsError: "" });
        break;
      case "nonAcRoomNo":
        value.length === 0 ? this.setState({ nonAcRoomError: "" }) : this.setState({ nonAcRoomError: "No of Non Ac Room is required" });
        break;
      case "acRoomNo":
        value.length === 0 ? this.setState({ acRoomNoError: "" }) : this.setState({ acRoomNoError: "No of ac room is required" });
        break;
      default:
        break;
    }
  };


  render() {
    const { classes } = this.props;

    return (

      <GridContainer justify="flex-start">
        <GridItem xs={12} sm={12} md={10}>
          <form>
            <Card>
              <CardContent>
                <GridContainer>
                  <GridItem md={12} sm={12} xs={12}>
                    <Typography variant={"headline"}>
                      {ShopLicenseViewModel.TITLE}
                    </Typography>
                  </GridItem>

                  <GridItem md={12} sm={12} xs={12}>
                    <Divider style={{ marginBottom: 10, marginTop: 10 }}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.name}
                      name={"name"}
                      onBlur={this.handleBlur.bind(this)}
                      required={true}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.OWNER}
                      error={Boolean(this.state.nameError)}
                      helperText={this.state.nameError}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.phone}
                      onBlur={this.handleBlur.bind(this)}
                      required={true}
                      name={"phone"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.PHONE}
                      error={Boolean(this.state.phoneError)}
                      helperText={this.state.phoneError}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <OfficeSelect
                      variant={"outlined"}
                      margin={"dense"}
                      value={this.state.type}
                      required={true}
                      fullWidth={true}
                      name={"type"}
                      error={!!this.state.typeError}
                      onBlur={this.handleSelectBlur.bind(this, "type")}
                      onChange={this.handleSelect.bind(this, "type")}
                      ClearAble={true}
                      label={ShopLicenseViewModel.APPLICANT_TYPE}
                      helperText={this.state.typeError}
                      options={this.state.types}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      type={"email"}
                      value={this.state.email}
                      name={"email"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.EMAIL}
                    />

                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <AddressField
                      textFieldProps={
                        {
                          value: this.state.address,
                          name: "address",
                          placeholder: "Address",
                          onBlur: this.handleBlur.bind(this),
                          required: true,
                          variant: "outlined",
                          margin: "dense",
                          fullWidth: true,
                          error: Boolean(this.state.addressError),
                          helperText: this.state.addressError,
                          onChange: this.handleChange.bind(this),
                          label: ShopLicenseViewModel.OWNER_ADDRESS
                        }
                      }

                      onPlaceSelect={(place) => {
                        this.setState({ address: place.formatted_address });
                      }}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.coordinate}
                      name={"coordinate"}
                      onBlur={this.handleBlur.bind(this)}
                      required={true}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      error={Boolean(this.state.coordinateError)}
                      helperText={this.state.coordinateError}
                      label={ShopLicenseViewModel.ADDRESS}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position={"end"}>
                            <IconButton onClick={(e) => this.setState({ openMap: true })}>
                              <PlaceIcon/>
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <OfficeSelect
                      variant={"outlined"}
                      margin={"dense"}
                      value={this.state.tradeName}
                      fullWidth={true}
                      name={"trade"}
                      required={true}
                      error={Boolean(this.state.tradeNameError)}
                      helperText={this.state.tradeNameError}
                      onBlur={this.handleSelectBlur.bind(this, "trade")}
                      onChange={this.handleSelect.bind(this, "trade")}
                      ClearAble={true}
                      label={ShopLicenseViewModel.TRADE_TYPE}
                      options={this.state.trades}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.shopName}
                      name={"shopName"}
                      onBlur={this.handleBlur.bind(this)}
                      required={true}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.SHOP_NAME}
                      error={Boolean(this.state.shopNameError)}
                      helperText={this.state.shopNameError}
                    />

                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.businessDetail}
                      name={"businessDetail"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={"Details of business"}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField name={"estd"}
                               value={this.state.estd}
                               variant={"outlined"}
                               margin={"dense"}
                               required={true}
                               onBlur={this.handleBlur.bind(this)}
                               fullWidth={true}
                               onChange={this.handleChange.bind(this)}
                               type={"date"}
                               InputLabelProps={
                                 { shrink: true }
                               }
                               label={"Date of Establishment"}
                               error={Boolean(this.state.estdError)}
                               helperText={this.state.estdError}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.tinNo}
                      name={"tinNo"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={"TIN No"}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.cstNo}
                      name={"cstNo"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={"CST No"}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.panNo}
                      name={"panNo"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={"PAN No"}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.gstNo}
                      name={"gstNo"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={"GST No"}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <OfficeSelect value={this.state.displayType}
                                  label={"Type of display"}
                                  name={"displayType"}
                                  variant={"outlined"}
                                  margin={"dense"}
                                  fullWidth={true}
                                  required={true}
                                  error={Boolean(this.state.displayTypeError)}
                                  helperText={this.state.displayTypeError}
                                  onBlur={this.handleSelectBlur.bind(this, "displayType")}
                                  onChange={this.handleSelect.bind(this, "displayType")}
                                  options={this.state.display_types}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <FormControl fullWidth={true} margin={"dense"}>
                      <FormLabel>Whether Premises owned or leased?</FormLabel>
                      <RadioGroup
                        name={"premised"}
                        row={true}
                        value={this.state.premised}
                        onChange={this.handleRadio.bind(this)}
                      >
                        <FormControlLabel value={"Owned"} control={<Radio color={"primary"}/>} label={"Owned"}/>
                        <FormControlLabel value={"Leased"} control={<Radio color={"primary"}/>} label={"Leased"}/>
                      </RadioGroup>
                    </FormControl>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.acRoomNo}
                      type={"number"}
                      name={"acRoomNo"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      required={true}
                      rror={Boolean(this.state.acRoomNoError)}
                      onBlur={this.handleBlur.bind(this)}
                      onChange={this.handleChange.bind(this)}
                      label={"No of Ac Room"}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.nonAcRoomNo}
                      type={"number"}
                      name={"nonAcRoomNo"}
                      variant={"outlined"}
                      margin={"dense"}
                      required={true}
                      fullWidth={true}
                      error={Boolean(this.state.nonAcRoomNoError)}
                      onBlur={this.handleBlur.bind(this)}
                      onChange={this.handleChange.bind(this)}
                      label={"No of Non Ac Room"}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.otherFacilities}
                      name={"otherFacilities"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={"Other Facilities"}
                    />
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <FileUpload required={true} document={{ id: 1, name: "Signature", mime: "image/*" }}
                                onUploadSuccess={(data) => {
                                  this.setState(state => {
                                    state.signature = {
                                      name: "signature",
                                      path: data.location
                                    };
                                  });
                                }} onUploadFailure={(err) => {
                      console.log(err);
                    }}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={12}>
                    <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={12}>
                    <Typography variant={"headline"}>Upload
                      Document</Typography>
                  </GridItem>
                  {
                    this.state.documents.map((doc, index) => {
                      return <GridItem className={classes.root} sm={12} xs={12} md={6}>

                        <FileUpload key={index} document={doc} onUploadSuccess={(data) => {
                          let temp = {
                            name: doc.name,
                            path: data.location
                          };
                          this.setState(state => {
                            state.uploadDocuments.push(temp);
                          });
                        }} onUploadFailure={(err) => {
                          console.log(err);
                        }}/>
                      </GridItem>;

                    })
                  }

                  <GridItem xs={12} sm={12} md={12}>
                    <FormControlLabel control={
                      <Checkbox color={"primary"} onChange={(val, checked) => this.setState({ agree: checked })}/>
                    }
                                      label={"I hereby pledge that i will abide the AMC Display of Advertisement and Hoarding Regulations 2013," +
                                      " with specific reference of Regulation 7, Regulation 28 and Regulation 32, failing which i would be liable to get my registration / License cancelled"}/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Divider/>
                  </GridItem>
                </GridContainer>
              </CardContent>
              <CardActions disableActionSpacing={true}>
                <GridContainer justify={"flex-end"}>
                  <GridItem>
                    <Button name={"primary"} disabled={!this.state.agree}
                            color={"primary"} variant={"outlined"}
                            onClick={this.handleClick.bind(this)}>
                      {ShopLicenseViewModel.PRIMARY_TEXT}
                    </Button>
                    {"\u00A0 "}
                    {"\u00A0 "}
                    {"\u00A0 "}
                    <Button name={"secondary"}
                            color={"secondary"}
                            variant={"outlined"}
                            onClick={this.handleClick.bind(this)}>
                      {ShopLicenseViewModel.SECONDARY_TEXT}
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardActions>
            </Card>
          </form>
        </GridItem>

        <SubmitDialog open={this.state.submit} text={"Your Application is submitting, Please wait"}/>
        <OfficeSnackbar open={!!this.state.success} variant={"success"} message={this.state.success}
                        onClose={() => this.setState({ success: "" })}/>
        <OfficeSnackbar open={!!this.state.errorMessage} variant={"error"} message={this.state.errorMessage}
                        onClose={() => this.setState({ errorMessage: "" })}/>

        <OfficeSnackbar open={this.state.success} variant={"info"}
                        message={"Your application is submitted successfully"}
                        onClose={() => this.setState({ success: true })}/>
        <GMapDialog open={this.state.openMap} onClose={(lat, lng) => {
          let msg = `Latitude: ${lat} , Longitude: ${lng}`;
          this.setState({ coordinate: msg });
          this.setState(state => {
            state.latitude = lat;
            state.longitude = lng;
          });
          this.setState({ openMap: false });
        }} isMarkerShown={true}/>
      </GridContainer>

    );
  }

}

export default withStyles(style)(HotelLicenseApplicationForm);