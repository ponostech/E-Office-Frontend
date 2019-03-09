import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import OfficePageHeader from "../components/Header/OfficePageHeader";
import { Route } from "react-router-dom";
import DeskView from "../views/e-office/DeskView";
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

class OfficeDashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <OfficePageHeader color={"primary"}/>
        </GridItem>
        <GridItem style={{ marginTop: 70 }} xs={12} sm={12} md={12}>
          <GridContainer justify={"center"}>
            <Route path={OfficeRoutes.DESK} component={DeskView}/>
            <Route path={OfficeRoutes.NEW_RECEIPT} component={NewReceipt}/>
            <Route path={OfficeRoutes.RECEIPT_DETAIL} component={Detail}/>
            <Route path={OfficeRoutes.CREATED_RECEIPT} component={CreatedReceipt}/>
            <Route path={OfficeRoutes.SENT_RECEIPT} component={SentReceipt}/>

            <Route path={OfficeRoutes.NEW_FILE} component={NewFile}/>
            <Route path={OfficeRoutes.FILE_DETAIL} component={FileDetail}/>
            <Route path={OfficeRoutes.CREATED_FILES} component={CreatedFiles}/>
            <Route path={OfficeRoutes.SENT_FILE} component={SentFiles}/>

            <Route path={OfficeRoutes.OBPAS} component={NewFile}/>
            <Route path={OfficeRoutes.HOARDINGS} component={HoardingApplications}/>
            <Route path={OfficeRoutes.BANNERS} component={BannerApplications}/>
            <Route path={OfficeRoutes.KIOSKS} component={KioskApplications}/>
            <Route path={OfficeRoutes.SHOP_LICENSES} component={ShopLicenseApplications}/>

            <Route path={OfficeRoutes.SETTING} component={Settings}/>

          </GridContainer>

        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(officeStyle)(OfficeDashboard);