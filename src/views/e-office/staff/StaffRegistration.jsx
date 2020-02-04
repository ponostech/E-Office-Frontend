import React, { Component } from "reactn";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@material-ui/core";

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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Validators } from "../../../utils/Validators";
import LoadingView from "../../common/LoadingView";
import { STAFF_LIST } from "../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";

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
    role: undefined,
    dob: new Date("12/12/1995"),
    blood: "",
    signature: undefined,
    passport: undefined,

    nameError: "",
    addressError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    branchError: "",
    roleError: "",
    confirmPasswordError: "",
    designationError: "",
    dobError: "",

    errorMessage: "",
    successMessage: "",

    branches: [],
    roles: [],

    prestine: true,
    submit: false,
    showPassword: true
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    window.document.title = "e-AMC Staff Registration";
    this.setGlobal({ loading: true });
    Promise.all([this.fetchRole(), this.fetchBranches()])
      .then(value => console.log(value))
      .finally(() => {
        this.setGlobal({ loading: false });
      });
  }

  handleShowPassword = e => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  fetchBranches = async () => {
    await this.staffService
      .getBranch(
        errorMessage => this.setState({ errorMessage }),
        branches => this.setState({ branches })
      )
      .finally(() => this.setGlobal({ loading: false }));
  };

  fetchRole = async () => {
    await this.staffService.getRoles(
      errorMessage => this.setState({ errorMessage }),
      roles => this.setState({ roles })
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    switch (name) {
      case "password":
        !Validators.PASSWORD_REGEX.test(value)
          ? this.setState({ passwordError: StaffViewModel.PASSWORD_ERROR })
          : this.setState({ passwordError: "" });
        break;
      case "confirmPassword":
        value !== this.state.password
          ? this.setState({
              confirmPasswordError: StaffViewModel.CONFIRM_PASSWORD_ERROR
            })
          : this.setState({ confirmPasswordError: "" });
        break;
      case "email":
        !Validators.EMAIL_REGEX.test(value)
          ? this.setState({ emailError: StaffViewModel.EMAIL_ERROR })
          : this.setState({ emailError: "" });
        break;
      case "phone":
        !Validators.PHONE_REGEX.test(value)
          ? this.setState({ phoneError: StaffViewModel.PHONE_ERROR })
          : this.setState({ phoneError: "" });
        break;
      default:
        break;
    }
    this.setState({ prestine: false });
  };

  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "designation":
        this.setState({ designation: value });
        break;
      case "branch":
        this.setState({ branch: value });
        break;
      case "role":
        this.setState({ role: value });
        break;
      default:
        break;
    }
  };

  handleClear = () => {
    window.location.reload();
  };

  handleSave = e => {
    const invalid =
      Boolean(this.state.nameError) ||
      Boolean(this.state.emailError) ||
      Boolean(this.state.designationError) ||
      Boolean(this.state.branchError) ||
      Boolean(this.state.dobError) ||
      Boolean(this.state.phoneError) ||
      Boolean(this.state.passwordError) ||
      Boolean(this.state.confirmPasswordError) ||
      this.state.signature === undefined ||
      this.state.passport === undefined ||
      this.state.prestine;

    if (invalid) {
      this.setState({ errorMessage: "Please fill all the required field" });
      return;
    }
    this.setState({ submit: true });
    this.staffService
      .create(
        this.state,
        errorMessage => this.setState({ errorMessage }),
        successMessage => {
          this.setState({ successMessage });
          this.props.history.push(STAFF_LIST);
        }
      )
      .finally(() => this.setState({ submit: false }));
  };

  handleBlur = e => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        value.length === 0
          ? this.setState({ nameError: StaffViewModel.NAME_REQUIRED })
          : this.setState({ nameError: "" });
        break;
      case "address":
        value.length === 0
          ? this.setState({ addressError: StaffViewModel.ADDRESS_REQUIRED })
          : this.setState({ addressError: "" });
        break;
      case "email":
        value.length === 0
          ? this.setState({ emailError: StaffViewModel.EMAIL_REQUIRED })
          : this.setState({ emailError: "" });
        break;
      case "phone":
        value.length === 0
          ? this.setState({ phoneError: StaffViewModel.PHONE_REQUIRED })
          : this.setState({ addressError: "" });
        break;
      case "password":
        value.length === 0
          ? this.setState({ passwordError: StaffViewModel.PASSWORD_REQUIRED })
          : this.setState({ passwordError: "" });
        break;
      case "confirmPassword":
        value.length === 0
          ? this.setState({
              confirmPasswordError: StaffViewModel.CONFIRM_REQUIRED
            })
          : this.setState({ confirmPasswordError: "" });
        break;
      case "designation":
        value.length === 0
          ? this.setState({
              designationError: StaffViewModel.DESIGNATION_REQUIRED
            })
          : this.setState({ designationError: "" });
        break;
      default:
        break;
    }
  };

  handleSelectBlur = (identifier, e) => {
    switch (identifier) {
      case "branch":
        this.state.branch === undefined
          ? this.setState({ branchError: "Branch is required" })
          : this.setState({ branchError: "" });
        break;
      case "role":
        this.state.role === undefined
          ? this.setState({ roleError: "Staff role is required" })
          : this.setState({ roleError: "" });
        break;
      default:
        break;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        {this.global.loading ? (
          <LoadingView />
        ) : (
          <GridContainer justify="flex-start">
            <GridItem xs={12} sm={12} md={10}>
              <GridContainer>
                <GridItem className={classes.item} xs={12} sm={12} md={12}>
                  <Typography variant={"h5"}>{StaffViewModel.TILE}</Typography>
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={12}>
                  <Divider />
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
                    required={true}
                    error={Boolean(this.state.designationError)}
                    helperText={this.state.designationError}
                    label={StaffViewModel.DESIGNATION}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={6}>
                  <TextField
                    label={StaffViewModel.PASSWORD}
                    placeholder={StaffViewModel.PASSWORD}
                    required={true}
                    value={this.state.password}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    error={Boolean(this.state.passwordError)}
                    helperText={this.state.passwordError}
                    type={this.state.showPassword ? "password" : "text"}
                    name={"password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={"end"}>
                          <IconButton
                            tabIndex={-1}
                            onClick={this.handleShowPassword.bind(this)}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    variant={"outlined"}
                    margin={"dense"}
                    fullWidth={true}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={6}>
                  <TextField
                    label={StaffViewModel.CONFIRM_PASSWORD}
                    placeholder={StaffViewModel.CONFIRM_PASSWORD}
                    value={this.state.confirmPassword}
                    required={true}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    error={Boolean(this.state.confirmPasswordError)}
                    helperText={this.state.confirmPasswordError}
                    type={this.state.showPassword ? "password" : "text"}
                    name={"confirmPassword"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={"end"}>
                          <IconButton
                            tabIndex={-1}
                            onClick={this.handleShowPassword.bind(this)}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    variant={"outlined"}
                    margin={"dense"}
                    fullWidth={true}
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
                </GridItem>

                <GridItem className={classes.item} xs={12} sm={12} md={6}>
                  <OfficeSelect
                    value={this.state.branch}
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
                    options={this.state.branches}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={6}>
                  <OfficeSelect
                    value={this.state.role}
                    label={StaffViewModel.ROLE}
                    name={"role"}
                    required={true}
                    variant={"outlined"}
                    margin={"dense"}
                    fullWidth={true}
                    helperText={this.state.roleError}
                    error={Boolean(this.state.roleError)}
                    onBlur={this.handleSelectBlur.bind(this, "role")}
                    onChange={this.handleSelect.bind(this, "role")}
                    options={this.state.roles}
                  />
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
                      onChange={val => this.setState({ dob: val })}
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
                    label={StaffViewModel.BLOOD}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={6}>
                  <FileUpload
                    document={{
                      id: 0,
                      name: "Passport photocopy",
                      mime: "image/*",
                      mandatory: 1
                    }}
                    onUploadSuccess={data => {
                      let temp = {
                        document_id: 0,
                        name: "passport photo",
                        path: data.location
                      };
                      this.setState({ passport: temp });
                    }}
                    onUploadFailure={data => {
                      console.error(data);
                    }}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={6}>
                  <FileUpload
                    document={{
                      id: 1,
                      name: "Signature",
                      mime: "image/*",
                      mandatory: 1
                    }}
                    onUploadSuccess={data => {
                      let temp = {
                        document_id: 0,
                        name: "signature",
                        path: data.location
                      };
                      this.setState({ signature: temp });
                    }}
                    onUploadFailure={data => {
                      console.error(data);
                    }}
                  />
                </GridItem>
                <GridItem className={classes.item} xs={12} sm={12} md={12}>
                  <GridContainer alignItems={"flex-end"}>
                    <div>
                      <Button
                        name={"primary"}
                        disabled={this.state.submit}
                        color={"primary"}
                        variant={"outlined"}
                        onClick={this.handleSave}
                      >
                        {StaffViewModel.PRIMARY_TEXT}
                      </Button>
                      {"\u00A0 "}
                      {"\u00A0 "}
                      {"\u00A0 "}
                      <Button
                        name={"secondary"}
                        color={"secondary"}
                        variant={"outlined"}
                        onClick={this.handleClear.bind(this)}
                      >
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
            <SubmitDialog
              open={this.state.submit}
              title={StaffViewModel.SUBMIT_TITLE}
              text={StaffViewModel.PLEASE_WAIT}
            />
            <OfficeSnackbar
              onClose={() => this.setState({ errorMessage: "" })}
              variant={"error"}
              open={Boolean(this.state.errorMessage)}
              message={this.state.errorMessage}
            />
            <OfficeSnackbar
              onClose={() => this.setState({ successMessage: "" })}
              variant={"success"}
              open={Boolean(this.state.successMessage)}
              message={this.state.successMessage}
            />
          </GridContainer>
        )}
      </>
    );
  }
}

export default withStyles(style)(withRouter(StaffRegistration));
