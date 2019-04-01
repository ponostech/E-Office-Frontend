import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router-dom";
import indexRoutes from "routes/index.jsx";
import NoMatch from "./views/NoMatch";
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import {ApiRoutes} from "./config/ApiRoutes";
import {MuiThemeProvider} from "@material-ui/core/styles";
import theme from "./assets/office/theme";
import axios from "axios";
const hist = createBrowserHistory();

axios.defaults.baseURL = ApiRoutes.BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "http://localhost:8000/";
axios.defaults.timeout = 20000;

const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["Authorization"] = token;

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key}/>;
                })}
                <Route component={NoMatch}/>
            </Switch>
        </Router>
    </MuiThemeProvider>,
    document.getElementById("root")
);
