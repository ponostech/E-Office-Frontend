import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import {MuiThemeProvider} from "@material-ui/core/styles";
import theme from "./assets/office/theme";
import App from "./App";
import {ApiRoutes} from "./config/ApiRoutes";

// import {Route, Router, Switch} from "react-router-dom";
// import indexRoutes from "routes/index.jsx";
// import NoMatch from "./views/NoMatch";
// import AdvertiserDashboard from "./layouts/AdvertiserDashboard";
// import OfficeDashboard from "./layouts/OfficeDashboard";
// import LandingPage from "./layouts/LandingPage";
// import Home from "./home";
// const hist = createBrowserHistory();

axios.defaults.baseURL = ApiRoutes.BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "http://127.0.0.1:8000/";
axios.defaults.timeout = 20000;

const token = localStorage.getItem("access_token");

if (token) {
    axios.defaults.headers.common = {
        "Authorization": `Bearer ${token}`
    };
}

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        {/*<Router history={hist}>*/}
        {/*    <Switch>*/}
        {/*      /!*<Route path={"/dashboard/advertiser"} render={(e)=><AdvertiserDashboard currentUser={currentUser}/>}/>*!/*/}
        {/*      /!*<Route path={"/"} render={(e)=><LandingPage currentUser={currentUser}/>}/>*!/*/}
        {/*      /!*  <Route component={NoMatch}/>*!/*/}
        {/*    </Switch>*/}
        {/*</Router>*/}
        <App/>
    </MuiThemeProvider>,
    document.getElementById("root")
);
