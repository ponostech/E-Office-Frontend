import React, { setGlobal } from "reactn";
import ReactDOM from "react-dom";
import axios from "axios";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/office/theme";
import App from "./App";
import { ApiRoutes } from "./config/ApiRoutes";
import moment from "moment";

var jwt = require("jsonwebtoken");

axios.defaults.baseURL = ApiRoutes.BASE_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.get["Access-Control-Allow-Origin"] =
  "http://127.0.0.1:3000/";
axios.defaults.timeout = 20000;

const token = localStorage.getItem("access_token");
const decodedJwt = jwt.decode(token);

if (token) {
  let currentDate = Date.now();
  let expiredDate = new Date(decodedJwt.exp * 1000);
  if (moment(currentDate).isSameOrAfter(moment(expiredDate))) {
    localStorage.clear();
  }
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`
  };
}

setGlobal({
  errorMsg: "",
  successMsg: "",
  loading: true,
  applicantLogin: true
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
