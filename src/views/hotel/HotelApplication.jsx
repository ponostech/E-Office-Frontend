import React, { Component } from "reactn";
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
import PlaceIcon from "@material-ui/icons/PinDrop";
import GMapDialog from "../../components/GmapDialog";
import { Validators } from "../../utils/Validators";
import AddressField from "../../components/AddressField";
import { LocalCouncilService } from "../../services/LocalCouncilService";
import { OtpService } from "../../services/OtpService";
import OtpDialog from "../../components/OtpDialog";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import "date-fns";
import { HotelService } from "../../services/HotelService";
import { TradeService } from "../../services/TradeService";
import { HOME } from "../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { APPLICATION_NAME } from "../../utils/Util";
import LoadingView from "../common/LoadingView";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AttachmentView } from "../../components/NotesheetAttachmentItem";

const style = {
  subTitle: {
    fontSize: 16,
    color: "#727272",
    marginTop: 6,
    marginBottom: 6
  },
  root: {
    padding: "10px 15px !important"
  },
  formControl: {
    label: {
      whiteSpace: "pre-line"
    }
  }
};

class HotelApplication extends Component {
  documentService = new DocumentService();
  hotelService = new HotelService();
  localCouncilService = new LocalCouncilService();
  otpService = new OtpService();
  tradeService = new TradeService();
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
    noAcRoom: 0,
    acRoom: 0,
    noConferenceHall: 0,
    noBanquet: 0,
    facilities: "",
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
    additionalDocuments: [],

    nameError: "",
    typeError: "",
    addressError: "",
    tradeNameError: "",
    coordinateError: "",
    phoneError: "",
    shopNameError: "",
    displayTypeError: "",
    estdError: "",
    businessDetailError: "",
    localCouncilError: "",
    ownerAddressError: "",

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
    success: undefined,
    documents: [],
    flaDocuments: [],
    noFlaDocuments: [],
    openMap: false,
    prestine: true,
    errorMessage: "",
    openOtp: false,
    otpMessage: ""
  };

  componentDidMount() {
    document.title = "e-AMC | Shop License Application Form";
    window.scrollTo(0, 0);
    const self = this;
    self.setGlobal({ loading: true });
    // timeout = setTimeout(function (handler) {
    Promise.all([
      self.fetchTrades(),
      self.fetchDocuments(),
      self.fetchLocalCouncil()
    ]).then(function([values]) {
      self.setGlobal({ loading: false });
    });
    // }, 4000);
  }

  sendOtp = () => {
    this.otpService
      .requestOtp(
        this.state.phone,
        "Hotel & Lodging License Application",
        errorMsg => this.setGlobal({ errorMsg }),
        otpMessage => this.setState({ otpMessage, openOtp: true })
      )
      .finally(() => console.info("otp request has been made"));
  };

  onVerifiedOtp = verified => {
    const { history } = this.props;
    if (verified) {
      this.setState({ submit: true });
      this.hotelService
        .create(
          this.state,
          errorMsg => this.setGlobal({ errorMsg }),
          (challan, successMessage) => {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
              title: `Challan No:${challan.number}`,
              text: successMessage,
              type: "success",
              confirmButtonColor: "#26B99A",
              confirmButtonText: "Pay Now (ONLINE)"
            }).then(result => {
              if (result.value) {
                Swal.fire("Pay!", "Your application is paid.", "success");
                history.push(HOME);
              }
            });
          }
        )
        .finally(() => this.setState({ submit: false }));
    }
  };

  fetchLocalCouncil = () => {
    this.localCouncilService.fetch(
      errorMsg => this.setState({ errorMsg }),
      localCouncils => this.setState({ localCouncils })
    );
  };

  fetchDocuments = () => {
    this.documentService.fetch(
      "shop",
      errorMsg => this.setState({ errorMsg }),
      docs => {
        this.setState({
          flaDocuments: docs,
          noFlaDocuments: docs.filter(
            (item, index) => index !== docs.length - 1
          ),
          documents: docs.filter((item, index) => index !== docs.length - 1)
        });
      }
    );
  };
  fetchTrades = () => {
    this.tradeService.fetch(
      "hotel",
      errorMsg => this.setState({ errorMsg }),
      trades => this.setState({ trades })
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    switch (name) {
      case "phone":
        !Validators.PHONE_REGEX.test(value)
          ? this.setState({ phoneError: ShopLicenseViewModel.VALID_PHONE })
          : this.setState({ phoneError: "" });
        break;
      default:
        break;
    }
    this.setState({ prestine: false });
  };
  validateDocument = () => {
    const { documents, uploadDocuments } = this.state;
    let docCount = 0;
    let uploadCount = 0;
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].mandatory) docCount++;
    }
    for (let i = 0; i < uploadDocuments.length; i++) {
      if (uploadDocuments[i].mandatory) uploadCount++;
    }
    return uploadCount === docCount;
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
        break;
      default:
        break;
    }
  };

  onSubmit = e => {
    const invalid =
      Boolean(this.state.nameError) ||
      Boolean(this.state.typeError) ||
      Boolean(this.state.addressError) ||
      Boolean(this.state.coordinateError) ||
      Boolean(this.state.phoneError) ||
      Boolean(this.state.shopNameError) ||
      Boolean(this.state.businessDetailError) ||
      Boolean(this.state.estdError) ||
      Boolean(this.state.prestine) ||
      !this.validateDocument();

    if (!invalid) {
      this.sendOtp();
    } else {
      this.setState({ errorMessage: "Please fill all the required fields" });
    }
  };

  handleRadio = e => {
    this.setState({
      premised: e.target.value
    });
  };

  handleSelectBlur = (identifier, e) => {
    switch (identifier) {
      case "localCouncil":
        this.state.localCouncil === undefined
          ? this.setState({ localCouncilError: "Local Council is required" })
          : this.setState({ localCouncilError: "" });
        break;
      case "type":
        this.state.type
          ? this.setState({ typeError: "" })
          : this.setState({ typeError: ShopLicenseViewModel.TYPE_REQUIRED });
        break;
      case "trade":
        this.state.tradeName === undefined
          ? this.setState({
              tradeNameError: ShopLicenseViewModel.TRADE_REQUIRED
            })
          : this.setState({ tradeNameError: "" });
        break;
      case "displayType":
        this.state.displayType === undefined
          ? this.setState({
              displayTypeError: ShopLicenseViewModel.DISPLAY_TYPE_REQUIRED
            })
          : this.setState({ displayTypeError: "" });
        break;
      default:
        break;
    }
  };
  handleBlur = e => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        value.length === 0
          ? this.setState({ nameError: ShopLicenseViewModel.OWNER_REQUIRED })
          : this.setState({ nameError: "" });
        break;
      case "shopName":
        value.length === 0
          ? this.setState({
              shopNameError: ShopLicenseViewModel.SHOP_NAME_REQUIRED
            })
          : this.setState({ shopNameError: "" });
        break;
      case "address":
        value.length === 0
          ? this.setState({
              addressError: ShopLicenseViewModel.ADDRESS_REQUIRED
            })
          : this.setState({ addressError: "" });
        break;
      case "ownerAddress":
        value.length === 0
          ? this.setState({
              ownerAddressError: ShopLicenseViewModel.OWNER_ADDRESS_REQUIRED
            })
          : this.setState({ ownerAddressError: "" });
        break;
      case "phone":
        value.length === 0
          ? this.setState({ phoneError: ShopLicenseViewModel.PHONE_REQUIRED })
          : this.setState({ phoneError: "" });
        break;
      case "estd":
        value.length === 0
          ? this.setState({ estdError: ShopLicenseViewModel.ESTD_REQUIRED })
          : this.setState({ estdError: "" });
        break;
      case "businessDetail":
        value.length === 0
          ? this.setState({
              businessDetailError: ShopLicenseViewModel.DETAILS_REQUIRED
            })
          : this.setState({ businessDetailError: "" });
        break;
      default:
        break;
    }
  };

  handleEstdChange = estdDate => {
    this.setState({ estd: estdDate });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.global.loading ? (
          <LoadingView />
        ) : (
          <GridContainer justify="flex-start">
            <GridItem xs={12} sm={12} md={10}>
              <form>
                <Card>
                  <CardContent>
                    <GridContainer>
                      <GridItem md={12} sm={12} xs={12}>
                        <Typography variant={"h5"} align="center">
                          {ShopLicenseViewModel.TITLEb}
                        </Typography>
                        <Typography variant={"h5"} align="center">
                          {ShopLicenseViewModel.TITLE2}
                        </Typography>
                        <Typography variant={"h5"} align="center">
                          {ShopLicenseViewModel.TITLEI}
                        </Typography>
                        <Typography variant={"subtitle1"} align="center">
                          {ShopLicenseViewModel.SUBTITLE}
                        </Typography>
                      </GridItem>
                      <GridItem md={12} sm={12} xs={12}>
                        <Typography className={classes.subTitle} variant={"h6"}>
                          {" "}
                          Details of Applicant
                        </Typography>
                      </GridItem>

                      <GridItem md={12} sm={12} xs={12}>
                        <Divider component={"div"} />
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
                          options={this.state.types}
                        />
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
                          textFieldProps={{
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
                          }}
                          onPlaceSelect={place => {
                            if (place) {
                              let name = place.name;
                              let address = place.formatted_address;
                              let complete_address = address.includes(name)
                                ? address
                                : `${name} ${address}`;
                              this.setState({ ownerAddress: complete_address });
                            }
                          }}
                        />
                      </GridItem>

                      <GridItem md={12} sm={12} xs={12}>
                        <Typography className={classes.subTitle} variant={"h6"}>
                          {" "}
                          Details of Proposed Hotel & Lodgings
                        </Typography>
                      </GridItem>

                      <GridItem sm={12} xs={12} md={12}>
                        <Divider component={"div"} />
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
                          label={"Hotel Grade"}
                          options={this.state.trades}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <AddressField
                          textFieldProps={{
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
                            label: "Address of Proposed Hotel/Lodge"
                          }}
                          onPlaceSelect={place => {
                            if (place) {
                              let name = place.name;
                              let address = place.formatted_address;
                              let complete_address = address.includes(name)
                                ? address
                                : `${name} ${address}`;
                              this.setState({ address: complete_address });
                            }
                          }}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <OfficeSelect
                          value={this.state.localCouncil}
                          label={"Local Council of Proposed Hotel/Lodge"}
                          name={"localCouncil"}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          required={true}
                          helperText={this.state.localCouncilError}
                          error={Boolean(this.state.localCouncilError)}
                          onBlur={this.handleSelectBlur.bind(
                            this,
                            "localCouncil"
                          )}
                          onChange={this.handleSelect.bind(
                            this,
                            "localCouncil"
                          )}
                          options={this.state.localCouncils}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <TextField
                          onClick={e => this.setState({ openMap: true })}
                          value={this.state.coordinate}
                          name={"coordinate"}
                          onBlur={this.handleBlur.bind(this)}
                          required={true}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          error={Boolean(this.state.coordinateError)}
                          helperText={this.state.coordinateError}
                          label={"Location of Proposed Hotel/Lodge"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position={"end"}>
                                <IconButton
                                  onClick={e =>
                                    this.setState({ openMap: true })
                                  }
                                >
                                  <PlaceIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <TextField
                          required={true}
                          error={Boolean(this.state.businessDetailError)}
                          helperText={this.state.businessDetailError}
                          value={this.state.businessDetail}
                          name={"businessDetail"}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          onBlur={this.handleBlur.bind(this)}
                          onChange={this.handleChange.bind(this)}
                          label={"Details of business"}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={3}>
                        <TextField
                          value={this.state.acRoom}
                          InputProps={{
                            min: 0
                          }}
                          type={"number"}
                          name={"acRoom"}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          onChange={this.handleChange.bind(this)}
                          label={"No of Room (AC)"}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={3}>
                        <TextField
                          InputProps={{
                            min: 0
                          }}
                          type={"number"}
                          value={this.state.noAcRoom}
                          name={"noAcRoom"}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          onChange={this.handleChange.bind(this)}
                          label={"No of Room (No AC)"}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={3}>
                        <TextField
                          InputProps={{
                            min: 0
                          }}
                          type={"number"}
                          value={this.state.noConferenceHall}
                          name={"noConferenceHall"}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          onChange={this.handleChange.bind(this)}
                          label={"No of Conference Hall"}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={3}>
                        <TextField
                          InputProps={{
                            min: 0
                          }}
                          type={"number"}
                          value={this.state.noBanquet}
                          name={"noBanquet"}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          onChange={this.handleChange.bind(this)}
                          label={"No of Banquet Hall"}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <TextField
                          value={this.state.facilities}
                          name={"facilities"}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          onChange={this.handleChange.bind(this)}
                          label={"Any Other Facilities"}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            fullWidth={true}
                            InputLabelProps={{ shrink: true }}
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
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <TextField
                          value={this.state.tinNo}
                          name={"tinNo"}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          onChange={this.handleChange.bind(this)}
                          label={"TIN No (if any)"}
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
                          label={"CST No (if any)"}
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
                          label={"PAN No (if any)"}
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
                          label={"GST No (if any)"}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <FormControl fullWidth={true} margin={"dense"}>
                          <FormLabel>
                            Whether Premises is Owned or Leased?
                          </FormLabel>
                          <RadioGroup
                            name={"premised"}
                            row={true}
                            value={this.state.premised}
                            onChange={this.handleRadio.bind(this)}
                          >
                            <FormControlLabel
                              value={"Owned"}
                              control={<Radio color={"primary"} />}
                              label={"Owned"}
                            />
                            <FormControlLabel
                              value={"Leased"}
                              control={<Radio color={"primary"} />}
                              label={"Leased"}
                            />
                          </RadioGroup>
                        </FormControl>
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <FileUpload
                          applicationName={APPLICATION_NAME.HOTEL}
                          document={{
                            id: 122,
                            mandatory: 1,
                            name: "Photograph of Applicant",
                            mime: "image/*"
                          }}
                          onUploadSuccess={data => {
                            this.setState(state => {
                              state.passport = {
                                id: 122,
                                name: "passport",
                                path: data.location
                              };
                            });
                          }}
                          onUploadFailure={err => {
                            console.log(err);
                          }}
                        />
                      </GridItem>

                      <GridItem
                        className={classes.root}
                        xs={12}
                        sm={12}
                        md={12}
                      >
                        <Typography className={classes.subTitle} variant={"h6"}>
                          Upload Document(s)
                        </Typography>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <Divider component={"div"} />
                      </GridItem>
                      {this.state.documents.map((doc, index) => {
                        return (
                          <GridItem
                            key={index}
                            className={classes.root}
                            sm={12}
                            xs={12}
                            md={8}
                          >
                            <FileUpload
                              key={index}
                              document={doc}
                              onUploadSuccess={data => {
                                let temp = {
                                  mandatory: doc.mandatory,
                                  document_id: doc.id,
                                  name: doc.name,
                                  path: data.location
                                };
                                this.setState(state => {
                                  state.uploadDocuments.push(temp);
                                });
                              }}
                              onUploadFailure={err => {
                                console.log(err);
                              }}
                            />
                          </GridItem>
                        );
                      })}

                      <GridItem xs={12} sm={12} md={8}>
                        <Typography className={classes.subTitle} variant={"h6"}>
                          Additional Document(S)
                        </Typography>
                      </GridItem>

                      <GridItem className={classes.root} sm={12} xs={12} md={8}>
                        <Divider component={"div"} />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={8}>
                        <AttachmentView
                          attachments={this.state.additionalDocuments}
                          acceptedFiles={"image/*,application/pdf"}
                          onSuccess={additionalDocuments =>
                            this.setState({ additionalDocuments })
                          }
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12}>
                        <Typography className={classes.subTitle} variant={"h6"}>
                          Declaration
                        </Typography>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12}>
                        <FormControlLabel
                          style={{
                            whiteSpace: "pre-line",
                            alignItems: "flex-start"
                          }}
                          control={
                            <Checkbox
                              style={{ paddingTop: 0 }}
                              color={"primary"}
                              onChange={(val, checked) =>
                                this.setState({ agree: checked })
                              }
                            />
                          }
                          label={
                            "1.I hereby declare that my premises are not located in unauthorized area or any enroachment on government land and there is " +
                            "no unauthorized construction." +
                            "\n2. I shall dispose of solid waste of these premises as per AMC, Sanitation and Public Health Regulations 2012. " +
                            "\n3. I shall follow all rules and regulations of AMC;" +
                            "\n4. It is certified that the above information is correct to the best of my knowledge"
                          }
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12}>
                        <Divider />
                      </GridItem>
                    </GridContainer>
                  </CardContent>
                  <CardActions disableActionSpacing={true}>
                    <GridContainer justify={"flex-end"}>
                      <GridItem>
                        <Button
                          name={"primary"}
                          disabled={
                            !Boolean(this.state.name) ||
                            !Boolean(this.state.type) ||
                            !Boolean(this.state.address) ||
                            !Boolean(this.state.ownerAddress) ||
                            !Boolean(this.state.coordinate) ||
                            !Boolean(this.state.phone) ||
                            !Boolean(this.state.shopName) ||
                            !Boolean(this.state.businessDetail) ||
                            !Boolean(this.state.estd) ||
                            !this.state.agree ||
                            this.state.passport === undefined
                          }
                          color={"primary"}
                          variant={"outlined"}
                          onClick={this.onSubmit.bind(this)}
                        >
                          {ShopLicenseViewModel.PRIMARY_TEXT}
                        </Button>
                        {"\u00A0 "}
                        {"\u00A0 "}
                        {"\u00A0 "}
                        {"\u00A0 "}
                        <Button
                          name={"secondary"}
                          color={"secondary"}
                          variant={"outlined"}
                          onClick={e => window.location.reload()}
                        >
                          {ShopLicenseViewModel.SECONDARY_TEXT}
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardActions>
                </Card>
              </form>
            </GridItem>

            <SubmitDialog
              open={this.state.submit}
              text={"Your Application is submitting, Please wait"}
            />
            <OfficeSnackbar
              open={!!this.state.errorMessage}
              variant={"error"}
              message={this.state.errorMessage}
              onClose={() => this.setState({ errorMessage: "" })}
            />

            <GMapDialog
              open={this.state.openMap}
              onClose={(lat, lng) => {
                let msg = `Latitude: ${lat} , Longitude: ${lng}`;
                this.setState({ coordinate: msg });
                this.setState(state => {
                  state.latitude = lat;
                  state.longitude = lng;
                });
                this.setState({ openMap: false });
              }}
              isMarkerShown={true}
            />

            <OtpDialog
              successMessage={this.state.otpMessage}
              phone={this.state.phone}
              open={this.state.openOtp}
              onClose={value => {
                this.setState({ openOtp: false });
                this.onVerifiedOtp(value);
              }}
            />

            {this.state.success}
          </GridContainer>
        )}
      </>
    );
  }
}

export default withRouter(withStyles(style)(HotelApplication));
