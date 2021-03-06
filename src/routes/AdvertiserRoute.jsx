import { Redirect, Route } from "react-router-dom";
import React from "react";
import { LoginService } from "../services/LoginService";

export const AdvertiserRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    let user = LoginService.getCurrentUser();
    if (!user) {
      return <Redirect to='/'/>;
    }
    if (LoginService.hasRole("advertiser")) {
      return <Component {...props}/>;
    }
    return <p>Access denied</p>;

  }}/>


);