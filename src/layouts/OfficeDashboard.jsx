import React from "react";
import Grid from "@material-ui/core/Grid";
import { Route } from "react-router-dom";
import * as OfficeRoutes from "../config/routes-constant/OfficeRoutes";

import OfficePageHeader from "../components/Header/OfficePageHeader";
import NewReceipt from "../views/e-office/receipt/NewReceipt";
import NewFile from "../views/e-office/files/NewFile";
import Detail from "../views/e-office/receipt/Detail";
import CreatedReceipt from "../views/e-office/receipt/CreatedReceipt";
import SentReceipt from "../views/e-office/receipt/SentReceipt";
import BannerApplications from "../views/e-office/applications/banners/BannerApplications";
import ShopLicenseApplications from "../views/e-office/applications/shop-license/ShopLicenseApplications";
import HoardingApplications from "../views/e-office/applications/hoarding/HoardingApplications";
import Settings from "../views/e-office/settings/Setting";
import FileDetail from "../views/e-office/files/details/FileDetail";
import CreatedFiles from "../views/e-office/files/CreatedFiles";
import SentFiles from "../views/e-office/files/SentFiles";
import HoardingDetails from "../views/e-office/applications/hoarding/HoardingDetails";
import AdvertiserDetails from "../views/e-office/applications/advertisers/AdvertiserDetails";
import DeskView from "../views/e-office/desk/DeskView";
import CreateTrade from "../views/e-office/admin/NewTrade";


import officeStyle from "../assets/jss/material-dashboard-pro-react/layouts/officeStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import StaffRegistrationForm from "../views/staff/StaffRegistrationForm";
import UnderProcessHoarding from "../views/e-office/applications/hoarding/UnderProcessHoarding";
import RejectedHoardingApplications from "../views/e-office/applications/hoarding/RejectedHoardingApplications";
import ApprovedHoarding from "../views/e-office/applications/hoarding/ApprovedHoarding";
import NewKioskApplications from "../views/e-office/applications/kiosk/NewKioskApplications";
import UnderProcessKiosks from "../views/e-office/applications/kiosk/UnderProcessKiosks";
import ApprovedKiosks from "../views/e-office/applications/kiosk/ApprovedKiosks";
import RejectedKiosks from "../views/e-office/applications/kiosk/RejectedKiosks";
import NewBannerApplications from "../views/e-office/applications/banners/NewBannerApplications";
import UnderProcessBanner from "../views/e-office/applications/banners/UnderProcessBanner";

class OfficeDashboard extends React.Component {
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

          {/*//hoarding application routes*/}
          <Route exact path={OfficeRoutes.NEW_HOARDINGS} render={e => <HoardingApplications doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.UNDER_PROCESS_HOARDINGS}
                 render={e => <UnderProcessHoarding doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.REJECTED_HOARDINGS}
                 render={e => <RejectedHoardingApplications doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.APPROVED_HOARDINGS} render={e => <ApprovedHoarding doLoad={this.doLoad}/>}/>
          {/*end hoarding application route*/}

          {/*kiosk appication route*/}
          <Route exact path={OfficeRoutes.NEW_KIOSKS} render={e => <NewKioskApplications doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.UNDER_PROCESS_KIOSKS}
                 render={e => <UnderProcessKiosks doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.APPROVED_KIOSKS} render={e => <ApprovedKiosks doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.REJECTED_KIOSKS} render={e => <RejectedKiosks doLoad={this.doLoad}/>}/>
          {/*end kiosk application route*/}

          {/*advertiser applications route*/}
          {/*end advertiser applications route*/}

          {/*Banner applications route*/}
          <Route exact path={OfficeRoutes.NEW_BANNER} render={e => <NewBannerApplications doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.UNDER_PROCESS_BANNER} render={e => <UnderProcessBanner doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.APPROVED_BANNER} render={e => <NewKioskApplications doLoad={this.doLoad}/>}/>
          <Route exact path={OfficeRoutes.REJECTED_BANNER} render={e => <NewKioskApplications doLoad={this.doLoad}/>}/>
          {/*end Banner applications route*/}

          <Route exact path={OfficeRoutes.HOARDING_DETAILS} component={HoardingDetails}/>
          <Route exact path={OfficeRoutes.BANNERS} component={BannerApplications}/>
          <Route exact path={OfficeRoutes.SHOP_LICENSES} component={ShopLicenseApplications}/>

          <Route exact path={OfficeRoutes.ADVERTISER_DETAIL} component={AdvertiserDetails}/>

          <Route exact path={OfficeRoutes.STAFF_REGISTRATION} component={StaffRegistrationForm}/>
          <Route path={OfficeRoutes.SETTING} component={Settings}/>
        </Grid>
      </Grid>
    );
  }

}

export default withStyles(officeStyle)(OfficeDashboard);