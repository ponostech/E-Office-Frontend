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
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import TextField from "@material-ui/core/es/TextField/TextField";
import MapIcon from "@material-ui/icons/Map";
import DocumentsDropzone from "../../components/DocumentsDropzone";
import Constraint from "../../config/Constraint";

class HoardingApplicationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localCouncil: "one",
      roadDetails: 10,
      lat: 0,
      long: 0,
      location: "",
      areaCategory: "",
      length: 1,
      height: 1,
      clearance: "",
      bothSide: false,
      displayType: "",

      landLord: "",
      landLordType: "private",
      attachments: [],

      localCouncils: ["one", "two", "three"],
      displayTypes: [],

      openDialog: false
    };
  }

  componentDidMount = () => {
    const { history } = this.props;
    if (this.state.fakeAuth) {
      history.back();
    } else {
      this.setState({
        displayTypes: ["one", "two", "three"]
      });

    }
  };

  handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      this.setState({
        [e.target.name]:checked
      })
    }else{
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
        attachments: documents
      });
    }
  };

  render() {
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader title={"Hoarding Application Form"}/>
            <CardContent>
              <FormControl variant={"outlined"} fullWidth={true} margin={"dense"}>
                <InputLabel htmlFor="lc">Local Council</InputLabel>
                <Select
                  value={this.state.localCouncil}
                  onChange={this.handleChange.bind(this)}
                  input={
                    <OutlinedInput labelWidth={100} name={"localCouncil"} id={"lc"}/>}
                >
                  {this.state.localCouncils.map((item, i) => <MenuItem key={i} value={item}> {item}</MenuItem>)}
                </Select>
              </FormControl>

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

                  <FormControlLabel value={"private"} control={<Radio/>} label={"Private"}/>
                  <FormControlLabel value={"public"} control={<Radio/>} label={"Public"}/>
                </RadioGroup>
              </FormControl>
              <Button variant={"outlined"} onClick={() => this.setState({ openDialog: true })}>
                Document attachment
              </Button>
              <Divider/>

              <DocumentsDropzone documents={[
                { name: "Signature of the applicant", fileName: "signature" },
                { name: "NOC of landowner", fileName: "noc-landowner" },
                { name: "Tribal Certificate", fileName: "tribal-certificate" }
              ]}
                                 openDialog={this.state.openDialog}
                                 onCloseHandler={this.handleDocumentClose.bind(this)}
                                 acceptedFiles={Constraint.ACCEPTED_IMAGES + " " + Constraint.ACCEPTED_DOCUMENTS}/>

            </CardContent>
            <CardActions>
              <Button color={"primary"} variant={"outlined"} onClick={this.submitForm.bind(this)}> Submit
                Application</Button>
              <Button color={"secondary"} variant={"outlined"} onClick={this.clearForm.bind(this)}> Reset</Button>
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default HoardingApplicationForm;