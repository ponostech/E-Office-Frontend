import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, CardActions, DialogActions, Divider, IconButton, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import FormFieldFactory from "./FormFieldFactory";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";

class DynamicFormPreview extends Component {

  state = {
    title: "",
    subTitle: "",
    formElements: []
  };
  submitHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let key in this.state.formElements) {
      formData[key] = this.state.formElements[key].value;
    }
  };

  removeItem = (index, e) => {
    let formElements = this.state.formElements;
    formElements.splice(index, 1);
    this.setState({ formElements });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      formElements: nextProps.formElements
    });
  }

  inputChangedHandler = (event, inputIdentifier) => {
  console.log(inputIdentifier);
  };

  render() {
    const { formElements } = this.state;

    let form = (
      <>
        {formElements.map((element, index) => (
          <>
            <GridItem md={5}>

              <FormFieldFactory
                key={element.key}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                validation={element.config.validation}
                value={element.config.value}
                changed={event => this.inputChangedHandler(event, element.key)}
              />
            </GridItem>
            <GridItem md={1}>
              <IconButton onClick={this.removeItem.bind(this, index)}>
                <TrashIcon color={"secondary"}/>
              </IconButton>
            </GridItem>
          </>
        ))}

      </>
    );
    return (
      <GridContainer justify={"flex-start"} alignItems={"flex-start"} style={{ height: "80vh" }}>
        <GridItem md={12} lg={12}>
          <Typography  contentEditable={true} variant={"h6"}>title</Typography>
          <Typography  contentEditable={true} variant={"subtitle2"}>Subtitle</Typography>
        </GridItem>

        <GridItem md={12}>
          <Divider/>
        </GridItem>
        {form}
        <DialogActions>
          <Button onClick={this.submitHandler} variant={"outlined"} color={"primary"}>Save</Button>
          <Button onClick={e => this.setState({ formElements: [] })} variant={"outlined"}
                  color={"secondary"}>Reset</Button>
        </DialogActions>
      </GridContainer>
    );
  }
}

DynamicFormPreview.propTypes = {
  formElements: PropTypes.object.isRequired
};
export default DynamicFormPreview;