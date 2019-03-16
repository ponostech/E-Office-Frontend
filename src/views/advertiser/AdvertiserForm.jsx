import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import DocumentsDropzone from "../../components/DocumentsDropzone";

class AdvertiserForm extends Component {
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
      types: ["private", "public"],
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

  openDialog = () => {
    this.setState({ openDialog: true });
  };

  onDropzoneClosed = data => {
    console.log(data);
    this.setState({ openDialog: false });
  };

  render() {
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader
              title={"Application for Advertiser"}
              subheader={"Please fill out all the form and press submit button"}
            />
            <CardContent>
              <TextField
                error={this.state.errors.name}
                helperText={this.state.errors.nameText}
                name={"name"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                variant={"outlined"}
                label={"Name"}
                onChange={this.handleChange.bind(this)}
                placeholder={"Fullname"}
              />
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
              <TextField
                error={this.state.errors.phone}
                helperText={this.state.errors.phoneText}
                type={"phone"}
                name={"phone"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                variant={"outlined"}
                label={"Phone"}
                onChange={this.handleChange.bind(this)}
                placeholder={"Phone"}
              />
              <TextField
                error={this.state.errors.password}
                helperText={this.state.errors.passwordText}
                type={"password"}
                name={"password"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                variant={"outlined"}
                label={"Password"}
                onChange={this.handleChange.bind(this)}
                placeholder={"Password"}
              />
              <TextField
                error={this.state.errors.confirmPassword}
                helperText={this.state.errors.confirmText}
                type={"password"}
                name={"confirmPassword"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                variant={"outlined"}
                label={"Confirm Password"}
                onChange={this.handleChange.bind(this)}
                placeholder={"Confirm password"}
              />
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
                label={"Address"}
                onChange={this.handleChange.bind(this)}
                placeholder={" hno \n locality \n pincode"}
              />
              <Divider style={{marginTop:10,marginBottom:10}}/>
              <Button
                variant={"outlined"}
                onClick={this.openDialog.bind(this)}
                color={"primary"}
              >
                Attach documents
              </Button>
            </CardContent>
            <CardActions>
              <Button
                variant={"outlined"}
                color={"primary"}
                onClick={this.handleSubmit.bind(this)}
              >
                Submit Application
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
        {
          <DocumentsDropzone
            onCloseHandler={this.onDropzoneClosed.bind(this)}
            openDialog={this.state.openDialog}
            documents={[
              { name: "Voter id", fileName: "neitiri", type: "image" },
              {
                name: "NOC of landowner",
                fileName: "noc_landowner",
                type: "pdf"
              },
              {
                name: "Tribal Certificate",
                fileName: "tribal_cert",
                type: "pdf"
              }
            ]}
            acceptedFiles={"image/jpeg, image/png, application/pdf"}
          />
        }
      </GridContainer>
    );
  }
}

export default AdvertiserForm;
