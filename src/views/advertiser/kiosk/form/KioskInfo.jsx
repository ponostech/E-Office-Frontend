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
import OfficeSnackbar from "../../../../components/OfficeSnackbar";

class KioskInfo extends Component {
  constructor(props) {
    super(props);
    if (props.kioskData) {
      this.state = props.kioskData;
    } else {
      this.state = {
        localCouncil: props.kioskData.localCouncil,
        category: props.kioskData.category,
        address: "",
        coordinate: 1,
        length: 1,
        height: 1,
        roadDetail:1,
        bothSide: false,
        displayType: { value: "ILLUMINATED", label: "ILLUMINATED" },
        collapsible: false,

        landLord: "",
        landlordType: "0",

        localCouncilError: "",
        addressError: "",
        lengthError: "",
        heightError: "",
        categoryError: "",
        displayTypeError: "",
        collapsibleError: "",
        roadDetailError:"",

        localCouncils: props.kioskData.localCouncils,
        categories: props.kioskData.categories,
        displayTypes: props.kioskData.displayTypes,

        prestine: true,
        showError:false,
        errorMessage: ""
      };

    }
  }

  isValid = () => {
    if (this.state.length<0) {
      this.setState({ errorMessage: KioskFormModel.LENGTH_REQUIRED})
      return false;
    }
    if (this.state.height<0) {
      this.setState({ errorMessage: KioskFormModel.HEIGHT_REQUIRED})
      return false;
    }

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
    this.setState({ landLordType: e.target.value });
  };

  handleSwitch = (e) => {
    const { checked, name } = e.target;
    this.setState({
      [name]: checked
    });
  };

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    });
    this.setState({ prestine: false });

  };


  handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "localCouncil":
        !Boolean(value) ? this.setState({ localCouncilError: KioskFormModel.LOCAL_COUNCIL_REQUIRED })
          : this.setState({ localCouncilError: "" });
        break;
      case "address":
        value.length===0 ? this.setState({ addressError: KioskFormModel.ADDRESS_REQUIRED })
          : this.setState({ addressError: "" });
        break;
        case "roadDetail":
        !Boolean(value) ? this.setState({ roadDetailError: KioskFormModel.ADDRESS_REQUIRED })
          : this.setState({ roadDetailError: "" });
        break;
      case "length":
        !Boolean(value) ? this.setState({ lengthError: KioskFormModel.LENGTH_REQUIRED })
          : this.setState({ lengthError: "" });
        break;
      case "height":
        !Boolean(value) ? this.setState({ heightError: KioskFormModel.HEIGHT_REQUIRED })
          : this.setState({ heightError: "" });
        break;
      case "collapsible":
        !Boolean(value) ? this.setState({ collapsibleError: KioskFormModel.REQUIRED_COLLAPSE })
          : this.setState({ collapsibleError: "" });
        break;
      case "category":
        !Boolean(value) ? this.setState({ categoryError: KioskFormModel.REQUIRED_CATEGORY })
          : this.setState({ categoryError: "" });
        break;
      case "displayType":
        !Boolean(value) ? this.setState({ displayTypeError: KioskFormModel.REQUIRED_DISPLAYTYPE })
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
            label={KioskFormModel.LOCAL_COUNCILS}
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
                        label={KioskFormModel.CATEGORY}
                        name={"category"}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        onChange={this.handleOfficeSelect.bind(this, "category")}
                        options={this.state.categories}/>

        </GridItem>
        <GridItem xs={12} sm={12} md={12}>

          <TextField name={"address"}
                     required={true}
                     value={this.state.address}
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
                     value={this.state.length}
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
          <TextField name={"roadDetail"}
                     value={this.state.roadDetail}
                     error={Boolean(this.state.roadDetailError)}
                     helperText={this.state.roadDetailError}
                     onBlur={this.handleBlur.bind(this)}
                     type={"number"}
                     margin={"dense"} fullWidth={true}
                     variant={"outlined"} required={true}
                     label={KioskFormModel.ROAD_DETAIL}
                     onChange={this.handleChange.bind(this)}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <TextField name={"clearance"}
                     type={"number"}
                     onBlur={this.handleBlur.bind(this)}
                     margin={"dense"} fullWidth={true}
                     variant={"outlined"} required={true}
                     label={KioskFormModel.CLEARANCE}
                     onChange={this.handleChange.bind(this)}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <FormControl margin={"dense"}>
            <FormControlLabel control={
              <Switch name={"collapsible"}
                      checked={this.state.collapsible}
                      onChange={this.handleSwitch.bind(this)}
                      value={this.state.collapsible}/>
            } label={KioskFormModel.COLLAPSIBLE}/>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <FormControl margin={"dense"}>
            <FormControlLabel value={"true"} control={
              <Switch name={"bothSide"}
                      checked={this.state.bothSide}
                      onChange={this.handleSwitch.bind(this)}
                      value={this.state.bothSide}/>
            } label={"Both side?"}/>
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
            label={KioskFormModel.DISPLAY_TYPE}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <div style={{display:'flex'}}>
            <TextField name={"coordinate"}
                       disabled={true}
                       value={this.state.coordinate}
                       onBlur={this.handleBlur.bind(this)}
                       margin={"dense"} fullWidth={true}
                       variant={"outlined"} required={true}
                       label={KioskFormModel.COORDINATE}
                       onChange={this.handleChange.bind(this)}/>
            <Button variant={"contained"} color={"primary"} onClick={(e) => {
              this.setState({ openGmap: true });
            }}>Map</Button>
          </div>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Divider style={{marginTop:10,marginBottom:10}}/>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <TextField name={"landLord"}
                     value={this.state.landLord}
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
        <OfficeSnackbar open={Boolean(this.state.errorMessage)} variant={"error"} onClose={()=>this.setState({errorMessage:''})} message={this.state.errorMessage}/>
        {/*<GMapDialog open={this.state.openGmap} onClose={()=>{}} isMarkerShown={true}/>*/}
      </GridContainer>
    );
  }
}

export default KioskInfo;