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
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import withStyles from "@material-ui/core/es/styles/withStyles";

import { ShopLicenseViewModel } from "../model/ShopLicenseViewModel";
import OfficeSelect from "../../components/OfficeSelect";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import FileUpload from "../../components/FileUpload";
import { DocumentService } from "../../services/DocumentService";
import { ShopService } from "../../services/ShopService";
import PlaceIcon from "@material-ui/icons/PinDrop";
import GMapDialog from "../../components/GmapDialog";
import { Validators } from "../../utils/Validators";
import AddressField from "../../components/AddressField";
import { TradeService } from "../../services/TradeService";
import { LocalCouncilService } from "../../services/LocalCouncilService";
import SweetAlert from "react-bootstrap-sweetalert";
import { OtpService } from "../../services/OtpService";
import OtpDialog from "../../components/OtpDialog";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import "date-fns";
import { HOME } from "../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { APPLICATION_NAME } from "../../utils/Util";
import LoadingView from "../common/LoadingView";

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

class ShopApplication extends Component {
  tradeService = new TradeService();
  documentService = new DocumentService();
  shopService = new ShopService();
  localCouncilService = new LocalCouncilService();
  otpService = new OtpService();
  state = {
    name: "",
    phone: "",
    type: "",
    email: "",
    address: "",
    ownerAddress: "",
    localCouncil: undefined,
    places: "",
    tradeName: undefined,
    shopName: "",
    coordinate: "",
    businessDetail: "",
    estd: new Date(),
    tinNo: "",
    cstNo: "",
    gstNo: "",
    panNo: "",
    premised: "Owned",
    displayType: undefined,
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
    ownerAddressError: "",

    types: [
      { value: "proprietor", label: "Proprietor" },
      { value: "partnership", label: "Partnership" },
      { value: "private limited", label: "Private Limited" }
    ],
    trades: [],
    localCouncils: [],
    agree: false,
    submit: false,
    success: undefined,
    documents: [],
    flaDocuments: [],
    noFlaDocuments: [],
    openMap: false,
    prestine: true,
    errorMessage: "",
    openOtp: false,
    otpMessage: "",

    loading: true
  };

  componentDidMount() {
    document.title = "e-AMC | Shop License Application Form";
    window.scrollTo(0, 0);
    var self = this;
    const { doLoad, doLoadFinish } = this.props;

    doLoad();
    Promise.all([self.fetchTrades(), self.fetchDocuments(), self.fetchLocalCouncil()])
      .finally(function() {
        setTimeout(function() {
          doLoadFinish();
          self.setState({ loading: false });
        }, 2000);
      });
  }

  validateDocument = () => {
    const { documents, uploadDocuments } = this.state;
    let docCount = 0;
    let uploadCount = 0;
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].mandatory)
        docCount++;
    }
    for (let i = 0; i < uploadDocuments.length; i++) {
      if (uploadDocuments[i].mandatory)
        uploadCount++;
    }
    return uploadCount === docCount;
  };

  sendOtp = () => {
    var self = this;
    this.otpService.requestOtp(this.state.phone, "Shop License Application",
      errorMessage => {
        this.setState({ errorMessage });
      },
      otpMessage => {
        this.setState({ openOtp: true });
        this.setState({ otpMessage });
      })
      .finally(() => console.log("Finish otp request"));

  };
  onVerifiedOtp = (verified) => {
    // if (!verified) {
    //   return
    // }
    //
    const { history } = this.props;
    if (verified) {
      this.setState({ submit: true });
      this.shopService.create(this.state,
        errorMessage => this.setState({ errorMessage }),
        msg => {
          this.setState({
            success: (
              <SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title={"Success"}
                onConfirm={() => history.push(HOME)}>
                {msg}
              </SweetAlert>
            )
          });
        })
        .finally(() => this.setState({ submit: false }));
    }
  };
  fetchLocalCouncil = () => {
    this.localCouncilService.fetch(errorMessage => this.setState({ errorMessage }), localCouncils => this.setState({ localCouncils }));
  };
  fetchDocuments = () => {
    this.documentService.fetch("shop", errorMessage => this.setState({ errorMessage }), docs => {
      this.setState({
        flaDocuments: docs,
        noFlaDocuments: docs.filter((item, index) => index !== docs.length - 1),
        documents: docs.filter((item, index) => index !== docs.length - 1)
      });
    });

  };
  fetchTrades = () => {
    this.tradeService.fetch((errorMessage) => this.setState({ errorMessage })
      , (trades) => this.setState({ trades }));
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
      || Boolean(this.state.businessDetailError) || Boolean(this.state.estdError) || Boolean(this.state.prestine)  || !this.validateDocument();

    if (!invalid) {
      this.sendOtp();
    } else {
      this.setState({ errorMessage: "Please fill out the required fields" });
    }
  };
  handleRadio = (e) => {
    this.setState({
      premised: e.target.value
    });
  };

  handleSaveDraft = (e) => {

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
  handleEstdChange = estdDate => {

    this.setState({ "estd": estdDate });
  };

  formatDate(date) {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  }

  render() {
    const { classes } = this.props;

    return (

      <>
        {this.state.loading ? <LoadingView/> :
          <GridContainer justify="flex-start">
            <GridItem xs={12} sm={12} md={10}>
              <form>
                <Card>
                  <CardContent>
                    <GridContainer>
                      <GridItem md={12} sm={12} xs={12}>
                        <Typography variant={"h5"} align="center">
                          {ShopLicenseViewModel.TITLE1}
                        </Typography>
                        <Typography variant={"h5"} align="center">
                          {ShopLicenseViewModel.TITLE2}
                        </Typography>
                        <Typography variant={"h5"} align="center">
                          {ShopLicenseViewModel.TITLE}
                        </Typography>

                        <Typography variant={"subtitle1"} align="center">
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
                              value: this.state.ownerAddress,
                              name: "ownerAddress",
                              placeholder: "Owner Address",
                              onBlur: this.handleBlur.bind(this),
                              required: true,
                              variant: "outlined",
                              margin: "dense",
                              fullWidth: true,
                              error: Boolean(this.state.ownerAddressError),
                              helperText: this.state.ownerAddressError,
                              onChange: this.handleChange.bind(this),
                              label: ShopLicenseViewModel.OWNER_ADDRESS
                            }
                          }

                          onPlaceSelect={(place) => {
                            if (place) {
                              let name = place.name;
                              let address = place.formatted_address;
                              let complete_address = address.includes(name) ? address : `${name} ${address}`;
                              this.setState({ ownerAddress: complete_address });
                            }
                          }}/>
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <OfficeSelect
                          value={this.state.localCouncil}
                          label={"Local Council"}
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
                              label: "Purposed Location of Shop"
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
                          label={"Coordinate of Purposed Location"}
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
                          label={"Name of Trade"}
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            fullWidth={true}
                            InputLabelProps={
                              { shrink: true }
                            }
                            label={"Date of Establishment"}
                            error={Boolean(this.state.estdError)}
                            helperText={this.state.estdError}
                            margin="dense"
                            name={"estd"}
                            variant="outlined"
                            value={this.state.estd}
                            onChange={this.handleEstdChange}
                            format={"dd/MM/yyyy"}
                          />
                        </MuiPickersUtilsProvider>
                        {/*  <TextField name={"estd"}
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
                    /> */}
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
                        <FileUpload applicationName={APPLICATION_NAME.SHOP}
                                    document={{ id: 122, mandatory:1, name: "Passport size photo", mime: "image/*" }}
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
                          <FormLabel>Whether Premises Owned or Leased?</FormLabel>
                          <RadioGroup
                            name={"premised"}
                            row={true}
                            value={this.state.premised}
                            onChange={this.handleRadio.bind(this)}
                          >
                            <FormControlLabel value={"Owned"} control={<Radio color={"primary"}/>}
                                              label={"Owned"}/>
                            <FormControlLabel value={"Leased"} control={<Radio color={"primary"}/>}
                                              label={"Leased"}/>
                          </RadioGroup>
                        </FormControl>
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
                          return <GridItem key={index} className={classes.root} sm={12} xs={12}
                                           md={12}>

                            <FileUpload
                              applicationName={APPLICATION_NAME.SHOP}
                              key={index} document={doc} onUploadSuccess={(data) => {
                              let temp = {
                                mandatory: doc.mandatory,
                                document_id: doc.id,
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
                            <Checkbox color={"primary"}
                                      onChange={(val, checked) => this.setState({ agree: checked })}/>
                          }
                          label={"1. I hereby declare that my premises are not located in unauthorized area or any enroachment on government land and there is " +
                          "no unauthorized construction." +
                          "\n2. I shall dispose of solid waste of these premises as per AMC, Sanitation and Public Health Regulations." +
                          "\n3. I shall follow all rules and regulations of AMC." +
                          "\n4. It is certified that the above information is correct to the best of my knowledge." +
                          "\n"}/>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Divider/>
                      </GridItem>
                    </GridContainer>
                  </CardContent>
                  <CardActions disableActionSpacing={true}>
                    <GridContainer justify={"flex-end"}>
                      <GridItem>
                        <Button name={"primary"} disabled={
                          !Boolean(this.state.name) || !Boolean(this.state.type) || !Boolean(this.state.address)
                          || !Boolean(this.state.coordinate) || !Boolean(this.state.phone) || !Boolean(this.state.shopName)
                          || Boolean(this.state.prestine)  ||
                          !this.state.agree || this.state.passport === undefined
                        }
                                color={"primary"} variant={"outlined"}
                                onClick={this.onSubmit.bind(this)}>
                          {ShopLicenseViewModel.PRIMARY_TEXT}
                        </Button>
                        {/*{"\u00A0 "}*/}
                        {/*{"\u00A0 "}*/}

                        {/*<Button name={"draft"}*/}
                        {/*        color={"primary"}*/}
                        {/*        variant={"outlined"}*/}
                        {/*        onClick={this.handleSaveDraft.bind(this)}>*/}
                        {/*  {ShopLicenseViewModel.DRAFT}*/}
                        {/*</Button>*/}
                        {"\u00A0 "}
                        {"\u00A0 "}
                        {"\u00A0 "}
                        <Button name={"secondary"}
                                color={"secondary"}
                                variant={"outlined"}
                                onClick={e => window.location.reload()}>
                          {ShopLicenseViewModel.SECONDARY_TEXT}
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardActions>
                </Card>
              </form>
            </GridItem>

            <SubmitDialog open={this.state.submit} text={"Your Application is submitting, Please wait"}/>

            <OfficeSnackbar open={!!this.state.errorMessage} variant={"error"} message={this.state.errorMessage}
                            onClose={() => this.setState({ errorMessage: "" })}/>

            <GMapDialog open={this.state.openMap} onClose={(lat, lng) => {
              let msg = `Latitude: ${lat} , Longitude: ${lng}`;
              this.setState({ coordinate: msg });
              this.setState(state => {
                state.latitude = lat;
                state.longitude = lng;
              });
              this.setState({ openMap: false });
            }} isMarkerShown={true}/>

            <OtpDialog successMessage={this.state.otpMessage} phone={this.state.phone} open={this.state.openOtp}
                       purposed={"Shop License Application"}
                       onClose={(value) => {
                         this.setState({ openOtp: false });
                         this.onVerifiedOtp(value);
                       }}/>

            {this.state.success}
          </GridContainer>
        }
      </>


    );
  }

}

export default withRouter(withStyles(style)(ShopApplication));