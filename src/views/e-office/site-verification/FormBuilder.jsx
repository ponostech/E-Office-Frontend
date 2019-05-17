import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button } from "@material-ui/core";
import FormBuilderDialog from "./FormBuilderDialog";

class FormBuilder extends Component {
  state={
    openAdd:false
  }
  render() {
    return (
      <GridContainer>

        <GridItem md={12}>
          <Button onClick={e=>this.setState({openAdd:true})}>Add New Widget</Button>
        </GridItem>

        <FormBuilderDialog open={this.state.openAdd} onClose={e=>this.setState({openAdd:false})}/>
      </GridContainer>
    );
  }
}

export default FormBuilder;