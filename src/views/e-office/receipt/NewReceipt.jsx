import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ReceiptDetailEntry from "./ReceiptDetailEntry";
import { Paper } from "@material-ui/core";

class NewReceipt extends Component {
  render() {
    return (
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={6}>
            <Paper style={{padding:20}}>
              <input onChange={(e)=>{console.log(e)}} type={"file"} accept={"application/pdf"}/>
            <div>
              pdf detail and cancel
            </div>
            </Paper>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <div>
            <ReceiptDetailEntry/>
            </div>
          </GridItem>
        </GridContainer>
    );
  }
}

export default NewReceipt;