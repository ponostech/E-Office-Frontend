import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import { authContext, Provider } from "./context/AuthContext";
import AdvertiserDashboard from "./layouts/LayoutAdvertiser";
import OfficeDashboard from "./layouts/LayoutOffice";
import LandingPage from "./layouts/LayoutLanding";
import { AdvertiserRoute } from "./routes/AdvertiserRoute";

const hist = createBrowserHistory();

class App extends Component {
 /* constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      access_token: "",
      authenticate: false,
      setUser: this.setUser,
      setToken: this.setToken
    };
  }

  setUser = (user) => {
    this.setState(state => {
      state.currentUser = user;
    });
  };

  setToken = (token) => {
    this.setState({ token: token });
  };*/

  render() {
    return (
      <Provider value={this.state}>
        <Router history={hist}>
          <Switch>
            <AdvertiserRoute path={"/dashboard/advertiser"} component={AdvertiserDashboard}/>
            <Route path={"/e-office"} component={OfficeDashboard}/>
            <Route path={"/"} render={(e) => <LandingPage/>}/>
            {/*<Route path={"/dashboard/advertiser"} render={(e) => <AdvertiserDashboard setUser={this.setUser.bind(this)} currentUser={this.state.currentUser}/>}/>*/}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

App.contextType = authContext;

export default App;

