import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import indexRoutes from "routes/index.jsx";
import NoMatch from "./views/NoMatch";
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import { ApiRoutes } from "./config/ApiRoutes";
import axios from "axios";

const hist = createBrowserHistory();
axios.defaults.baseURL = ApiRoutes.BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "http://139.59.26.3";
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key}/>;
      })}
      <Route component={NoMatch}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
