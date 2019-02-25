import React, { Component } from "react";
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@material-ui/core";
import Select from "react-select";
import { StaffViewModel } from "../model/StaffViewModel";
import GridItem from "../../components/Grid/GridItem";
import moment from "moment";
import ImageUpload from "../../components/CustomUpload/ImageUpload";

class StaffRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      designation: "",
      address: "",
      branch: "",
      dob: null,
      blood: "",

      nameError: "",
      addressError: "",
      dobError: "",

      submit: false,
      designations: ["LDC", "UDC", "Assistant"],
      branches: ["Branch one", "Branch two", "Three", "asdfasd", "fasdfa", "fasdfasd", "fasdfasdf", "fasdfasdf"]
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSelect = (selectedValue) => {
    this.setState({ selectedValue });
  };

  validate = () => {
    if (this.state.name === "") {
      this.setState({ nameError: StaffViewModel.NAME_REQUIRED });
      return false;
    }
    if (this.state.addressError === "") {
      this.setState({ addressError: StaffViewModel.ADDRESS_REQUIRED });
      return false;
    }
    if (this.state.dobError === "") {
      this.setState({ dobError: StaffViewModel.DOB_REQUIRED });
      return false;
    }

    let dob = moment(this.state.do);
    let today = moment.now();
    if (dob > today) {
      this.setState({ dobError: StaffViewModel.DOB_FUTURE_ERROR });
      return;
    }
    this.setState({
      nameError: "",
      addressError: "",
      dobError: ""
    });
    return true;
  };
  submit = () => {
    console.log("im calling");
    if (this.validate()) {
      this.setState({ submit: true });
    }
  };
  handleClick = (e) => {
    const name = e.target.name;
    switch (name) {
      case "primary":
        this.submit();
        //TODO: submit data
        break;
      case "secondary":
        //TODO: clear data
        break;
      default:
        break;
    }
  };

  render() {
    const { designation } = this.props;
    const { branch } = this.props;
    return (
      <GridItem xs={12} sm={12} md={5}>
        <Card>
          <CardHeader title={StaffViewModel.TILE} subheader={StaffViewModel.SUBHEADER}/>
          <CardContent>
            <TextField name={"name"}
                       required={true}
                       variant={"outlined"}
                       margin={"dense"}
                       fullWidth={true}
                       onChange={this.handleChange.bind(this)}
                       label={StaffViewModel.NAME}
                       error={Boolean(this.state.nameError)}
                       helperText={this.state.nameError}
            />
            <Select value={designation}
                    defaultValue={this.state.designations[0]}
                    name={"designation"}
                    placeholder={StaffViewModel.DESIGNATION}
                    onChange={this.handleSelect.bind(this)}
                    searchAble={true}
                    ClearAble={true}
                    label={StaffViewModel.DESIGNATION}
                    options={this.state.designations}/>

            <TextField name={"address"}
                       required={true}
                       multiline={true}
                       rows={3}
                       variant={"outlined"}
                       margin={"dense"}
                       fullWidth={true}
                       error={Boolean(this.state.addressError)}
                       helperText={this.state.addressError}
                       onChange={this.handleChange.bind(this)}
                       label={StaffViewModel.ADDRESS}/>

            <Select value={branch}
                    name={"branch"}
                    variant={"outlined"}
                    margin={"dense"}
                    fullWidth={true}
                    onChange={this.handleSelect.bind(this)}
                    options={this.state.branches}
                    placeholder={StaffViewModel.BRANCH}/>

            <TextField name={"dob"}
                       variant={"outlined"}
                       margin={"dense"}
                       required={true}
                       fullWidth={true}
                       onChange={this.handleChange.bind(this)}
                       type={"date"}
                       label={StaffViewModel.DOB}
                       error={Boolean(this.state.dobError)}
                       helperText={this.state.dobError}
            />
            <TextField name={"blood"}
                       variant={"outlined"}
                       margin={"dense"}
                       fullWidth={true}
                       onChange={this.handleChange.bind(this)}
                       label={StaffViewModel.BLOOD}/>

          </CardContent>
          <CardActions>
            <Button name={"primary"} disabled={this.state.submit} color={"primary"} variant={"outlined"}
                    onClick={this.handleClick.bind(this)}>{StaffViewModel.PRIMARY_TEXT}</Button>
            <Button name={"secondary"} color={"secondary"} variant={"outlined"}
                    onClick={this.handleClick.bind(this)}>{StaffViewModel.SECONDARY_TEXT}</Button>
          </CardActions>
        </Card>
      </GridItem>
    );
  }
}

export default StaffRegistrationForm;