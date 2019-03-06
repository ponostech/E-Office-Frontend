import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import indexRoutes from "routes/index.jsx";
import NoMatch from "./views/NoMatch";
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import { ApiRoutes } from "./config/ApiRoutes";
import axios from "axios";
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from "@material-ui/core/es/colors/purple";
const theme = createMuiTheme({
  palette: {
    primary:{
      main:blue[500]
    },
    secondary: {
      main: green[500],
    },
  },
  props: {
    MuiInput:{
      cssLabel: {
        '&$cssFocused': {
          color: purple[500],
        },
      },
      cssFocused: {},
      cssUnderline: {
        '&:after': {
          borderBottomColor: purple[500],
        },
      },
    },
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
      color:"black"
    },
  },
});
const hist = createBrowserHistory();
axios.defaults.baseURL = ApiRoutes.BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "http://139.59.26.3";
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common['Authorization']=token;
}

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
