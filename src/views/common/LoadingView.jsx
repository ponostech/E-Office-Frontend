import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

class LoadingView extends Component {
  render() {
    const { md,...rest } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={md} {...rest}>
            <CircularProgress variant={"indeterminate"} style={{width:100,height:100}}/>

        </GridItem>
      </GridContainer>
    );
  }
}

export default LoadingView;