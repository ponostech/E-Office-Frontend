import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import AuthNavbar from "../components/Navbars/AuthNavbar.jsx";

import Footer from "../components/Footer/Footer.jsx";

import pagesStyle from "../assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import HomePage from "../views/landing-pages/HomePage";
import HoardingApplicationForm from "../views/hoarding/HoardingApplicationForm";
import ShopLicenseForm from "../views/shop/ShopLicenseApplicationForm";
import StaffRegistrationForm from "../views/staff/StaffRegistrationForm";
import StaffList from "../views/staff/StaffList";
import Form from "../views/Form";

import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import AdvertiserForm from "../views/advertiser/AdvertiserForm";
import LoginView from "../views/auth/LoginView";
import HoardingList from "../views/hoarding/HoardingList";

class LandingPage extends Component {

  handleLogin = (e) => {
    const { history } = this.props;
    history.push(OfficeRoutes.LOGIN);
  };

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <AuthNavbar brandText="" OfficeRoutes={OfficeRoutes} {...rest} />
        <div className={classes.wrapper} ref="wrapper">
          <div
            className={classes.fullPage}
          >
            <div className={classes.container}>
              <Switch>
                <Route exact={true} path={OfficeRoutes.HOME} component={HomePage}/>
                <Route exact={true} path={OfficeRoutes.APPLY_SHOP_LICENSE} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.SHOP_LICENSE_DETAIL} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.RENEW_SHOP_LICENSE} component={ShopLicenseForm}/>

                <Route exact={true} path={OfficeRoutes.PROPOSED_HOARDING} component={HoardingApplicationForm}/>
                <Route exact={true} path={OfficeRoutes.HOARDING_LIST} component={HoardingList}/>

                <Route exact={true} path={OfficeRoutes.PROPOSED_KIOSK} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.NEW_KIOSK} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.KIOSK_DETAIL} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.RENEW_KIOSK} component={ShopLicenseForm}/>

                <Route exact={true} path={OfficeRoutes.APPLY_ADVERTISER} component={AdvertiserForm}/>
                <Route exact={true} path={OfficeRoutes.ADVERTISER_DETAIL} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.RENEW_ADVERTISER} component={ShopLicenseForm}/>

                <Route exact={true} path={OfficeRoutes.NEW_STAFF} component={StaffRegistrationForm}/>
                <Route exact={true} path={OfficeRoutes.LIST_STAFF} component={StaffList}/>

                <Route exact={true} path={OfficeRoutes.FORM} component={Form}/>
                <Route exact={true} path={OfficeRoutes.LOGIN} component={LoginView}/>
              </Switch>
              <Footer white/>
            </div>
          </div>

        </div>
        {/*<GridContainer spacing={16} justify={"center"}>
                    <GridItem xs={12} sm={12} md={12}>
                        <AppBar position={"fixed"} color={"default"}>
                            <Toolbar title={"AMC"} variant={"regular"}>
                                <GridContainer justify={"space-between"} direction={"row"}>
                                    <Typography variant={"title"} color={"textPrimary"}>AMC</Typography>

                                    <Button variant={"text"} color={"primary"}
                                            onClick={this.handleLogin.bind(this)}>Login</Button>
                                </GridContainer>
                            </Toolbar>
                        </AppBar>
                    </GridItem>
                    <GridItem style={{marginTop: 90}} xs={12} sm={12} md={10}>
                        <GridContainer justify={"center"}>

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

                            <Route exact={true} path={OfficeRoutes.APPLY_ADVERTISER} component={AdvertiserForm}/>
                            <Route exact={true} path={OfficeRoutes.ADVERTISER_DETAIL} component={ShopLicenseForm}/>
                            <Route exact={true} path={OfficeRoutes.RENEW_ADVERTISER} component={ShopLicenseForm}/>

                            <Route exact={true} path={OfficeRoutes.NEW_STAFF} component={StaffRegistrationForm}/>
                            <Route exact={true} path={OfficeRoutes.LIST_STAFF} component={StaffList}/>

                            <Route exact={true} path={OfficeRoutes.FORM} component={Form}/>
                            <Route exact={true} path={OfficeRoutes.LOGIN} component={LoginView}/>

                        </GridContainer>
                    </GridItem>
                </GridContainer>*/}
      </div>
    );
  }
}

export default withStyles(pagesStyle)(LandingPage);
