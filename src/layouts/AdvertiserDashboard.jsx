import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import { Route } from "react-router-dom";
import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import AdvertiserDetails from "../views/e-office/applications/advertisers/AdvertiserDetails";
import HoardingList from "../views/advertiser/hoarding/HoardingList";
import Redirect from "react-router-dom/es/Redirect";
import AdvertiserHeader from "../components/Header/AdvertiserHeader";

class AdvertiserDashboard extends Component {
  render() {
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <AdvertiserHeader color={"primary"}/>
        </GridItem>
        <GridItem style={{ marginTop: 70, background: "white" }} xs={12} sm={12} md={12}>
          <GridContainer justify={"center"}>
            <Route exact path={OfficeRoutes.ADVERTISER_DASHBOARD} component={AdvertiserDashboard}/>
            {/*<Route exact path={OfficeRoutes.ADVERTISER_DETAIL} component={AdvertiserDetails}/>*/}
            {/*<Route exact path={OfficeRoutes.HOARDINGS} component={HoardingList}/>*/}

            {/*<Redirect from={OfficeRoutes.ADVERTISERS} to={OfficeRoutes.ADVERTISER_DASHBOARD}/>*/}

          </GridContainer>

        </GridItem>
      </GridContainer>
    );
  }
}

export default AdvertiserDashboard;