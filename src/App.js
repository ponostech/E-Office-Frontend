import React, {Component} from "react";
import axios from "axios";
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import {ApiRoutes} from "./config/ApiRoutes";
import {authContext, Provider} from "./context/AuthContext";
import AdvertiserDashboard from "./layouts/LayoutAdvertiser";
import {StaffRoute} from "./routes/StaffRoute";
import OfficeDashboard from "./layouts/LayoutOffice";
import LandingPage from "./layouts/LayoutLanding";
import {AdvertiserRoute} from "./routes/AdvertiserRoute";

axios.defaults.baseURL = ApiRoutes.BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "http://localhost:8000/";
axios.defaults.timeout = 20000;

const token = localStorage.getItem("token");

if (token) {
    axios.defaults.headers.common["Authorization"] = token;
}

const hist = createBrowserHistory();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            access_token: "",
            authenticate: false,
            setUser: this.setUser,
            setToken: this.setToken,
        };
    }

    setUser = (user) => {
        this.setState(state => {state.currentUser = user})
    };

    setToken = (token) => {
        this.setState({token: token})
    };

    render() {
        return (
            <Provider value={this.state}>
                <Router history={hist}>
                    <Switch>
                        <AdvertiserRoute path={"/dashboard/advertiser"} component={AdvertiserDashboard}/>
                        <StaffRoute path={"/e-office"} currentUser={this.state.currentUser} component={OfficeDashboard}/>
                        {/*<Route path={"/dashboard/advertiser"} render={(e) => <AdvertiserDashboard setUser={this.setUser.bind(this)} currentUser={this.state.currentUser}/>}/>*/}
                        <Route path={"/"} render={(e) => <LandingPage/>}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

App.contextType = authContext;

export default App;

