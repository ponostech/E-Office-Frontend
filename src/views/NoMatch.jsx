import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import { Button, Typography } from "@material-ui/core";

export default class NoMatch extends Component {

  handleBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={8}>
            <Typography color={"textPrimary"} variant={"headline"}> Oopps </Typography>
            <Button onClick={this.handleBack.bind(this)}>
              go back
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
