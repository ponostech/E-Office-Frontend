import React from "react";
import Grid from "@material-ui/core/Grid";
import {Route} from "react-router-dom";
import * as OfficeRoutes from "../config/routes-constant/OfficeRoutes";

import OfficePageHeader from "../components/Header/OfficePageHeader";
import NewReceipt from "../views/e-office/receipt/NewReceipt";
import NewFile from "../views/e-office/files/NewFile";
import Detail from "../views/e-office/receipt/Detail";
import CreatedReceipt from "../views/e-office/receipt/CreatedReceipt";
import SentReceipt from "../views/e-office/receipt/SentReceipt";
import BannerApplications from "../views/e-office/applications/banners/BannerApplications";
import KioskApplications from "../views/e-office/applications/kiosk/KioskApplications";
import ShopLicenseApplications from "../views/e-office/applications/shop-license/ShopLicenseApplications";
import HoardingApplications from "../views/e-office/applications/hoarding/HoardingApplications";
import Settings from "../views/e-office/settings/Setting";
import FileDetail from "../views/e-office/files/details/FileDetail";
import CreatedFiles from "../views/e-office/files/CreatedFiles";
import SentFiles from "../views/e-office/files/SentFiles";
import HoardingDetails from "../views/e-office/applications/hoarding/HoardingDetails";
import AdvertiserDetails from "../views/e-office/applications/advertisers/AdvertiserDetails";
import DeskView from "../views/e-office/desk/DeskView";
import AdvertiserApplications from "../views/e-office/applications/advertisers/AdvertiserApplications";
import CreateTrade from "../views/e-office/admin/NewTrade";


import officeStyle from "../assets/jss/material-dashboard-pro-react/layouts/officeStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import StaffRegistrationForm from "../views/staff/StaffRegistrationForm";

const officeDashboard = (props) => (
    <Grid container justify={"center"}>
        <Grid item xs={12} sm={12} md={12}>
            <OfficePageHeader color={"primary"}/>
        </Grid>
        <Grid item style={{marginTop: 70,minHeight:'100vh', background: 'white'}} xs={12} sm={12} md={12}>
            <Route exact path={OfficeRoutes.DESK} component={DeskView}/>

            <Route exact path={OfficeRoutes.NEW_RECEIPT} component={NewReceipt}/>
            <Route exact path={OfficeRoutes.RECEIPT_DETAIL} component={Detail}/>
            <Route exact path={OfficeRoutes.CREATED_RECEIPT} component={CreatedReceipt}/>
            <Route exact path={OfficeRoutes.SENT_RECEIPT} component={SentReceipt}/>

            <Route exact path={OfficeRoutes.NEW_FILE} component={NewFile}/>
            <Route path={OfficeRoutes.FILE_DETAIL} component={FileDetail}/>
            <Route exact path={OfficeRoutes.CREATED_FILES} component={CreatedFiles}/>
            <Route exact path={OfficeRoutes.SENT_FILE} component={SentFiles}/>

            <Route exact path={OfficeRoutes.OBPAS} component={NewFile}/>
            <Route exact path={OfficeRoutes.NEW_TRADE} component={CreateTrade}/>
            <Route exact path={OfficeRoutes.HOARDINGS} component={HoardingApplications}/>
            <Route exact path={OfficeRoutes.HOARDING_DETAILS} component={HoardingDetails}/>
            <Route exact path={OfficeRoutes.BANNERS} component={BannerApplications}/>
            <Route exact path={OfficeRoutes.KIOSKS} component={KioskApplications}/>
            <Route exact path={OfficeRoutes.SHOP_LICENSES} component={ShopLicenseApplications}/>

            <Route exact path={OfficeRoutes.ADVERTISERS} component={AdvertiserApplications}/>
            <Route exact path={OfficeRoutes.ADVERTISER_DETAIL} component={AdvertiserDetails}/>

            <Route exact path={OfficeRoutes.STAFF_REGISTRATION} component={StaffRegistrationForm}/>
            <Route path={OfficeRoutes.SETTING} component={Settings}/>
        </Grid>
    </Grid>
);

export default withStyles(officeStyle)(officeDashboard);