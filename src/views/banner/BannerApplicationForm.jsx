import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography
} from "@material-ui/core";

import { BannerViewModel } from "../model/BannerViewModel";
import GridItem from "../../components/Grid/GridItem";
import OfficeSelect from "../../components/OfficeSelect";
import GridContainer from "../../components/Grid/GridContainer";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import BannerDetail from "./BannerDetail";
import { LocalCouncilService } from "../../services/LocalCouncilService";
import FileUpload from "../../components/FileUpload";
import { BannerService } from "../../services/BannerService";
import withStyles from "@material-ui/core/es/styles/withStyles";
import AddressField from "../../components/AddressField";
import { Validators } from "../../utils/Validators";
import { DocumentService } from "../../services/DocumentService";
import OtpDialog from "../../components/OtpDialog";
import { RequestOtp } from "../../services/OtpService";
import { ArrayToString, ErrorToString } from "../../utils/ErrorUtil";
import SweetAlert from 'react-bootstrap-sweetalert'
const style = {
  root: {
    padding: "10px 15px !important"
  }
};

var timeout = null;

class BannerApplicationForm extends Component {
  localCouncilservice = new LocalCouncilService();
  bannerService = new BannerService();
  documentService = new DocumentService();

  bannerRef = React.createRef();

  state = {
    name: "",
    type: undefined,
    phone: "",
    address: "",
    localCouncil: undefined,
    details: "",
    displayType: undefined,
    signature: undefined,
    uploadDocuments: [],
    bannerDetails: [],

    localCouncils: [],
    agree: false,
    display_types: [
      { value: "vehicle", label: "Vehicle" },
      { value: "umbrella", label: "Umbrella" },
      { value: "balloons", label: "Balloons" },
      { value: "video", label: "Video" },
      { value: "audio/sound", label: "Audio/Sound" },
      { value: "others", label: "Others" }
    ],
    types: [
      { value: "private", label: "Private" },
      { value: "firm", label: "Firm" },
      { value: "company", label: "Company" },
      { value: "charitable trust", label: "Charitable Trust" },
      { value: "others", label: "Others" }
    ],

    nameError: "",
    phoneError: "",
    typeError: "",
    addressError: "",
    localCouncilError: "",
    displayTypeError: "",
    errorMessage: "",

    submit: false,
    complete: false,
    prestine: true,
    loading: false,
    openOtp: false,
    otpMessage: ""
  };

  componentWillUnmount() {
    //clearTimeout(timeout);
  }

  componentDidMount() {
    document.title = "e-AMC | Banners/Posters Application Form";

    const { doLoad, doLoadFinish } = this.props;

    doLoad();
    var self = this;
    //timeout = setTimeout(function(resolve, reject) {
      Promise.all([self.fetchLocalCouncil()])
        .then(function([locs]) {
          // self.setState({ loading: false });
          doLoadFinish();
        });
    //}, 6000);
  }

  sendOtp = () => {
    var self = this;
    RequestOtp(this.state.phone,"OTP for Banner application")
      .then(res => {
        console.log(res);
        if (res.data.status) {
          let str = ArrayToString(res.data.messages);
          self.setState({ otpMessage: str });
          self.setState({ openOtp: true });
        } else {
          this.setState({ errorMessage: ErrorToString(res.data.messages) });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchLocalCouncil = () => {
    let newLocalCouncils = [];
    this.localCouncilservice.get()
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
          this.setState({ hasError: true });
        }
      }).catch(err => {
      let msg = "Unable to load resources, Please try again";
      this.setState({ errorMessage: msg });
      console.log(err);
    });
  };


  handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "phone":
        !Validators.PHONE_REGEX.test(value) ? this.setState({ phoneError: "Phone number must be 10 digit number" }) : this.setState({ phoneError: "" });
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
      case "type":
        this.setState({ type: value });
        break;
      case "localCouncil":
        this.setState({ localCouncil: value });
        break;
      case "displayType":
        this.setState({ displayType: value });
        break;
      default:
        break;
    }
    this.setState({ prestine: false });
  };

  onVerifiedOtp = (verified) => {
    if (verified) {
      this.setState({ submit: true });
      this.bannerService.create(this.state)
        .then(res => {
          if (res.data.status) {
            this.setState({
              success: (
                <SweetAlert
                  success
                  style={{ display: "block", marginTop: "-100px" }}
                  title={"Success"}
                  onConfirm={() => window.location.reload()}>
                  {
                    res.data.messages.map(function(msg, index) {
                      return <p>
                        {`${msg}.`}
                      </p>;
                    })
                  }
                </SweetAlert>
              )
            });
          } else {
            const msg = ErrorToString(res.data.messages);
            this.setState({ errorMessage: msg });
          }

          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.setState({ submit: false });
        });
    }
  };

  onSubmit = (e) => {

    const invalid = Boolean(this.state.nameError) || Boolean(this.state.phoneError) || Boolean(this.state.typeError) || Boolean(this.state.addressError)
      || Boolean(this.state.localCouncilError) || Boolean(this.state.displayTypeError) || Boolean(this.state.prestine) ||
      this.state.bannerDetails.length === 0 || this.state.signature === undefined;

    if (invalid) {
      this.setState({ errorMessage: "Please fill all the required fields" });
      return;
    }

    this.sendOtp();

  };
  onClear = () => {
    this.setState({
      name: "",
      address: "",
      phone_no: "",
      blood: "",
      signature: undefined
    });
    // this.bannerRef.current.doReset();
  };


  handleSelectBlur = (identifier, e) => {
    switch (identifier) {
      case "type":
        this.state.type === undefined ? this.setState({ typeError: BannerViewModel.TYPE_REQUIRED }) : this.setState({ typeError: "" });
        break;
      case "localCouncil":
        this.state.localCouncil === undefined ? this.setState({ localCouncilError: BannerViewModel.LOCALCOUNCIL_REQUIRED }) : this.setState({ localCouncilError: "" });
        break;
      case "displayType":
        this.state.displayType === undefined ? this.setState({ displayTypeError: BannerViewModel.DISPLAY_TYPE_REQUIRED }) : this.setState({ displayTypeError: "" });
        break;
      default:
        break;
    }
  };
  handleBlur = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ nameError: BannerViewModel.NAME_REQUIRED }) : this.setState({ nameError: "" });
        break;
      case "address":
        value.length === 0 ? this.setState({ addressError: BannerViewModel.ADDRESS_REQUIRED }) : this.setState({ addressError: "" });
        break;
      case "phone":
        value.length === 0 ? this.setState({ phoneError: BannerViewModel.PHONE_REQUIRED }) : this.setState({ phoneError: "" });
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
                  <GridItem className={classes.root} xs={12} sm={12} md={12}>
                    <Typography variant={"h5"}>
                      {BannerViewModel.TITLE}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                      {BannerViewModel.SUB_TITLE}
                    </Typography>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Typography variant="h7">
                      Applicant Details
                    </Typography>
                    <Divider/>
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
                      label={BannerViewModel.NAME}
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
                      error={Boolean(this.state.phoneError)}
                      helperText={this.state.phoneError}
                      label={BannerViewModel.PHONE_NO}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <OfficeSelect
                        value={this.state.type}
                        label={BannerViewModel.APPLICANT_TYPE}
                        name={"type"}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        required={true}
                        error={Boolean(this.state.typeError)}
                        helperText={this.state.typeError}
                        onBlur={this.handleSelectBlur.bind(this, "type")}
                        onChange={this.handleSelect.bind(this, "type")}
                        options={this.state.types}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <AddressField
                        textFieldProps={{
                          placeholder: "Address",
                          value: this.state.address,
                          name: "address",
                          required: true,
                          variant: "outlined",
                          margin: "dense",
                          fullWidth: true,
                          error: Boolean(this.state.addressError),
                          helperText: this.state.addressError,
                          onBlur: this.handleBlur.bind(this),
                          onChange: this.handleChange.bind(this),
                          label: BannerViewModel.ADDRESS
                        }}
                        onPlaceSelect={(place) => {
                          if (place) {
                            let name = place.name;
                            let address = place.formatted_address;
                            let complete_address = address.includes(name) ? address : `${name} ${address}`;
                            this.setState({ address: complete_address });
                          }
                        }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Typography variant="h7">
                      Banner/Poster Details
                    </Typography>
                    <Divider/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <OfficeSelect
                      value={this.state.localCouncil}
                      label={BannerViewModel.LOCALCOUNCIL}
                      name={"localCouncil"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      error={Boolean(this.state.localCouncilError)}
                      helperText={this.state.localCouncilError}
                      onBlur={this.handleSelectBlur.bind(this, "localCouncil")}
                      onChange={this.handleSelect.bind(this, "localCouncil")}
                      options={this.state.localCouncils}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <OfficeSelect
                      required={true}
                      variant={"outlined"}
                      margin={"dense"}
                      value={this.state.displayType}
                      fullWidth={true}
                      name={"displayType"}
                      error={!!this.state.displayTypeError}
                      helperText={this.state.displayTypeError}
                      onBlur={this.handleSelectBlur.bind(this, "displayType")}
                      onChange={this.handleSelect.bind(this, "displayType")}
                      ClearAble={true}
                      label={BannerViewModel.DISPLAY_TYPE}
                      options={this.state.display_types}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={12}>
                    <TextField
                      value={this.state.details}
                      name={"details"}
                      multiline={true}
                      rows={3}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onBlur={this.handleBlur.bind(this)}
                      onChange={this.handleChange.bind(this)}
                      label={BannerViewModel.DETAILS}/>
                  </GridItem>
                  <GridItem className={classes.root} xs={12} sm={12} md={12}>
                    <Typography style={{ marginTop: 20 }} variant={"h7"}> Details of Advertisement</Typography>
                    <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                    <BannerDetail ref={this.bannerRef}
                                  onRemoveDetail={(index) => {
                                    console.log("item is removed " + index);
                                    let list = this.state.bannerDetails;
                                    let result = list.filter((item, i) => {
                                      if (index !== i) {
                                        return item;
                                      }
                                    });
                                    this.setState(state => {
                                      state.bannerDetails = result;
                                    });
                                  }}
                                  onDetailAdd={(item) => {
                                    console.log("Item is added");
                                    this.state.bannerDetails.push(item);
                                  }}/>
                  </GridItem>

                  <GridItem className={classes.root} xs={12} sm={12} md={12}>
                    <FormControlLabel control={
                      <Checkbox color={"primary"} onChange={(val, checked) => this.setState({ agree: checked })}/>
                    }
                                      label={BannerViewModel.ACKNOWLEDGEMENT}/>
                  </GridItem>

                  <GridItem className={classes.root} xs={12} sm={12} md={6}>
                    <FileUpload document={{ id: 1, name: "Signature of applicant", mandatory: 1, mime: "image/*" }}
                                onUploadSuccess={(data) => {
                                  let temp = {
                                    name: "signature",
                                    path: data.location
                                  };
                                  this.setState({
                                    signature: temp
                                  });
                                }} onUploadFailure={(err) => {
                      console.log(err);
                    }}/>
                  </GridItem>
                </GridContainer>
              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                nameError: "",
                phoneError: "",
                typeError: "",
                addressError: "",
                localCouncilError: "",
                displayTypeError: "",
                <div>
                  <Button name={"primary"}
                          disabled={
                    this.state.prestine ||
                  Boolean(this.state.nameError) ||
                  Boolean(this.state.phoneError) ||
                  Boolean(this.state.addressError) ||
                  Boolean(this.state.localCouncilError) ||
                    Boolean(this.state.displayTypeError) ||
                    !this.state.agree
                  }
                          color={"primary"} variant={"outlined"}
                          onClick={this.onSubmit.bind(this)}>
                    {BannerViewModel.PRIMARY_TEXT}
                  </Button>
                  {"\u00A0 "}
                  {"\u00A0 "}
                  {"\u00A0 "}
                  <Button name={"secondary"}
                          color={"secondary"}
                          variant={"outlined"}
                          onClick={this.onClear.bind(this)}>
                    {BannerViewModel.SECONDARY_TEXT}
                  </Button>
                </div>
              </CardActions>

            </Card>
          </form>
        </GridItem>

        <SubmitDialog open={this.state.submit} text={BannerViewModel.SUBMIT}/>

        <OfficeSnackbar variant={"error"} open={!!this.state.errorMessage}
                        message={this.state.errorMessage}
                        onClose={(e) => this.setState({ errorMessage: "" })}/>
        <OtpDialog successMessage={this.state.otpMessage} phone={this.state.phone} open={this.state.openOtp}
                   purposed={"Resend OTP for Banner Application"}
                   onClose={(value) => {
                     this.setState({ openOtp: false });
                     this.onVerifiedOtp(value);
                   }}/>

        {this.state.success}
      </GridContainer>

    );
  }

}

export default withStyles(style)(BannerApplicationForm);