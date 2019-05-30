import React, { Component } from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@material-ui/core";
import AdvertiserViewModel from "../model/AdvertiserViewModel";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VisibilityOn from "@material-ui/icons/Visibility";
import { Validators } from "../../utils/Validators";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import SubmitDialog from "../../components/SubmitDialog";
import FileUpload from "../../components/FileUpload";
import { DocumentService } from "../../services/DocumentService";
import AddressField from "../../components/AddressField";
import OfficeSelect from "../../components/OfficeSelect";
import SweetAlert from "react-bootstrap-sweetalert";
import { AdvertiserService } from "../../services/AdvertiserService";
import { HOME } from "../../config/routes-constant/OfficeRoutes";
import { APPLICATION_NAME } from "../../utils/Util";
import LoadingView from "../common/LoadingView";

const style = {
  root: {
    padding: "10px 15px !important"
  }
};

class AdvertiserApplication extends Component {
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
      signature: undefined,
      documents: [],
      documentsUpload: [],

      agree: false,
      showPassword: false,

      nameError: "",
      typeError: "",
      emailError: "",
      passwordError: "",
      phoneError: "",
      confirmPasswordError: "",
      addressError: "",
      error: false,
      errorMessage: "",
      successMessage: null,

      types: [
        { value: "individual", label: "Individual" },
        { value: "firm", label: "Firm" },
        { value: "group", label: "Group(NGO)" }
      ],
      submit: false,
      prestine: true,

      loading: true
    };

    this.documentService = new DocumentService();
    this.advertiserService = new AdvertiserService();
  }

  componentDidMount() {
    this.retrieveDocuments();
    window.scrollTo(0, 0);
  }

  retrieveDocuments = () => {
    const { doLoad, doLoadFinish } = this.props;
    doLoad();
    this.documentService.fetch("advertiser", errorMessage => this.setState({ errorMessage }), documents => this.setState({ documents }))
      .finally(() => {
        doLoadFinish();
        this.setState({ loading: false });
      });
  };

  handleClickShowPassword = (e) => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  isInvalid = () => {
    return this.state.prestine || !!this.state.nameError || !!this.state.emailError || !!this.state.addressError || !!this.state.passwordError || !!this.state.confirmPasswordError
      || !!this.state.phoneError || this.state.signature === undefined || this.state.type === undefined || !this.validateDocument();
  };

  submit = (e) => {
    if (this.isInvalid()) {
      this.setState({ errorMessage: "Please enter all the required fields" });
      return;
    }
    this.setState({ submit: true });
    this.insertData();
  };

  validateDocument = () => {
    const { documents, documentsUpload } = this.state;
    let docCount = 0;
    let uploadCount = 0;
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].mandatory)
        docCount++;
    }
    for (let i = 0; i < documentsUpload.length; i++) {
      if (documentsUpload[i].mandatory)
        uploadCount++;
    }
    return uploadCount === docCount;
  };

  insertData() {
    const { history } = this.props;
    this.advertiserService.create(this.state, errorMessage => this.setState({ errorMessage }),
      successMessage => {
        this.setState({
          successMessage: (
            <SweetAlert
              success
              style={{ display: "block", marginTop: "-100px" }}
              title={"Success"}
              onConfirm={() => history.push(HOME)}
            >
              {successMessage}
            </SweetAlert>
          )
        });
      })
      .finally(() => this.setState({ submit: false }));
  }

  clear = () => {
    window.location.reload();
  };

  saveDraft = () => {
  };

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

  handleSelectBlur = (id, e) => {
    if (id === "type") {
      this.state.type === undefined ? this.setState({ typeError: "Type of applicant is required" }) : this.setState({ typeError: "" });
    }
  };

  handleOfficeSelect = (identifier, value) => {
    this.setState({
      [identifier]: value
    });
  };

  handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        !Validators.EMAIL_REGEX.test(value) ? this.setState({ emailError: AdvertiserViewModel.INVALID_EMAIL }) :
          this.setState({ emailError: "" });
        break;
      case "password":
        value.length < 6 ? this.setState({ passwordError: AdvertiserViewModel.MIN_PASSWORD }) : this.setState({ passwordError: "" });
        break;
      case "confirmPassword":
        value !== this.state.password ? this.setState({ confirmPasswordError: AdvertiserViewModel.MATCH_PASSWORD }) : this.setState({ confirmPasswordError: "" });
        break;
      case "phone":
        !Validators.PHONE_REGEX.test(value) ? this.setState({ phoneError: "Phone number must be 10 digit number" }) : this.setState({ phoneError: "" });
        break;
      default:
        break;
    }
    this.setState({
      [e.target.name]: e.target.value
    });
    this.setState({ prestine: false });
  };

  openDialog = () => {
    this.setState({ openDialog: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {
          this.state.loading ? <LoadingView/> :
            <GridContainer visbility="false" justify="flex-start">
              <GridItem xs={12} sm={12} md={10}>
                <Card>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Typography variant={"h5"}>{AdvertiserViewModel.TITLE}</Typography>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Divider style={{ marginBottom: 10, marginTop: 10 }}/>
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <OfficeSelect value={this.state.type}
                                      label={"Type of applicant"}
                                      name={"type"}
                                      variant={"outlined"}
                                      margin={"dense"}
                                      required={true}
                                      fullWidth={true}
                                      helperText={this.state.typeError}
                                      error={Boolean(this.state.typeError)}
                                      onBlur={this.handleSelectBlur.bind(this, "type")}
                                      onChange={this.handleOfficeSelect.bind(this, "type")}
                                      options={this.state.types}/>
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                                  {this.state.showPassword ? <VisibilityOn/> : <VisibilityOff/>}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          label={AdvertiserViewModel.PASSWORD}
                          onBlur={this.handleRequired.bind(this)}
                          onChange={this.handleChange.bind(this)}
                          placeholder={"Password"}
                        />
                      </GridItem>
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
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
                                  {this.state.showPassword ? <VisibilityOn/> : <VisibilityOff/>}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          margin={"dense"}
                          required={true}
                          fullWidth={true}
                          variant={"outlined"}
                          label={AdvertiserViewModel.CONFIRM_PASSWORD}
                          onBlur={this.handleRequired.bind(this)}
                          onChange={this.handleChange.bind(this)}
                          placeholder={"Confirm password"}
                        />
                      </GridItem>

                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <AddressField
                          textFieldProps={{
                            placeholder: "Address",
                            value: this.state.address,
                            onChange: this.handleChange.bind(this),
                            onBlur: this.handleRequired.bind(this),
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
                      <GridItem className={classes.root} xs={12} sm={12} md={6}>
                        <FileUpload applicationName={APPLICATION_NAME.ADVERTISER}
                                    document={{ id: 40, name: "Signature of Applicant", mime: "image/*", mandatory: 1 }}
                                    onUploadSuccess={(data) => {
                                      let temp = {
                                        document_id: 1,
                                        name: "signature",
                                        path: data.location
                                      };
                                      this.setState({ signature: temp });
                                    }} onUploadFailure={(data) => {
                          console.log(data);
                        }}/>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Typography style={{ marginTop: 10, marginBottom: 10 }} variant={"h5"}>
                          Upload Document(s)
                        </Typography>
                      </GridItem>

                      {this.state.documents.map((doc, index) =>
                        <GridItem key={index} className={classes.root} xs={12} sm={12} md={6}>
                          <FileUpload document={doc}
                                      onUploadSuccess={(data) => {
                                        let temp = {
                                          mandatory: doc.mandatory,
                                          document_id: doc.id,
                                          name: doc.name,
                                          path: data.location
                                        };
                                        this.setState(state => {
                                          state.documentsUpload.push(temp);
                                        });
                                      }}
                                      onUploadFailure={(err) => console.log(err)}
                                      applicationName={APPLICATION_NAME.ADVERTISER}/>
                        </GridItem>
                      )}
                      <GridItem xs={12} sm={12} md={12}>
                        <FormControlLabel control={
                          <Checkbox color={"primary"}
                                    onChange={(val, checked) => this.setState({ agree: checked })}/>
                        }
                                          label={AdvertiserViewModel.ACKNOWLEDGEMENT}/>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Divider style={{ marginTop: 10 }}/>
                      </GridItem>
                    </GridContainer>
                  </CardContent>
                  <CardActions>
                    <GridContainer justify={"flex-end"}>
                      <GridItem>
                        <Button name={"submit"} disabled={!this.state.agree}
                                onClick={this.submit.bind(this)}
                                variant={"outlined"} color={"primary"}> Submit</Button>
                        {"\u00A0 "}
                        {/*{"\u00A0 "}*/}
                        {/*<Button name={"draft"} onClick={this.saveDraft.bind(this)} variant={"outlined"}*/}
                        {/*        color={"primary"}> Save as draft</Button>*/}
                        {"\u00A0 "}
                        {"\u00A0 "}
                        <Button name={"cancel"} onClick={this.clear.bind(this)} variant={"outlined"}
                                color={"secondary"}> Reset</Button>
                      </GridItem>
                    </GridContainer>
                  </CardActions>
                </Card>
              </GridItem>
              {this.state.successMessage}
              <OfficeSnackbar variant={"error"} open={!!this.state.errorMessage}
                              onClose={(e) => this.setState({ errorMessage: "" })}
                              message={this.state.errorMessage}/>
              <SubmitDialog open={this.state.submit} text={"Your application is submitting ... "}/>
            </GridContainer>
        }
      </>

    );
  }
}

export default withStyles(style)(AdvertiserApplication);