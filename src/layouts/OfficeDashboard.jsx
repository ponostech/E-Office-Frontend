import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import OfficePageHeader from "../components/Header/OfficePageHeader";
import { Route } from "react-router-dom";
import DeskView from "../views/e-office/DeskView";
import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import NewReceipt from "../views/e-office/receipt/NewReceipt";
import NewFile from "../views/e-office/files/NewFile";
import officeStyle from "../assets/jss/material-dashboard-pro-react/layouts/officeStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Detail from "../views/e-office/receipt/Detail";
import CreatedReceipt from "../views/e-office/receipt/CreatedReceipt";
import SentReceipt from "../views/e-office/receipt/SentReceipt";

class OfficeDashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={12}>
            <OfficePageHeader color={"primary"}/>
          </GridItem>
              <GridItem style={{ marginTop: 70 }} xs={12} sm={12} md={10}>
                <GridContainer justify={"center"}>
                  <Route path={OfficeRoutes.DESK} component={DeskView}/>
                  <Route path={OfficeRoutes.NEW_RECEIPT} component={NewReceipt}/>
                  <Route path={OfficeRoutes.RECEIPT_DETAIL} component={Detail}/>
                  <Route path={OfficeRoutes.CREATED_RECEIPT} component={CreatedReceipt}/>
                  <Route path={OfficeRoutes.SENT_RECEIPT} component={SentReceipt}/>

                  <Route path={OfficeRoutes.NEW_FILE} component={NewFile}/>
                </GridContainer>

              </GridItem>
        </GridContainer>
    );
  }
}

export default withStyles(officeStyle)(OfficeDashboard);