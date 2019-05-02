import { Redirect, Route } from "react-router-dom";
import React from "react";
import { LoginService } from "../services/LoginService";

export const StaffRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    let user = LoginService.getCurrentUser();
    if (!user) {
      console.info("User is not set");
      return <Redirect to='/auth/login'/>;
    }
    if (LoginService.hasRole("staff")) {
      console.info("staff role is found");
      return <Component {...props}/>;
    }
    return <p>Access denied</p>;

  }}/>

);