import React, { Component } from "react";
import { AppBar, Button, Card, CardContent, Divider, Tab, Tabs } from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import FormControlUtils from "../../../utils/FormControlUtils";

const DetailEntry = (props) => {
  return <Card>
    <CardContent>
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

    </CardContent>
  </Card>;
};
const CommunicationEntry = (props) => {
  return <Card>
    <CardContent>
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

    </CardContent>
  </Card>;
};

const AddressEntry = (props) => {
  return <Card>
    <CardContent>
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

    </CardContent>
  </Card>;
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
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleTabChange.bind(this)}>
            <Tab label="Item One"/>
            <Tab label="Item Two"/>
            <Tab label="Item Three"/>
          </Tabs>
        </AppBar>
        {value === 0 && <DetailEntry>Receipt Detail</DetailEntry>}
        {value === 1 && <CommunicationEntry>Communication</CommunicationEntry>}
        {value === 2 && <AddressEntry> Category</AddressEntry>}
        <Divider style={{marginTop:10,marginBottom:10}}/>
        <Button variant={"contained"} color={"primary"}>Save</Button>
        <Button variant={"contained"} color={"secondary"}>Reset</Button>
      </div>
    );
  }
}

export default ReceiptDetailEntry;