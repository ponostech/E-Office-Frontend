import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import OfficePageHeader from "../components/Header/OfficePageHeader";
import { Route } from "react-router-dom";
import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import NewReceipt from "../views/e-office/receipt/NewReceipt";
import NewFile from "../views/e-office/files/NewFile";
import officeStyle from "../assets/jss/material-dashboard-pro-react/layouts/officeStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
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

class OfficeDashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <OfficePageHeader color={"primary"}/>
        </GridItem>
        <GridItem style={{ marginTop: 70 }} xs={12} sm={12} md={10}>
          <GridContainer justify={"center"}>
            <Route exact path={OfficeRoutes.DESK} component={DeskView}/>
            <Route exact path={OfficeRoutes.NEW_RECEIPT} component={NewReceipt}/>
            <Route exact path={OfficeRoutes.RECEIPT_DETAIL} component={Detail}/>
            <Route exact path={OfficeRoutes.CREATED_RECEIPT} component={CreatedReceipt}/>
            <Route exact path={OfficeRoutes.SENT_RECEIPT} component={SentReceipt}/>

            <Route exact path={OfficeRoutes.NEW_FILE} component={NewFile}/>
            <Route exact path={OfficeRoutes.FILE_DETAIL} component={FileDetail}/>
            <Route exact path={OfficeRoutes.CREATED_FILES} component={CreatedFiles}/>
            <Route exact path={OfficeRoutes.SENT_FILE} component={SentFiles}/>

            <Route exact path={OfficeRoutes.OBPAS} component={NewFile}/>
            <Route exact path={OfficeRoutes.HOARDINGS} component={HoardingApplications}/>
            <Route exact path={OfficeRoutes.HOARDING_DETAILS} component={HoardingDetails}/>
            <Route exact path={OfficeRoutes.BANNERS} component={BannerApplications}/>
            <Route exact path={OfficeRoutes.KIOSKS} component={KioskApplications}/>
            <Route exact path={OfficeRoutes.SHOP_LICENSES} component={ShopLicenseApplications}/>

            <Route exact path={OfficeRoutes.ADVERTISERS} component={AdvertiserApplications}/>
            <Route exact path={OfficeRoutes.ADVERTISER_DETAIL} component={AdvertiserDetails}/>

            <Route path={OfficeRoutes.SETTING} component={Settings}/>

          </GridContainer>

        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(officeStyle)(OfficeDashboard);