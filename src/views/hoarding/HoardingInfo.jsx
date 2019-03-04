import React, { Component } from "react";
import {
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField
} from "@material-ui/core";
import HoardingApplicationFormModel from "../model/HoardingApplicationFormModel";
import OfficeSelect from "../../components/OfficeSelect";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

class HoardingInfo extends Component {
  constructor(props) {
    super(props);
    if (props.applicantData) {
      console.log("fasdfasdfa");
      this.state = props.applicantData;
    } else {
      this.state = {
        localCouncil: props.applicantData.localCouncil,
        category: props.applicantData.category,
        lat: 0,
        long: 0,
        location: "",
        areaCategory: "",
        length: 1,
        height: 1,
        bothSide: false,
        displayType: null,

        landLord: "",
        landlordType: 0,

        localCouncils: props.applicantData.localCouncils,
        categories: props.applicantData.categories,
        displayTypes: props.applicantData.displayTypes
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

  handleBlur = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "localCouncil":
        value === undefined ? this.setState({ localCouncilError: HoardingApplicationFormModel.LOCAL_COUNCIL_REQUIRED }) :
          this.setState({ localCouncilError: "" });
        break;
      case "category":
        value === undefined ? this.setState({ localCouncilError: HoardingApplicationFormModel.CATEGORY_REQUIRED }) :
          this.setState({ localCouncilError: "" });
        break;
      case "displayType":
        value === null ? this.setState({ displayTypeError: HoardingApplicationFormModel.DISPLAY_TYPE_REQUIRED }) :
          this.setState({ displayTypeError: "" });
        break;
    }
  };

  render() {
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <OfficeSelect
            shrink={true}
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
        <GridItem xs={12} sm={12} md={12}>

          <TextField name={"address"}
                     margin={"dense"}
                     multiline={true}
                     rows={3}
                     fullWidth={true}
                     variant={"outlined"}
                     onChange={this.handleChange.bind(this)}
                     label={"Address"}/>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>

          <OfficeSelect value={this.state.category}
                        label={HoardingApplicationFormModel.CATEGORY}
                        name={"category"}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        onChange={this.handleOfficeSelect.bind(this, "category")}
                        options={this.state.categories}/>

        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <TextField name={"length"}
                     type={"number"}
                     margin={"dense"}
                     fullWidth={true}
                     variant={"outlined"}
                     onChange={this.handleChange.bind(this)}
                     label={"Length"} required={true}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <TextField name={"height"}
                     type={"number"}
                     margin={"dense"}
                     fullWidth={true}
                     variant={"outlined"}
                     onChange={this.handleChange.bind(this)}
                     label={"Height"} required={true}/>

        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <FormControlLabel onChange={this.handleChange.bind(this)}
                            name={"bothSide"}
                            control={<Switch required={true}/>}
                            label={"Both side?"}/>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <TextField name={"roadDetail"}
                     type={"number"}
                     margin={"dense"} fullWidth={true}
                     variant={"outlined"} required={true}
                     label={HoardingApplicationFormModel.ROAD_DETAIL}
                     onChange={this.handleChange.bind(this)}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <OfficeSelect value={this.state.displayType}
                        variant={"outlined"}
                        margin={"dense"}
                        onChange={this.handleOfficeSelect.bind(this, "displayType")}
                        fullWidth={true}
                        options={this.state.displayTypes}
                        label={HoardingApplicationFormModel.DISPLAY_TYPE}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <TextField name={"lat"} margin={"dense"} fullWidth={true} variant={"outlined"} required={true}
                     label={HoardingApplicationFormModel.LAT}
                     onChange={this.handleChange.bind(this)}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <TextField name={"long"} margin={"dense"} fullWidth={true} variant={"outlined"} required={true}
                     label={HoardingApplicationFormModel.LONG}
                     onChange={this.handleChange.bind(this)}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
          <Fab variant={"extended"} color={"primary"} onClick={(e) => {
            this.setState({ openGmap: true });
          }}>Map</Fab>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <TextField name={"landlord"} margin={"dense"} fullWidth={true} variant={"outlined"} required={true}
                     label={"Name of the landlord/land owner"}
                     onChange={this.handleChange.bind(this)}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <FormControl fullWidth={true} margin={"dense"}>
            <FormLabel>Type of Landlord/ Land owner</FormLabel>
            <RadioGroup
              name={"landlordType"}
              row={true}
              value={this.state.landLordType}
              onChange={this.handleOfficeSelect.bind(this,"landlordType")}
            >
              <FormControlLabel value={"1"} control={<Radio/>} label={"Private"}/>
              <FormControlLabel value={"0"} control={<Radio/>} label={"Public"}/>
            </RadioGroup>
          </FormControl>
        </GridItem>
        <Divider/>
        {/*<GMapDialog open={this.state.openGmap} onClose={()=>{}} isMarkerShown={true}/>*/}
      </GridContainer>
    );
  }
}

export default HoardingInfo;