import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import OfficePageHeader from "../components/Header/OfficePageHeader";
import { Route } from "react-router-dom";
import DeskView from "../views/e-office/DeskView";
import NewFile from "../views/e-office/files/NewFile";
import CreatedFiles from "../views/e-office/files/CreatedFiles";
import SentFiles from "../views/e-office/files/SentFiles";
import { AmcRoutes } from "../config/routes-constant/AmcRoutes";

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
              <Route path={AmcRoutes.DESK} component={DeskView}/>
              <Route path={AmcRoutes.NEW_FILE} component={NewFile}/>
              <Route path={AmcRoutes.CREATED_FILES} component={CreatedFiles}/>
              <Route path={AmcRoutes.SENT_FILE} component={SentFiles}/>

            </GridContainer>

          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default OfficeDashboard;