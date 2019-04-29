import {Route} from "react-router-dom";
import React from "react";
import {Consumer} from '../context/AuthContext'

export  const AdvertiserRoute = ({ currentUser, component: Component, ...rest }) => (
  <Consumer>
    {({authenticate,currentUser,setUser})=>(
      <Route {...rest} render={(props) => {
        // if (!authenticate)
        //   return <Redirect to='/auth/login'/>;
        // // if (!currentUser.advertiser)
        // //   return <p>unauth</p>;
        // else
          return <Component {...props}/>;

      }}/>
    )

    }
  </Consumer>

);