import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import { Route } from "react-router-dom";
import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import AdvertiserHeader from "../components/Header/AdvertiserHeader";
import HoardingList from "../views/advertiser/hoarding/HoardingList";
import Dashboard from "../views/advertiser/Dashboard";
import KioskLists from "../views/advertiser/kiosk/lists/KioskLists";
import ProfileLayout from "../views/advertiser/profile/ProfileLayout";
import NewHoardingForm from "../views/advertiser/hoarding/form/NewHoardingForm";
import NewKioskForm from "../views/advertiser/kiosk/form/NewKioskForm";
import withStyles from "@material-ui/core/es/styles/withStyles";
import IdleTimer from "react-idle-timer";

const style = {
  container: {
    background: "white",
    paddingBottom: "30px"
  }
};

class AdvertiserDashboard extends Component {
  constructor(props) {
    super(props);

    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
  }

  _onAction(e) {
    console.log("user did something", e);
  }

  _onActive(e) {
    console.log("user is active", e);
    console.log("time remaining", this.idleTimer.getRemainingTime());
  }

  _onIdle(e) {
    console.log("user is idle", e);
    console.log("last active", this.idleTimer.getLastActiveTime());
  }

  render() {
    const { classes } = this.props;
    let docs =
      (<GridContainer justify={"center"} className={classes.container}>
        <GridItem xs={12} sm={12} md={12}>
          <AdvertiserHeader color={"primary"}/>
        </GridItem>
        <GridItem style={{ marginTop: 70 }} xs={12} sm={12} md={12}>
          <GridContainer justify={"center"}>

            <Route exact path={OfficeRoutes.ADVERTISER_NEW_HOARDING} component={NewHoardingForm}/>
            <Route exact path={OfficeRoutes.ADVERTISER_HOARDING} component={HoardingList}/>

            <Route exact path={OfficeRoutes.ADVERTISER_NEW_KIOSK} component={NewKioskForm}/>
            <Route exact path={OfficeRoutes.ADVERTISER_KIOSK} component={KioskLists}/>

            {/*<Redirect from={OfficeRoutes.ADVERTISERS} to={OfficeRoutes.ADVERTISER_DASHBOARD}/>*/}
            <Route exact path={OfficeRoutes.ADVERTISER_PROFILE} component={ProfileLayout}/>

            <Route exact path={OfficeRoutes.ADVERTISER_DASHBOARD} component={Dashboard}/>

          </GridContainer>

        </GridItem>
      </GridContainer>);
    return (
      <div>

        {/*<IdleTimer*/}
        {/*  ref={ref => {*/}
        {/*    this.idleTimer = ref;*/}
        {/*  }}*/}
        {/*  element={<p>idle</p>}*/}
        {/*  onActive={this.onActive}*/}
        {/*  onIdle={this.onIdle}*/}
        {/*  onAction={this.onAction}*/}
        {/*  debounce={250}*/}
        {/*  timeout={2000}/>*/}

        <GridContainer justify={"center"} className={classes.container}>
          <GridItem xs={12} sm={12} md={12}>
            <AdvertiserHeader color={"primary"}/>
          </GridItem>
          <GridItem style={{ marginTop: 70 }} xs={12} sm={12} md={12}>
            <GridContainer justify={"center"}>

              <Route exact path={OfficeRoutes.ADVERTISER_NEW_HOARDING} component={NewHoardingForm}/>
              <Route exact path={OfficeRoutes.ADVERTISER_HOARDING} component={HoardingList}/>

              <Route exact path={OfficeRoutes.ADVERTISER_NEW_KIOSK} component={NewKioskForm}/>
              <Route exact path={OfficeRoutes.ADVERTISER_KIOSK} component={KioskLists}/>

              {/*<Redirect from={OfficeRoutes.ADVERTISERS} to={OfficeRoutes.ADVERTISER_DASHBOARD}/>*/}
              <Route exact path={OfficeRoutes.ADVERTISER_PROFILE} component={ProfileLayout}/>

              <Route exact path={OfficeRoutes.ADVERTISER_DASHBOARD} component={Dashboard}/>

            </GridContainer>

          </GridItem>
        </GridContainer>

      </div>
    );

  }
}

export default withStyles(style)(AdvertiserDashboard);