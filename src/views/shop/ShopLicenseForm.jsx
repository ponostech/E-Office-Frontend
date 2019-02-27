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
  Select,
  TextField
} from "@material-ui/core";

class ShopLicenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "Proprietor",
      email: "",
      password: "",
      confirmPassword: "",
      applicantType: "",
      address: "",
      agree: false,

      errors: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        address: false,
        nameText: "",
        emailText: "",
        passwordText: "",
        confirmText: "",
        addresText: ""
      },
      documents: [],
      types: ["Proprietor", "Partnership","Private Limited"],
      openDialog: false
    };
  }

  handleSubmit = e => {};

  handleChange = e => {
    this.validate();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    const newState = this.state.errors;
    newState.name = true;
    this.setState({ someProperty: newState });
    if (this.state.name === "") {
      this.setState({
        errors: newState
      });
    }
    return true;
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader title={"Shopping License Form"} subheader={"Star marks are mandatory"}/>
          <CardContent>
            <FormControl variant="outlined" fullWidth={true}>

              <TextField required={true} placeholder={"eg: Name"} variant={"outlined"} label={"Name of applicant"} fullWidth={true} margin={"dense"}/>
              <TextField required={true} variant={"outlined"} label={"Name of Shop or Firm"} fullWidth={true} margin={"dense"}/>
              <TextField required={true} variant={"outlined"} label={"Name of Trade"} fullWidth={true} margin={"dense"}/>
              <TextField required={true} variant={"outlined"} label={"Location"} fullWidth={true} margin={"dense"}/>
            </FormControl>
            <FormControl
              margin={"dense"}
              fullWidth={true}
              variant={"outlined"}
            >
              <InputLabel htmlFor={"type"}>Type of applicant</InputLabel>
              <Select
                value={this.state.type}
                onChange={this.handleChange.bind(this)}
                input={
                  <OutlinedInput labelWidth={140} name={"type"} id={"type"} />
                }
              >
                {this.state.types.map((val, i) => (
                  <MenuItem key={i} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth={true}>
              <TextField
                error={this.state.errors.address}
                helperText={this.state.errors.addressText}
                multiline={true}
                rows={3}
                name={"address"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                variant={"outlined"}
                label={"Residential Address"}
                onChange={this.handleChange.bind(this)}
                placeholder={" hno \n locality \n pincode"}
              />

              <TextField required={true} variant={"outlined"} label={"Phone Number"} fullWidth={true} margin={"dense"}/>
              <TextField required={true} variant={"outlined"} label={"Mobile"} fullWidth={true} margin={"dense"}/>
              <TextField
                error={this.state.errors.email}
                helperText={this.state.errors.emailText}
                type={"email"}
                name={"email"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                variant={"outlined"}
                label={"Email"}
                onChange={this.handleChange.bind(this)}
                placeholder={"Email"}
              />

              <TextField required={false} variant={"outlined"} label={"Tin No (If any)"} fullWidth={true} margin={"dense"}/>
              <TextField required={false} variant={"outlined"} label={"CST No (If any)"} fullWidth={true} margin={"dense"}/>
              <TextField required={false} variant={"outlined"} label={"PAN No (If any)"} fullWidth={true} margin={"dense"}/>
              <TextField required={true} variant={"outlined"} label={"Whether premises owned or Leased?"} fullWidth={true} margin={"dense"}/>
              <TextField required={true} variant={"outlined"} label={"Details of Business"} fullWidth={true} margin={"dense"}/>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button variant={"outlined"} color={"primary"}>Submit</Button>
            <Button variant={"outlined"} color={"secondary"}>clear</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ShopLicenseForm;