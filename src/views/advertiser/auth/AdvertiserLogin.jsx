import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Divider, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { OfficeRoutes } from "../../../config/routes-constant/OfficeRoutes";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withRouter } from "react-router-dom";
import Card from "../../../components/Card/Card";
import withStyles from "@material-ui/core/es/styles/withStyles";

const style = {
  root: {
    padding: "10px 15px !important"
  }
};

class AdvertiserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  handleShowPassword = (e) => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { history, classes } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={4}>
          <Card style={{ padding: 60 }} raised={true} blog={true}>
            <GridContainer justify={"center"}>
              <Typography variant={"headline"}>Login as Advertiser</Typography>
              <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
              <GridItem className={classes.root} xs={12} sm={12} ms={12}>
                <TextField label={"Email"} name={"email"} variant={"outlined"} margin={"dense"} fullWidth={true}/>
              </GridItem>
              <GridItem className={classes.root} xs={12} sm={12} md={12}>
                <TextField label={"Password"}
                           type={this.state.showPassword ? "password" : "text"}
                           name={"password"}
                           InputProps={{
                             endAdornment: (
                               <InputAdornment position={"end"}>
                                 <IconButton onClick={this.handleShowPassword.bind(this)}>
                                   {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                 </IconButton>
                               </InputAdornment>
                             )
                           }}
                           variant={"outlined"} margin={"dense"} fullWidth={true}/>
              </GridItem>
            </GridContainer>
            <GridItem className={classes.root} xs={12} sm={12} md={12}>
            <Button size={"large"} color={"primary"} fullWidth={true} variant={"outlined"}>Login</Button>
            </GridItem>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
            <GridContainer justify={"center"}>
              <Button variant={"text"} color={"primary"}>Forgot password?</Button>
              <Button variant={"text"} color={"primary"} onClick={(e) => {
                history.push(OfficeRoutes.APPLY_ADVERTISER);
              }}>New Registration</Button>
            </GridContainer>
          </Card>

        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(withRouter(AdvertiserLogin));