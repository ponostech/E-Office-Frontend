import { Redirect, Route } from "react-router-dom";
import React from "react";
import { LoginService } from "../services/LoginService";

export const AdvertiserRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    console.log("what the fuck");
    let user = LoginService.getCurrentUser();
    console.log(user);
    console.log(!!user.advertiser);
    if (!user) {
      console.info("User is not set")
      return <Redirect to='/auth/login'/>;
    }
    if (LoginService.hasRole("advertiser")) {
      console.info("Advertiser role is found")
      return <Component {...props}/>;
    }
    return <p>Access denied</p>;

  }}/>


);