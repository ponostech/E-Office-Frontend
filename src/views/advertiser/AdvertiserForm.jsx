import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
  TextField
} from "@material-ui/core";
import AdvertiserViewModel from "../model/AdvertiserViewModel";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VisibilityOn from "@material-ui/icons/Visibility";
import { Validators } from "../../utils/Validators";
import axios from "axios";
import { ApiRoutes } from "../../config/ApiRoutes";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import SubmitDialog from "../../components/SubmitDialog";
import DocumentS3 from "../../components/DocumentS3";

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
      signature: null,

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

      documents: [
        { id: 1, name: "EPIC", type: "image/*" },
        { id: 2, name: "DATA", type: "application/pdf" }
      ]
    };
    this.docRef = React.createRef();

  }

  componentDidMount() {
    // const route = `http://localhost:8000/api/v1/documents/advertiser`;
    // console.log(route);
    // axios.get(route)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  componentWillMount() {


  }

  handleSignature = (e) => {
    const { files } = e.target;
    let item = files[0];
    this.setState({
      signature: item
    });
  };

  handleClickShowPassword = (e) => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  isValid = () => {
    if (this.state.name.length === 0) {
      return false;
    }
    if (this.state.email.length === 0 || !Validators.EMAIL_REGEX.test(this.state.email)) {
      return false;
    }
    if (this.state.phone.length === 0 || Validators.PHONE_REGEX.test(this.state.phone)) {
      return false;
    }
    if (this.state.password.length === 0 || this.state.password.length < 7) {
      return false;
    }
    if (!this.state.type) {
      return false;
    }
    return this.state.signature != null;
  };


  handleClick = (e) => {
    const { name } = e.target;
    let data = {};
    // if (!this.isValid) {
    //   this.setState({errorMessage:'There is still an error'})
    //   return
    // }
    let documents = this.docRef.getUploadDocuments();
    this.setState({ submit: true });
    switch (name) {
      case "submit":
        axios.post(ApiRoutes.CREATE_ADVERTISER, data)
          .then(res => {

          })
          .catch(err => {

          })
          .then(() => {
            this.setState({ submit: false });
          });
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
  openDialog = () => {
    this.setState({ openDialog: true });
  };

  render() {
    var self = this;
    return (
      <GridContainer direction="row-reverse"
                     justify="center"
                     alignItems="flex-start">
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader title={"Form of Application for registered Advertiser"}/>
            <CardContent>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
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

                </GridItem>

                <GridItem xs={12} sm={12} md={6}>

                  {/*<DocumentUpload documents={this.state.documents} ref={this.docRef}/>*/}
                  <DocumentS3 ref={this.refs.docRef} documents={this.state.documents}/>
                  {/*<AdvertiserDocument ref={this.refs.docRef}/>*/}
                  <TextField
                    required={true}
                    name={"signature"}
                    variant={"outlined"}
                    margin={"dense"}
                    label={"Signature"}
                    value={this.state.signature ? this.state.signature.name : null}
                    fullWidth={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={"end"}>
                          <input
                            style={{ display: "none" }}
                            id="signature-id"
                            name={"signature"}
                            type={"file"}
                            onChange={self.handleSignature.bind(this)}
                          />
                          <label htmlFor={"signature-id"}>
                            <Button size={"small"} variant="outlined" component="span">
                              Upload
                            </Button>
                          </label>
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControlLabel control={
                    <Checkbox color={"primary"} onChange={(val, checked) => this.setState({ agree: checked })}/>
                  }
                                    label={"I hereby pledge that i will abide the AMC Display of Advertisement and Hoadring Regulations 2013," +
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
        <OfficeSnackbar variant={"success"} open={this.state.success} onClose={(e) => this.setState({ success: false })}
                        message={"Your application is submitted"}/>
        <OfficeSnackbar variant={"error"} open={!!this.state.error} onClose={(e) => this.setState({ error: false })}
                        message={this.state.error}/>
        <SubmitDialog open={this.state.submit} text={"Your application is submitting ... "}/>
      </GridContainer>
    );
  }
}

export default AdvertiserForm;