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
import { HoardingService } from "../../../../services/HoardingService";
import { DocumentService } from "../../../../services/DocumentService";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import GMapDialog from "../../../../components/GmapDialog";
import SubmitDialog from "../../../../components/SubmitDialog";
import withStyles from "@material-ui/core/es/styles/withStyles";
import AddressField from "../../../../components/AddressField";
import { ArrayToString, ErrorToString } from "../../../../utils/ErrorUtil";
import { CategoryServices } from "../../../../services/CategoryServices";
import ApplicationSubmitSuccessDialog from "../../../../components/ApplicationSubmitSuccessDialog";
import LoadingDialog from "../../../common/LoadingDialog";


const style = {
  root: {
    padding: "10px 15px !important"
  }
};

var timeout=undefined;

class NewHoardingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localCouncil: undefined,
      category: undefined,

      latitude: undefined,
      longitude: undefined,

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
      coordinateError: "",

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
      submit: false,
      loading: true
    };

    this.localCouncilservice = new LocalCouncilService();
    this.hoardingService = new HoardingService();
    this.documentService = new DocumentService();
    this.categoryService = new CategoryServices();
  }


  componentDidMount() {

    var self = this;
    timeout=setTimeout(function(handler) {
      Promise.all([self.fetchCategory(), self.fetchLocalCouncil(), self.fetchDocument()])
        .then(function([cats, locs, docs]) {
          // self.setState({ loading: false });
        });
      self.setState({loading:false})
    },6000)
    //
  }

  componentWillUnmount() {
    clearTimeout(timeout)
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
      });
  };

  fetchCategory = () => {
    let categories = [];
    this.categoryService.get()
      .then(res => {
        const { messages, status } = res.data;
        if (status) {
          res.data.data.area_categories.forEach(function(cat) {
            const roads = cat.roads;
            let roadOptions = [];
            roads.forEach((road) => {
              let item = {
                label: road,
                value: cat.id
              };
              roadOptions.push(item);
            });
            let c = {
              label: `(${cat.name})`,
              options: roadOptions
            };
            categories.push(c);
          });
          this.setState({
            categories: categories
          });
        } else {
          this.setState({ errorMessage: messages });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchDocument = () => {
    this.documentService.get("hoarding")
      .then(data => {
        if (data.status) {
          this.setState({ documents: data.data.documents });
        }
      });

  };

  invalid = () => {
    return this.state.prestine || !!this.state.localCouncilError || !!this.state.addressError || !!this.state.lengthError || !!this.state.heightError
      || !!this.state.displayTypeError || !!this.state.coordinateError;
  };

  handleOfficeSelect = (identifier, value) => {
    this.setState({
      [identifier]: value
    });
  };
  doClear = (e) => {
    const { history } = this.props;
    history.reload();
  };

  doSubmit = () => {
    if (this.invalid()) {
      this.setState({ errorMessage: "Please fill the required fields" });
      return;
    }
    this.setState({ submit: true });
    this.hoardingService.create(this.state)
      .then(res => {
        console.log(res);
        if (res.data.status) {
          this.setState({ success: ArrayToString(res.data.messages) });
        } else {
          let msg = ErrorToString(res.data.messages);
          this.setState({ errorMessage: msg });
        }
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
      case "displayType":
        this.state.displayType === undefined ? this.setState({ displayTypeError: "Display type is required" }) : this.setState({ displayTypeError: "" });
        break;
      default:
        break;
    }
  };


  handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "address":
        !Boolean(value) ? this.setState({ addressError: "Address is required" })
          : this.setState({ addressError: "" });
        break;
      case "length":
        !Boolean(value) ? this.setState({ lengthError: "Length is required" })
          : this.setState({ lengthError: "" });
        break;
      case "height":
        !Boolean(value) ? this.setState({ heightError: "Height is required" })
          : this.setState({ heightError: "" });
        break;
      case "coordinate":
        !Boolean(value) ? this.setState({ coordinateError: "Coordinate is required" })
          : this.setState({ coordinateError: "" });
        break;
      case "category":
        !Boolean(value) ? this.setState({ categoryError: "Area's category is required" })
          : this.setState({ categoryError: "" });
        break;
      default:
        break;

    }
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={"flex-start"}>
        <GridItem style={{ padding: "4px!important" }} xs={12} sm={12} md={10}>
          <Card>
            <CardContent>
              <GridContainer>
                <GridItem className={classes.root} xs={12} sm={12} md={12}>
                  <Typography variant={"h5"}>{HoardingApplicationFormModel.TITLE}</Typography>
                  <Typography variant={"subtitle1"}>{HoardingApplicationFormModel.SUBTITLE}</Typography>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
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
                                required={true}
                                fullWidth={true}
                                helperText={this.state.categoryError}
                                error={Boolean(this.state.categoryError)}
                                onBlur={this.handleSelectBlur.bind(this, "category")}
                                onChange={this.handleOfficeSelect.bind(this, "category")}
                                options={this.state.categories}/>
                </GridItem>

                <GridItem className={classes.root} xs={12} sm={12} md={3}>
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
                <GridItem className={classes.root} xs={12} sm={12} md={3}>
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
                      label: "Address"
                    }}
                  />
                </GridItem>

                <GridItem className={classes.root} xs={12} sm={12} md={3}>
                  <TextField name={"clearance"}
                             value={this.state.clearance}
                             type={"number"}
                             margin={"dense"}
                             fullWidth={true}
                             variant={"outlined"}
                             label={HoardingApplicationFormModel.CLEARANCE}
                             onChange={this.handleChange.bind(this)}
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
                  <OfficeSelect
                    required={true}
                    name={"displayType"}
                    value={this.state.displayType}
                    error={Boolean(this.state.displayTypeError)}
                    helperText={this.state.displayTypeError}
                    onBlur={this.handleSelectBlur.bind(this, "displayType")}
                    variant={"outlined"}
                    placeHolder={"Type of Display"}
                    margin={"dense"}
                    onChange={this.handleOfficeSelect.bind(this, "displayType")}
                    fullWidth={true}
                    options={this.state.displayTypes}
                    label={"Type of Display"}
                  />
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
                    label={"Coordinate"}
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
                <GridItem className={classes.root} xs={12} sm={12} md={6}>
                  <TextField name={"landLord"}
                             margin={"dense"}
                             value={this.state.landLord}
                             fullWidth={true}
                             variant={"outlined"}
                             label={"Name of the Landlord/Land Owner"}
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
                      <FormControlLabel value={"0"} control={<Radio color={"primary"}/>}
                                        label={"Private"}/>
                      <FormControlLabel value={"1"} control={<Radio color={"primary"}/>}
                                        label={"Public"}/>
                    </RadioGroup>
                  </FormControl>
                </GridItem>
                {/*//Document upload*/}
                <GridItem xs={12} sm={12} md={12}>
                  <Typography variant={"headline"}>Upload Document(s)</Typography>
                </GridItem>
                {this.state.documents.map((doc, index) => {
                  return <GridItem className={classes.root} key={index} xs={12} sm={12} md={6}>
                    <FileUpload key={index} onUploadSuccess={(data) => {
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
                  </GridItem>;
                })}
                <GridItem className={classes.root} xs={12} sm={12} md={12}>
                  <FormControlLabel control={
                    <Checkbox color={"primary"}
                              onChange={(val, checked) => this.setState({ agree: checked })}/>
                  }
                                    label={"I hereby pledge that i will abide the AMC Display of Advertisement and Hoarding Regulations 2013," +
                                    " with specific reference of Regulation 7, Regulation 28 and Regulation 32, failing which i would be liable to get my registration / License cancelled"}/>
                </GridItem>
              </GridContainer>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button disabled={!this.state.agree} name={"submit"} variant={"outlined"} color={"primary"}
                      onClick={this.doSubmit.bind(this)}>Submit</Button>
              {"\u00A0 "}
              {"\u00A0 "}
              {"\u00A0 "}
              <Button name={"reset"} variant={"outlined"} color={"secondary"}
                      onClick={this.doClear.bind(this)}>Reset</Button>

            </CardActions>
          </Card>
        </GridItem>
        <Divider/>

        <GMapDialog open={this.state.openMap} onClose={(lat, lng) => {
          this.setState({
            openMap: false,
            latitude: lat,
            longitude: lng
          });
          this.setState({
            coordinate: `Latitude: ${lat} , Longitude: ${lng}`
          });
        }} fullScreen={true}
                    isMarkerShown={true}/>

        <OfficeSnackbar open={Boolean(this.state.errorMessage)} variant={"error"}
                        message={this.state.errorMessage}
                        onClose={() => {
                          this.setState({ errorMessage: "" });
                        }}/>
        <SubmitDialog open={this.state.submit} text={"Your application is submitting ..."}/>
        <ApplicationSubmitSuccessDialog
          title={"Your application is submitted"}
          open={Boolean(this.state.success)}
          message={this.state.success}
          onClose={(e) => {
            this.setState({ success: "" });
            this.clear();
          }}/>
        <LoadingDialog open={this.state.loading} title={"Loading"} message={"Please wait ..."}/>
      </GridContainer>
    );
  }
}

export default withStyles(style)(NewHoardingForm);