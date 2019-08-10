import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import { Button, Divider, InputAdornment, TextField, Typography } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import { LoginService } from "../../services/LoginService";
import SubmitDialog from "../../components/SubmitDialog";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { Validators } from "../../utils/Validators";


const style = {
  root: {
    padding: "10px 15px !important"
  }
};

class ForgotPassword extends Component {
  state = {
    email: null,
    submit: false,

    emailError: "",

    errorMessage: "",
    successMessage: ""
  };
  submit = (e) => {
    if (!this.state.email) {
      this.setState({errorMessage:"Email is required"})
      return
    }
    new LoginService().forgotPassword(this.state.email,
      errorMessage => {
        this.setState({ errorMessage });
      },
      successMessage => {
        this.setState({ successMessage });
      });

  };
  handleRequired=(e)=>{
    const { email } = this.state;
    if (email) {
      Validators.EMAIL_REGEX.test(email)?this.setState({emailError:""}):this.setState({emailError:"Invalid email"})
    } else {
      this.setState({emailError:"Email is required"})
    }
  }
  handleChange=(e)=>{
    const { name, value } = e.target;
    const { email} = this.state;
    this.setState({ [name]: value});
    if (email) {
      Validators.EMAIL_REGEX.test(email)?this.setState({emailError:""}):this.setState({emailError:"Invalid email"})
    } else {
      this.setState({emailError:"Email is required"})
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem style={{ marginTop: 80 }} xs={12} sm={12} md={4}>
          <Card style={{ padding: "40px 20px" }} raised={true} blog={true}>
            <GridContainer justify={"center"}>
              <Typography variant={"h5"}>RESET PASSWORD</Typography>
              <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
              <GridItem className={classes.root} xs={12} sm={12} ms={12}>
                <TextField placeholder={"Email"}
                           value={this.state.email}
                           onChange={e => this.setState({ [e.target.name]: e.target.value })}
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
            </GridContainer>
            <GridItem className={classes.root} xs={12} sm={12} md={12}>
              <Button disabled={this.state.submit || !Boolean(this.state.email)} onClick={this.submit.bind(this)}
                      size={"large"}
                      color={"primary"}
                      fullWidth={true} variant={"outlined"}>SEND RESET LINK</Button>
            </GridItem>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
          </Card>

        </GridItem>
        <SubmitDialog open={this.state.submit} text={"Resetting Password ..."} title={"RESET PASSWORD"}/>
        <OfficeSnackbar variant={"error"} onClose={() => {
          this.setState({ errorMessage: "" });
        }} message={this.state.errorMessage} open={Boolean(this.state.errorMessage)}/>

        <OfficeSnackbar variant={"success"} onClose={() => {
          this.setState({ successMessage: "" });
        }} message={this.state.successMessage} open={Boolean(this.state.successMessage)}/>
      </GridContainer>
    );
  }
}

export default withStyles(style)(ForgotPassword);