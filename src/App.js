import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import AdvertiserDashboard from "./layouts/LayoutAdvertiser";
import OfficeDashboard from "./layouts/LayoutOffice";
import LandingPage from "./layouts/LayoutLanding";
import { AdvertiserRoute } from "./routes/AdvertiserRoute";

import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";

const hist = createBrowserHistory();

const App = () => (
  <Router history={hist}>
    <Switch>
      <AdvertiserRoute
        path={"/dashboard/advertiser"}
        component={AdvertiserDashboard}
      />
      <Route path={"/e-office"} component={OfficeDashboard} />
      <Route path={"/"} component={LandingPage} />
    </Switch>
  </Router>
);

export default App;
