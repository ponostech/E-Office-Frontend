import React, { Component } from "react";
import { AppBar, Button, Card, CardContent, Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import FormControlUtils from "../../../utils/FormControlUtils";

const DetailEntry = (props) => {
  return <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
      </GridContainer>

  </div>;
};
const CommunicationEntry = (props) => {
  return <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>

      </GridContainer>
  </div>;
};

const AddressEntry = (props) => {
  return <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {FormControlUtils.Input("name", "name", "name", false, false, "text", "dense", () => {
          }, true)}
        </GridItem>
      </GridContainer>

};

class ReceiptDetailEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Paper style={{padding:20}}>
        <Typography style={{margin:10}} variant={"headline"}>Receipt Info</Typography>
          <Tabs style={{background:'white'}} indicatorColor={"primary"} variant={"standard"}  value={value} onChange={this.handleTabChange.bind(this)}>
            <Tab value={0} label="Receipt Detail"/>
            <Tab value={1} label="Communication"/>
            <Tab value={2} label="Category"/>
          </Tabs>
        {value === 0 && <DetailEntry>Receipt Detail</DetailEntry>}
        {value === 1 && <CommunicationEntry>Communication</CommunicationEntry>}
        {value === 2 && <AddressEntry> Category</AddressEntry>}
        <Divider style={{marginTop:10,marginBottom:10}}/>
        <Button variant={"contained"} color={"primary"}>Save</Button>
        <Button variant={"contained"} color={"secondary"}>Reset</Button>
      </Paper>
    );
  }
}

export default ReceiptDetailEntry;