import React from "react";
import { Route, Switch } from "react-router-dom";

import * as  OfficeRoutes from "../config/routes-constant/OfficeRoutes";
import { ADVERTISER_DASHBOARD, DESK, E_OFFICE } from "../config/routes-constant/OfficeRoutes";
import withStyles from "@material-ui/core/es/styles/withStyles";
import pagesStyle from "../assets/jss/material-dashboard-pro-react/layouts/pagesStyle";

import AuthNavbar from "../components/Navbars/AuthNavbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import HomePage from "../views/landing-pages/HomePage";
import ShopApplication from "../views/shop/ShopApplication";
import BannerApplicationForm from "../views/banner/BannerApplication";
import AdvertiserLogin from "../views/common/LoginView";
import AdvertiserApplication from "../views/advertiser/AdvertiserApplication";
import ShopRenewal from "../views/shop/ShopRenewal";
import HotelApplication from "../views/hotel/HotelApplication";
import CheckLicense from "../views/landing-pages/license-checking/CheckLicense";
import { LoginService } from "../services/LoginService";
import ForgotPassword from "../views/common/ForgotPassword";
// import Form from "../views/Form";
import FormBuilderContainer from "../components/form-builder/FormBuilderContainer";
import HoardingSiteVerification from "../views/e-office/site-verification/HoardingSiteVerification";
import GrievanceCreate from '../views/grievance/GrievanceCreate';

class LayoutLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    if (LoginService.hasRole("administrator")) window.location.replace(E_OFFICE);
    else if (LoginService.isStaff()) window.location.replace(DESK);
    else if (LoginService.isAdvertiser()) window.location.replace(ADVERTISER_DASHBOARD);
    else if (LoginService.hasRole("commissioner")) window.location.replace(E_OFFICE);
    else if (LoginService.hasRole("secretary")) window.location.replace(E_OFFICE);

  }

  doLoad = () => {
    this.setState({ loading: true });
  };

  doLoadFinish = () => {
    this.setState({ loading: false });
  };

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div className={classes.wrapper}>
        <AuthNavbar loading={this.state.loading} color={"primary"} brandText="AIZAWL MUNICIPAL CORP0RATION"
                    OfficeRoutes={OfficeRoutes} {...rest} />
        <div className={classes.fullPage}>
          <div className={classes.container}>
            <Switch>
              <Route exact={true} path={OfficeRoutes.ROOT} component={HomePage}/>
              <Route exact={true} path={OfficeRoutes.FORGOT_PASSWORD} component={ForgotPassword}/>

              <Route exact={true} path={OfficeRoutes.APPLY_HOTEL_LICENSE}
                     render={() => <HotelApplication doLoad={this.doLoad.bind(this)}
                                                     doLoadFinish={this.doLoadFinish.bind(this)}/>}/>
              <Route exact={true} path={OfficeRoutes.RENEW_SHOP_LICENSE}
                     component={ShopRenewal}/>
              <Route exact={true} path={OfficeRoutes.APPLY_SHOP_LICENSE}
                     render={() => <ShopApplication doLoad={this.doLoad.bind(this)}
                                                    doLoadFinish={this.doLoadFinish.bind(this)}/>}/>
              <Route exact={true} path={OfficeRoutes.APPLY_ADVERTISER}
                     render={(e) => {
                       return <AdvertiserApplication doLoad={this.doLoad.bind(this)}
                                                     doLoadFinish={this.doLoadFinish.bind(this)}/>;
                     }}
              />
              <Route exact={true} path={OfficeRoutes.ADVERTISER_LOGIN} render={() => <AdvertiserLogin/>}/>

              <Route exact={true} path={OfficeRoutes.CHECK_LICENSE} render={() => <CheckLicense/>}/>
              <Route exact={true} path={"/test"} render={() => <FormBuilderContainer/>}/>
              <Route exact={true} path={"/hoarding"} render={() => <HoardingSiteVerification/>}/>

              <Route exact={true} path={OfficeRoutes.APPLY_BANNER} render={(e) => {
                return <BannerApplicationForm doLoad={this.doLoad.bind(this)}
                                              doLoadFinish={this.doLoadFinish.bind(this)}/>;
              }}/>

              <Route exact={true} path={OfficeRoutes.GRIEVANCE_CREATE} render={() => <GrievanceCreate/>}/>

            </Switch>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

}

export default withStyles(pagesStyle)(LayoutLanding);
