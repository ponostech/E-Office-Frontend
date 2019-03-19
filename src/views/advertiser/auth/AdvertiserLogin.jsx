import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Divider, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { OfficeRoutes } from "../../../config/routes-constant/OfficeRoutes";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withRouter } from "react-router-dom";
import Card from "../../../components/Card/Card";

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
    const { history } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={4}>
          <Card style={{ padding: 60 }} raised={true} blog={true}>
            <GridContainer justify={"center"}>
              <Typography variant={"headline"}>Login as Advertiser</Typography>
            </GridContainer>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
            <TextField label={"Email"} name={"email"} variant={"outlined"} margin={"dense"} fullWidth={true}/>
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
            {" "}
            <Button size={"large"} color={"primary"} fullWidth={true} variant={"outlined"}>Login</Button>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
            <GridContainer justify={"center"}>
              <Button variant={"text"} color={"primary"}>Forgot password?</Button>
              <Button variant={"text"} color={"primary"} onClick={(e) => {
                history.push(OfficeRoutes.APPLY_ADVERTISER);
              }}>Registration</Button>
            </GridContainer>
          </Card>

        </GridItem>
      </GridContainer>
    );
  }
}

export default withRouter(AdvertiserLogin);