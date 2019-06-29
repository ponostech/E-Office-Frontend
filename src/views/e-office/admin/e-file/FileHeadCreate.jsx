import React, {Component} from "reactn";
import {Button, Divider, IconButton, InputAdornment, TextField, Typography} from "@material-ui/core";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import OfficeSelect from "../../../../components/OfficeSelect";
import SubmitDialog from "../../../../components/SubmitDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {FileHeadService} from "../../../../services/FileHeadService";
import {Validators} from "../../../../utils/Validators";
import LoadingView from "../../../common/LoadingView";
import {STAFF_LIST} from "../../../../config/routes-constant/OfficeRoutes"
import {withRouter} from "react-router-dom"

const style = {
  item: {
    padding: "10px 15px !important"
  }
};

class FileHeadCreate extends Component {
  fileHeadService = new FileHeadService();
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
    showPassword: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    window.document.title = "File Head Creation";
    this.setGlobal({loading: true});
    Promise.all([this.fetchRole(), this.fetchBranches()])
        .then(value => console.log(value))
        .finally(() => {
          this.setGlobal({loading: false});
        });
  }

  handleShowPassword = (e) => {
    this.setState({showPassword: !this.state.showPassword});
  };

  fetchBranches = async () => {
    await this.staffService.getBranch((errorMessage) => this.setState({errorMessage}), (branches) => this.setState({branches}))
        .finally(() => this.setGlobal({loading: false}));
  };

  fetchRole = async () => {
    await this.staffService.getRoles(
        errorMessage => this.setState({errorMessage}),
        roles => this.setState({roles})
    );
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
    switch (name) {
      case "password":
        !Validators.PASSWORD_REGEX.test(value) ? this.setState({passwordError: StaffViewModel.PASSWORD_ERROR}) : this.setState({passwordError: ""});
        break;
      case "confirmPassword":
        value !== this.state.password ? this.setState({confirmPasswordError: StaffViewModel.CONFIRM_PASSWORD_ERROR}) : this.setState({confirmPasswordError: ""});
        break;
      case "email":
        !Validators.EMAIL_REGEX.test(value) ? this.setState({emailError: StaffViewModel.EMAIL_ERROR}) : this.setState({emailError: ""});
        break;
      case "phone":
        !Validators.PHONE_REGEX.test(value) ? this.setState({phoneError: StaffViewModel.PHONE_ERROR}) : this.setState({phoneError: ""});
        break;
    }
    this.setState({prestine: false});
  };

  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "designation":
        this.setState({designation: value});
        break;
      case "branch":
        this.setState({branch: value});
        break;
      case "role":
        this.setState({role: value});
        break;
      default:
        break;
    }
  };

  handleClear = () => {
    window.location.reload();
  };

  handleSave = (e) => {
    const invalid = Boolean(this.state.nameError) || Boolean(this.state.emailError) || Boolean(this.state.designationError)
        || Boolean(this.state.branchError) || Boolean(this.state.dobError) || Boolean(this.state.phoneError)
        || Boolean(this.state.passwordError) || Boolean(this.state.confirmPasswordError) || this.state.signature === undefined || this.state.passport === undefined
        || this.state.prestine;

    if (invalid) {
      this.setState({errorMessage: "Please fill all the required field"});
      return;
    }
    this.setState({submit: true});
    this.staffService.create(this.state,
        (errorMessage) => this.setState({errorMessage}),
        (successMessage) => {
          this.setState({successMessage})
          this.props.history.push(STAFF_LIST)
        })
        .finally(() => this.setState({submit: false}));
  };

  handleBlur = (e) => {
    const {name, value} = e.target;
    switch (name) {
      case "name":
        value.length === 0 ? this.setState({nameError: "NAME_REQUIRED"}) : this.setState({nameError: ""});
        break;
      default:
        break;
    }
  };

  handleSelectBlur = (identifier, e) => {
    switch (identifier) {
      case "branch":
        this.state.branch === undefined ? this.setState({branchError: "Main Head is required"}) : this.setState({branchError: ""});
        break;
      case "role":
        this.state.role === undefined ? this.setState({roleError: "Staff role is required"}) : this.setState({roleError: ""});
        break;
      default:
        break;
    }
  };

  render() {
    const {classes} = this.props;

    return (
        <>
          {
            this.global.loading ? <LoadingView/> :
                <GridContainer justify="flex-start">
                  <GridItem xs={12} sm={12} md={10}>
                    <GridContainer>
                      <GridItem className={classes.item} xs={12} sm={12} md={12}>
                        <Typography variant={"h5"}>{"CREATE FILE INDEXES"}</Typography>
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={12}>
                        <Divider/>
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
                        <OfficeSelect value={this.state.role}
                                      label={""}
                                      name={"role"}
                                      required={true}
                                      variant={"outlined"}
                                      margin={"dense"}
                                      fullWidth={true}
                                      helperText={this.state.roleError}
                                      error={Boolean(this.state.roleError)}
                                      onBlur={this.handleSelectBlur.bind(this, "role")}
                                      onChange={this.handleSelect.bind(this, "role")}
                                      options={this.state.roles}/>
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
                  <SubmitDialog open={this.state.submit} title={StaffViewModel.SUBMIT_TITLE}
                                text={StaffViewModel.PLEASE_WAIT}/>
                  <OfficeSnackbar onClose={() => this.setState({errorMessage: ""})} variant={"error"}
                                  open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}/>
                  <OfficeSnackbar onClose={() => this.setState({successMessage: ""})} variant={"success"}
                                  open={Boolean(this.state.successMessage)} message={this.state.successMessage}/>
                </GridContainer>
          }
        </>

    );
  }
}

export default withStyles(style)(withRouter(FileHeadCreate));