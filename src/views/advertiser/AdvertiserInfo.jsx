import React, { Component } from "react";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@material-ui/core";
import AdvertiserViewModel from "../model/AdvertiserViewModel";
import PropTypes from "prop-types";
import { Validators } from "../../utils/Validators";

class AdvertiserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "private",
      email: "",
      password: "",
      confirmPassword: "",
      applicantType: "",
      address: "",
      agree: false,

      nameError: "",
      emailError: "",
      passwordError: "",
      phoneError: "",
      confirmPasswordError: "",
      addressError: "",
      types: ["private", "public"]
    };
  }

  isValid = () => {
    const invalid = Boolean(this.state.nameError) ||
      Boolean(this.state.emailError) ||
      Boolean(this.state.addressError) ||
      Boolean(this.state.passwordError) ||
      Boolean(this.state.confirmPassword) ||
      Boolean(this.state.phoneError);

    console.log(invalid);
    return true;
  };

  getData=()=>{
    console.log(this.state)
    return this.state;
  }

  handleRequired = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ nameError: AdvertiserViewModel.REQUIRED_NAME }) : this.setState({ nameError: "" });
        break;
      case "email":
        if (value.length === 0) {
          this.setState({ emailError: AdvertiserViewModel.REQUIRED_EMAIL });
        }
        break;
      case "password":
        if (value.length === 0) {
          this.setState({ passwordError: AdvertiserViewModel.REQUIRED_PASSWORD })
        }
        break;
      case "confirmPassword":
        if (value.length === 0) {
          this.setState({ confirmPasswordError: AdvertiserViewModel.REQUIRED_CONFIRM_PASSWORD })
        }
        break;
      case "phone":
        if (value.length === 0) {
          this.setState({ phoneError: AdvertiserViewModel.REQUIRED_PHONE })
        }
        break;
        case "address":
        value.length === 0 ? this.setState({ addressError: AdvertiserViewModel.REQUIRED_ADDRESS }) : this.setState({ addressError: "" });
        break;
      default:
        break;
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [e.target.name]: e.target.value
    });

    switch (name) {
      case "email":
        !Validators.EMAIL_REGEX.test(value) ? this.setState({ emailError: AdvertiserViewModel.INVALID_EMAIL }) :
          this.setState({ emailError: "" });
        break;
      case "password":
        value.length < 8 ? this.setState({ passwordError: AdvertiserViewModel.MIN_PASSWORD }) : this.setState({ passwordError: "" });
        break;
      case "confirmPassword":
        value !== this.state.password ? this.setState({ confirmPasswordError: AdvertiserViewModel.MATCH_PASSWORD }) : this.setState({ confirmPasswordError: "" });
        break;
      case "phone":
        value.length !== 10 ? this.setState({ phoneError: AdvertiserViewModel.PHONE_ERROR }) : this.setState({ phoneError: "" });
        break;
      default:
        break;
    }

  };

  openDialog = () => {
    this.setState({ openDialog: true });
  };

  render() {
    return (

      <div>
        <TextField
          error={Boolean(this.state.nameError)}
          helperText={this.state.nameError}
          name={"name"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"outlined"}
          label={AdvertiserViewModel.NAME}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          placeholder={"Fullname"}
        />
        <FormControl
          required={true}
          margin={"dense"}
          fullWidth={true}
          variant={"outlined"}
        >
          <InputLabel htmlFor={"type"}>{AdvertiserViewModel.APPLICANT_TYPE}</InputLabel>
          <Select
            value={this.state.type}
            onChange={this.handleChange.bind(this)}
            input={
              <OutlinedInput required={true} labelWidth={140} name={"type"} id={"type"}/>
            }
          >
            {this.state.types.map((val, i) => (
              <MenuItem key={i} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          error={Boolean(this.state.emailError)}
          helperText={this.state.emailError}
          type={"email"}
          name={"email"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"outlined"}
          label={AdvertiserViewModel.EMAIL}
          placeholder={"Email"}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
        <TextField
          error={Boolean(this.state.phoneError)}
          helperText={this.state.phoneError}
          type={"phone"}
          name={"phone"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"outlined"}
          label={"Phone"}
          placeholder={"Phone"}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
        <TextField
          error={Boolean(this.state.passwordError)}
          helperText={this.state.passwordError}
          type={"password"}
          name={"password"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"outlined"}
          label={AdvertiserViewModel.PASSWORD}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          placeholder={"Password"}
        />
        <TextField
          error={Boolean(this.state.confirmPasswordError)}
          helperText={this.state.confirmPasswordError}
          type={"password"}
          name={AdvertiserViewModel.CONFIRM_PASSWORD}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"outlined"}
          label={"Confirm Password"}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          placeholder={"Confirm password"}
        />
        <TextField
          error={Boolean(this.state.addressError)}
          helperText={this.state.addressError}
          multiline={true}
          rows={3}
          name={"address"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"outlined"}
          label={AdvertiserViewModel.ADDRESS}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          placeholder={" hno \n locality \n pincode"}
        />
      </div>

    );
  }
}

AdvertiserInfo.propTypes = {
  validateInfo: PropTypes.func.isRequired
};
export default AdvertiserInfo;
