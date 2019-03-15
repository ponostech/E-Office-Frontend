import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Divider, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { OfficeRoutes } from "../../../config/routes-constant/OfficeRoutes";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withRouter } from "react-router-dom";

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
      <div>
        <GridContainer>
          <GridItem>
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
            <Divider/>
          </GridItem>
          <GridItem md={12}>
            <Button size={"medium"} color={"primary"} fullWidth={false} variant={"outlined"}>Login</Button>
          </GridItem>
          <GridItem md={12}>
            <Divider/>
          </GridItem>
          <GridItem md={12}>
            <Button fullWidth={true} variant={"text"} color={"primary"}>Forgot password?</Button>
          </GridItem>
          <GridItem md={12}>
            <Button fullWidth={true} variant={"text"} color={"primary"} onClick={(e) => {
              history.push(OfficeRoutes.APPLY_ADVERTISER);
            }}>Registration</Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withRouter(AdvertiserLogin);