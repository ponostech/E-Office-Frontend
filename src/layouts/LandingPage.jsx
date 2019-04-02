import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import * as  OfficeRoutes from "../config/routes-constant/OfficeRoutes";
import LoginView from "../views/auth/LoginView";
import withStyles from "@material-ui/core/es/styles/withStyles";
import pagesStyle from "../assets/jss/material-dashboard-pro-react/layouts/pagesStyle";

import AuthNavbar from "../components/Navbars/AuthNavbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import HomePage from "../views/landing-pages/HomePage";
import ShopLicenseForm from "../views/shop/ShopLicenseApplicationForm";
import Form from "../views/Form";
import BannerApplicationForm from "../views/banner/BannerApplicationForm";
import AdvertiserLogin from "../views/advertiser/auth/AdvertiserLogin";
import AdvertiserForm from "../views/advertiser/AdvertiserForm";
import AdvertiserRegistrationSuccess from "../views/advertiser/AdvertiserRegistrationSuccess";
import BannerApplicationSuccess from "../views/banner/BannerApplicationSuccess";
import ShopLicenseRenewalForm from "../views/shop/ShopLicenseRenewalForm";
import HotelLicenseApplicationForm from "../views/hotel/HotelLicenseApplicationForm";

const landingPage = (props) => {
    const {classes, ...rest} = props;
    return (
        <div className={classes.wrapper}>
            <AuthNavbar color={"primary"} brandText="AIZAWL MUNICIPAL CORP0RATION"
                        OfficeRoutes={OfficeRoutes} {...rest} />
            <div className={classes.fullPage}>
                <div className={classes.container}>
                    <Switch>
                        <Route exact={true} path={OfficeRoutes.HOME} component={HomePage}/>

                        <Route exact={true} path={OfficeRoutes.APPLY_HOTEL_LICENSE}
                               component={HotelLicenseApplicationForm}/>

                        <Route exact={true} path={OfficeRoutes.APPLY_SHOP_LICENSE} component={ShopLicenseForm}/>
                        <Route exact={true} path={OfficeRoutes.RENEW_SHOP_LICENSE}
                               component={ShopLicenseRenewalForm}/>

                        <Route exact={true} path={OfficeRoutes.ADVERTISER_LOGIN} component={AdvertiserLogin}/>
                        <Route exact={true} path={OfficeRoutes.APPLY_ADVERTISER} component={AdvertiserForm}/>
                        <Route exact={true} path={OfficeRoutes.ADVERTISER_REGISTRATION_SUCCESS}
                               component={AdvertiserRegistrationSuccess}/>

                        <Route exact={true} path={OfficeRoutes.APPLY_BANNER} component={BannerApplicationForm}/>
                        <Route exact={true} path={OfficeRoutes.APPLY_BANNER_SUCCESS}
                               component={BannerApplicationSuccess}/>

                        <Route exact={true} path={OfficeRoutes.FORM} component={Form}/>
                        <Route exact={true} path={OfficeRoutes.LOGIN} component={LoginView}/>

                        <Redirect from={OfficeRoutes.ROOT} to={OfficeRoutes.HOME}/>
                    </Switch>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default withStyles(pagesStyle)(landingPage);
