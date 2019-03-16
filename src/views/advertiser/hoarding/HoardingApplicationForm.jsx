import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Switch
} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import MapIcon from "@material-ui/icons/Map";
import axios from "axios";
import LoadingView from "../../common/LoadingView";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import OfficeSelect from "../../../components/OfficeSelect";
import DocumentsDropzone from "../../../components/DocumentsDropzone";

class HoardingApplicationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localCouncil: null,
      category: null,
      roadDetails: 10,
      lat: 0,
      long: 0,
      location: "",
      areaCategory: "",
      length: 1,
      height: 1,
      clearance: "",
      roadDetail:0,
      bothSide: false,
      displayType: "",

      landLord: "",
      landLordType: "0",
      attachments: [],

      localCouncils: [],
      categories: [],
      displayTypes: [],

      openDialog: false
    };
  }

  getLocalcouncils = () => {
    return axios.get(ApiRoutes.LOCAL_COUNCIL);
  };
  getCategories = () => {
    return axios.get(ApiRoutes.LOCAL_COUNCIL);
  };

  componentDidMount = () => {
    this.setState({ isFetching: true });
    axios.all([this.getLocalcouncils(), this.getCategories()])
      .then(axios.spread(function(localCouncils, categories) {
        if (localCouncils.data.status) {
          let newCouncils = [];
          const councils = localCouncils.data.data.local_councils;
          councils.forEach(val => {
            let temp = {
              value: val.id,
              label: val.name
            };
            newCouncils.push(temp);
          });
          console.log(newCouncils);
          this.setState({ localCouncils: newCouncils });
        }
        console.log(categories);
        if (categories.data.status) {
          const data = categories.data.data.local_councils;
          let newCategories = [];
          data.forEach(val => {
            let temp = {
              value: val.id,
              label: val.name
            };
            newCategories.push(temp);
          });
          console.log(newCategories);
          this.setState({ categories: newCategories });
        }

      }))
      .catch(reason => {
        console.log();
      })
      .then(() => {
        this.setState({ isFetching: false });
      });
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

  };

  handleSelect = (e) => {
    this.setState({
      landLordType: e.target.value
    });
  };

  handleOfficeSelect = (value, identifier) => {
    this.setState({
      [identifier]: value
    });
  };
  submitForm = (e) => {
    if (this.validate()) {

    } else {

    }

  };
  validate = () => {
    return true;
  };

  clearForm = (e) => {

  };
  handleDocumentClose = (documents = []) => {
    this.setState({
      openDialog: false
    });
    if (documents) {
      this.setState({
        attachments: documents.files
      });
    }
  };

  getView = () => {
    const { isFetching } = this.state;
    if (isFetching) {
      return (
        <LoadingView md={8}/>
      );
    } else {
      return (
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader title={"Hoarding Application Form"}/>
              <CardContent>


                <OfficeSelect value={this.state.localCouncil}
                              defaultValues={this.state.localCouncils[0]}
                              label={HoardingApplicationFormModel.LOCAL_COUNCILS}
                              name={"localCouncil"}
                              variant={"outlined"}
                              margin={"dense"}
                              fullWidth={true}
                              onChange={this.handleOfficeSelect.bind(this, "localCouncil")}
                              options={this.state.localCouncils}/>

                <FormGroup row={true}>
                  <TextField disabled={true} name={"lat"}
                             variant={"outlined"}
                             margin={"dense"}
                             label={"latitude"}
                             required={true}/>
                  <TextField style={{ marginLeft: 20 }}
                             disabled={true}
                             name={"long"}
                             variant={"outlined"}
                             margin={"dense"}
                             label={"Longitude"}
                             required={true}/>
                  <IconButton>
                    <MapIcon/>
                  </IconButton>
                </FormGroup>

                <TextField name={"address"}
                           margin={"dense"}
                           multiline={true}
                           rows={3}
                           fullWidth={true}
                           variant={"outlined"}
                           onChange={this.handleChange.bind(this)}
                           label={"Address"}/>

                <OfficeSelect value={this.state.category}
                              label={HoardingApplicationFormModel.CATEGORY}
                              name={"category"}
                              variant={"outlined"}
                              margin={"dense"}
                              fullWidth={true}
                              onChange={this.handleOfficeSelect.bind(this, "category")}
                              options={this.state.categories}/>

                <TextField name={"length"}
                           type={"number"}
                           margin={"dense"}
                           fullWidth={true}
                           variant={"outlined"}
                           onChange={this.handleChange.bind(this)}
                           label={"Length"} required={true}/>
                <TextField name={"height"}
                           type={"number"}
                           margin={"dense"}
                           fullWidth={true}
                           variant={"outlined"}
                           onChange={this.handleChange.bind(this)}
                           label={"Height"} required={true}/>

                <FormControlLabel onChange={this.handleChange.bind(this)}
                                  name={"bothSide"}
                                  control={<Switch required={true}/>}
                                  label={"Both side?"}/>

                <TextField name={"roadDetail"}
                           type={"number"}
                           margin={"dense"} fullWidth={true}
                           variant={"outlined"} required={true}
                           label={HoardingApplicationFormModel.ROAD_DETAIL}
                           onChange={this.handleChange.bind(this)}
                />
                <FormControl variant={"outlined"} fullWidth={true} margin={"dense"}>
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor={"displaytype"}
                  >
                    Type of display
                  </InputLabel>
                  <Select
                    value={this.state.displayType}
                    onChange={this.handleChange.bind(this)}
                    input={
                      <OutlinedInput labelWidth={120} id={"displaytype"} required={true}/>
                    }
                  >
                    {this.state.displayTypes.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                  </Select>
                </FormControl>
                <TextField name={"landlord"} margin={"dense"} fullWidth={true} variant={"outlined"} required={true}
                           label={"Name of the landlord/land owner"}
                           onChange={this.handleChange.bind(this)}
                />
                <FormControl fullWidth={true} margin={"dense"}>
                  <FormLabel>Type of Landlord/ Land owner</FormLabel>
                  <RadioGroup
                    name={"landlordType"}
                    row={true}
                    value={this.state.landLordType}
                    onChange={this.handleSelect.bind(this)}
                  >

                    <FormControlLabel value={"1"} control={<Radio/>} label={"Private"}/>
                    <FormControlLabel value={"0"} control={<Radio/>} label={"Public"}/>
                  </RadioGroup>
                </FormControl>
                <Button variant={"outlined"} onClick={() => this.setState({ openDialog: true })}>
                  Document attachment
                </Button>
                <Divider/>

                <DocumentsDropzone documents={[
                  { name: "Signature of the applicant", fileName: "signature" },
                  { name: "PDF", fileName: "test" }
                ]}
                                   openDialog={this.state.openDialog}
                                   onCloseHandler={this.handleDocumentClose.bind(this)}
                                   acceptedFiles={Constraint.ACCEPTED_IMAGES + "," + Constraint.ACCEPTED_DOCUMENTS}/>

              </CardContent>
              <CardActions>
                <Button color={"primary"} variant={"outlined"} onClick={this.submitForm.bind(this)}> Submit
                  Application</Button>
                <Button color={"secondary"} variant={"KioskI"} onClick={this.clearForm.bind(this)}> Reset</Button>
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>

      );
    }
  };

  render() {
    return (
      this.getView()
    );
  }
}

export default HoardingApplicationForm;