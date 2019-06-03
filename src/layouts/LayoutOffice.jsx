import React, {Component} from "reactn";
import {Grid, withStyles} from "@material-ui/core";
import officeStyle from "../assets/jss/material-dashboard-pro-react/layouts/officeStyle.jsx";
import HeaderOffice from "../components/Header/HeaderOffice";
import {LoginService} from "../services/LoginService";
import RouteListAdministrator from './routes/RouteListAdministrator';
import RouteListOfficer from './routes/RouteListOfficer';
import RouteListInspector from './routes/RouteListInspector';
import RouteListClerk from './routes/RouteListClerk';
import ErrorHandler, {SuccessHandler} from "../views/common/StatusHandler";
import {LOGIN} from "../config/routes-constant/OfficeRoutes";

class LayoutOffice extends Component {
  getRoute = () => {
    let routeList = null;
    let role = LoginService.getRole();
    switch (role) {
      case 'commissioner':
        routeList = <RouteListOfficer linkClick={this.handleLinkClick}/>;
        break;
      case 'secretary':
        routeList = <RouteListOfficer linkClick={this.handleLinkClick}/>;
        break;
      case 'administrator':
        routeList = <RouteListAdministrator linkClick={this.handleLinkClick}/>;
        break;
      case 'officer':
        routeList = <RouteListOfficer linkClick={this.handleLinkClick}/>;
        break;
      case 'inspector':
        routeList = <RouteListInspector linkClick={this.handleLinkClick}/>;
        break;
      case 'clerk':
        routeList = <RouteListClerk linkClick={this.handleLinkClick}/>;
        break;
      default:
        this.clearLocalStorage();
        routeList = <p>Route not Found!</p>;
        this.props.history.push(LOGIN);
        break;
    }
    return {
      role: role,
      routeList: routeList
    }
  };

  clearLocalStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
  };

  render() {
    let data = this.getRoute();
    return (
        <Grid container justify={"center"}>
          <Grid item xs={12} sm={12} md={12}>
            <HeaderOffice role={data.role} color={"primary"}/>
          </Grid>
          <Grid item style={{marginTop: 70, minHeight: "90vh", background: "white"}} xs={12} sm={12} md={12}>
            {data.routeList}
          </Grid>
          <ErrorHandler/>
          <SuccessHandler/>
        </Grid>
    );
  }
}

export default withStyles(officeStyle)(LayoutOffice);