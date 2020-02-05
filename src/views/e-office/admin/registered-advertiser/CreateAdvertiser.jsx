import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@material-ui/core";
import AdvertiserViewModel from "../../../model/AdvertiserViewModel";
import OfficeSelect from "../../../../components/OfficeSelect";
import VisibilityOn from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AddressField from "../../../../components/AddressField";

class CreateAdvertiser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: undefined,
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",

      agree: false,
      showPassword: false,

      nameError: "",
      typeError: "",
      emailError: "",
      passwordError: "",
      phoneError: "",
      confirmPasswordError: "",
      addressError: "",

      types: [
        { value: "individual", label: "Individual" },
        { value: "firm", label: "Firm" },
        { value: "group", label: "Group(NGO)" }
      ]
    };
  }

  onChange = (name, value) => this.setState({ [name]: value });
  onBlur = (name, value) => {};
  handleClickShowPassword = e => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    return (
      <Card style={{ flexGrow: 1 }}>
        <CardHeader
          title={
            <Typography variant={"h5"}>
              {"New Registered Advertiser"}
            </Typography>
          }
        />
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
            onBlur={event => this.onBlur("name", event.target.value)}
            onChange={event => this.onChange("name", event.target.value)}
            placeholder={"Fullname"}
          />
          <OfficeSelect
            value={this.state.type}
            label={"Type of Applicant"}
            name={"type"}
            variant={"outlined"}
            margin={"dense"}
            required={true}
            fullWidth={true}
            helperText={this.state.typeError}
            error={Boolean(this.state.typeError)}
            onBlur={val => this.onBlur("type", val)}
            onChange={val => this.onChange("type", val)}
            options={this.state.types}
          />
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
            onBlur={event => this.onBlur("email", event.target.value)}
            onChange={event => this.onChange("email", event.target.value)}
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
            onBlur={event => this.onBlur("phone", event.target.value)}
            onChange={event => this.onChange("phone", event.target.value)}
          />
          <TextField
            value={this.state.password}
            error={Boolean(this.state.passwordError)}
            helperText={this.state.passwordError}
            type={this.state.showPassword ? "text" : "password"}
            tabIndex={-1}
            name={"password"}
            margin={"dense"}
            required={true}
            fullWidth={true}
            variant={"outlined"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword.bind(this)}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOn />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            label={AdvertiserViewModel.PASSWORD}
            onBlur={event => this.onBlur("password", event.target.value)}
            onChange={event => this.onChange("password", event.target.value)}
            placeholder={"Password"}
          />
          <TextField
            value={this.state.confirmPassword}
            error={Boolean(this.state.confirmPasswordError)}
            helperText={this.state.confirmPasswordError}
            type={this.state.showPassword ? "text" : "password"}
            name={"confirmPassword"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword.bind(this)}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOn />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            margin={"dense"}
            required={true}
            fullWidth={true}
            variant={"outlined"}
            label={AdvertiserViewModel.CONFIRM_PASSWORD}
            onBlur={event => this.onBlur("confirmPassword", event.target.value)}
            onChange={event =>
              this.onChange("confirmPassword", event.target.value)
            }
            placeholder={"Confirm password"}
          />
          <AddressField
            textFieldProps={{
              placeholder: "Address",
              value: this.state.address,
              onBlur: event => this.onBlur("password", event.target.value),
              onChange: event => this.onChange("password", event.target.value),
              error: Boolean(this.state.addressError),
              helperText: this.state.addressError,
              margin: "dense",
              variant: "outlined",
              fullWidth: true,
              name: "address",
              required: true,
              label: "Address"
            }}
            onPlaceSelect={place => {
              if (place) {
                let name = place.name;
                let address = place.formatted_address;
                let complete_address = address.includes(name)
                  ? address
                  : `${name} ${address}`;
                this.setState({ address: complete_address });
              }
            }}
          />
        </CardContent>

        <CardActions>
          <Button>Create</Button>
          <Button>Reset</Button>
        </CardActions>
      </Card>
    );
  }
}

export default CreateAdvertiser;
