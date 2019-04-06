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
import { fetchTrades } from "../../services/TradeService";
import { LocalCouncilService } from "../../services/LocalCouncilService";

const style = {
  root: {
    padding: "10px 15px !important"
  },
  formControl: {
    label: {
      whiteSpace: "pre-line"
    }
  }
};

var timeout = null;

class ShopLicenseApplicationForm extends Component {
  documentService = new DocumentService();
  shopService = new ShopService();
  localCouncilService = new LocalCouncilService();
  state = {
    name: "",
    phone: "",
    type: "",
    email: "",
    address: "",
    localCouncil: undefined,
    places: "",
    tradeName: undefined,
    shopName: "",
    coordinate: "",
    businessDetail: "",
    estd: undefined,
    tinNo: "",
    cstNo: "",
    gstNo: "",
    panNo: "",
    premised: "Owned",
    displayType: undefined,
    signature: undefined,
    passport: undefined,

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
    estdError: "",
    localCouncilError: "",

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
    trades: [],
    localCouncils: [],

    agree: false,
    submit: false,
    success: false,
    documents: [],
    flaDocuments: [],
    noFlaDocuments: [],

    openMap: false,
    prestine: true,
    errorMessage: ""

  };

  componentDidMount() {
    document.title = "e-AMC | Shop License Application Form";
    var self = this;
    const { doLoad, doLoadFinish } = this.props;

    doLoad();
    timeout = setTimeout(function(handler) {
      Promise.all([self.fetchTrades(), self.fetchDocuments(),self.fetchLocalCouncil()])
        .then(function([cats, docs,lcs]) {
          console.log(lcs)
          // self.setState({ loading: false });
        });
      doLoadFinish();
      // self.setState({ loading: false });
    }, 4000);
  }

  fetchLocalCouncil = () => {
    let newLocalCouncils = [];
    this.localCouncilService.get()
      .then(data => {
        if (data.status) {
          data.data.local_councils.forEach(function(item) {
            let lc = {
              value: item.id,
              label: item.name
            };
            newLocalCouncils.push(lc);
          });
          this.setState({
            localCouncils: newLocalCouncils
          });
        } else {
        }
      })
      .catch(err => {
        let msg = "Unable to load resources, Please try again";
        this.setState({ errorMessage: msg });
        console.log(err);
      });
  };
  fetchDocuments = () => {
    this.documentService.get("shop")
      .then(res => {
        console.log(res);
        if (res.status) {
          const docs = res.data.documents;
          this.setState({
            flaDocuments: docs,
            noFlaDocuments: docs.filter((item, index) => index !== docs.length - 1),
            documents: docs.filter((item, index) => index !== docs.length - 1)
          });
        }
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
      });
  };
  fetchTrades = () => {
    fetchTrades()
      .then(res => {
        const { messages, status } = res.data;
        if (status) {
          let trades = [];
          res.data.data.trades.forEach((item, i) => {
            let trade = {
              value: item.id,
              label: item.fla ? item.name + " (required Food License Authority Certificate)" : item.name,
              fla: item.fla
            };
            trades.push(trade);
          });
          this.setState(state => {
            state.trades = trades;
          });
        } else {
          this.setState({ errorMessage: messages });
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
        !Validators.PHONE_REGEX.test(value) ? this.setState({ phoneError: ShopLicenseViewModel.VALID_PHONE }) : this.setState({ phoneError: "" });
        break;
      default:
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
        const { fla } = value;
        this.setState({ tradeName: value });
        if (fla) {
          this.setState({ documents: this.state.flaDocuments });
        } else {
          this.setState({ documents: this.state.noFlaDocuments });
        }
        break;
      case "type":
        this.setState({ type: value });
        break;
      case "displayType":
        this.setState({ displayType: value });
        break;
      case "localCouncil":
        this.setState({ localCouncil: value });
      default:
        break;
    }
  };

  onSubmit = (e) => {
    const invalid = Boolean(this.state.nameError) || Boolean(this.state.typeError) || Boolean(this.state.addressError)
      || Boolean(this.state.coordinateError) || Boolean(this.state.phoneError) || Boolean(this.state.shopNameError)
      || Boolean(this.state.businessDetailError) || Boolean(this.state.estdError) || Boolean(this.state.prestine) || this.state.signature === undefined;

    if (!invalid) {
      this.setState({ submit: true });
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
      case "localCouncil":
        this.state.localCouncil === undefined ? this.setState({ localCouncilError: "Local Council is required" }) : this.setState({ localCouncilError: "" });
        break;
      case "type":
        this.state.type ? this.setState({ typeError: "" }) : this.setState({ typeError: ShopLicenseViewModel.TYPE_REQUIRED });
        break;
      case "tradeName":
        this.state.tradeName === undefined ? this.setState({ tradeNameError: ShopLicenseViewModel.TRADE_REQUIRED }) : this.setState({ tradeNameError: "" });
        break;
      case "displayType":
        this.state.displayType === undefined ? this.setState({ displayTypeError: ShopLicenseViewModel.DISPLAY_TYPE_REQUIRED }) : this.setState({ displayTypeError: "" });
      default:
        break;
    }
  };
  handleBlur = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ nameError: ShopLicenseViewModel.OWNER_REQUIRED }) : this.setState({ nameError: "" });
        break;
      case "shopName":
        value.length === 0 ? this.setState({ shopNameError: ShopLicenseViewModel.SHOP_NAME_REQUIRED }) : this.setState({ shopNameError: "" });
        break;
      case "address":
        value.length === 0 ? this.setState({ addressError: ShopLicenseViewModel.ADDRESS_REQUIRED }) : this.setState({ addressError: "" });
        break;
      case "phone":
        value.length === 0 ? this.setState({ phoneError: ShopLicenseViewModel.PHONE_REQUIRED }) : this.setState({ phoneError: "" });
        break;
      case "estd":
        value.length === 0 ? this.setState({ estdError: ShopLicenseViewModel.ESTD_REQUIRED }) : this.setState({ estdError: "" });
        break;
      case "details":
        value.length === 0 ? this.setState({ detailsError: ShopLicenseViewModel.DETAILS_REQUIRED }) : this.setState({ detailsError: "" });
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
                    <Typography variant={"h5"}>
                      {ShopLicenseViewModel.TITLE}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                      {ShopLicenseViewModel.SUBTITLE}
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
                        if (place) {
                          let name = place.name;
                          let address = place.formatted_address;
                          let complete_address = address.includes(name) ? address : `${name} ${address}`;
                          this.setState({ address: complete_address });
                        }
                      }}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <OfficeSelect
                      value={this.state.localCouncil}
                      label={"Select Local Council"}
                      name={"localCouncil"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      required={true}
                      helperText={this.state.localCouncilError}
                      error={Boolean(this.state.localCouncilError)}
                      onBlur={this.handleSelectBlur.bind(this, "localCouncil")}
                      onChange={this.handleSelect.bind(this, "localCouncil")}
                      options={this.state.localCouncils}/>
                  </GridItem>

                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <TextField
                      onClick={(e) => this.setState({ openMap: true })}
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
                    <FileUpload required={true} document={{ id: 122, name: "Passport", mime: "image/*" }}
                                onUploadSuccess={(data) => {
                                  this.setState(state => {
                                    state.passport = {
                                      name: "passport",
                                      path: data.location
                                    };
                                  });
                                }} onUploadFailure={(err) => {
                      console.log(err);
                    }}/>
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
                    <FileUpload required={true} document={{ id: 344, name: "Signature", mime: "image/*" }}
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
                      Document(s)</Typography>
                  </GridItem>
                  {
                    this.state.documents.map((doc, index) => {
                      return <GridItem key={index} className={classes.root} sm={12} xs={12} md={12}>

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
                    <FormControlLabel
                      style={{ whiteSpace: "pre-line" }}
                      control={
                        <Checkbox color={"primary"} onChange={(val, checked) => this.setState({ agree: checked })}/>
                      }
                      label={"1.I hereby declare that my premises are not located in unauthorized area or any enroachment on government land and there is " +
                      "no unauthorized construction." +
                      "\n2. I shall dispose of solid waste of these premises as per AMC, Sanitation and Public Health Regulations. " +
                      "\n3. I shall follow all rules and regulations of AMC;" +
                      "\n4. It is certified that the above information is correct to the best of my knowledge"}/>
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

export default withStyles(style)(ShopLicenseApplicationForm);