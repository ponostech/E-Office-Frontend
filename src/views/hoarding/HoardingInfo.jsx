import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Switch,
  TextField
} from "@material-ui/core";
import HoardingApplicationFormModel from "../model/HoardingApplicationFormModel";
import axios from "axios";
import { ApiRoutes } from "../../config/ApiRoutes";
import OfficeSelect from "../../components/OfficeSelect";

class HoardingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localCouncil: undefined,
      category: undefined,
      lat: 0,
      long: 0,
      location: "",
      areaCategory: "",
      length: 1,
      height: 1,
      bothSide: false,

      localCouncils: [],
      categories: [],
      displayTypes: [],

      openDialog: false
    };
  }

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

  componentDidMount() {
    axios.get(ApiRoutes.LOCAL_COUNCIL)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

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

  render() {
    return (
      <div>
          <OfficeSelect value={this.state.localCouncil}
                        defaultValues={this.state.localCouncils[0]}
                        label={HoardingApplicationFormModel.LOCAL_COUNCILS}
                        name={"localCouncil"}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        onChange={this.handleOfficeSelect.bind(this, "localCouncil")}
                        options={this.state.localCouncils}/>

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
          <Divider/>
      </div>
    );
  }
}

export default HoardingInfo;