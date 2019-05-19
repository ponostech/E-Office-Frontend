import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Typography } from "@material-ui/core";

class FormBuilderView extends Component {

  render() {
    return (
      <GridContainer>
        <GridItem md={12} lg={12}>
          <Typography contentEditable={true} variant={"h6"}>Title</Typography>
          <Typography contentEditable={true} variant={"subtitle2"}>Subtitle</Typography>
          {/*<List>*/}

          {/*</List>*/}
        </GridItem>

      </GridContainer>
    );
  }
}

export default FormBuilderView;