import React, { Component } from "react";
import { AppBar, Divider, Toolbar } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import HomePage from "../views/landing-pages/HomePage";
import ShoppingLicenseForm from "../views/landing-pages/ShoppingLicenseForm";
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";

class LandingPage extends Component {
  render() {
    return (
      <GridContainer spacing={16} justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <AppBar position={"fixed"} color={"default"}>
            <Toolbar variant={"dense"}> AMC</Toolbar>
          </AppBar>
        </GridItem>
        <GridItem style={{ marginTop: 70 }} xs={12} sm={12} md={10}>

          <GridContainer justify={"center"}>

            <Route exact={true} path={"/home"} component={HomePage}/>
            <Route path={"/shopping-license/apply"} component={ShoppingLicenseForm}/>
            <Redirect from={"/"} to={"/home"} />
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

export default LandingPage;
