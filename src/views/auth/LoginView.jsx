import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import Email from "@material-ui/icons/Email";

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Button, Card, CardContent, CardHeader, Divider, TextField } from "@material-ui/core";
import LoginViewModel from "../model/LoginViewModel";
import { OfficeRoutes } from "../../config/routes-constant/OfficeRoutes";


class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      emailError:"",
      passwordError:"",
    };
  }

  validate=()=>{
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLogin = (event) => {
    const { history } = this.props;
    //TODO:: Check user role and then go to that routes

    if (this.validate()) {
      history.push("/applicant");

    }
  };

  handleForgot = (event) => {
    const { history } = this.props;
    history.push(OfficeRoutes.RESET_PASSWORD);
  };

  handleRegister = (event) => {
    const { history } = this.props;
    history.push("/register");
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader title={LoginViewModel.TITLE}/>
            <CardContent>
              <TextField
                error={Boolean(this.state.emailError)}
                helperText={this.state.emailError}
                label={LoginViewModel.EMAIL}
                name={"email"}
                variant={"outlined"}
                type={"email"}
                margin={"normal"}
                fullWidth={true}
                onChange={this.onChange.bind(this)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start">
                      <Email/>
                    </InputAdornment>
                  ),
                  placeholder: "Email"
                }}
              />
              <TextField
                error={Boolean(this.state.passwordError)}
                helperText={this.state.passwordError}
                label={LoginViewModel.PASSWORD}
                name={"password"}
                variant={"outlined"}
                type={"password"}
                margin={"normal"}
                fullWidth={true}
                onChange={this.onChange.bind(this)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start">
                      <LockIcon/>
                    </InputAdornment>
                  ),
                  placeholder: "Password"
                }}
              />
              <Button variant={"outlined"}
                      fullWidth={true} color="primary"
                      onClick={this.handleLogin.bind(this)}>
                Login
              </Button>
              <Divider style={{ marginTop: 8, marginBottom: 8 }}/>
              <Button color={"primary"} variant={"text"} fullWidth={true}
                      onClick={this.handleForgot.bind(this)}>Forgot
                password?</Button>
              <Button color={"primary"} variant={"text"} fullWidth={true}
                      onClick={this.handleRegister.bind(this)}>Create an
                account?</Button>
            </CardContent>

          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (LoginView);
