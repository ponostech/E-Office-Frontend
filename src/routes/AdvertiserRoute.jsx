import {Route,Redirect} from "react-router-dom";
import React from "react";
import { LoginService } from "../services/LoginService";

export  const AdvertiserRoute = ({  component: Component, ...rest }) => (
      <Route {...rest} render={(props) => {
        let user=LoginService.getCurrentUser();
        if (user)
          return <Redirect to='/auth/login'/>;
        if (!user.advertiser)
          return <p>unauth</p>;
        else
          return <Component {...props}/>;

      }}/>


);