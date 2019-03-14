import React, { Component } from "react";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@material-ui/core";
import AdvertiserViewModel from "../model/AdvertiserViewModel";
import { Validators } from "../../utils/Validators";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import UserIcon from "@material-ui/icons/AccountCircleRounded";
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/Lock";
import AddressIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
class AdvertiserInfo extends Component {
  constructor(props) {
    super(props);
    if (props.applicantData) {
      this.state = props.applicantData;
    } else {
      this.state = {
        name: "",
        type: "Individual",
        email: "",
        phone:'',
        password: "",
        confirmPassword: "",
        address: "",
        signature: null,
        imagePreviewUrl:null,
        agree: false,

        nameError: "",
        emailError: "",
        passwordError: "",
        phoneError: "",
        confirmPasswordError: "",
        addressError: "",
        types: ["Individual", "Firm", "Group(NGO)"]
      };
    }
  }

  removeSignature = () => {
    this.setState({ signature: null });
  };

  isValid = () => {
    if (this.state.name.length === 0) {
      return false;
    }
    if (this.state.email.length === 0 || !Validators.EMAIL_REGEX.test(this.state.email)) {
      return false;
    }
    if (this.state.phone.length === 0 || Validators.PHONE_REGEX.test(this.state.phone)) {
      return false
    }
    if (this.state.password.length === 0 || this.state.password.length < 7) {
      return false;
    }
    if (!this.state.type) {
      return false;
    }
    return this.state.signature != null;
  };

  getData = () => {
    return this.state;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
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
          this.setState({ passwordError: AdvertiserViewModel.REQUIRED_PASSWORD });
        }
        break;
      case "confirmPassword":
        if (value.length === 0) {
          this.setState({ confirmPasswordError: AdvertiserViewModel.REQUIRED_CONFIRM_PASSWORD });
        }
        break;
      case "phone":
        if (value.length === 0) {
          this.setState({ phoneError: AdvertiserViewModel.REQUIRED_PHONE });
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
        value.length<7 ? this.setState({ passwordError: AdvertiserViewModel.MIN_PASSWORD }) : this.setState({ passwordError: "" });
        break;
      case "confirmPassword":
        value !== this.state.password ? this.setState({ confirmPasswordError: AdvertiserViewModel.MATCH_PASSWORD }) : this.setState({ confirmPasswordError: "" });
        break;
      case "phone":
        !Validators.PHONE_REGEX.test(this.state.phone) ? this.setState({ phoneError: AdvertiserViewModel.PHONE_ERROR }) : this.setState({ phoneError: "" });
        break;
      default:
        break;
    }

  };
  setImagePreviewUrl=(url)=>{
    this.setState({imagePreviewUrl:url})
  }
  selectSignature = (file) => {
    this.setState({ signature: file });
  };
  openDialog = () => {
    this.setState({ openDialog: true });
  };

  render() {
    return (
      <div>
        <TextField
          value={this.state.name}
          error={Boolean(this.state.nameError)}
          helperText={this.state.nameError}
          name={"name"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"standard"}
          label={AdvertiserViewModel.NAME}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          placeholder={"Fullname"}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end">
                <UserIcon color={"action"}/>
              </InputAdornment>
            ),
          }}
        />
        <FormControl
          required={true}
          margin={"dense"}
          fullWidth={true}
          variant={"standard"}
        >
          <InputLabel htmlFor={"type"}>{AdvertiserViewModel.APPLICANT_TYPE}</InputLabel>
          <Select
            value={this.state.type}
            onChange={this.handleChange.bind(this)}
            input={
              <Input required={true}
                     labelWidth={140} name={"type"} id={"type"}/>
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
          value={this.state.email}
          error={Boolean(this.state.emailError)}
          helperText={this.state.emailError}
          type={"email"}
          name={"email"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"standard"}
          label={AdvertiserViewModel.EMAIL}
          placeholder={"Email"}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end">
                <EmailIcon color={"action"}/>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={this.state.phone}
          error={Boolean(this.state.phoneError)}
          helperText={this.state.phoneError}
          type={"phone"}
          name={"phone"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"standard"}
          label={"Phone"}
          placeholder={"Phone"}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end">
                <PhoneIcon color={"action"}/>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={this.state.password}
          error={Boolean(this.state.passwordError)}
          helperText={this.state.passwordError}
          type={"password"}
          name={"password"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"standard"}
          label={AdvertiserViewModel.PASSWORD}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          placeholder={"Password"}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end">
                <PasswordIcon color={"action"}/>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={this.state.confirmPassword}
          error={Boolean(this.state.confirmPasswordError)}
          helperText={this.state.confirmPasswordError}
          type={"password"}
          name={"confirmPassword"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"standard"}
          label={AdvertiserViewModel.CONFIRM_PASSWORD}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          placeholder={"Confirm password"}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end">
                <PasswordIcon color={"action"}/>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={this.state.address}
          error={Boolean(this.state.addressError)}
          helperText={this.state.addressError}
          multiline={true}
          rows={3}
          name={"address"}
          margin={"dense"}
          required={true}
          fullWidth={true}
          variant={"standard"}
          label={AdvertiserViewModel.ADDRESS}
          onBlur={this.handleRequired.bind(this)}
          onChange={this.handleChange.bind(this)}
          placeholder={" hno \n locality \n pincode"}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end">
                <AddressIcon color={"action"}/>
              </InputAdornment>
            ),
          }}
        />
        <ImageUpload label={AdvertiserViewModel.SIGNATURE} file={this.state.signature} imagePreviewUrl={this.state.imagePreviewUrl}  onRemove={this.removeSignature.bind(this)} onFileSelect={this.selectSignature.bind(this)} setImagePreviewUrl={this.setImagePreviewUrl.bind(this)}/>
      </div>

    );
  }

}

AdvertiserInfo.propTypes = {};
export default AdvertiserInfo;
