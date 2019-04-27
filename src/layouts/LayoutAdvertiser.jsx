import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import { Route } from "react-router-dom";
import * as OfficeRoutes from "../config/routes-constant/OfficeRoutes";

import AdvertiserHeader from "../components/Header/AdvertiserHeader";
import HoardingList from "../views/advertiser/hoarding/HoardingList";
import KioskLists from "../views/advertiser/kiosk/lists/KioskLists";
import ProfileLayout from "../views/advertiser/profile/ProfileLayout";
import withStyles from "@material-ui/core/es/styles/withStyles";
import HoardingApplicationForm from "../views/advertiser/hoarding/form/HoardingApplicationForm";
import KioskApplicationForm from "../views/advertiser/kiosk/form/KioskApplicationForm";
import IdleTimer from "react-idle-timer";
import { ApiRoutes } from "../config/ApiRoutes";
import axios from "axios";
import withStyles from "@material-ui/core/es/styles/withStyles";


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

    this.state = {
      loading: false
    };

    this.doLoad = this.doLoad.bind(this);
    this.idleTimer = null;
    this.onAction = this.onAction.bind(this);
    this.onActive = this.onActive.bind(this);
    this.onIdle = this.onIdle.bind(this);
  }

  doLoad = () => {
    this.setState({ loading: true });
  };
  doLoadFinish = () => {
    this.setState({ loading: false });
  };

  onAction(e) {
  }

  onActive(e) {
  }

  onIdle(e) {
    console.log("last active", this.idleTimer.getLastActiveTime());
    const { history } = this.props;
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    axios.post(ApiRoutes.LOGOUT_ROUTE, {}, config)
      .then(res => {
        if (res.data.status) {
          history.push(OfficeRoutes.LOGIN);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

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
          timeout={1000 * 60 * 2}/>
        {/* your app here */}

        <GridContainer justify={"center"} className={classes.container}>
          <GridItem xs={12} sm={12} md={12}>
            <AdvertiserHeader color={"primary"} loading={this.state.loading}/>
          </GridItem>
          <GridItem style={{ marginTop: 70 }} xs={12} sm={12} md={12}>
            <GridContainer justify={"center"}>

              <Route exact path={OfficeRoutes.ADVERTISER_NEW_HOARDING}
                     render={(e) => {
                return <HoardingApplicationForm doLoad={this.doLoad} doLoadFinish={this.doLoadFinish}/>;
              }}/>
              <Route exact path={OfficeRoutes.ADVERTISER_HOARDING}
                     render={p=><HoardingList doLoad={this.doLoad} doLoadFinish={this.doLoadFinish}/>}/>
              <Route exact path={OfficeRoutes.ADVERTISER_KIOSK}
                     render={p=><KioskLists doLoad={this.doLoad} doLoadFinish={this.doLoadFinish}/>}/>

              <Route exact path={OfficeRoutes.ADVERTISER_NEW_KIOSK}
                     render={(e) => <KioskApplicationForm doLoad={this.doLoad} doLoadFinish={this.doLoadFinish}/>}/>

              <Route exact path={OfficeRoutes.ADVERTISER_NEW_HOARDING} render={(e) => {
                return <HoardingApplicationForm doLoad={this.doLoad} doLoadFinish={this.doLoadFinish}/>;
              }}/>
              <Route exact path={OfficeRoutes.ADVERTISER_HOARDING} render={p=><HoardingList doLoad={this.doLoad} doLoadFinish={this.doLoadFinish}/>}/>
              <Route exact path={OfficeRoutes.ADVERTISER_KIOSK} render={p=><KioskLists doLoad={this.doLoad} doLoadFinish={this.doLoadFinish}/>}/>

              <Route exact path={OfficeRoutes.ADVERTISER_NEW_KIOSK} render={(e) => {
                return <KioskApplicationForm doLoad={this.doLoad} doLoadFinish={this.doLoadFinish}/>;
              }}/>

              {/*<Redirect from={OfficeRoutes.ADVERTISERS} to={OfficeRoutes.ADVERTISER_DASHBOARD}/>*/}
              <Route exact path={OfficeRoutes.ADVERTISER_PROFILE} component={ProfileLayout}/>


            </GridContainer>

          </GridItem>
        </GridContainer>

      </div>
    );

  }

}

export default withStyles(style)(LayoutAdvertiser);