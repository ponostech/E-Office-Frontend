import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ReceiptDetailEntry from "./ReceiptDetailEntry";
import { Paper } from "@material-ui/core";

class NewReceipt extends Component {
  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Paper style={{padding:20}}>
              <input type={"file"} accept={"application/pdf"}/>
            <div>
              pdf detail and cancel
            </div>
            </Paper>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <ReceiptDetailEntry/>

          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default NewReceipt;