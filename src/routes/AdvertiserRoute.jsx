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
      return <Redirect to='/auth/login'/>;
    }
    if (LoginService.checkRole("advertiser")) {
      return <Component {...props}/>;
    }
    return <p>Access denied</p>;

  }}/>


);