import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import OfficePageHeader from "../components/Header/OfficePageHeader";
import { Route } from "react-router-dom";
import DeskView from "../views/e-office/DeskView";
import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import NewReceipt from "../views/e-office/receipt/NewReceipt";

class OfficeDashboard extends Component {
  render() {
    return (
      <div>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={12}>
            <OfficePageHeader color={"primary"}/>
          </GridItem>
          <GridItem style={{ marginTop: 70 }} xs={12} sm={12} md={10}>

            <GridContainer justify={"center"}>
              <Route path={OfficeRoutes.DESK} component={DeskView}/>
              <Route path={OfficeRoutes.NEW_RECEIPT} component={NewReceipt}/>


            </GridContainer>

          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default OfficeDashboard;