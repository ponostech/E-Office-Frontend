import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// @material-ui/core components
// core components
import AuthNavbar from "../components/Navbars/AuthNavbar.jsx";

import Footer from "../components/Footer/Footer.jsx";

import HomePage from "../views/landing-pages/HomePage";
import ShopLicenseForm from "../views/shop/ShopLicenseApplicationForm";
import StaffRegistrationForm from "../views/staff/StaffRegistrationForm";
import StaffList from "../views/staff/StaffList";
import Form from "../views/Form";

import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import LoginView from "../views/auth/LoginView";
import AdvertiserContainer from "../views/advertiser/AdvertiserContainer";
import BannerApplicationForm from "../views/banner/BannerApplicationForm";
import withStyles from "@material-ui/core/es/styles/withStyles";
import pagesStyle from "../assets/jss/material-dashboard-pro-react/layouts/pagesStyle";

class LandingPage extends Component {

  handleLogin = (e) => {
    const { history } = this.props;
    history.push(OfficeRoutes.LOGIN);
  };

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <AuthNavbar color={"primary"} brandText="" OfficeRoutes={OfficeRoutes} {...rest} />
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

                <Route exact={true} path={OfficeRoutes.PROPOSED_KIOSK} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.NEW_KIOSK} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.KIOSK_DETAIL} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.RENEW_KIOSK} component={ShopLicenseForm}/>

                <Route exact={true} path={OfficeRoutes.APPLY_ADVERTISER} component={AdvertiserContainer}/>
                <Route exact={true} path={OfficeRoutes.ADVERTISER_DETAIL} component={ShopLicenseForm}/>
                <Route exact={true} path={OfficeRoutes.RENEW_ADVERTISER} component={ShopLicenseForm}/>

                <Route exact={true} path={OfficeRoutes.NEW_STAFF} component={StaffRegistrationForm}/>
                <Route exact={true} path={OfficeRoutes.LIST_STAFF} component={StaffList}/>


                <Route exact={true} path={OfficeRoutes.APPLY_BANNER} component={BannerApplicationForm}/>

                <Route exact={true} path={OfficeRoutes.FORM} component={Form}/>
                <Route exact={true} path={OfficeRoutes.LOGIN} component={LoginView}/>

                <Redirect from={OfficeRoutes.ROOT} to={OfficeRoutes.HOME}/>
              </Switch>
              <Footer white/>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default withStyles(pagesStyle)(LandingPage);
