import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from "@material-ui/core";

import CardBody from "../../components/Card/CardBody.jsx";

import { ShopLicenseViewModel } from "../model/ShopLicenseViewModel";
import GridItem from "../../components/Grid/GridItem";
import OfficeSelect from "../../components/OfficeSelect";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";

class ShopLicenseApplicationForm extends Component {
  // staffService = new StaffService();
  state = {
    name: "",
    ownership: null,
    trade: null,
    address: "",
    display_type: null,
    blood: "",
    nameError: "",
    addressError: "",
    phoneError: "",
    owner_addressError: "",
    signature: null,
    phone: "",
    applicant_type: "",
    local_council_id: "",
    advertisement_type: "",
    display_on: "",
    locations: "",
    length: "",
    height: "",
    from: "",
    to: "",
    latitude: 0,
    longitude: 0,
    details: "",
    detailsError: "",
    status: "",
    estd: "",
    estdError: "",
    ownerError: "",
    premise_type: "Owned",
    display_types: [
      { value: "", label: "Please Select" },
      { value: "vehicle", label: "Vehicle" },
      { value: "umbrella", label: "Umbrella" },
      { value: "balloons", label: "Balloons" },
      { value: "video", label: "Video" },
      { value: "audio/sound", label: "Audio/Sound" },
      { value: "others", label: "Others" }
    ],
    ownerships: [
      { value: "", label: "Please Select" },
      { value: "proprietor", label: "Proprietor" },
      { value: "partnership", label: "Partnership" },
      { value: "private limited", label: "Private Limited" }
    ],
    trades: [
      { value: "", label: "Please Select" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" }
    ],
    submit: false,
    complete: false,
    attachments: []
  };

  componentDidMount() {
    document.title = "e-AMC | Shop License Application Form";
    this.state.ownership = this.state.ownerships[0];
    this.state.display_type = this.state.display_types[0];
    this.state.trade = this.state.trades[0];
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "trade":
        this.setState({ trade: value });
        break;
      case "ownership":
        this.setState({ ownership: value });
        break;
      case "display_type":
        this.setState({ display_type: value });
        break;
      default:
        break;
    }
  };

  onSubmit = (e) => {
    this.setState({ submit: true });
    this.staffService.create(this.state)
      .then(res => {
        this.setState({ complete: true });
        console.log(res);
      })
      .then(() => {
        this.setState({ submit: false });
      });
  };
  handleRadio = (e) => {
    this.setState({
      premise_type: e.target.value
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
          address: "",
          owner_address: "",
          details: "",
          premise_type: "",
          ownership: this.state.ownerships[0],
          display_type: this.state.display_types[0],
          trade: this.state.trades[0],
          signature: null
        });
        break;
      default:
        break;
    }
  };

  onSignatureSelect = (signature) => {
    this.setState({ signature });
  };
  onSignatureRemove = () => {
    this.setState({ signature: null });
  };
  setImagePreviewUrl = (url) => {

  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    /*console.log(name);
    console.log(value);*/
    console.log(value.length);

    switch (name) {
      case "owner":
        value.length === 0 ? this.setState({ ownerError: ShopLicenseViewModel.OWNER_REQUIRED }) : this.setState({ ownerError: "" });
        break;
      case "owner_address":
        value.length === 0 ? this.setState({ owner_addressError: ShopLicenseViewModel.OWNER_ADDRESS_REQUIRED }) : this.setState({ owner_addressError: "" });
        break;

      case "name":
        value.length === 0 ? this.setState({ nameError: ShopLicenseViewModel.NAME_REQUIRED }) : this.setState({ nameError: "" });
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
    const { ownership, display_type, trade } = this.state;
    const { classes } = this.props;

    return (

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <form>
            <Card style={{ padding: 50 }}>
              <CardHeader title={ShopLicenseViewModel.TITLE} subheader={ShopLicenseViewModel.SUB_HEADER}/>
              <SubmitDialog open={this.state.submit} text={ShopLicenseViewModel.SUBMIT}/>
              <OfficeSnackbar variant={"success"} open={this.state.complete}
                              message={ShopLicenseViewModel.CREATE_MESSAGE}/>
              <CardBody>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.owner}
                      ref={"nameRef"}
                      name={"owner"}
                      onBlur={this.handleBlur.bind(this)}
                      required={true}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.OWNER}
                      error={Boolean(this.state.ownerError)}
                      helperText={this.state.ownerError}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.phone}
                      ref={"phoneRef"}
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
                  <GridItem xs={12} sm={12} md={6}>
                    <OfficeSelect
                      variant={"outlined"}
                      margin={"dense"}
                      value={ownership}
                      required={true}
                      fullWidth={true}
                      name={"type"}
                      onChange={this.handleSelect.bind(this, "ownership")}
                      ClearAble={true}
                      label={ShopLicenseViewModel.APPLICANT_TYPE}
                      options={this.state.ownerships}/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.owner_address}
                      name={"owner_address"}
                      onBlur={this.handleBlur.bind(this)}
                      required={true}
                      multiline={true}
                      rows={3}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      error={Boolean(this.state.owner_addressError)}
                      helperText={this.state.owner_addressError}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.OWNER_ADDRESS}/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      type={"email"}
                      value={this.state.email}
                      ref={"nameRef"}
                      name={"email"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.EMAIL}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.name}
                      ref={"nameRef"}
                      name={"name"}
                      onBlur={this.handleBlur.bind(this)}
                      required={true}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.NAME}
                      error={Boolean(this.state.nameError)}
                      helperText={this.state.nameError}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <OfficeSelect
                      variant={"outlined"}
                      margin={"dense"}
                      value={trade}
                      fullWidth={true}
                      name={"trade_id"}
                      onChange={this.handleSelect.bind(this, "trade")}
                      ClearAble={true}
                      label={ShopLicenseViewModel.TRADE_TYPE}
                      options={this.state.trades}/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.address}
                      name={"address"}
                      onBlur={this.handleBlur.bind(this)}
                      required={true}
                      multiline={true}
                      rows={3}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      error={Boolean(this.state.addressError)}
                      helperText={this.state.addressError}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.ADDRESS}/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.details}
                      ref={"nameRef"}
                      name={"details"}
                      onBlur={this.handleBlur.bind(this)}
                      required={true}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.DETAILS}
                      error={Boolean(this.state.detailsError)}
                      helperText={this.state.detailsError}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField name={"estd"}
                               value={this.state.estd}
                               variant={"outlined"}
                               margin={"dense"}
                               required={true}
                               fullWidth={true}
                               onChange={this.handleChange.bind(this)}
                               type={"date"}
                               InputLabelProps={
                                 { shrink: true }
                               }
                               label={ShopLicenseViewModel.ESTD}
                               error={Boolean(this.state.estdError)}
                               helperText={this.state.estdError}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.tin_no}
                      name={"tin_no"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.TIN_NO}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.cst_no}
                      name={"cst_no"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.CST_NO}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.pan_no}
                      name={"pan_no"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.PAN_NO}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.gst_no}
                      name={"gst_no"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={ShopLicenseViewModel.GST_NO}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl fullWidth={true} margin={"dense"}>
                      <FormLabel>Whether Premises owned or leased?</FormLabel>
                      <RadioGroup
                        name={"premise_type"}
                        row={true}
                        value={this.state.premise_type}
                        onChange={this.handleRadio.bind(this)}
                      >

                        <FormControlLabel value={"Owned"} control={<Radio/>} label={"Owned"}/>
                        <FormControlLabel value={"Leased"} control={<Radio/>} label={"Leased"}/>
                      </RadioGroup>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <OfficeSelect value={display_type}
                                  label={ShopLicenseViewModel.DISPLAY_TYPE}
                                  name={"display_on"}
                                  variant={"outlined"}
                                  margin={"dense"}
                                  fullWidth={true}
                                  onChange={this.handleSelect.bind(this, "display_type")}
                                  options={this.state.display_types}/>
                  </GridItem>

                </GridContainer>

                {/*{this.getAttachmentView()}*/}
                <GridItem xs={12} sm={12} md={6}>
                  <Divider/>
                  <ImageUpload setImagePreviewUrl={this.setImagePreviewUrl.bind(this)}
                               onFileSelect={this.onSignatureSelect.bind(this)}
                               onRemove={this.onSignatureRemove.bind(this)}
                               label={ShopLicenseViewModel.SIGNATURE}/>
                  {/*<DocumentsDropzone documents={[*/}
                  {/*{ name: "Staff signature", fileName: "signature" }*/}
                  {/*]}*/}
                  {/*openDialog={this.state.openDialog} onCloseHandler={this.handleDocuments.bind(this)}*/}
                  {/*acceptedFiles={Constraint.ACCEPTED_IMAGES}/>*/}
                </GridItem>
              </CardBody>
              <GridItem xs={12} sm={12} md={6}>
                <CardActions>

                  <Button name={"primary"} disabled={this.state.submit}
                          color={"primary"} variant={"outlined"}
                          onClick={this.handleClick.bind(this)}>
                    {ShopLicenseViewModel.PRIMARY_TEXT}
                  </Button>
                  <Button name={"secondary"}
                          color={"secondary"}
                          variant={"outlined"}
                          onClick={this.handleClick.bind(this)}>
                    {ShopLicenseViewModel.SECONDARY_TEXT}
                  </Button>
                </CardActions>
              </GridItem>

            </Card>
          </form>
        </GridItem>
      </GridContainer>

    );
  }

}

export default withStyles(loginPageStyle)(ShopLicenseApplicationForm);