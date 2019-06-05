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
        routeList = <RouteListOfficer/>;
        break;
      case 'secretary':
        routeList = <RouteListOfficer/>;
        break;
      case 'administrator':
        routeList = <RouteListAdministrator/>;
        break;
      case 'officer':
        routeList = <RouteListOfficer/>;
        break;
      case 'inspector':
        routeList = <RouteListInspector/>;
        break;
      case 'clerk':
        routeList = <RouteListClerk/>;
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
          <Grid item style={{paddingTop: 64, minHeight: "100vh"}} xs={12} sm={12} md={12}>
              {data.routeList}
          </Grid>
          <ErrorHandler/>
          <SuccessHandler/>
        </Grid>
    );
  }
}

export default withStyles(officeStyle)(LayoutOffice);