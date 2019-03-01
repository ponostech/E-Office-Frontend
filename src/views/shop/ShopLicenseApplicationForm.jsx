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
  Select
} from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import TextField from "@material-ui/core/es/TextField/TextField";
import MapIcon from "@material-ui/icons/Map";
import DocumentsDropzone from "../../components/DocumentsDropzone";
import Constraint from "../../config/Constraint";
import OfficeSelect from "../../components/OfficeSelect";
import { ShopLicenseFormModel } from "../model/ShopLicenseFormModel";
import moment from "moment";

class ShopLicenseApplicationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      shopName: "",
      tradeName: "",
      ownership: "",
      phoneNumber: "",
      mobileNumber: "",
      email: "",
      tinNo: "",
      cstNo: "",
      panNo: "",
      businessDetail: "",
      doe: "",
      address: "",
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


      premiseType: "owned",
      attachments: [],

      localCouncils: ["one", "two", "three"],
      displayTypes: [],
      ownerships: [
        { value: "proprietor", label: "Proprietor" },
        { value: "partnership", label: "Partnership" },
        { value: "private-ltd", label: "Private Limited" }
      ],

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
        [e.target.name]: checked
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

  };

  handleSelect = (selectedValue) => {
    this.setState({ selectedValue });
  };

  submitForm = (e) => {
    if (this.validate()) {

    } else {

    }

  };
  handleRadio = (e) => {
    this.setState({
      premiseType: e.target.value
    });
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

  validate = () => {
    if (this.state.doeError === "") {
      this.setState({ doeError: ShopLicenseFormModel.DOE_REQUIRED });
      return false;
    }

    let doe = moment(this.state.do);
    let today = moment.now();
    if (doe > today) {
      this.setState({ doeError: ShopLicenseFormModel.DOE_FUTURE_ERROR });
      return;
    }
    this.setState({
      nameError: "",
      addressError: "",
      doeError: ""
    });
    return true;
  };

  render() {
    const { ownership } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader title={"Shop License Application Form"}/>
            <CardContent>
              <TextField name={"name"}
                         margin={"dense"}
                         fullWidth={true}
                         variant={"outlined"}
                         onChange={this.handleChange.bind(this)}
                         label={"Name of Applicant"}/>
              <TextField name={"shopName"}
                         margin={"dense"}
                         fullWidth={true}
                         variant={"outlined"}
                         onChange={this.handleChange.bind(this)}
                         label={"Name of Shop or Firm"}/>
              <TextField name={"tradeName"}
                         margin={"dense"}
                         fullWidth={true}
                         variant={"outlined"}
                         onChange={this.handleChange.bind(this)}
                         label={"Name of trade"}/>
              <TextField name={"location"}
                         margin={"dense"}
                         fullWidth={true}
                         variant={"outlined"}
                         onChange={this.handleChange.bind(this)}
                         label={"Location"}/>
              <OfficeSelect value={ownership}
                            defaultValue={this.state.ownership[0]}
                            name={"ownership"}
                            placeholder={ShopLicenseFormModel.Ownership}
                            onChange={this.handleSelect.bind(this)}
                            searchAble={true}
                            ClearAble={true}
                            label={ShopLicenseFormModel.Ownership}
                            options={this.state.ownerships}/>
              <TextField name={"address"}
                         margin={"dense"}
                         multiline={true}
                         rows={3}
                         fullWidth={true}
                         variant={"outlined"}
                         onChange={this.handleChange.bind(this)}
                         label={"Residential Address"}/>
              <TextField name={"phoneNumber"}
                         margin={"dense"}
                         fullWidth={true}
                         variant={"outlined"}
                         onChange={this.handleChange.bind(this)}
                         label={"Phone No."}/>
              <TextField name={"mobileNo"}
                         margin={"dense"}
                         fullWidth={true}
                         variant={"outlined"}
                         onChange={this.handleChange.bind(this)}
                         label={"Mobile No."}/>
              <TextField name={"email"}
                         type={"email"}
                         margin={"dense"}
                         fullWidth={true}
                         variant={"outlined"}
                         onChange={this.handleChange.bind(this)}
                         label={"E-mail"}/>
              <TextField name={"tinNo"}
                         required={false}
                         variant={"outlined"}
                         label={"Tin No (If any)"}
                         fullWidth={true}
                         margin={"dense"}/>
              <TextField name={"cstNo"}
                         required={false}
                         variant={"outlined"}
                         label={"CST No (If any)"}
                         fullWidth={true}
                         margin={"dense"}/>
              <TextField name={"panNo"}
                         required={false}
                         variant={"outlined"}
                         label={"PAN No (If any)"}
                         fullWidth={true}
                         margin={"dense"}/>
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

              <FormControl fullWidth={true} margin={"dense"}>
                <FormLabel>Whether premises owned or leased?</FormLabel>
                <RadioGroup
                  name={"premiseType"}
                  row={true}
                  value={this.state.premiseType}
                  onChange={this.handleRadio.bind(this)}
                >

                  <FormControlLabel value={"owned"} control={<Radio/>} label={"Owned"}/>
                  <FormControlLabel value={"leased"} control={<Radio/>} label={"Leased"}/>
                </RadioGroup>
              </FormControl>
              <TextField name={"businessDetail"}
                         margin={"dense"}
                         fullWidth={true}
                         variant={"outlined"}
                         onChange={this.handleChange.bind(this)}
                         label={"Details of Business"}/>
              <TextField name={"doe"}
                         variant={"outlined"}
                         margin={"dense"}
                         required={true}
                         fullWidth={true}
                         onChange={this.handleChange.bind(this)}
                         type={"date"}
                         InputLabelProps={{ shrink: true }}
                         label={ShopLicenseFormModel.DOE}
                         error={Boolean(this.state.doeError)}
                         helperText={this.state.doeError}
              />
              <Button variant={"outlined"} onClick={() => this.setState({ openDialog: true })}>
                Document attachment
              </Button>
              <Divider/>

              <DocumentsDropzone documents={[
                { name: "Signature of the applicant", fileName: "signature" },
                {
                  name: "NOC from the house or land owner where business is intended to be run",
                  fileName: "noc-landowner"
                },
                {
                  name: "NOC from Local Council where business is intended to be run",
                  fileName: "noc-local-council"
                },
                { name: "EPIC", fileName: "epic" },
                { name: "Residential Certificate (From D.C. Office)", fileName: "residential-certificate" },
                {
                  name: "License/Registration Certificate from Food Licensing Authority",
                  fileName: "certificate-fla"
                },
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

export default ShopLicenseApplicationForm;