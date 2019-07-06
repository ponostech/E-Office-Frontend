import React, {Component} from "reactn";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {Button, Divider, IconButton, InputAdornment, TextField, Typography} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {withRouter} from "react-router-dom";
import Card from "../../components/Card/Card";
import withStyles from "@material-ui/core/es/styles/withStyles";
import EmailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import {Validators} from "../../utils/Validators";
import {authContext} from "../../context/AuthContext";
import {LoginService} from "../../services/LoginService";
import {FORGOT_PASSWORD} from "../../config/routes-constant/OfficeRoutes";

const style = {
  root: {
    padding: "10px 15px !important"
  }
};

class LoginView extends Component {
  loginService = new LoginService();

  state = {
    email: "",
    password: "",
    showPassword: true,
    emailError: "",
    passwordError: "",
    prestine: true,
    submit: false,
    errorMessage: ""
  };

  componentDidMount() {
    this.setGlobal({loading: false})
  }

  handleRequired = (e) => {
    const {name, value} = e.target;

    if (name === "email") {
      if (value.match(/^\d/)) {
        !value.match(Validators.PHONE_REGEX) ? this.setState({emailError: "Phone number must be 10 digit number"}) : this.setState({emailError: ""});
      } else {
        if (value.length === 0) {
          this.setState({emailError: "Email/Phone No is required"})
        } else if (!value.match(Validators.EMAIL_REGEX)) {
          this.setState({emailError: "Invalid Email address"})
        } else {
          this.setState({emailError: ""})
        }
      }
    } else if (name === "password") {
      value.length === 0 ? this.setState({passwordError: "Password is required"}) : this.setState({passwordError: ""});
    }
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
      prestine: false
    });

    if (name === "email") {
      if (value.match(/^\d/)) {
        !value.match(Validators.PHONE_REGEX) ? this.setState({emailError: "Phone number must be 10 digit number"}) : this.setState({emailError: ""});
      } else {
        !value.match(Validators.EMAIL_REGEX) ? this.setState({emailError: "Invalid email"}) : this.setState({emailError: ""});
      }
    } else if (name === "password") {
      value.length === 0 ? this.setState({passwordError: "Password is required"}) : this.setState({passwordError: ""});
    }
  };

  handleKey = (e) => {
    if (e.key === "Enter") this.doLogin(e);
  }

  handleForgot = (e) => this.props.history.push(FORGOT_PASSWORD)

  doLogin = (setUser, e) => {
    const invalid = Boolean(this.state.emailError) || Boolean(this.state.passwordError);
    const {email, password} = this.state;

    if (invalid || this.state.prestine) {
      this.setState({errorMessage: "Email and Password fields are required"});
      return;
    }

    this.setState({submit: true});
    this.loginService.login({email, password}, errorMsg => this.setGlobal({errorMsg}),
        res => {
          const {access_token, redirect_url} = res.data;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("current_user", JSON.stringify(res.data.data.user));
          window.location.replace(redirect_url);
        })
        .finally(() => this.setState({submit: false}));
  };
  handleShowPassword = (e) => {
    this.setState({showPassword: !this.state.showPassword});
  };

  render() {
    const {classes} = this.props;
    return (
        <GridContainer justify={"center"}>
          <GridItem style={{marginTop: 80}} xs={12} sm={12} md={4}>
            <Card style={{padding: "40px 20px"}} raised={true} blog={true}>
              <GridContainer justify={"center"}>
                <Typography variant={"h5"}>Login</Typography>
                <Divider style={{marginTop: 10, marginBottom: 10}}/>
                <GridItem className={classes.root} xs={12} sm={12} ms={12}>
                  <TextField placeholder={"Email or Phone Number"}
                             value={this.state.email}
                             onChange={this.handleChange.bind(this)}
                             name={"email"}
                             variant={"outlined"}
                             onBlur={this.handleRequired.bind(this)}
                             error={Boolean(this.state.emailError)}
                             helperText={this.state.emailError}
                             margin={"dense"}
                             fullWidth={true}
                             InputProps={{
                               startAdornment: (
                                   <InputAdornment position={"start"}>
                                     <EmailIcon color={"action"}/>
                                   </InputAdornment>
                               )
                             }}
                  />
                </GridItem>
                <GridItem className={classes.root} xs={12} sm={12} md={12}>
                  <TextField
                      placeholder={"Password"}
                      value={this.state.password}
                      onChange={this.handleChange.bind(this)}
                      onKeyPress={this.handleKey.bind(this)}
                      onBlur={this.handleRequired.bind(this)}
                      error={Boolean(this.state.passwordError)}
                      helperText={this.state.passwordError}
                      type={this.state.showPassword ? "password" : "text"}
                      name={"password"}
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position={"start"}>
                              <LockIcon color={"Action"}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position={"end"}>
                              <IconButton tabIndex={-1} onClick={this.handleShowPassword.bind(this)}>
                                {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                              </IconButton>
                            </InputAdornment>
                        )
                      }}
                      variant={"outlined"} margin={"dense"} fullWidth={true}/>
                </GridItem>
              </GridContainer>
              <GridItem className={classes.root} xs={12} sm={12} md={12}>
                <Button disabled={this.state.submit} onClick={this.doLogin.bind(this)} size={"large"}
                        color={"primary"}
                        fullWidth={true} variant={"outlined"}>Login</Button>
              </GridItem>
              <Divider style={{marginTop: 10, marginBottom: 10}}/>
              <GridContainer justify={"center"}>
                <Button onClick={this.handleForgot.bind(this)} variant={"text"} color={"primary"}>Forgot
                  password?</Button>
              </GridContainer>
            </Card>

          </GridItem>
          <OfficeSnackbar variant={"error"} onClose={() => {
            this.setState({errorMessage: ""});
          }} message={this.state.errorMessage} open={Boolean(this.state.errorMessage)}/>
        </GridContainer>
    );
  }
}

LoginView.contextType = authContext;

export default withStyles(style)(withRouter(LoginView));
