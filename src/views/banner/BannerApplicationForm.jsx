import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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


class BannerApplicationForm extends Component {
  localCouncilservice = new LocalCouncilService();
  bannerService = new BannerService();
  bannerRef=React.createRef();

  state = {
    name: "",
    type: undefined,
    phone: "",
    address: "",
    localCouncil: undefined,
    details: "",
    displayType: undefined,
    signature: undefined,
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
    attachments: []
  };

  componentDidMount() {
    document.title = "e-AMC | Banners/Posters Application Form";
    this.fetchLocalCouncil();
  }

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
      }).then(() => {
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
  };


  isInvalid=()=>{
    //TODO::validation rule creation
    return true
  }
  onSubmit = (e) => {
    if (this.isInvalid()){
      this.setState({errorMessage:"validation error"})
      return
    }
    this.setState({submit:true})
    this.bannerService.create(this.state)
      .then(data=>{

      })
      .catch(err=>{

      })
      .then(()=>{
        this.setState({submit:false})
      })

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
          signature: null
        });
        break;
      default:
        break;
    }
  };


  handleSelectBlur = (identifier, e) => {
    switch (identifier) {
      case "type":
        this.state.type===undefined ? this.setState({ typeError: BannerViewModel.TYPE_REQUIRED }) : this.setState({ typeError: "" });
        break;
      case "localCouncil":
        this.state.localCouncil===undefined ? this.setState({ localCouncilError: BannerViewModel.LOCALCOUNCIL_REQUIRED }) : this.setState({ localCouncilError: "" });
        break;
      case "displayType":
        this.state.displayType===undefined ? this.setState({ displayTypeError: BannerViewModel.DISPLAY_TYPE_REQUIRED }) : this.setState({ displayTypeError: "" });
        break;
      default:
            break
    }
  };
  handleBlur = (e) => {
    const { name, value } = e.target;
    /*console.log(name);
    console.log(value);*/
    console.log(value.length);

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

    return (

      <GridContainer justify="flex-start">
        <GridItem xs={12} sm={12} md={10}>
          <form>
            <Card>
              <CardHeader  title={BannerViewModel.TITLE}/>
              <CardContent>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Divider style={{ marginBottom: 10 }}/>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
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
                  <GridItem xs={12} sm={12} md={6}>
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
                      error={Boolean(this.state.phoneError)}
                      helperText={this.state.phoneError}
                      label={BannerViewModel.PHONE_NO}/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
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
                  <GridItem xs={12} sm={12} md={6}>
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
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.address}
                      name={"address"}
                      required={true}
                      multiline={true}
                      rows={3}
                      variant={"outlined"}
                      margin={"dense"}
                      fullWidth={true}
                      error={Boolean(this.state.addressError)}
                      helperText={this.state.addressError}
                      onBlur={this.handleBlur.bind(this)}
                      onChange={this.handleChange.bind(this)}
                      label={BannerViewModel.ADDRESS}/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
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
                  <GridItem xs={12} sm={12} md={6}>
                    <FileUpload required={true} document={{ id: 1, name: "Signature of applicant" }}
                                onUploadSuccess={(data) => {
                                    let temp={
                                      name:"signature",
                                      path:data.location
                                    }
                                    this.setState({
                                      signature:temp
                                    })
                                }} onUploadFailure={(err) => {
                                  console.log(err)
                    }}/>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>

                    <Typography style={{marginTop:20}} variant={"headline"}> Banner details</Typography>
                    <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                    <BannerDetail ref={this.bannerRef}/>
                  </GridItem>

                </GridContainer>
                {/*<GridContainer justify={"center"}>*/}
                {/*<GridItem xs={12} sm={12} md={12}>*/}
                {/*<Typography variant={"headline"}>Add Banner details</Typography>*/}
                {/*<Divider style={{marginBottom:10,marginTop:10}}/>*/}
                {/*<BannerDetail/>*/}
                {/*</GridItem>*/}
                {/*</GridContainer>*/}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControlLabel control={
                      <Checkbox color={"primary"} onChange={(val, checked) => this.setState({ agree: checked })}/>
                    }
                                      label={"I hereby pledge that i will abide the AMC Display of Advertisement and Hoarding Regulations 2013," +
                                      " with specific reference of Regulation 7, Regulation 28 and Regulation 32, failing which i would be liable to get my registration / License cancelled"}/>
                  </GridItem>
                </GridContainer>

              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <div>
                  <Button name={"primary"} disabled={!this.state.agree}
                          color={"primary"} variant={"outlined"}
                          onClick={this.handleClick.bind(this)}>
                    {BannerViewModel.PRIMARY_TEXT}
                  </Button>
                  {" "}
                  <Button name={"secondary"}
                          color={"secondary"}
                          variant={"outlined"}
                          onClick={this.handleClick.bind(this)}>
                    {BannerViewModel.SECONDARY_TEXT}
                  </Button>
                </div>
              </CardActions>

            </Card>
          </form>
        </GridItem>

        <SubmitDialog open={this.state.submit} text={BannerViewModel.SUBMIT}/>
        <OfficeSnackbar variant={"success"} open={this.state.complete}
                        message={BannerViewModel.CREATE_MESSAGE}/>
      </GridContainer>

    );
  }

}

export default BannerApplicationForm;