import React, { Component } from "react";
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer";
import FileInfo from "./FileInfo";
import FileMenu from "./FileMenu";
import ApplicationReport from "./ApplicationReport";
import { Paper } from "@material-ui/core";

class FileDetail extends Component {
  render() {
    return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <FileInfo/>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <ApplicationReport/>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <FileMenu/>
          </GridItem>
        </GridContainer>
    );
  }
}

export default FileDetail;