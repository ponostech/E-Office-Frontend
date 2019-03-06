import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components


import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import dashRoutes from "../routes/advertiserRoutes";
import SingletonAuth from "../utils/SingletonAuth";
import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import KioskFormContainer from "../views/advertiser/kiosk/form/KioskFormContainer";

const switchRoutes = (
  <Switch>
    <Route exact path={OfficeRoutes.PROPOSED_KIOSK} component={KioskFormContainer}/>
    {dashRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key}/>;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route exact path={prop.path} component={prop.component} key={key}/>
          );
        });
      return <Route exact path={prop.path} component={prop.component} key={key}/>;
    })}
  </Switch>
);

var ps;

class AdvertiserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  componentDidMount() {
    let user=new SingletonAuth().getCurrentUser();
    if (user) {
        console.log(user)
    }
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }

  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashRoutes}
          logoText={"E-AMC"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="purple"
          bgColor="white"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={dashRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer fluid/> : null}
        </div>
      </div>
    );
  }
}

AdvertiserDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(AdvertiserDashboard);
