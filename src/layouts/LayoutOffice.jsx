import React from "react";
import Grid from "@material-ui/core/Grid";
import officeStyle from "../assets/jss/material-dashboard-pro-react/layouts/officeStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import HeaderOffice from "../components/Header/HeaderOffice";
import {LoginService} from "../services/LoginService";
import RouteListAdministrator from './routes/RouteListAdministrator';
import RouteListOfficer from './routes/RouteListOfficer';
import RouteListInspector from './routes/RouteListInspector';
import RouteListClerk from './routes/RouteListClerk';

class LayoutOffice extends React.Component {
    state = {
        loading: false
    };

    doLoad = (val) => {
        this.setState({loading: val});
    };

    getRoute = () => {
        let routeList = null;
        let role = LoginService.getRole();
        switch (role) {
            case 'administrator':
                routeList = <RouteListAdministrator linkClick={this.handleLinkClick} doLoad={this.doLoad}/>;
                break;
            case 'officer':
                routeList = <RouteListOfficer linkClick={this.handleLinkClick} doLoad={this.doLoad}/>;
                break;
            case 'inspector':
                routeList = <RouteListInspector linkClick={this.handleLinkClick} doLoad={this.doLoad}/>;
                break;
            case 'clerk':
                routeList = <RouteListClerk linkClick={this.handleLinkClick} doLoad={this.doLoad}/>;
                break;
            default:
                routeList = <p>Route not Found!</p>;
                break;
        }
        return routeList;
    };

    render() {
        let routeList = this.getRoute();
        return (
            <Grid container justify={"center"}>
                <Grid item xs={12} sm={12} md={12}>
                    <HeaderOffice loading={this.state.loading} color={"primary"}/>
                </Grid>
                <Grid item style={{marginTop: 70, minHeight: "90vh", background: "white"}} xs={12} sm={12} md={12}>
                    {routeList}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(officeStyle)(LayoutOffice);