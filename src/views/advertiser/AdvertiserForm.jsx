import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import AdvertiserViewModel from "../model/AdvertiserViewModel";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VisibilityOn from "@material-ui/icons/Visibility";
import { Validators } from "../../utils/Validators";
import axios from "axios";
import { ApiRoutes } from "../../config/ApiRoutes";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import SubmitDialog from "../../components/SubmitDialog";
import FileUpload from "../../components/FileUpload";
import { DocumentService } from "../../services/DocumentService";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { ErrorToString } from "../../utils/ErrorUtil";
import AddressField from "../../components/AddressField";

const style = {
  root: {
    padding: "10px 15px !important"
  }
};

class AdvertiserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "Individual",
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
      emailError: "",
      passwordError: "",
      phoneError: "",
      confirmPasswordError: "",
      addressError: "",
      types: ["Individual", "Firm", "Group(NGO)"],

      success: false,
      error: false,
      //dialog variable
      submit: false,
      errorMessage: "",

      prestine: true
    };

    this.documentService = new DocumentService();
  }

  componentDidMount() {

    this.documentService.get("advertiser")
      .then(res => {
        if (res.status) {
          const { documents } = res.data;
          this.setState({ documents });
        }
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
      });

  }

  handleClickShowPassword = (e) => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  isInvalid = () => {
    return this.state.prestine || !!this.state.nameError || !!this.state.emailError || !!this.state.addressError || !!this.state.emailError
      || !!this.state.emailError || !!this.state.passwordError
  };

  submit = () => {
    let data = {
      name: this.state.name,
      type: this.state.type,
      phone_no: this.state.phone,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      registered: 1,
      signature: this.state.signature,
      documents: this.state.documentsUpload
    };
    if (this.isInvalid()) {
      this.setState({ errorMessage: "Please enter all required fields" });
      return;
    }
    this.setState({ submit: true });
    axios.post(ApiRoutes.CREATE_ADVERTISER, data)
      .then(res => {
        console.log(res);
        if (res.data.status) {
          this.setState({
            success: true
          });
        } else {
          if (res.data.validation_error) {
            const msg=ErrorToString(res.data.messages);
            //TODO::parse validation error message
            this.setState({ errorMessage: msg});
          }else{

          }
        }

      })
      .catch(err => {
        console.log(err);
        this.setState({ errorMessage: err.toString() });
      })
      .then(() => {
        this.setState({ submit: false });
      });
  };

  handleClick = (e) => {
    const { name } = e.target;
    switch (name) {
      case "submit":
        this.submit();
        break;
      case "cancel":
        this.setState({
          name: "",
          type: "Individual",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          address: "",
          agree: false,
          showPassword: false
        });
        break;
      default:
        break;
    }
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
        !Validators.PHONE_REGEX.test(value) ? this.setState({ phoneError: AdvertiserViewModel.PHONE_ERROR }) : this.setState({ phoneError: "" });
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
    var self = this;
    const { classes } = this.props;
    return (
      <GridContainer
        justify="flex-start">
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardContent>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Typography variant={"headline"}>Form of Application for registered Advertiser</Typography>
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
                <GridItem className={classes.root} spacing={32} xs={12} sm={12} md={6}>
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
                        <OutlinedInput required={true}
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
                    name={"password"}
                    margin={"dense"}
                    required={true}
                    fullWidth={true}
                    variant={"outlined"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
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
                      value:this.state.address,
                      onChange:this.handleChange.bind(this),
                      onBlur:this.handleRequired.bind(this),
                      error:Boolean(this.state.addressError),
                      helperText:this.state.addressError,
                      margin:"dense",
                      variant:"outlined",
                      fullWidth:true,
                      name:"address",
                      required:true,
                      label:"Address"
                    }}
                    onPlaceSelect={(place)=>{console.log(place)}}/>
                </GridItem>
                <GridItem className={classes.root} xs={12} sm={12} md={6}>
                  <FileUpload required={true} document={{ id: 40, name: "Signature", mime: "image/*" }}
                              onUploadSuccess={(data) => {
                                let temp = {
                                  name: "signature",
                                  path: data.location
                                };
                                this.setState({ signature: temp });
                              }} onUploadFailure={(data) => {
                    console.log(data);
                  }}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Typography style={{ marginTop: 10, marginBottom: 10 }} variant={"headline"}>
                    Upload Documents</Typography>
                </GridItem>

                {this.state.documents.map((doc, index) =>
                  <GridItem key={index} className={classes.root} xs={12} sm={12} md={6}>

                    <FileUpload  document={doc}
                                onUploadSuccess={(data) => {
                                  let temp = {
                                    name: doc.id,
                                    path: data.location
                                  };
                                  this.setState(state => {
                                    state.documentsUpload.push(temp);
                                  });
                                }}
                                onUploadFailure={(err) => console.log(err)}/>
                  </GridItem>
                )}
                <GridItem xs={12} sm={12} md={12}>
                  <FormControlLabel control={
                    <Checkbox color={"primary"} onChange={(val, checked) => this.setState({ agree: checked })}/>
                  }
                                    label={"I hereby pledge that i will abide the AMC Display of Advertisement and Hoarding Regulations 2013," +
                                    " with specific reference of Regulation 7, Regulation 28 and Regulation 32, failing which i would be liable to get my registration / License cancelled"}/>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Divider style={{ marginTop: 10 }}/>
                </GridItem>
              </GridContainer>
            </CardContent>
            <CardActions>
              <GridContainer justify={"flex-end"}>
                <GridItem>
                  <Button name={"submit"} disabled={!this.state.agree} onClick={this.handleClick.bind(this)}
                          variant={"outlined"} color={"primary"}> Submit</Button>
                  {" "}
                  <Button name={"cancel"} onClick={this.handleClick.bind(this)} variant={"outlined"}
                          color={"secondary"}> Reset</Button>
                </GridItem>
              </GridContainer>
            </CardActions>
          </Card>

        </GridItem>
        <OfficeSnackbar variant={"success"} open={this.state.success} onClose={(e) => this.setState({ success: "" })}
                        message={"Your application is submitted"}/>;;
        <OfficeSnackbar variant={"error"} open={!!this.state.errorMessage}
                        onClose={(e) => this.setState({ errorMessage: "" })}
                        message={this.state.errorMessage}/>
        <SubmitDialog open={this.state.submit} text={"Your application is submitting ... "}/>
      </GridContainer>
    );
  }
}

export default withStyles(style)(AdvertiserForm);