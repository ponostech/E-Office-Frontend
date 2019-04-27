import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import * as  OfficeRoutes from "../config/routes-constant/OfficeRoutes";
import withStyles from "@material-ui/core/es/styles/withStyles";
import pagesStyle from "../assets/jss/material-dashboard-pro-react/layouts/pagesStyle";

import AuthNavbar from "../components/Navbars/AuthNavbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import HomePage from "../views/landing-pages/HomePage";
import ShopApplication from "../views/shop/ShopApplication";
import BannerApplicationForm from "../views/banner/BannerApplication";
import AdvertiserLogin from "../views/advertiser/auth/AdvertiserLogin";
import AdvertiserStore from "../views/advertiser/AdvertiserStore";
import ShopRenewal from "../views/shop/ShopRenewal";
import HotelApplication from "../views/hotel/HotelApplication";

class LayoutLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    doLoad = () => {
        this.setState({loading: true})
    };

    doLoadFinish = () => {
        this.setState({loading: false})
    };

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
                                render={() => <HotelApplication doLoad={this.doLoad.bind(this)}
                                                                              doLoadFinish={this.doLoadFinish.bind(this)}/>}/>
                            <Route exact={true} path={OfficeRoutes.RENEW_SHOP_LICENSE}
                                   component={ShopRenewal}/>
                            <Route exact={true} path={OfficeRoutes.APPLY_SHOP_LICENSE}
                                render={() => <ShopApplication doLoad={this.doLoad.bind(this)}
                                                                  doLoadFinish={this.doLoadFinish.bind(this)}/>}/>
                            <Route exact={true} path={OfficeRoutes.APPLY_ADVERTISER}
                                   render={(e) => {
                                       return <AdvertiserStore doLoad={this.doLoad.bind(this)}
                                                               doLoadFinish={this.doLoadFinish.bind(this)}/>
                                   }}
                            />
                            <Route exact={true} path={OfficeRoutes.ADVERTISER_LOGIN} render={() => <AdvertiserLogin/>}/>

                            <Route exact={true} path={OfficeRoutes.APPLY_BANNER} render={(e) => {
                                return <BannerApplicationForm doLoad={this.doLoad.bind(this)}
                                                              doLoadFinish={this.doLoadFinish.bind(this)}/>
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


export default withStyles(pagesStyle)(LayoutLanding);
