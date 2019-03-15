import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import GridContainer from "../../../components/Grid/GridContainer";
import AdvertiserViewModel from "../../model/AdvertiserViewModel";
import { Validators } from "../../../utils/Validators";
import GridItem from "../../../components/Grid/GridItem";
import ImageUpload from "../../../components/CustomUpload/ImageUpload";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      type: "Individual",
      email: "",
      phone: "",
      address: "",
      signature: null,
      imagePreviewUrl: null,
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
        value.length < 7 ? this.setState({ passwordError: AdvertiserViewModel.MIN_PASSWORD }) : this.setState({ passwordError: "" });
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
  handleSubmit = (e) => {

  };
  removeSignature = () => {
    this.setState({ signature: null });
  };
  setImagePreviewUrl = (url) => {
    this.setState({ imagePreviewUrl: url });
  };
  selectSignature = (file) => {
    this.setState({ signature: file });
  };

  render() {
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <TextField
                value={this.state.name}
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
                value={this.state.email}
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
                value={this.state.phone}
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
                value={this.state.address}
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
              <ImageUpload label={AdvertiserViewModel.SIGNATURE} file={this.state.signature}
                           imagePreviewUrl={this.state.imagePreviewUrl} onRemove={this.removeSignature.bind(this)}
                           onFileSelect={this.selectSignature.bind(this)}
                           setImagePreviewUrl={this.setImagePreviewUrl.bind(this)}/>
            </CardContent>
            <CardActions>
              <Button
                variant={"outlined"}
                color={"primary"}
                onClick={this.handleSubmit.bind(this)}
              >
                Update
              </Button>
              <Button
                variant={"outlined"}
                color={"secondary"}
                onClick={this.handleSubmit.bind(this)}
              >
                Reset
              </Button>
            </CardActions>
          </Card>
        </GridItem>

      </GridContainer>
    );
  }
}

export default Profile;