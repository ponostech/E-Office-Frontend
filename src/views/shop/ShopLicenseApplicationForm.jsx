import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@material-ui/core";

import { ShopLicenseViewModel } from "../model/ShopLicenseViewModel";
import GridItem from "../../components/Grid/GridItem";
import OfficeSelect from "../../components/OfficeSelect";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import FileUpload from "../../components/FileUpload";
import { DocumentService } from "../../services/DocumentService";

class ShopLicenseApplicationForm extends Component {
  documentService = new DocumentService();
  state = {
    name: "",
    phone: "",
    type: "",
    email: "",
    address: "",
    places: "",
    tradeName: "",
    shopName: "",
    latitude: undefined,
    longitude: undefined,
    businessDetail: "",
    estd: undefined,
    tinNo: "",
    cstNo: "",
    gstNo: "",
    panNo: "",
    premised: "Owned",
    displayType: undefined,

    uploadDocuments: [],

    nameError: "",
    typeError: "",
    addressError: "",
    coordinateError: "",
    phoneError: "",
    shopNameError: "",
    businessDetailError: "",
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
    complete: false,
    attachments: [],
    documents: [],

    errorMessage: ""

  };

  componentDidMount() {
    document.title = "e-AMC | Shop License Application Form";
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
    this.setState({
      [name]: value
    });
  };

  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "trade":
        this.setState({ trade: value });
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
          address: "",
          owner_address: "",
          details: "",
          premise_type: "",
          ownership: this.state.types[0],
          display_type: this.state.display_types[0],
          trade: this.state.trades[0],
          signature: null
        });
        break;
      default:
        break;
    }
  };

  handleSelectBlur = (identifier,e) => {
    const { value } = e.target;
    console.log(e.target)
    switch (identifier) {
      case 'type':
        this.state.type?this.setState({typeError:''}):this.setState({typeError:ShopLicenseViewModel.TYPE_REQUIRED})
        break;
    }
  };
  handleBlur = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ ownerError: ShopLicenseViewModel.OWNER_REQUIRED }) : this.setState({ ownerError: "" });
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

    return (

      <GridContainer justify="flex-start">
        <GridItem xs={12} sm={12} md={10}>
          <form>
            <Card>
              <CardHeader title={ShopLicenseViewModel.TITLE}/>

              <CardContent>
                <GridContainer>
                  <GridItem md={12} sm={12} xs={12}>
                    <Divider style={{ marginBottom: 10 }}/>
                  </GridItem>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        value={this.state.name}
                        ref={"nameRef"}
                        name={"owner"}
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
                    <GridItem xs={12} sm={12} md={6}>
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
                    <GridItem xs={12} sm={12} md={6}>
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
                    <GridItem xs={12} sm={12} md={6}>
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
                        label={ShopLicenseViewModel.OWNER_ADDRESS}/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        value={this.state.coordinate}
                        name={"address"}
                        onBlur={this.handleBlur.bind(this)}
                        required={true}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        error={Boolean(this.state.coordinateError)}
                        helperText={this.state.coordinateError}
                        onChange={this.handleChange.bind(this)}
                        label={ShopLicenseViewModel.ADDRESS}/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <OfficeSelect
                        variant={"outlined"}
                        margin={"dense"}
                        value={trade}
                        fullWidth={true}
                        name={"trade"}
                        onChange={this.handleSelect.bind(this, "trade")}
                        ClearAble={true}
                        label={ShopLicenseViewModel.TRADE_TYPE}
                        options={this.state.trades}/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        value={this.state.shopName}
                        name={"name"}
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
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        value={this.state.businessDetail}
                        ref={"nameRef"}
                        name={"details"}
                        onBlur={this.handleBlur.bind(this)}
                        required={true}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        onChange={this.handleChange.bind(this)}
                        label={ShopLicenseViewModel.DETAILS}
                        error={Boolean(this.state.businessDetailError)}
                        helperText={this.state.businessDetailError}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
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
                                 label={ShopLicenseViewModel.ESTD}
                                 error={Boolean(this.state.estdError)}
                                 helperText={this.state.estdError}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        value={this.state.tinNo}
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
                        value={this.state.cstNo}
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
                        value={this.state.panNo}
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
                        value={this.state.gstNo}
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
                          name={"premised"}
                          row={true}
                          value={this.state.premised}
                          onChange={this.handleRadio.bind(this)}
                        >

                          <FormControlLabel value={"Owned"} control={<Radio/>} label={"Owned"}/>
                          <FormControlLabel value={"Leased"} control={<Radio/>} label={"Leased"}/>
                        </RadioGroup>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <OfficeSelect value={this.state.displayType}
                                    label={ShopLicenseViewModel.DISPLAY_TYPE}
                                    name={"displayType"}
                                    variant={"outlined"}
                                    margin={"dense"}
                                    fullWidth={true}
                                    onChange={this.handleSelect.bind(this, "display_type")}
                                    options={this.state.display_types}/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
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
                  </GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                  </GridItem>
                  <GridContainer justify={"flex-start"}>
                    <Typography style={{ marginTop: 20, marginBottom: 10 }} variant={"headline"}>Upload
                      Document</Typography>
                  </GridContainer>
                  <GridContainer>

                    {
                      this.state.documents.map((doc, index) => {
                        return <GridItem sm={12} xs={12} md={6}>

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
                  </GridContainer>

                </GridContainer>

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

      </GridContainer>

    );
  }

}

export default withStyles(loginPageStyle)(ShopLicenseApplicationForm);