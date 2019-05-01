import React from "react";
import Grid from "@material-ui/core/Grid";
import { Route, Redirect } from "react-router-dom";
import officeStyle from "../assets/jss/material-dashboard-pro-react/layouts/officeStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import * as OfficeRoutes from "../config/routes-constant/OfficeRoutes";

import OfficePageHeader from "../components/Header/OfficePageHeader";
import ReceiptStore from "../views/e-office/receipt/ReceiptStore";
import FileStore from "../views/e-office/files/FileStore";
import ReceiptShow from "../views/e-office/receipt/ReceiptShow";
import ReceiptList from "../views/e-office/receipt/ReceiptList";
import ReceiptSentList from "../views/e-office/receipt/ReceiptSentList";
import ShopNewList from "../views/e-office/applications/shop-license/ShopNewList";
import HoardingApplications from "../views/e-office/applications/hoarding/HoardingApplications";
import Settings from "../views/e-office/settings/Setting";
import FileDetail from "../views/e-office/files/details/FileDetail";
import FileCreatedList from "../views/e-office/files/FileCreatedList";
import FileSentList from "../views/e-office/files/FileSentList";
import HoardingDetails from "../views/e-office/applications/hoarding/HoardingDetails";
import AdvertiserDetails from "../views/e-office/applications/advertisers/AdvertiserDetails";
import DeskView from "../views/e-office/desk/DeskView";
import TradeStore from "../views/e-office/admin/TradeStore";
import UnderProcessHoarding from "../views/e-office/applications/hoarding/HoardingUnderProcessList";
import RejectedHoardingApplications from "../views/e-office/applications/hoarding/HoardingRejectedList";
import ApprovedHoarding from "../views/e-office/applications/hoarding/HoardingApprovedList";
import NewKioskApplications from "../views/e-office/applications/kiosk/KioskNewList";
import UnderProcessKiosks from "../views/e-office/applications/kiosk/KioskUnderProcessList";
import ApprovedKiosks from "../views/e-office/applications/kiosk/KioskApprovedList";
import RejectedKiosks from "../views/e-office/applications/kiosk/KioskRejectedList";
import NewBannerApplications from "../views/e-office/applications/banners/BannerNewList";
import UnderProcessBanner from "../views/e-office/applications/banners/BannerUnderProcessList";
import BannerGrantedList from "../views/e-office/applications/banners/BannerApprovedList";
import BannerRejectedList from "../views/e-office/applications/banners/BannerRejectedList";
import UnderProcessShopLicense from "../views/e-office/applications/shop-license/UnderProcessShopLicense";
import ApprovedShopLicense from "../views/e-office/applications/shop-license/ApprovedShopLicense";
import RejectedShopLicense from "../views/e-office/applications/shop-license/RejectedShopLicense";
import AdvertiserNewList from "../views/e-office/applications/advertisers/AdvertiserNewList";
import AdvertiserInProcessList from "../views/e-office/applications/advertisers/AdvertiserInProcessList";
import StaffList from "../views/e-office/staff/StaffList";
import StaffRegistration from "../views/e-office/staff/StaffRegistration";
import HotelUnderProcessList from "../views/e-office/applications/hotel/HotelUnderProcessList";
import HotelApprovedList from "../views/e-office/applications/hotel/HotelApprovedList";
import HotelRejectedList from "../views/e-office/applications/hotel/HotelRejectedList";
import HotelNewList from "../views/e-office/applications/hotel/HotelNewList";

class LayoutOffice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  doLoad = (val) => {
    this.setState({ loading: val });
  };

  render() {
    return (
      <Grid container justify={"center"}>
        <Grid item xs={12} sm={12} md={12}>
          <OfficePageHeader loading={this.state.loading} color={"primary"}/>
        </Grid>
        <Grid item style={{ marginTop: 70, minHeight: "100vh", background: "white" }} xs={12} sm={12} md={12}>
          <Route exact path={OfficeRoutes.DESK} render={e => <DeskView doLoad={this.doLoad}/>}/>

          {/*Receipt*/}
          <Route exact path={OfficeRoutes.NEW_RECEIPT} component={ReceiptStore}/>
          <Route exact path={OfficeRoutes.RECEIPT_DETAIL} component={ReceiptShow}/>
          <Route exact path={OfficeRoutes.CREATED_RECEIPT} component={ReceiptList}/>
          <Route exact path={OfficeRoutes.SENT_RECEIPT} component={ReceiptSentList}/>

          {/*File*/}
          <Route exact path={OfficeRoutes.NEW_FILE} render={e => <FileStore doLoad={this.doLoad}/>}/>
          <Route path={OfficeRoutes.FILE_DETAIL} render={(props) => <FileDetail {...props} doLoad={this.doLoad}/>} />
          <Route exact path={OfficeRoutes.CREATED_FILES} component={FileCreatedList}/>
          <Route exact path={OfficeRoutes.SENT_FILE} component={FileSentList}/>

          {/*OBPAS*/}
          <Route exact path={OfficeRoutes.OBPAS} component={FileStore}/>

          {/*Advertiser*/}
          <Route exact path={OfficeRoutes.ADVERTISER_DETAIL} component={AdvertiserDetails}/>
          <Route exact path={OfficeRoutes.ADVERTISER_NEW_LIST}
                 render={e => <AdvertiserNewList doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.ADVERTISER_IN_PROCESS_LIST}
                 render={e => <AdvertiserInProcessList doLoad={this.doLoad}/>}/>

          {/*Hoarding*/}
          <Route exact path={OfficeRoutes.NEW_HOARDINGS}
                 render={e => <HoardingApplications doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.UNDER_PROCESS_HOARDINGS}
                 render={e => <UnderProcessHoarding doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.REJECTED_HOARDINGS}
                 render={e => <RejectedHoardingApplications doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.APPROVED_HOARDINGS}
                 render={e => <ApprovedHoarding doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.HOARDING_DETAILS} component={HoardingDetails}/>

          {/*Kiosk*/}
          <Route exact path={OfficeRoutes.NEW_KIOSKS}
                 render={e => <NewKioskApplications doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.UNDER_PROCESS_KIOSKS}
                 render={e => <UnderProcessKiosks doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.APPROVED_KIOSKS}
                 render={e => <ApprovedKiosks doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.REJECTED_KIOSKS}
                 render={e => <RejectedKiosks doLoad={this.doLoad}/>}/>

          {/*Banner*/}
          <Route exact path={OfficeRoutes.NEW_BANNER}
                 render={e => <NewBannerApplications doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.UNDER_PROCESS_BANNER}
                 render={e => <UnderProcessBanner doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.APPROVED_BANNER}
                 render={e => <BannerGrantedList doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.REJECTED_BANNER}
                 render={e => <BannerRejectedList doLoad={this.doLoad}/>}/>


          {/*Shop Licensing*/}
          <Route exact path={OfficeRoutes.NEW_SHOPLICENSE}
                 render={e => <ShopNewList doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.UNDER_PROCESS_SHOPLICENSE}
                 render={e => <UnderProcessShopLicense doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.APPROVED_SHOPLICENSE}
                 render={e => <ApprovedShopLicense doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.REJECTED_SHOPLICENSE}
                 render={e => <RejectedShopLicense doLoad={this.doLoad}/>}/>

          {/*Shop Licensing*/}
          <Route exact path={OfficeRoutes.NEW_HOTELLICENSE}
                 render={e => <HotelNewList doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.UNDER_PROCESS_HOTELLICENSE}
                 render={e => <HotelUnderProcessList doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.APPROVED_HOTELLICENSE}
                 render={e => <HotelApprovedList doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.REJECTED_HOTELLICENSE}
                 render={e => <HotelRejectedList doLoad={this.doLoad}/>}/>
          {/*Admin*/}
          <Route exact path={OfficeRoutes.NEW_TRADE}
                 component={TradeStore}/>
          <Route exact path={OfficeRoutes.STAFF_REGISTRATION}
                 render={e => <StaffRegistration doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.STAFF_LIST}
                 render={e => <StaffList doLoad={this.doLoad}/>}/>
          <Route path={OfficeRoutes.SETTING} component={Settings}/>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(officeStyle)(LayoutOffice);