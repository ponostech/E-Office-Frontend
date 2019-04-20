import {Route} from "react-router-dom";
import React from "react";
import Redirect from "react-router-dom/es/Redirect";

export  const AdvertiserRoute = ({ currentUser, component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!currentUser)
      return <Redirect to='/auth/login'/>;
    // if (!currentUser.advertiser)
    //   return <p>unauth</p>;
    else
      return <Component {...props}/>;

  }}/>
);