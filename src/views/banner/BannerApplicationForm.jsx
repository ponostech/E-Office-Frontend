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
import { StaffService } from "../../services/StaffService";
import SubmitDialog from "../../components/SubmitDialog";
import OfficeSnackbar from "../../components/OfficeSnackbar";

class BannerApplicationForm extends Component {

  //staffService = new StaffService();

  state = {
        name: "",
        phone_no: "",
        applicant_type: "",
        local_council_id: "",
        address: "",
        ownership: {value: "private", label: "Private"},
        display_type:  {value: "vehicle", label: "Vehicle"},
        display_on: "",
        locations: "",
        length: "",
        height: "",
        no_advertisements: "",
        establishmentDate: "",
        from: "",
        to:"",
        latitude: 0,
        longitude: 0,
        details:"",
        status:"",
        signature:"",
        localCouncils: ["one", "two", "three"],
        ownerships: [
        {value: "private", label: "Private"},
        {value: "firm", label: "Firm"},
        {value: "company", label: "Company"},
        {value: "charitable trust", label: "Charitable Trust"},
        {value: "others", label: "Others"}
      ],
        display_types: [
        {value: "vehicle", label: "Vehicle"},
        {value: "umbrella", label: "Umbrella"},
        {value: "balloons", label: "Balloons"},
        {value: "video", label: "Video"},
        {value: "audio/sound", label: "Audio/Sound"}
    ],
        openDialog: false,
        submit: false,
        complete: false,
        attachments: []

  };

  componentDidMount() {
    document.title = "e-AMC | Banners/Posters ApplicationForm";
    this.state.ownerships = this.state.ownerships[0];
    //this.state.branch = this.state.branches[0];
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "ownerships":
        this.setState({ ownership: value });
        break;
      case "display_types":
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
        this.setState({complete:true })
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
          dob: '',
          blood: "",
          signature:null,
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
        default:
        break;
    }
  };


  render() {
    const { ownership } = this.props;
    const { dispay_type } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
         <GridItem xs={12} sm={12} md={10}>
            <form>
              <Card style={{padding:50}}>
                <CardHeader title={BannerViewModel.TILE} subheader={BannerViewModel.SUBHEADER}/>
                <SubmitDialog open={this.state.submit} text={BannerViewModel.SUBMIT}/>
                <OfficeSnackbar variant={"success"} open={this.state.complete} message={BannerViewModel.CREATE_MESSAGE} />
                <CardBody>
                  <GridContainer>
                    <GridItem md={6} xs={12}>
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
                    <GridItem md={6} xs={12}>
                  <OfficeSelect
                    variant={"outlined"}
                    margin={"dense"}
                    value={this.state.ownership}
                    fullWidth={true}
                    name={"application_type"}
                    onChange={this.handleSelect.bind(this, "ownership")}
                    ClearAble={true}
                    label={BannerViewModel.APPLICANT_TYPE}
                    options={this.state.ownerships}/>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={6} xs={12}>
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
                    <GridItem md={6} xs={12}>
                  <OfficeSelect value={this.state.display_type}
                                label={BannerViewModel.DISPLAY_TYPE}
                                name={"display_type"}
                                variant={"outlined"}
                                margin={"dense"}
                                fullWidth={true}
                                onChange={this.handleSelect.bind(this, "display_type")}
                                options={this.state.display_types}/>
                    </GridItem>
                  </GridContainer>
                    <GridContainer>
                      <GridItem md={6} xs={12}>
                  <TextField name={"dob"}
                             value={this.state.dob}
                             variant={"outlined"}
                             margin={"dense"}
                             required={true}
                             fullWidth={true}
                             onChange={this.handleChange.bind(this)}
                             type={"date"}
                             InputLabelProps={
                               { shrink: true }
                             }
                             label={BannerViewModel.DOB}
                             error={Boolean(this.state.dobError)}
                             helperText={this.state.dobError}
                  />
                      </GridItem>
                    </GridContainer>
                  {/*{this.getAttachmentView()}*/}

                  <Divider/>
                  <ImageUpload setImagePreviewUrl={this.setImagePreviewUrl.bind(this)}
                               onFileSelect={this.onSignatureSelect.bind(this)}
                               onRemove={this.onSignatureRemove.bind(this)} label={BannerViewModel.SIGNATURE}/>
                  {/*<DocumentsDropzone documents={[*/}
                  {/*{ name: "Staff signature", fileName: "signature" }*/}
                  {/*]}*/}
                  {/*openDialog={this.state.openDialog} onCloseHandler={this.handleDocuments.bind(this)}*/}
                  {/*acceptedFiles={Constraint.ACCEPTED_IMAGES}/>*/}

                </CardBody>
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
              </Card>
            </form>
          </GridItem>
         </div>
    );
  }

}

export default withStyles(loginPageStyle)(BannerApplicationForm);