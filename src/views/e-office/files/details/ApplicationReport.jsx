import React, { Component } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

class ApplicationReport extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography title={"Application Details"} variant={"headline"}>File Contents</Typography>
            <p>Appllication details</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography title={"Verification Report"} variant={"headline"}/>
            <p>Site Verification Report details</p>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default ApplicationReport;