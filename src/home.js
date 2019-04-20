import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import { ApiRoutes } from "./config/ApiRoutes";
import axios from "axios";
import AdvertiserDashboard from "./layouts/AdvertiserDashboard";
import LandingPage from "./layouts/LandingPage";
import { AdvertiserRoute } from "./routes/AdvertiserRoute";
import OfficeDashboard from "./layouts/OfficeDashboard";
import { StaffRoute } from "./routes/StaffRoute";


axios.defaults.baseURL = ApiRoutes.BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "http://localhost:8000/";
axios.defaults.timeout = 20000;

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}
const hist = createBrowserHistory();


class Home extends Component {
  state = {
    currentUser: null
  };

  setUser = (user) => {
    this.setState({ currentUser: user });
  };

  render() {
    return (
      <Router history={hist}>
        <Switch>
          <AdvertiserRoute path={"/dashboard/advertiser"} currentUser={this.state.currentUser} component={<AdvertiserDashboard setUser={this.setUser.bind(this)}/>} />
          <StaffRoute path={"/e-office"} currentUser={this.state.currentUser} component={OfficeDashboard} />

          {/*<Route path={"/dashboard/advertiser"} render={(e) => <AdvertiserDashboard setUser={this.setUser.bind(this)}*/}
          {/*                                                                          currentUser={this.state.currentUser}/>}/>*/}
          <Route path={"/"}
                 render={(e) => <LandingPage setUser={this.setUser.bind(this)} currentUser={this.state.currentUser}/>}/>

        </Switch>
      </Router>
    );
  }
}

export default Home;

