import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import { Route } from "react-router-dom";
import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import AdvertiserHeader from "../components/Header/AdvertiserHeader";
import HoardingList from "../views/advertiser/hoarding/HoardingList";
import AdvertiserDetails from "../views/e-office/applications/advertisers/AdvertiserDetails";
import Dashboard from "../views/advertiser/Dashboard";
import Redirect from "react-router-dom/es/Redirect";
import HoardingContainer from "../views/advertiser/hoarding/HoardingContainer";
import KioskFormContainer from "../views/advertiser/kiosk/form/KioskFormContainer";
import KioskLists from "../views/advertiser/kiosk/lists/KioskLists";
import ProfileLayout from "../views/advertiser/profile/ProfileLayout";
import NewHoardingForm from "../views/advertiser/hoarding/form/NewHoardingForm";

class AdvertiserDashboard extends Component {
  render() {
    return (
      <GridContainer justify={"center"} style={{background:"#fff"}}>
        <GridItem xs={12} sm={12} md={12}>
          <AdvertiserHeader color={"primary"}/>
        </GridItem>
        <GridItem style={{ marginTop: 70, background: "white" }} xs={12} sm={12} md={12}>
          <GridContainer justify={"center"}>

            <Route exact path={OfficeRoutes.ADVERTISER_NEW_HOARDING} component={NewHoardingForm}/>
            <Route exact path={OfficeRoutes.ADVERTISER_HOARDING} component={HoardingList}/>

            <Route exact path={OfficeRoutes.PROPOSED_KIOSK} component={KioskFormContainer}/>
            <Route exact path={OfficeRoutes.ADVERTISER_KIOSK} component={KioskLists}/>


            <Redirect from={OfficeRoutes.ADVERTISERS} to={OfficeRoutes.ADVERTISER_DASHBOARD}/>
            <Route exact path={OfficeRoutes.ADVERTISER_PROFILE} component={ProfileLayout}/>

            <Route exact path={OfficeRoutes.ADVERTISER_DASHBOARD} component={Dashboard}/>

          </GridContainer>

        </GridItem>
      </GridContainer>
    );
  }
}

export default AdvertiserDashboard;