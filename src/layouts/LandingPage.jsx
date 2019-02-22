import React, { Component } from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import HomePage from "../views/landing-pages/HomePage";
import ShoppingLicenseForm from "../views/landing-pages/ShoppingLicenseForm";
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import { AmcRoutes } from "../config/routes-constant/AmcRoutes";
import HoardingApplicationForm from "../views/hoarding/HoardingApplicationForm";

class LandingPage extends Component {

  handleLogin = (e) => {
    const { history } = this.props;
    history.push(AmcRoutes.LOGIN);
  };

  render() {
    return (
      <GridContainer spacing={16} justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <AppBar position={"fixed"} color={"default"}>
            <Toolbar title={"AMC"} variant={"regular"}>
              <GridContainer justify={"space-between"} direction={"row"}>
                <Typography variant={"title"} color={"textPrimary"}>AMC</Typography>

                <Button variant={"text"} color={"primary"} onClick={this.handleLogin.bind(this)}>Login</Button>
              </GridContainer>
            </Toolbar>
          </AppBar>
        </GridItem>
        <GridItem style={{ marginTop: 90 }} xs={12} sm={12} md={10}>

          <GridContainer justify={"center"}>

            <Route exact={true} path={AmcRoutes.HOME} component={HomePage}/>
            <Route exact={true} path={AmcRoutes.APPLY_SHOP_LICENSE} component={ShoppingLicenseForm}/>
            <Route exact={true} path={AmcRoutes.SHOP_LICENSE_DETAIL} component={ShoppingLicenseForm}/>
            <Route exact={true} path={AmcRoutes.RENEW_SHOP_LICENSE} component={ShoppingLicenseForm}/>

            <Route exact={true} path={AmcRoutes.PROPOSED_HOARDING} component={HoardingApplicationForm}/>
            <Route exact={true} path={AmcRoutes.RENEW_HOARDING} component={ShoppingLicenseForm}/>
            <Route exact={true} path={AmcRoutes.APPLY_HOARDING} component={ShoppingLicenseForm}/>

            <Route exact={true} path={AmcRoutes.PROPOSED_KIOSK} component={ShoppingLicenseForm}/>
            <Route exact={true} path={AmcRoutes.NEW_KIOSK} component={ShoppingLicenseForm}/>
            <Route exact={true} path={AmcRoutes.KIOSK_DETAIL} component={ShoppingLicenseForm}/>
            <Route exact={true} path={AmcRoutes.RENEW_KIOSK} component={ShoppingLicenseForm}/>

            <Route exact={true} path={AmcRoutes.APPLY_ADVERTISER} component={ShoppingLicenseForm}/>
            <Route exact={true} path={AmcRoutes.ADVERTISER_DETAIL} component={ShoppingLicenseForm}/>
            <Route exact={true} path={AmcRoutes.RENEW_ADVERTISER} component={ShoppingLicenseForm}/>

            <Redirect from={AmcRoutes.ROOT} to={AmcRoutes.HOME}/>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

export default LandingPage;
