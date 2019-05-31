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
import * as HoardingApplicationFormModel from "../../../model/HoardingApplicationFormModel";
import { LocalCouncilService } from "../../../../services/LocalCouncilService";
import FileUpload from "../../../../components/FileUpload";
import MapIcon from "@material-ui/icons/PinDrop";
import { DocumentService } from "../../../../services/DocumentService";
import { KioskService } from "../../../../services/KioskService";
import withStyles from "@material-ui/core/es/styles/withStyles";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import GMapDialog from "../../../../components/GmapDialog";
import SubmitDialog from "../../../../components/SubmitDialog";
import { CategoryServices } from "../../../../services/CategoryServices";
import AddressField from "../../../../components/AddressField";
import SweetAlert from "react-bootstrap-sweetalert";
import { ADVERTISER_PROPOSED_KIOSK } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { APPLICATION_NAME } from "../../../../utils/Util";
import LoadingView from "../../../common/LoadingView";


const style = {
  root: {
    padding: "10px 15px !important"
  }
};
var timeout = undefined;


class KioskApplicationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localCouncil: undefined,
      category: undefined,
      coordinate: "",
      length: undefined,
      height: undefined,
      latitude: "",
      longitude: "",
      clearance: undefined,
      address: "",
      bothSide: false,
      collapsible: false,
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

      documents: [],
      errorMessage: "",
      prestine: true,
      openMap: false,

      agree: false,

      success: "",
      submit: false,
      loading:true,
    };

    this.localCouncilservice = new LocalCouncilService();
    this.kioskService = new KioskService();
    this.categoryService = new CategoryServices();
    this.documentService = new DocumentService();
  }

  componentDidMount() {

    const { doLoad, doLoadFinish } = this.props;
    window.scrollTo(0,0);
    var self = this;
    doLoad();
    timeout = setTimeout(function(handler) {
      Promise.all([self.fetchCategory(), self.fetchLocalCouncil(), self.fetchDocument()])
      doLoadFinish();
      self.setState({loading:false})
    }, 2000);
    //
  }

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  fetchLocalCouncil = () => {
    this.localCouncilservice.fetch(
      errorMessage => this.setState({ errorMessage }),
      localCouncils => this.setState({ localCouncils }))
      .finally(() => console.info("Local council fetch successfully"));
  };

  fetchCategory = () => {
    this.categoryService.fetch(
      errorMessage => this.setState({ errorMessage }),
      categories => this.setState({ categories }))
      .finally(() => console.info("Areas categories fetch successfully"));
  };

  fetchDocument = () => {
    this.documentService.fetch("hoarding_kiosk",
      errorMessage => this.setState({ errorMessage }),
      documents => this.setState({ documents }))
      .finally(() => console.info("Document attachment fetch successfully"));
  };

  isInvalid = () => {
    return this.state.pretine || !!this.state.localCouncilError || !!this.state.addressError || !!this.state.lengthError || !!this.state.heightError
      || !!this.categoryError || !!this.state.displayTypeError || !this.validateDocument();
  };

  handleOfficeSelect = (identifier, value) => {
    this.setState({
      [identifier]: value
    });
  };
  setCoordinate = (data) => {
    this.setState({ coordinate: data, openMap: false });
  };

  doSubmit = () => {
    const { history } = this.props;
    if (this.isInvalid()) {
      this.setState({ errorMessage: "Please fill all the required fields" });
      return;
    }
    this.setState({ submit: true });
    this.kioskService.create(this.state,
      errorMessage => this.setState({ errorMessage }),
      successMessage => {
        this.setState({
          success: (
            <SweetAlert
              success
              style={{ display: "block", marginTop: "-100px" }}
              title={"Success"}
              onConfirm={() => history.push(ADVERTISER_PROPOSED_KIOSK)}
            >
              {successMessage}
            </SweetAlert>
          )
        });
      })
      .finally(() => this.setState({ submit: false }));
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
      case "displayType":
        this.state.displayType === undefined ? this.setState({ displayTypeError: "Display type is required" }) : this.setState({ displayTypeError: "" });
        break;
      default:
        break;
    }
  };
  validateDocument=()=>{
    const { documents, uploadDocuments } = this.state;
    let docCount=0;
    let uploadCount = 0;

    documents.forEach(function(item, index) {
      if (item.mandatory) {
        docCount++;
      }
    });
    uploadDocuments.forEach(function(doc) {
      if (doc.mandatory) {
        uploadCount++;
      }
    });
    return uploadCount === docCount;
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
    const { classes } = this.props;
    return (
      <>
        {this.state.loading ?<LoadingView/>:
          <GridContainer justify={"flex-start"}>
            <GridItem xs={12} sm={12} md={10}>
              <Card>
                <CardContent>
                  <GridContainer>
                    <GridItem className={classes.root} xs={12} sm={12} md={12}>
                      <Typography variant="h5">{HoardingApplicationFormModel.KIOSK_TITLE}</Typography>
                      <Typography variant="subtitle1">{HoardingApplicationFormModel.SUBTITLE}</Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <Divider style={{ marginBottom: 10, marginTop: 10 }}/>
                    </GridItem>
                    <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                    <GridItem className={classes.root} xs={12} sm={12} md={6}>
                      <OfficeSelect value={this.state.category}
                                    label={HoardingApplicationFormModel.CATEGORY}
                                    name={"category"}
                                    variant={"outlined"}
                                    margin={"dense"}
                                    fullWidth={true}
                                    required={true}
                                    error={Boolean(this.state.categoryError)}
                                    helperText={this.state.categoryError}
                                    onBlur={this.handleSelectBlur.bind(this, "category")}
                                    onChange={this.handleOfficeSelect.bind(this, "category")}
                                    options={this.state.categories}/>
                    </GridItem>
                    <GridItem className={classes.root} xs={12} sm={12} md={6}>
                      <AddressField
                        onPlaceSelect={(place) => {
                          if (place) {
                            let name = place.name;
                            let address = place.formatted_address;
                            let complete_address = address.includes(name) ? address : `${name} ${address}`;
                            this.setState({ address: complete_address });
                          }
                        }}
                        textFieldProps={{
                          required: true,
                          error: Boolean(this.state.addressError),
                          helperText: this.state.addressError,
                          onBlur: this.handleBlur.bind(this),
                          name: "address",
                          placeholder: "Address",
                          value: this.state.address,
                          margin: "dense",
                          fullWidth: true,
                          variant: "outlined",
                          onChange: this.handleChange.bind(this),
                          label: HoardingApplicationFormModel.ADDRESS
                        }}
                      />
                    </GridItem>
                    <GridItem className={classes.root} xs={12} sm={12} md={3}>
                      <TextField name={"length"}
                                 type={"number"}
                                 InputProps={{
                                   inputProps: {
                                     min: 0
                                   }
                                 }}
                                 value={this.state.length}
                                 margin={"dense"}
                                 fullWidth={true}
                                 variant={"outlined"}
                                 onChange={this.handleChange.bind(this)}
                                 label={"Length(Feet)"}
                                 required={true}
                                 onBlur={this.handleBlur.bind(this)}
                                 error={Boolean(this.state.lengthError)}
                                 helperText={this.state.lengthError}
                      />
                    </GridItem>
                    <GridItem className={classes.root} xs={12} sm={12} md={3}>
                      <TextField name={"height"}
                                 InputProps={{
                                   inputProps: {
                                     min: 0
                                   }
                                 }}
                                 value={this.state.height}
                                 type={"number"}
                                 margin={"dense"}
                                 fullWidth={true}
                                 variant={"outlined"}
                                 onChange={this.handleChange.bind(this)}
                                 label={"Height(Feet)"}
                                 required={true}
                                 onBlur={this.handleBlur.bind(this)}
                                 error={Boolean(this.state.heightError)}
                                 helperText={this.state.heightError}
                      />
                    </GridItem>
                    <GridItem className={classes.root} xs={12} sm={12} md={3}>
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
                                          label={"Both Sided?"}/>
                      </FormControl>
                    </GridItem>
                    <GridItem className={classes.root} xs={12} sm={12} md={3}>
                      <FormControl margin={"dense"}>
                        <FormControlLabel onChange={this.handleSwitch.bind(this)}
                                          name={"collapsible"}
                                          control={
                                            <Switch
                                              color={"primary"}
                                              value={this.state.collapsible}
                                              checked={this.state.collapsible}
                                              required={true}/>
                                          }
                                          label={"Is Collapsible?"}/>
                      </FormControl>
                    </GridItem>

                    <GridItem className={classes.root} xs={12} sm={12} md={6}>
                      <TextField
                        value={this.state.coordinate}
                        name={"coordinate"}
                        margin={"dense"}
                        fullWidth={true}
                        variant={"outlined"}
                        required={true}
                        onChange={e => {
                        }}
                        onClick={() => this.setState({ openMap: true })}
                        helperText={this.state.coordinateError}
                        error={Boolean(this.state.coordinateError)}
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
                    <GridItem className={classes.root} xs={12} sm={12} md={12}>
                      <TextField name={"clearance"}
                                 value={this.state.clearance}
                                 margin={"dense"}
                                 fullWidth={true}
                                 variant={"outlined"}
                                 label={HoardingApplicationFormModel.CLEARANCE}
                                 onChange={this.handleChange.bind(this)}
                      />

                    </GridItem>
                    <GridItem className={classes.root} xs={12} sm={12} md={6}>
                      <OfficeSelect
                        name={"displayType"}
                        value={this.state.displayType}
                        error={Boolean(this.state.displayTypeError)}
                        helperText={this.state.displayTypeError}
                        onBlur={this.handleSelectBlur.bind(this, "displayType")}
                        variant={"outlined"}
                        placeHolder={"Display type"}
                        margin={"dense"}
                        required={true}
                        onChange={this.handleOfficeSelect.bind(this, "displayType")}
                        fullWidth={true}
                        options={this.state.displayTypes}
                        label={HoardingApplicationFormModel.DISPLAY_TYPE}
                      />
                    </GridItem>
                    <GridItem className={classes.root} xs={12} sm={12} md={6}>
                      <TextField name={"roadDetail"}
                                 value={this.state.roadDetail}
                                 margin={"dense"}
                                 fullWidth={true}
                                 variant={"outlined"}
                                 label={HoardingApplicationFormModel.ROAD_DETAIL}
                                 onChange={this.handleChange.bind(this)}
                      />

                    </GridItem>

                    <GridItem className={classes.root} xs={12} sm={12} md={6}>
                      <TextField name={"landLord"}
                                 margin={"dense"}
                                 value={this.state.landLord}
                                 fullWidth={true}
                                 variant={"outlined"}
                                 label={"Name of the landlord/land owner"}
                                 onChange={this.handleChange.bind(this)}
                      />
                    </GridItem>
                    <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                    <GridItem sm={12} xs={12} md={12}>
                      <Typography variant={"headline"}>Upload Document(s)</Typography>
                    </GridItem>
                    {this.state.documents.map((doc, index) => {
                      return <GridItem key={index} className={classes.root} sm={12} xs={12} md={12}>
                        <FileUpload
                          applicationName={APPLICATION_NAME.KIOSK}
                          onUploadSuccess={(data) => {
                            this.setState(state => {
                              let temp = {
                                mandatory:doc.mandatory,
                                document_id: doc.id,
                                name: doc.name,
                                path: data.location
                              };
                              state.uploadDocuments.push(temp);
                            });
                          }} onUploadFailure={(e) => {
                          console.log(e);
                        }} document={doc}/>
                      </GridItem>;
                    })}

                    <GridItem className={classes.root} xs={12} sm={12} md={12}>
                      <FormControlLabel control={
                        <Checkbox color={"primary"} onChange={(val, checked) => this.setState({ agree: checked })}/>
                      }
                                        label={"I have read carefully the Rules and Regulations and have complied with all" +
                                        "the conditions. I accept that, in the event the information submitted by me is found false, I" +
                                        "am liable for all such penal actions as prescribed under the law"}/>
                    </GridItem>
                  </GridContainer>

                </CardContent>
                <CardActions>
                  <GridContainer justify={"flex-end"}>
                    <GridItem>
                      <Button disabled={
                        !this.state.agree ||
                        this.state.prestine ||
                        !Boolean(this.state.localCouncil) ||
                        !Boolean(this.state.address) ||
                        !Boolean(this.state.length) ||
                        !Boolean(this.state.height) ||
                        !Boolean(this.state.displayType) ||
                        !Boolean(this.state.coordinate)
                      } name={"submit"} variant={"outlined"} color={"primary"}
                              onClick={this.doSubmit.bind(this)}>Submit</Button>
                      {"\u00A0 "}
                      {"\u00A0 "}
                      {"\u00A0 "}
                      {"\u00A0 "}
                      <Button name={"reset"} variant={"outlined"} color={"secondary"}
                              onClick={(e) => window.location.reload()}>Reset</Button>
                    </GridItem>
                  </GridContainer>

                </CardActions>
              </Card>
            </GridItem>
            {this.state.success}
            <GMapDialog open={this.state.openMap} onClose={(lat, lng) => {
              this.setState({
                openMap: false,
                latitude: lat,
                longitude: lng
              });
              this.setState({
                coordinate: `Latitude: ${lat} , Longitude: ${lng}`
              });
            }} fullScreen={true} isMarkerShown={true}/>

            <OfficeSnackbar
              open={Boolean(this.state.errorMessage)}
              variant={"error"}
              message={this.state.errorMessage}
              onClose={() => {
                this.setState({ errorMessage: "" });
              }
              }/>
            <SubmitDialog open={this.state.submit} text={"Your application is submitting ..."}/>

          </GridContainer>
        }
        </>

    );
  }
}

export default withRouter(withStyles(style)(KioskApplicationForm));