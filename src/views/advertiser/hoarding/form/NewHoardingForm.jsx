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
  Switch,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import OfficeSelect from "../../../../components/OfficeSelect";
import HoardingApplicationFormModel from "../../../model/HoardingApplicationFormModel";
import { LocalCouncilService } from "../../../../services/LocalCouncilService";
import FileUpload from "../../../../components/FileUpload";
import MapIcon from "@material-ui/icons/PinDrop";
import axios from "axios";
import { ApiRoutes } from "../../../../config/ApiRoutes";
import { HoardingService } from "../../../../services/HoardingService";
import { DocumentService } from "../../../../services/DocumentService";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import GMapDialog from "../../../../components/GmapDialog";
import SubmitDialog from "../../../../components/SubmitDialog";

class NewHoardingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localCouncil: undefined,
      category: undefined,
      coordinate: "",
      length: undefined,
      height: undefined,
      clearance: undefined,
      address: "",
      bothSide: false,
      displayType: undefined,

      landLord: "",
      landlordType: "0",
      uploadDocuments: [],

      localCouncilError: "",
      addressError: "",
      lengthError: "",
      heightError: "",
      categoryError: "",
      displayTypeError: "",

      localCouncils: [],
      categories: [],
      displayTypes: [
        { value: "ILLUMINATED", label: "ILLUMINATED" },
        { value: "NON-ILLUMINATED", label: "NON ILLUMINATED" },
        { value: "FLICKERING_LIGHT", label: "FLICKERING LIGHT" }
      ],
      documents: [],
      errorMessage: "",
      prestine: true,
      openMap: false,

      agree: false,

      success: "",
      submit: false
    };

    this.localCouncilservice = new LocalCouncilService();
    this.hoardingService = new HoardingService();
    this.documentService = new DocumentService();
  }


  componentDidMount() {
    this.fetchLocalCouncil();
    this.fetchCategory();
    this.fetchDocument();
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
      this.setState({ localCouncil: this.state.localCouncils[0] });
    });
  };

  fetchCategory = () => {
    let categories = [];
    axios.get(ApiRoutes.WARDS)
      .then(res => {
        const { data } = res;
        if (data.status) {
          data.data.wards.forEach(function(item) {
            let lc = {
              value: item.id,
              label: item.name
            };
            categories.push(lc);
          });
          this.setState({
            categories: categories
          });
        } else {
          this.setState({ hasError: true });
        }
      })
      .catch(err => {

      })
      .then(() => {
        this.setState({ category: this.state.categories[0] });
      });
  };

  fetchDocument = () => {
    this.documentService.get("hoarding")
      .then(data => {
        if (data.status) {
          this.setState({ documents: data.data.documents });

        }
      })
      .then(() => {
        console.log();
      });
  };

  isInvalid = () => {
    return !this.state.pretine || !!this.state.localCouncilError || !!this.state.addressError || !!this.state.lengthError || !!this.state.heightError
      || !!this.categoryError || !!this.state.displayTypeError;
  };

  handleOfficeSelect = (identifier, value) => {
    this.setState({
      [identifier]: value
    });
  };
  setCoordinate = (data) => {
    this.setState({ coordinate: data, openMap: false });
  };
  handleClick = (e) => {
    const { name } = e.target;
    switch (name) {
      case "submit":
        this.doSubmit();
        break;
      case "reset":
        break;
      default:
        break;
    }
  };
  doSubmit = () => {
    // if (this.isInvalid()) {
    //   this.setState({ errorMessage: "There is an error" });
    //   return;
    // }
    this.setState({ submit: true });
    this.hoardingService.create(this.state)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
        console.log(err);
      })
      .then(() => {
        this.setState({ submit: false });
      });
  };
  handleRadio = (e) => {
    this.setState({ landLordType: e.target.value });
  };
  handleSwitch = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  };
  handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      this.setState({
        [e.target.name]: checked
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    this.setState({ prestine: false });

  };

  handleSelectBlur = (identifier, e) => {
    switch (identifier) {
      case "localCouncil":
        this.state.localCouncil === undefined ? this.setState({ localCouncilError: "Local Council is required" }) : this.setState({ localCouncilError: "" });
        break;
      case "category":
        this.state.category === undefined ? this.setState({ categoryError: "Category is required" }) : this.setState({ categoryError: "" });
        break;
    }
  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "localCouncil":
        !Boolean(value) ? this.setState({ localCouncilError: HoardingApplicationFormModel.LOCAL_COUNCIL_REQUIRED })
          : this.setState({ localCouncilError: "" });
        break;
      case "address":
        !Boolean(value) ? this.setState({ addressError: HoardingApplicationFormModel.ADDRESS_REQUIRED })
          : this.setState({ addressError: "" });
        break;
      case "length":
        !Boolean(value) ? this.setState({ lengthError: HoardingApplicationFormModel.LENGTH_REQUIRED })
          : this.setState({ lengthError: "" });
        break;
      case "height":
        !Boolean(value) ? this.setState({ heightError: HoardingApplicationFormModel.HEIGHT_REQUIRED })
          : this.setState({ heightError: "" });
        break;
      case "category":
        !Boolean(value) ? this.setState({ categoryError: HoardingApplicationFormModel.REQUIRED_CATEGORY })
          : this.setState({ categoryError: "" });
        break;
      case "displayType":
        !Boolean(value) ? this.setState({ displayTypeError: HoardingApplicationFormModel.REQUIRED_DISPLAYTYPE })
          : this.setState({ displayError: "" });
        break;
      default:
        break;

    }
  };

  render() {
    return (
      <GridContainer justify={"flex-start"}>
        <GridItem style={{ padding: "4px!important" }} xs={12} sm={12} md={10}>
          <Card>
            <CardContent>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Typography variant={"headline"}>{HoardingApplicationFormModel.TITLE}</Typography>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                </GridItem>
                <GridItem style={{ padding: 4 }} xs={12} sm={12} md={6}>
                  <OfficeSelect
                    value={this.state.localCouncil}
                    defaultValues={this.state.localCouncils[0]}
                    label={HoardingApplicationFormModel.LOCAL_COUNCILS}
                    name={"localCouncil"}
                    variant={"outlined"}
                    margin={"dense"}
                    fullWidth={true}
                    required={true}
                    helperText={this.state.localCouncilError}
                    error={Boolean(this.state.localCouncilError)}
                    onBlur={this.handleSelectBlur.bind(this, "localCouncil")}
                    onChange={this.handleOfficeSelect.bind(this, "localCouncil")}
                    options={this.state.localCouncils}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <OfficeSelect value={this.state.category}
                                label={HoardingApplicationFormModel.CATEGORY}
                                name={"category"}
                                variant={"outlined"}
                                margin={"dense"}
                                required={true}
                                fullWidth={true}
                                helperText={this.state.categoryError}
                                error={Boolean(this.state.categoryError)}
                                onBlur={this.handleSelectBlur.bind(this, "category")}
                                onChange={this.handleOfficeSelect.bind(this, "category")}
                                options={this.state.categories}/>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField name={"length"}
                             type={"number"}
                             value={this.state.length}
                             margin={"dense"}
                             fullWidth={true}
                             variant={"outlined"}
                             onChange={this.handleChange.bind(this)}
                             label={"Length"}
                             required={true}
                             onBlur={this.handleBlur.bind(this)}
                             error={Boolean(this.state.lengthError)}
                             helperText={this.state.lengthError}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField name={"height"}
                             value={this.state.height}
                             type={"number"}
                             margin={"dense"}
                             fullWidth={true}
                             variant={"outlined"}
                             onChange={this.handleChange.bind(this)}
                             label={"Height"}
                             required={true}
                             onBlur={this.handleBlur.bind(this)}
                             error={Boolean(this.state.heightError)}
                             helperText={this.state.heightError}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField name={"address"}
                             value={this.state.address}
                             error={Boolean(this.state.addressError)}
                             helperText={this.state.addressError}
                             margin={"dense"}
                             onBlur={this.handleBlur.bind(this)}
                             multiline={true}
                             fullWidth={true}
                             variant={"outlined"}
                             onChange={this.handleChange.bind(this)}
                             label={"Address"}/>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField name={"clearance"}
                             value={this.state.clearance}
                             onBlur={this.handleBlur.bind(this)}
                             type={"number"}
                             margin={"dense"}
                             fullWidth={true}
                             variant={"outlined"}
                             required={true}
                             label={HoardingApplicationFormModel.CLEARANCE}
                             onChange={this.handleChange.bind(this)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField name={"roadDetail"}
                             value={this.state.roadDetail}
                             onBlur={this.handleBlur.bind(this)}
                             error={Boolean(this.state.roadDetailError)}
                             helperText={this.state.roadDetailError}
                             type={"number"}
                             margin={"dense"}
                             fullWidth={true}
                             variant={"outlined"}
                             required={true}
                             label={HoardingApplicationFormModel.ROAD_DETAIL}
                             onChange={this.handleChange.bind(this)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl margin={"dense"}>
                    <FormControlLabel onChange={this.handleSwitch.bind(this)}
                                      name={"bothSide"}
                                      control={
                                        <Switch
                                          color={"primary"}
                                          value={this.state.bothSide}
                                          checked={this.state.bothSide}
                                          required={true}/>
                                      }
                                      label={"Both side?"}/>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <OfficeSelect
                    name={"displayType"}
                    value={this.state.displayType}
                    error={Boolean(this.state.displayError)}
                    onBlur={this.handleBlur.bind(this)}
                    variant={"outlined"}
                    placeHolder={"Display type"}
                    margin={"dense"}
                    onChange={this.handleOfficeSelect.bind(this, "displayType")}
                    fullWidth={true}
                    options={this.state.displayTypes}
                    label={HoardingApplicationFormModel.DISPLAY_TYPE}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    value={this.state.coordinate}
                    name={"lat"}
                    margin={"dense"}
                    fullWidth={true} variant={"outlined"}
                    required={true}
                    label={HoardingApplicationFormModel.COORDINATE}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={"end"}>
                          <Tooltip title={"Click here to see the map"}>
                            <IconButton onClick={(e) => {
                              this.setState({ openMap: true });
                            }}>
                              <MapIcon color={"action"}/>
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField name={"landLord"}
                             margin={"dense"}
                             value={this.state.landLord}
                             fullWidth={true}
                             variant={"outlined"}
                             label={"Name of the landlord/land owner"}
                             onChange={this.handleChange.bind(this)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth={true} margin={"dense"}>
                    <FormLabel>Type of Landlord/ Land owner</FormLabel>
                    <RadioGroup
                      defaultValue={"0"}
                      value={this.state.landLordType}
                      name={"landlordType"}
                      row={true}
                      onChange={this.handleRadio.bind(this)}
                    >
                      <FormControlLabel value={"0"} control={<Radio color={"primary"}/>} label={"Private"}/>
                      <FormControlLabel value={"1"} control={<Radio color={"primary"}/>} label={"Public"}/>
                    </RadioGroup>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FileUpload document={{ id: 0, name: "Signature" }}
                              required={true}
                              onUploadSuccess={(res) => {
                                this.setState(state => {
                                    state.signature = {
                                      name: "signature",
                                      path: res.location
                                    };
                                  }
                                );
                              }} onUploadFailure={(err) => console.log(err)}/>
                </GridItem>
                {/*//Document upload*/}
                <GridItem xs={12} sm={12} md={12}>
                  <Typography variant={"headline"}>Upload Document</Typography>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  {this.state.documents.map((doc, index) => {
                    return <FileUpload key={index} onUploadSuccess={(data) => {
                      this.setState(state => {
                        let temp = {
                          name: doc.id,
                          path: doc.location
                        };
                        state.uploadDocuments.push(temp);
                      });
                    }} onUploadFailure={(e) => {
                      console.log(e);
                    }} document={doc}/>;
                  })}
                </GridItem>
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
              <Button disabled={!this.state.agree} name={"submit"} variant={"outlined"} color={"primary"}
                      onClick={this.handleClick.bind(this)}>Submit</Button>
              {" "}
              <Button name={"reset"} variant={"outlined"} color={"secondary"}
                      onClick={this.handleClick.bind(this)}>Reset</Button>

            </CardActions>
          </Card>
        </GridItem>
        <Divider/>


        <OfficeSnackbar variant={"success"} open={!!this.state.success}
                        message={this.state.success}
                        onClose={(e) => {
                          this.setState({ success: "" });
                        }}/>
        <GMapDialog open={this.state.openMap} onClose={(lat, lng) => {
          this.setState({ openMap: false, coordinate: `Latitude: ${lat} , Longitude: ${lng}` });
        }} fullScreen={true}
                    isMarkerShown={true}/>

        <OfficeSnackbar open={Boolean(this.state.errorMessage)} variant={"error"} message={this.state.errorMessage}
                        onClose={() => {
                          this.setState({ errorMessage: "" });
                        }}/>
        <SubmitDialog open={this.state.submit} text={"Your application is submitting ..."}/>
      </GridContainer>
    );
  }
}

export default NewHoardingForm;