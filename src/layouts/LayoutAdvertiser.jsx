import React, {Component} from "reactn";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import {Route} from "react-router-dom";
import * as OfficeRoutes from "../config/routes-constant/OfficeRoutes";
import AdvertiserHeader from "../components/Header/AdvertiserHeader";
import KioskProposedLists from "../views/advertiser/kiosk/lists/KioskProposedLists";
import ProfileLayout from "../views/advertiser/profile/ProfileLayout";
import withStyles from "@material-ui/core/es/styles/withStyles";
import HoardingApplicationForm from "../views/advertiser/hoarding/form/HoardingApplicationForm";
import KioskApplicationForm from "../views/advertiser/kiosk/form/KioskApplicationForm";
import IdleTimer from "react-idle-timer";
import {LoginService} from "../services/LoginService";
import AdvertiserDashboard from "../views/advertiser/AdvertiserDashboard";
import HoardingProposedList from "../views/advertiser/hoarding/HoardingProposedList";
import HoardingAvailableList from "../views/advertiser/hoarding/HoardingAvailableList";
import HoardingActiveList from "../views/advertiser/hoarding/HoardingActiveList";
import HoardingWithdrawnList from "../views/advertiser/hoarding/HoardingWithdrawnList";
import KioskAvailableList from "../views/advertiser/kiosk/lists/KioskAvailableList";
import KioskActiveList from "../views/advertiser/kiosk/lists/KioskActiveList";
import KioskWithdrawnList from "../views/advertiser/kiosk/lists/KioskWithdrawnList";
import ErrorHandler, { SuccessHandler } from "../views/common/StatusHandler";


const style = {
  container: {
    position: "relative",
    height: "100%",
    background: "white",
    paddingBottom: "30px"
  }
};

class LayoutAdvertiser extends Component {
  constructor(props) {
    super(props);

    this.loginService = new LoginService();
    this.idleTimer = null;
    this.onAction = this.onAction.bind(this);
    this.onActive = this.onActive.bind(this);
    this.onIdle = this.onIdle.bind(this);
  }

  onAction(e) {
  }

  onActive(e) {
  }

  onIdle(e) {
    console.log("last active", this.idleTimer.getLastActiveTime());
    const {history} = this.props;
    this.loginService.logout(errorMessage => console.log(errorMessage), success => history.push(OfficeRoutes.LOGIN));
  }

  render() {
    const {classes} = this.props;

    return (
        <div>
          <IdleTimer
              ref={ref => {
                this.idleTimer = ref;
              }}
              element={document}
              onActive={this.onActive}
              onIdle={this.onIdle}
              onAction={this.onAction}
              debounce={250}
              timeout={1000 * 60 * 15}/>
          {/* your app here */}

          <GridContainer justify={"center"} className={classes.container}>
            <GridItem xs={12} sm={12} md={12}>
              <AdvertiserHeader color={"primary"}/>
            </GridItem>
            <GridItem style={{marginTop: 70}} xs={12} sm={12} md={12}>
              <GridContainer justify={"center"}>
                <Route exact path={OfficeRoutes.ADVERTISER_DASHBOARD}
                       render={(e) => {
                         return <AdvertiserDashboard/>;
                       }}/>

                {/*Hoarding routes list*/}
                <Route exact path={OfficeRoutes.ADVERTISER_NEW_HOARDING} component={HoardingApplicationForm}/>
                <Route exact path={OfficeRoutes.ADVERTISER_PROPOSED_HOARDING} component={HoardingProposedList}/>
                <Route exact path={OfficeRoutes.ADVERTISER_AVAILABLE_HOARDING} component={HoardingAvailableList}/>
                <Route exact path={OfficeRoutes.ADVERTISER_ACTIVE_HOARDING} component={HoardingActiveList}/>
                <Route exact path={OfficeRoutes.ADVERTISER_WITHDRAWN_HOARDING} component={HoardingWithdrawnList}/>

                {/*Kiosk routes list*/}

                <Route exact path={OfficeRoutes.ADVERTISER_NEW_KIOSK} component={KioskApplicationForm}/>
                <Route exact path={OfficeRoutes.ADVERTISER_PROPOSED_KIOSK}  component={KioskProposedLists}/>
                <Route exact path={OfficeRoutes.ADVERTISER_AVAILABLE_KIOSK} component={KioskAvailableList}/>
                <Route exact path={OfficeRoutes.ADVERTISER_ACTIVE_KIOSK} component={KioskActiveList}/>
                <Route exact path={OfficeRoutes.ADVERTISER_WITHDRAWN_KIOSK} component={KioskWithdrawnList}/>

                {/*<Redirect from={OfficeRoutes.ADVERTISERS} to={OfficeRoutes.ADVERTISER_DASHBOARD}/>*/}
                <Route exact path={OfficeRoutes.ADVERTISER_PROFILE} component={ProfileLayout}/>
              </GridContainer>
            </GridItem>
            {this.global.errorMsg && <ErrorHandler/>}
            {this.global.successMsg && <SuccessHandler/>}

          </GridContainer>
        </div>
    );
  }
}

export default withStyles(style)(LayoutAdvertiser);