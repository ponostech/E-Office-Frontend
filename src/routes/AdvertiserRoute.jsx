import { Redirect, Route } from "react-router-dom";
import React from "react";
import { LoginService } from "../services/LoginService";

export const AdvertiserRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    let user = LoginService.getCurrentUser();
    if (!user) {
      console.info("User is not set")
      return <Redirect to='/'/>;
    }
    if (LoginService.hasRole("advertiser")) {
      console.info("Advertiser role is found")
      return <Component {...props}/>;
    }
    return <p>Access denied</p>;

  }}/>


);