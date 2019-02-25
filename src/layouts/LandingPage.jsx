import React, { Component } from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import HomePage from "../views/landing-pages/HomePage";
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";

import HoardingApplicationForm from "../views/hoarding/HoardingApplicationForm";
import ShopLicenseForm from "../views/shop/ShopLicenseForm";
import StaffRegistrationForm from "../views/staff/StaffRegistrationForm";
import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";

class LandingPage extends Component {

  handleLogin = (e) => {
    const { history } = this.props;
    history.push(OfficeRoutes.LOGIN);
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
            {/*<Redirect from={OfficeRoutes.ROOT} to={OfficeRoutes.HOME}/>*/}

            <Route exact={true} path={OfficeRoutes.HOME} component={HomePage}/>
            <Route exact={true} path={OfficeRoutes.APPLY_SHOP_LICENSE} component={ShopLicenseForm}/>
            <Route exact={true} path={OfficeRoutes.SHOP_LICENSE_DETAIL} component={ShopLicenseForm}/>
            <Route exact={true} path={OfficeRoutes.RENEW_SHOP_LICENSE} component={ShopLicenseForm}/>

            <Route exact={true} path={OfficeRoutes.PROPOSED_HOARDING} component={HoardingApplicationForm}/>
            <Route exact={true} path={OfficeRoutes.RENEW_HOARDING} component={ShopLicenseForm}/>
            <Route exact={true} path={OfficeRoutes.APPLY_HOARDING} component={ShopLicenseForm}/>

            <Route exact={true} path={OfficeRoutes.PROPOSED_KIOSK} component={ShopLicenseForm}/>
            <Route exact={true} path={OfficeRoutes.NEW_KIOSK} component={ShopLicenseForm}/>
            <Route exact={true} path={OfficeRoutes.KIOSK_DETAIL} component={ShopLicenseForm}/>
            <Route exact={true} path={OfficeRoutes.RENEW_KIOSK} component={ShopLicenseForm}/>

            <Route exact={true} path={OfficeRoutes.APPLY_ADVERTISER} component={ShopLicenseForm}/>
            <Route exact={true} path={OfficeRoutes.ADVERTISER_DETAIL} component={ShopLicenseForm}/>
            <Route exact={true} path={OfficeRoutes.RENEW_ADVERTISER} component={ShopLicenseForm}/>

            {/*Staff routes*/}
            <Route exact={true} path={OfficeRoutes.NEW_STAFF} component={StaffRegistrationForm}/>

          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

export default LandingPage;
