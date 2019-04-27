import React, { Component } from "react";
import { Button, Divider, TextField, Typography } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import AddressField from "../../../components/AddressField";
import OfficeSelect from "../../../components/OfficeSelect";
import FileUpload from "../../../components/FileUpload";
import SubmitDialog from "../../../components/SubmitDialog";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { StaffService } from "../../../services/StaffService";
import { StaffViewModel } from "../../model/StaffViewModel";

const style = {
  item: {
    padding: "10px 15px !important"
  }
};

class StaffRegistration extends Component {
  staffService = new StaffService();
  state = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    designation: "",
    address: "",
    branch: undefined,
    dob: new Date("12/12/1995"),
    blood: "",
    signature: null,
    passport: null,

    nameError: "",
    addressError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    confirmPasswordError: "",
    designationError: "",
    dobError: "",
    branches: [],
    submit: false,
    complete: false

  };

  componentDidMount() {

    this.fetchBranches();
  }

  fetchBranches = () => {
    this.props.doLoad(true);
    this.staffService.getBranch()
      .then(branches => {
        let temp = [];
        branches.forEach((branch, index) => {
          let val = {
            value: index,
            label: branch
          };
          temp.push(val);
        });
        console.log(temp)
        this.setState({ branches: temp });
      })
      .catch(err => {
        this.setState({ errorMessage: err });
      })
      .finally(() => {
        this.props.doLoad(false);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "designation":
        this.setState({ designation: value });
        break;
      case "branch":
        this.setState({ branch: value });
        break;
      default:
        break;

    }
  };

  handleClear = () => {
  };

  handleSave = (e) => {
    console.log("fasdfasdfasdfasdfasdfas")
    this.setState({ submit: true });
    this.staffService.create(this.state)
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        this.setState({ errorMessage: err.toString() });
      })
      .finally(()=>{
        this.setState({submit:false})
      });
  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ nameError: StaffViewModel.NAME_REQUIRED }) : this.setState({ nameError: "" });
        break;
      case "address":
        value.length === 0 ? this.setState({ addressError: StaffViewModel.ADDRESS_REQUIRED }) : this.setState({ addressError: "" });
        break;
      case "email":
        value.length === 0 ? this.setState({ emailError: StaffViewModel.EMAIL_REQUIRED }) : this.setState({ emailError: "" });
        break;
      case "phone":
        value.length === 0 ? this.setState({ phoneError: StaffViewModel.PHONE_REQUIRED }) : this.setState({ addressError: "" });
        break;
      case "password":
        value.length === 0 ? this.setState({ passwordError: StaffViewModel.PASSWORD_REQUIRED }) : this.setState({ passwordError: "" });
        break;
      case "confirmPassword":
        value.length === 0 ? this.setState({ confirmPasswordError: StaffViewModel.CONFIRM_REQUIRED }) : this.setState({ confirmPasswordError: "" });
        break;
      case "designation":
        value.length === 0 ? this.setState({ designationError: StaffViewModel.DESIGNATION_REQUIRED }) : this.setState({ designationError: "" });
        break;
      default:
        break;
    }
  };

  handleSelectBlur = (identifier, e) => {
    switch (identifier) {
      case "branch":
        this.state.branch === undefined ? this.setState({ branchError: "Branch is required" }) : this.setState({ branchError: "" });
        break;
      default:
        break;
    }
  };

  render() {
    const { designation } = this.props;
    const { classes } = this.props;

    return (
      <GridContainer justify="flex-start">
        <GridItem xs={12} sm={12} md={10}>
          <GridContainer>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <Typography variant={"h5"}>Staff registration</Typography>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <Divider/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                name={"name"}
                value={this.state.name}
                ref={"nameRef"}
                onBlur={this.handleBlur.bind(this)}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={StaffViewModel.NAME}
                error={Boolean(this.state.nameError)}
                helperText={this.state.nameError}
              />
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                name={"email"}
                type={"email"}
                value={this.state.email}
                onBlur={this.handleBlur.bind(this)}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={StaffViewModel.EMAIL}
                error={Boolean(this.state.emailError)}
                helperText={this.state.emailError}
              />
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                name={"phone"}
                value={this.state.phone}
                ref={"nameRef"}
                onBlur={this.handleBlur.bind(this)}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={StaffViewModel.PHONE}
                error={Boolean(this.state.phoneError)}
                helperText={this.state.phoneError}
              />
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                name={"designation"}
                variant={"outlined"}
                margin={"dense"}
                value={this.state.designation}
                fullWidth={true}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
                ClearAble={true}
                required={true}
                error={Boolean(this.state.designationError)}
                helperText={this.state.designationError}
                label={StaffViewModel.DESIGNATION}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                name={"password"}
                value={this.state.password}
                ref={"nameRef"}
                onBlur={this.handleBlur.bind(this)}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={StaffViewModel.PASSWORD}
                error={Boolean(this.state.passwordError)}
                helperText={this.state.passwordError}
              />
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                name={"confirmPassword"}
                value={this.state.confirmPassword}
                ref={"nameRef"}
                onBlur={this.handleBlur.bind(this)}
                required={true}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={StaffViewModel.CONFIRM_PASSWORD}
                error={Boolean(this.state.confirmPasswordError)}
                helperText={this.state.confirmPasswordError}
              />
            </GridItem>

            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <AddressField
                textFieldProps={{
                  placeholder: "Address",
                  value: this.state.address,
                  onChange: this.handleChange.bind(this),
                  onBlur: this.handleBlur.bind(this),
                  error: Boolean(this.state.addressError),
                  helperText: this.state.addressError,
                  margin: "dense",
                  variant: "outlined",
                  fullWidth: true,
                  name: "address",
                  required: true,
                  label: "Address"
                }}
                onPlaceSelect={(place) => {
                  if (place) {
                    let name = place.name;
                    let address = place.formatted_address;
                    let complete_address = address.includes(name) ? address : `${name} ${address}`;
                    this.setState({ address: complete_address });
                  }
                }}/>
            </GridItem>

            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <OfficeSelect value={this.state.branch}
                            label={StaffViewModel.BRANCH}
                            name={"branch"}
                            required={true}
                            variant={"outlined"}
                            margin={"dense"}
                            fullWidth={true}
                            helperText={this.state.branchError}
                            error={Boolean(this.state.branchError)}
                            onBlur={this.handleSelectBlur.bind(this, "branch")}
                            onChange={this.handleSelect.bind(this, "branch")}
                            options={this.state.branches}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  required={true}
                  fullWidth={true}
                  error={!!this.state.dobError}
                  helperText={this.state.dobError}
                  margin="dense"
                  name={"dob"}
                  variant="outlined"
                  label="Date of birth"
                  value={this.state.dob}
                  onChange={(val) => this.setState({ dob: val })}
                  format={"dd/MM/yyyy"}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <TextField
                value={this.state.blood}
                ref={"bloodRef"}
                name={"blood"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                label={StaffViewModel.BLOOD}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <FileUpload document={{ id: 0, name: "Passport photocopy", mime: "image/*", mandatory: 1 }}
                          onUploadSuccess={(data) => {
                            let temp = {
                              document_id: 0,
                              name: "passport photo",
                              path: data.location
                            };
                            this.setState({ signature: temp });
                          }} onUploadFailure={(data) => {
                console.error(data);
              }}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={6}>
              <FileUpload document={{ id: 1, name: "Signature", mime: "image/*", mandatory: 1 }}
                          onUploadSuccess={(data) => {
                            let temp = {
                              document_id: 0,
                              name: "signature",
                              path: data.location
                            };
                            this.setState({ signature: temp });
                          }} onUploadFailure={(data) => {
                console.error(data);
              }}/>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <GridContainer alignItems={"flex-end"}>
                <div>
                  <Button name={"primary"} disabled={this.state.submit}
                          color={"primary"} variant={"outlined"}
                          onClick={this.handleSave}>
                    {StaffViewModel.PRIMARY_TEXT}
                  </Button>
                  {"\u00A0 "}
                  {"\u00A0 "}
                  {"\u00A0 "}
                  <Button name={"secondary"}
                          color={"secondary"}
                          variant={"outlined"}
                          onClick={this.handleClear.bind(this)}>
                    {StaffViewModel.SECONDARY_TEXT}
                  </Button>
                </div>
              </GridContainer>
            </GridItem>

            {/*{this.getAttachmentView()}*/}

            {/*<DocumentsDropzone documents={[*/}
            {/*{ name: "Staff signature", fileName: "signature" }*/}
            {/*]}*/}
            {/*openDialog={this.state.openDialog} onCloseHandler={this.handleDocuments.bind(this)}*/}
            {/*acceptedFiles={Constraint.ACCEPTED_IMAGES}/>*/}

          </GridContainer>
        </GridItem>
        <SubmitDialog open={this.state.submit} text={StaffViewModel.SUBMIT}/>
        <OfficeSnackbar variant={"success"} open={this.state.complete} message={StaffViewModel.CREATE_MESSAGE}/>
      </GridContainer>
    );
  }
}

export default withStyles(style)(StaffRegistration);