import React, { Component } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField
} from "@material-ui/core";
import { KioskFormModel } from "../../../model/KioskFormModel";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import OfficeSelect from "../../../../components/OfficeSelect";
import HoardingApplicationFormModel from "../../../model/HoardingApplicationFormModel";

class KioskInfo extends Component {
  constructor(props) {
    super(props);
    if (props.kioskData) {
      this.state = props.kioskData;
    } else {
      this.state = {
        localCouncil: props.kioskData.localCouncil,
        category: props.kioskData.category,
        lat: 0,
        long: 0,
        location: "",
        areaCategory: "",
        length: 1,
        height: 1,
        bothSide: false,
        displayType: null,

        landLord: "",
        landlordType: "0",

        localCouncilError: "",
        addressError: "",
        lengthError: "",
        heightError: "",
        categoryError: "",
        displayTypeError: "",

        localCouncils: props.kioskData.localCouncils,
        categories: props.kioskData.categories,
        displayTypes: props.kioskData.displayTypes,

        prestine:true
      };

    }
  }

  setNewState = (state) => {
    this.setState({ state });
  };


  isValid = () => {
    return true;
  };
  getData = () => {
    return this.state;
  };

  handleOfficeSelect = (identifier, value) => {
    this.setState({
      [identifier]: value
    });
  };
  handleRadio = (e) => {
    console.log(e.target.value);
    this.setState({ landLordType: e.target.value });
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

    this.setState({prestine:false})

  };


  handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "localCouncil":
        !Boolean(value) ? this.setState({ localCouncilError: KioskFormModel.LOCAL_COUNCIL_REQUIRED })
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
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={6}>
          <OfficeSelect
            onBlur={this.handleBlur.bind(this)}
            error={Boolean(this.state.localCouncilError)}
            helperText={this.state.localCouncilError}
            value={this.state.localCouncil}
            defaultValues={this.state.localCouncils[0]}
            label={HoardingApplicationFormModel.LOCAL_COUNCILS}
            name={"localCouncil"}
            variant={"outlined"}
            margin={"dense"}
            fullWidth={true}
            onChange={this.handleOfficeSelect.bind(this, "localCouncil")}
            options={this.state.localCouncils}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>

          <OfficeSelect value={this.state.category}
                        error={Boolean(this.state.categoryError)}
                        helperText={this.state.categoryError}
                        onBlur={this.handleBlur.bind(this)}
                        label={HoardingApplicationFormModel.CATEGORY}
                        name={"category"}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        onChange={this.handleOfficeSelect.bind(this, "category")}
                        options={this.state.categories}/>

        </GridItem>
        <GridItem xs={12} sm={12} md={12}>

          <TextField name={"address"}
                     onBlur={this.handleBlur.bind(this)}
                     error={Boolean(this.state.addressError)}
                     helperText={this.state.addressError}
                     margin={"dense"}
                     multiline={true}
                     rows={3}
                     fullWidth={true}
                     variant={"outlined"}
                     onChange={this.handleChange.bind(this)}
                     label={"Address"}/>
        </GridItem>


        <GridItem xs={12} sm={12} md={6}>
          <TextField name={"length"}
                     type={"number"}
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
        <GridItem xs={12} sm={12} md={6}>
          <TextField name={"height"}
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
          <TextField name={"roadDetail"}
                     onBlur={this.handleBlur.bind(this)}
                     type={"number"}
                     margin={"dense"} fullWidth={true}
                     variant={"outlined"} required={true}
                     label={HoardingApplicationFormModel.ROAD_DETAIL}
                     onChange={this.handleChange.bind(this)}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <TextField name={"roadDetail"}
                     onBlur={this.handleBlur.bind(this)}
                     margin={"dense"} fullWidth={true}
                     variant={"outlined"} required={true}
                     label={HoardingApplicationFormModel.CLEARANCE}
                     onChange={this.handleChange.bind(this)}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <FormControl margin={"dense"}>
            <FormControlLabel value={"true"} control={<Switch/>} label={"Is Both side?"}/>
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
          <TextField name={"lat"} margin={"dense"} fullWidth={true} variant={"outlined"} required={true}
                     label={HoardingApplicationFormModel.LAT}
                     onChange={this.handleChange.bind(this)}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <TextField name={"long"} margin={"dense"} fullWidth={true} variant={"outlined"} required={true}
                     label={HoardingApplicationFormModel.LONG}
                     onChange={this.handleChange.bind(this)}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Button variant={"contained"} color={"primary"} onClick={(e) => {
            this.setState({ openGmap: true });
          }}>Map</Button>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <TextField name={"landlord"}
                     margin={"dense"}
                     fullWidth={true}
                     variant={"outlined"}
                     required={true}
                     label={"Name of the landlord/land owner"}
                     onChange={this.handleChange.bind(this)}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <FormControl fullWidth={true} margin={"dense"}>
            <FormLabel>Type of Landlord/ Land owner</FormLabel>
            <RadioGroup
              defaultValue={"0"}
              value={this.state.landLordType}
              name={"landlordType"}
              row={true}
              onChange={this.handleRadio.bind(this)}
            >
              <FormControlLabel value={"0"} control={<Radio/>} label={"Private"}/>
              <FormControlLabel value={"1"} control={<Radio/>} label={"Public"}/>
            </RadioGroup>
          </FormControl>
        </GridItem>
        <Divider/>
        {/*<GMapDialog open={this.state.openGmap} onClose={()=>{}} isMarkerShown={true}/>*/}
      </GridContainer>
    );
  }
}

export default KioskInfo;