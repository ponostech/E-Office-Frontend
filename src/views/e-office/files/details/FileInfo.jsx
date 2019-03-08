import React, { Component } from "react";
import { Card, CardContent, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import FormControlUtils from "../../../../utils/FormControlUtils";
import NewHoardingApplications from "../../applications/hoarding/HoardingApplications";
import GridItem from "../../../../components/Grid/GridItem";
import DraftList from "../draft/DraftList";
import NotesheetList from "../notesheet/NotesheetList";
import FileMovement from "../movements/FileMovement";

class FileInfo extends Component {
  constructor(props) {
    super(props);

    this.state={
      tabValue:'draft'
    }
  }

  handleTabchange = (event,value) => {
    this.setState({tabValue:value})
  };

  render() {
    const { tabValue } = this.state;

    return (
      <div>
        <Card>
          <CardContent>
            <Typography title={"File Details"} variant={"headline"}>File Details</Typography>
            <div>
              <TextField fullWidth={true} label={"where"}/>
              <GridItem>
              {FormControlUtils.Input("no", "value", "File No", false, false, "", "dense", () => {
              }, true)}
              </GridItem>
              {FormControlUtils.Input("subject", "value", "Subject", false, false, "", "dense", () => {
              }, true)}
              {FormControlUtils.Input("Description", "value", "Description", false, false, "", "dense", () => {
              }, true)}
              {FormControlUtils.Input("category", "value", "Category", false, false, "", "dense", () => {
              }, true)}
              {FormControlUtils.Input("prev_link", "value", "Previous Reference", false, false, "", "dense", () => {
              }, true)}
              {FormControlUtils.Input("next_link", "value", "Next Reference", false, false, "", "dense", () => {
              }, true)}
            </div>
            <div>
              <Tabs
                value={this.state.tabValue}
                    fullWidth={true}
                    style={{ background: "white" ,paddingTop:20}}
                    indicatorColor={"primary"}
                    textColor={"primary"}
                    onChange={this.handleTabchange.bind(this)}>
                <Tab value={"draft"} label={"Draft"}/>
                <Tab value={"notesheet"} label={"NoteSheet"}/>
                <Tab value={"movement"} label={"Movement"}/>
              </Tabs>
              <div style={{ marginTop: 20 }}>
                {tabValue === "draft" && <DraftList/>}
                {tabValue === "notesheet" && <NotesheetList/>}
                {tabValue === "movement" && <FileMovement/>}
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    );
  }
}

export default FileInfo;