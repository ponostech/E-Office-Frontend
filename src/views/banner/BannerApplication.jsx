import React, { Component } from "reactn";
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
import BannerDetail from "./BannerDetail";
import { LocalCouncilService } from "../../services/LocalCouncilService";
import { BannerService } from "../../services/BannerService";
import withStyles from "@material-ui/core/es/styles/withStyles";
import AddressField from "../../components/AddressField";
import { Validators } from "../../utils/Validators";
import OtpDialog from "../../components/OtpDialog";
import { OtpService } from "../../services/OtpService";
import { HOME } from "../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import LoadingView from "../common/LoadingView";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const style = {
  root: {
    padding: "10px 15px !important"
  },
  subTitle: {
    fontSize: 16,
    color: "#727272",
    marginTop: 6,
    marginBottom: 6
  }
};

class BannerApplication extends Component {
  localCouncilservice = new LocalCouncilService();
  bannerService = new BannerService();
  otpService = new OtpService();

  bannerRef = React.createRef();

  state = {
    name: "",
    type: undefined,
    phone: "",
    address: "",
    localCouncil: undefined,
    details: "",
    content: "",
    displayType: undefined,
    design: undefined,
    bannerDetails: [],

    localCouncils: [],
    agree: false,
    display_types: [
      { value: "Vehicle", label: "Vehicle" },
      { value: "Umbrella", label: "Umbrella" },
      { value: "Balloons", label: "Balloons" },
      { value: "Video", label: "Video" },
      { value: "Audio/Sound", label: "Audio/Sound" }
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
    openOtp: false,
    otpMessage: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "e-AMC | Banners/Posters Application Form";
    this.setGlobal({ loading: true });
    this.fetchLocalCouncil();
  }

  sendOtp = () => {
    this.otpService
      .requestOtp(
        this.state.phone,
        "Banner Advertisement Application",
        errorMsg => this.setGlobal({ errorMsg }),
        otpMessage => {
          this.setState({ otpMessage, openOtp: true });
        }
      )
      .finally(() => console.log("Otp send request complete"));
  };

  fetchLocalCouncil = () => {
    this.localCouncilservice
      .fetch(
        errorMsg => this.setGlobal({ errorMsg }),
        localCouncils => this.setState({ localCouncils })
      )
      .finally(() => {
        this.setGlobal({ loading: false });
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    this.setState({ prestine: false });
    this.validateTextField(name, value);
  };

  handleSelect = (identifier, value) => {
    this.setState({ [identifier]: value });
    this.setState({ prestine: false });
    this.validateSelect(identifier, value);
  };

  onVerifiedOtp = verified => {
    const { history } = this.props;

    if (verified) {
      this.setState({ submit: true });
      this.bannerService
        .create(
          this.state,
          errorMsg => this.setGlobal({ errorMsg }),
          successMessage => {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
              text: successMessage,
              type: "success",
              confirmButtonColor: "#26B99A",
              confirmButtonText: "Ok"
            }).then(result => {
              if (result.value) {
                history.push(HOME);
              }
            });
          }
        )
        .finally(() => this.setState({ submit: false }));
    }
  };

  onSubmit = e => {
    const invalid =
      Boolean(this.state.nameError) ||
      Boolean(this.state.phoneError) ||
      Boolean(this.state.typeError) ||
      Boolean(this.state.addressError) ||
      Boolean(this.state.localCouncilError) ||
      Boolean(this.state.displayTypeError) ||
      Boolean(this.state.prestine);

    if (invalid) {
      this.setGlobal({ errorMsg: "Please fill all the required fields" });
      return;
    }
    this.sendOtp();
  };

  onClear = () => {
    window.location.reload();
    // this.bannerRef.current.doReset();
  };

  validateTextField = (type, value) => {
    switch (type) {
      case "phone":
        if (value === "") this.setState({ phoneError: "Phone no is required" });
        else if (!Validators.PHONE_REGEX.test(value))
          this.setState({ phoneError: "Phone number must be 10 digit number" });
        else this.setState({ phoneError: "" });
        break;
      case "name":
        value === ""
          ? this.setState({ nameError: "Name is required" })
          : this.setState({ nameError: "" });
        break;
      case "address":
        value === ""
          ? this.setState({ addressError: "Address of applicant is required" })
          : this.setState({ addressError: "" });
        break;
      default:
        break;
    }
  };

  validateSelect = (id, val) => {
    switch (id) {
      case "type":
        this.state.type
          ? this.setState({ typeError: "" })
          : this.setState({ typeError: "Type of applicant is required" });
        break;
      case "localCouncil":
        this.state.localCouncil
          ? this.setState({ localCouncilError: "" })
          : this.setState({ localCouncilError: "Local Council is required" });
        break;
      case "displayType":
        this.state.displayType === undefined
          ? this.setState({
              displayTypeError: BannerViewModel.DISPLAY_TYPE_REQUIRED
            })
          : this.setState({ displayTypeError: "" });
        break;
      default:
        break;
    }
  };

  handleBlur = e => {
    const { name, value } = e.target;
    this.validateTextField(name, value);
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
                      <GridItem
                        className={classes.root}
                        xs={12}
                        sm={12}
                        md={12}
                      >
                        <Typography variant={"h5"}>
                          {BannerViewModel.TITLE}
                        </Typography>
                        <Typography variant={"subtitle1"}>
                          {BannerViewModel.SUB_TITLE}
                        </Typography>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Typography variant="h6" className={classes.subTitle}>
                          Applicant Details
                        </Typography>
                        <Divider />
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
                          label={BannerViewModel.PHONE_NO}
                        />
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
                          onBlur={this.validateSelect.bind(this, "type")}
                          onChange={this.handleSelect.bind(this, "type")}
                          options={this.state.types}
                        />
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
                          label={BannerViewModel.LOCALCOUNCIL}
                          name={"localCouncil"}
                          variant={"outlined"}
                          margin={"dense"}
                          fullWidth={true}
                          required={true}
                          error={Boolean(this.state.localCouncilError)}
                          helperText={this.state.localCouncilError}
                          onBlur={this.validateSelect.bind(
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
                        <OfficeSelect
                          required={true}
                          variant={"outlined"}
                          margin={"dense"}
                          value={this.state.displayType}
                          fullWidth={true}
                          name={"displayType"}
                          error={!!this.state.displayTypeError}
                          helperText={this.state.displayTypeError}
                          onBlur={this.validateSelect.bind(this, "displayType")}
                          onChange={this.handleSelect.bind(this, "displayType")}
                          ClearAble={true}
                          label={BannerViewModel.DISPLAY_TYPE}
                          options={this.state.display_types}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                          label={BannerViewModel.DETAILS}
                        />
                      </GridItem>

                      <GridItem
                        className={classes.root}
                        xs={12}
                        sm={12}
                        md={12}
                      >
                        <Typography variant="h6" className={classes.subTitle}>
                          {" "}
                          Details of Advertisement
                        </Typography>
                        <Divider
                          component={"div"}
                          style={{ marginTop: 10, marginBottom: 10 }}
                        />
                        <BannerDetail
                          ref={this.bannerRef}
                          onRemoveDetail={index => {
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
                          localCouncils={this.state.localCouncils}
                          onDetailAdd={item => {
                            console.log("Item is added");
                            this.state.bannerDetails.push(item);
                          }}
                        />
                      </GridItem>

                      <GridItem
                        className={classes.root}
                        xs={12}
                        sm={12}
                        md={12}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              color={"primary"}
                              onChange={(val, checked) =>
                                this.setState({ agree: checked })
                              }
                            />
                          }
                          label={BannerViewModel.ACKNOWLEDGEMENT}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardContent>
                  <CardActions style={{ justifyContent: "flex-end" }}>
                    <div>
                      <Button
                        name={"primary"}
                        disabled={
                          this.state.prestine ||
                          Boolean(this.state.name === "") ||
                          Boolean(this.state.phone === "") ||
                          Boolean(this.state.address === "") ||
                          Boolean(this.state.localCouncil === undefined) ||
                          Boolean(this.state.displayType === undefined) ||
                          !this.state.agree
                        }
                        color={"primary"}
                        variant={"outlined"}
                        onClick={this.onSubmit.bind(this)}
                      >
                        {BannerViewModel.PRIMARY_TEXT}
                      </Button>
                      {"\u00A0 "}
                      {/*{"\u00A0 "}*/}
                      {/*<Button name={"secondary"}*/}
                      {/*        color={"primary"}*/}
                      {/*        variant={"outlined"}*/}
                      {/*        onClick={this.saveDraft.bind(this)}>*/}
                      {/*  {BannerViewModel.DRAFT}*/}
                      {/*</Button>*/}
                      {"\u00A0 "}
                      {"\u00A0 "}
                      <Button
                        name={"secondary"}
                        color={"secondary"}
                        variant={"outlined"}
                        onClick={this.onClear.bind(this)}
                      >
                        {BannerViewModel.SECONDARY_TEXT}
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </form>
            </GridItem>

            <SubmitDialog
              open={this.state.submit}
              text={BannerViewModel.SUBMIT}
            />

            <OtpDialog
              successMessage={this.state.otpMessage}
              phone={this.state.phone}
              open={this.state.openOtp}
              purposed={"Banner Application"}
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

export default withStyles(style)(withRouter(BannerApplication));
