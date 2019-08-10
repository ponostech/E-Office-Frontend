import React, {setGlobal} from 'reactn';
import ReactDOM from "react-dom";
import axios from "axios";
import {MuiThemeProvider} from "@material-ui/core/styles";
import theme from "./assets/office/theme";
import App from "./App";
import {ApiRoutes} from "./config/ApiRoutes";
import { HOME } from "./config/routes-constant/OfficeRoutes";
import moment from "moment";
// import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";

var jwt = require("jsonwebtoken");

axios.defaults.baseURL = ApiRoutes.BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "http://127.0.0.1:3000/";
axios.defaults.timeout = 20000;

const token = localStorage.getItem("access_token");
const decodedJwt=jwt.decode(token);

console.log(decodedJwt)

// axios.interceptors.response.use(response=>{
//   // let currentDate = Date.now();
//   // let expiredDate=new Date(decodedJwt.exp*1000)
//   // if (currentDate > expiredDate)
//   //   window.location.replace(HOME)
//   return response
// },error => {
//   console.log(error)
//   if (405 === error.response.status) {
//       localStorage.clear()
//       window.location = '/home';
//   } else {
//     return Promise.reject(error);
//   }
// })

if (token) {
  let currentDate = Date.now();
  let expiredDate=new Date(decodedJwt.exp*1000)
  console.log(moment(currentDate))
  console.log(moment(expiredDate))
  if (moment(currentDate).isSameOrAfter(moment(expiredDate))) {
    console.log("token expired")
    console.log(moment(currentDate))
    console.log(moment(expiredDate))
    localStorage.clear();
  }
  axios.defaults.headers.common = {
    "Authorization": `Bearer ${token}`
  };
}

setGlobal({
  errorMsg: '',
  successMsg: '',
  loading: true,
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>,
    document.getElementById("root")
);
