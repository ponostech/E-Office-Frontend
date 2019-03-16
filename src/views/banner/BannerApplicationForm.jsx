import React, { Component } from "react";
import { Button, Card, CardActions, CardHeader, Divider, TextField } from "@material-ui/core";

import CardBody from "../../components/Card/CardBody.jsx";

import { BannerViewModel } from "../model/BannerViewModel";
import GridItem from "../../components/Grid/GridItem";
import OfficeSelect from "../../components/OfficeSelect";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";

class BannerApplicationForm extends Component {

  // staffService = new StaffService();

  state = {
    name: "",
    ownership: null,
    address: "",
    display_type: null,
    dob: "1991/12/12",
    blood: "",
    nameError: "",
    addressError: "",
    dobError: "",
    signature: null,
    name: "",
    phone_no: "",
    applicant_type: "",
    local_council_id: "",
    address: "",
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
    status: "",
    display_types: [
      { value: "vehicle", label: "Vehicle" },
      { value: "umbrella", label: "Umbrella" },
      { value: "balloons", label: "Balloons" },
      { value: "video", label: "Video" },
      { value: "audio/sound", label: "Audio/Sound" },
      { value: "others", label: "Others" }
    ],
    ownerships: [
      { value: "private", label: "Private" },
      { value: "firm", label: "Firm" },
      { value: "company", label: "Company" },
      { value: "charitable trust", label: "Charitable Trust" },
      { value: "others", label: "Others" }
    ],
    submit: false,
    complete: false,
    attachments: []

  };

  componentDidMount() {
    document.title = "e-AMC | Banners/Posters Application Form";
    this.state.ownership = this.state.ownerships[0];
    this.state.display_type = this.state.display_types[0];
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSelect = (identifier, value) => {
    switch (identifier) {
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
    // const invalid = this.state.name.length===0 || this.state.address.length === 0 || this.state.dob.length === 0 || this.state.signature === null

    // if (!this.state.name) {
    //   return
    // }
    // if (this.state.address) {
    //   return
    // }
    // if (!this.state.dob) {
    //   return ;
    // }
    // if (!this.state.signature) {
    //   return
    // }

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

  handleClick = (e) => {
    const name = e.target.name;
    switch (name) {
      case "primary":
        this.onSubmit();
        break;
      case "secondary":
        this.setState({
          name: "",
          address: "",
          phone_no: "",
          blood: "",
          ownership: this.state.ownerships[0],
          display_type: this.state.display_types[0],
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
    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ nameError: BannerViewModel.NAME_REQUIRED }) : this.setState({ nameError: "" });
        break;
      case "address":
        value.length === 0 ? this.setState({ addressError: BannerViewModel.ADDRESS_REQUIRED }) : this.setState({ addressError: "" });
        break;
      case "phone_no":
        value.length === 0 ? this.setState({ phoneError: BannerViewModel.PHONE_REQUIRED }) : this.setState({ phoneError: "" });
        break;
      default:
        break;
    }
  };


  render() {
    const { ownership } = this.props;
    const { display_type } = this.props;
    const { classes } = this.props;

    return (

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <form>
            <Card style={{ padding: 50 }}>
              <CardHeader title={BannerViewModel.TITLE} subheader={BannerViewModel.SUB_HEADER}/>
              <SubmitDialog open={this.state.submit} text={BannerViewModel.SUBMIT}/>
              <OfficeSnackbar variant={"success"} open={this.state.complete}
                              message={BannerViewModel.CREATE_MESSAGE}/>
              <CardBody>

                <GridContainer>
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
                      label={BannerViewModel.NAME}
                      error={Boolean(this.state.nameError)}
                      helperText={this.state.nameError}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <OfficeSelect
                      variant={"outlined"}
                      margin={"dense"}
                      value={this.state.ownership}
                      fullWidth={true}
                      name={"applicant_type"}
                      onChange={this.handleSelect.bind(this, "ownership")}
                      ClearAble={true}
                      label={BannerViewModel.APPLICANT_TYPE}
                      options={this.state.ownerships}/>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.phone_no}
                      ref={"phoneRef"}
                      name={"phone_no"}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      onChange={this.handleChange.bind(this)}
                      label={BannerViewModel.PHONE_NO}/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <OfficeSelect value={this.state.display_type}
                                  label={BannerViewModel.DISPLAY_TYPE}
                                  name={"display_on"}
                                  variant={"outlined"}
                                  margin={"dense"}
                                  fullWidth={true}
                                  onChange={this.handleSelect.bind(this, "display_type")}
                                  options={this.state.display_types}/>
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
                      label={BannerViewModel.ADDRESS}/>
                  </GridItem>
                </GridContainer>

                {/*{this.getAttachmentView()}*/}
                <GridItem xs={12} sm={12} md={6}>
                <Divider/>
                <ImageUpload setImagePreviewUrl={this.setImagePreviewUrl.bind(this)}
                             onFileSelect={this.onSignatureSelect.bind(this)}
                             onRemove={this.onSignatureRemove.bind(this)} label={BannerViewModel.SIGNATURE}/>
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
                  {BannerViewModel.PRIMARY_TEXT}
                </Button>
                <Button name={"secondary"}
                        color={"secondary"}
                        variant={"outlined"}
                        onClick={this.handleClick.bind(this)}>
                  {BannerViewModel.SECONDARY_TEXT}
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

export default withStyles(loginPageStyle)(BannerApplicationForm);