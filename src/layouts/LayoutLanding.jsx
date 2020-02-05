import React from "reactn";
import { Route, Switch } from "react-router-dom";

import * as OfficeRoutes from "../config/routes-constant/OfficeRoutes";
import {
  ADVERTISER_DASHBOARD,
  DESK,
  E_OFFICE
} from "../config/routes-constant/OfficeRoutes";
import withStyles from "@material-ui/core/es/styles/withStyles";
import pagesStyle from "../assets/jss/material-dashboard-pro-react/layouts/pagesStyle";

import AuthNavbar from "../components/Navbars/AuthNavbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import HomePage from "../views/landing-pages/HomePage";
import ShopApplication from "../views/shop/ShopApplication";
import BannerApplicationForm from "../views/banner/BannerApplication";
import AdvertiserLogin from "../views/common/LoginView";
import AdvertiserApplication from "../views/advertiser/AdvertiserApplication";
import HotelApplication from "../views/hotel/HotelApplication";
import { LoginService } from "../services/LoginService";
import ForgotPassword from "../views/common/ForgotPassword";
import GrievanceCreate from "../views/grievance/GrievanceCreate";
import ErrorHandler, { SuccessHandler } from "../views/common/StatusHandler";
import ApplicantLayout from "../views/landing-pages/ApplicantLayout";
import { Container, Drawer, Hidden } from "@material-ui/core";
import MobileMenu from "./MobileMenu";
import Sent from "../views/e-office/files/details/Views/Sent";

class LayoutLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMobile: false
    };
    if (LoginService.hasRole("administrator"))
      window.location.replace(E_OFFICE);
    else if (LoginService.isStaff()) window.location.replace(DESK);
    else if (LoginService.isAdvertiser())
      window.location.replace(ADVERTISER_DASHBOARD);
    else if (LoginService.hasRole("commissioner"))
      window.location.replace(E_OFFICE);
    else if (LoginService.hasRole("secretary"))
      window.location.replace(E_OFFICE);
    // else window.location.replace(HOME)
  }

  toggleDrawer = () => {
    const { openMobile } = this.state;
    this.setState({ openMobile: !openMobile });
  };

  render() {
    const { classes, history, ...rest } = this.props;
    const { openMobile } = this.state;
    return (
      <Container maxWidth={false}>
        <header className={classes.header}>
          <AuthNavbar
            onMenuClick={this.toggleDrawer}
            color={"primary"}
            brandText="AIZAWL MUNICIPAL CORPORATION"
            OfficeRoutes={OfficeRoutes}
            {...rest}
          />
        </header>
        <main className={classes.main}>
          <Drawer
            className={classes.drawer}
            anchor="right"
            open={openMobile}
            onClose={this.toggleDrawer}
          >
            <MobileMenu history={history} toggleDrawer={this.toggleDrawer} />
          </Drawer>
          <Switch>
            <Route exact={true} path={OfficeRoutes.ROOT} component={HomePage} />
            <Route
              exact={true}
              path={OfficeRoutes.FORGOT_PASSWORD}
              component={ForgotPassword}
            />
            <Route
              exact={true}
              path={OfficeRoutes.APPLY_HOTEL_LICENSE}
              component={HotelApplication}
            />
            <Route
              exact={true}
              path={OfficeRoutes.APPLY_SHOP_LICENSE}
              component={ShopApplication}
            />
            <Route
              exact={true}
              path={OfficeRoutes.APPLY_ADVERTISER}
              component={AdvertiserApplication}
            />

            <Route
              exact={true}
              path={OfficeRoutes.ADVERTISER_LOGIN}
              component={AdvertiserLogin}
            />

            <Route
              exact={true}
              path={OfficeRoutes.CHECK_LICENSE}
              component={ApplicantLayout}
            />

            {/*<Route exact={true} path={OfficeRoutes.CHECK_LICENSE} component={CheckLicense}/>*/}
            {/*<Route exact={true} path={OfficeRoutes.SEARCH_LICENSE(":mobile_no", "shop")} component={ShopLicenseList}/>*/}
            {/*<Route exact={true} path={OfficeRoutes.SEARCH_LICENSE(":mobile_no", "hotel")}*/}
            {/*       component={HotelLicenseList}/>*/}
            {/*<Route exact={true} path={OfficeRoutes.SEARCH_LICENSE(":mobile_no", "banner")} component={BannerList}/>*/}

            {/*<Route exact={true} path={OfficeRoutes.APPLICANT_DASHBOARD(":mobile_no")} component={ApplicantDashboard}/>*/}

            <Route
              exact={true}
              path={OfficeRoutes.APPLY_BANNER}
              component={BannerApplicationForm}
            />

            <Route
              exact={true}
              path={OfficeRoutes.GRIEVANCE_CREATE}
              component={GrievanceCreate}
            />
            {/*<Route exact={true} path={OfficeRoutes.EXPIRED_SHOP_LICENSE_CHECK} component={ExpiredShopLicenseCheck}/>*/}

            <Route
              exact={true}
              path={OfficeRoutes.RESUBMIT_SHOP_LICENSE_APPLICATION(":id")}
              component={GrievanceCreate}
            />
            <Route exact={true} component={Sent} path={"/test"} />
          </Switch>

          {this.global.errorMsg && <ErrorHandler />}
          {this.global.successMsg && <SuccessHandler />}
        </main>
        <footer className={classes.footer}>
          <Hidden only={["sm", "xs"]}>
            <Footer />
          </Hidden>
        </footer>
      </Container>
    );
  }
}

export default withStyles(pagesStyle)(LayoutLanding);
