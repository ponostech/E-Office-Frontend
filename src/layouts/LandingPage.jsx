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


class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            loading:false
        }
    }

    doLoad=()=>{
        this.setState({loading:true})
    }
    doLoadFinish=()=>{
        this.setState({loading:false})
    }
    render() {
        const {classes, ...rest} = this.props;
        return (
          <div className={classes.wrapper}>
              <AuthNavbar loading={this.state.loading} color={"primary"} brandText="AIZAWL MUNICIPAL CORP0RATION"
                          OfficeRoutes={OfficeRoutes} {...rest} />
              <div className={classes.fullPage}>
                  <div className={classes.container}>
                      <Switch>
                          <Route exact={true} path={OfficeRoutes.HOME} component={HomePage}/>

                        <Route exact={true} path={OfficeRoutes.APPLY_HOTEL_LICENSE}
                               render={()=><HotelLicenseApplicationForm doLoad={this.doLoad.bind(this)} doLoadFinish={this.doLoadFinish.bind(this)}/>}/>
                          <Route exact={true} path={OfficeRoutes.APPLY_SHOP_LICENSE}
                                 render={()=><ShopLicenseForm doLoad={this.doLoad.bind(this)} doLoadFinish={this.doLoadFinish.bind(this)}/>}/>
                          <Route exact={true} path={OfficeRoutes.RENEW_SHOP_LICENSE}
                                 component={ShopLicenseRenewalForm}/>

                          <Route exact={true} path={OfficeRoutes.ADVERTISER_LOGIN} render={()=><AdvertiserLogin setUser={this.props.setUser} currentUser={this.props.currentUser}/>}/>
                          <Route exact={true} path={OfficeRoutes.APPLY_ADVERTISER}
                                 render={(e)=>{
                                     return <AdvertiserForm doLoad={this.doLoad.bind(this)} doLoadFinish={this.doLoadFinish.bind(this)}/>
                                 }}
                                 />
                          <Route exact={true} path={OfficeRoutes.APPLY_BANNER}  render={(e)=>{
                              return <BannerApplicationForm doLoad={this.doLoad.bind(this)} doLoadFinish={this.doLoadFinish.bind(this)}/>
                          }}/>

                          <Redirect from={OfficeRoutes.ROOT} to={OfficeRoutes.HOME}/>
                      </Switch>
                  </div>
              </div>
              <Footer/>
          </div>
        );
    }

}


export default withStyles(pagesStyle)(LandingPage);
