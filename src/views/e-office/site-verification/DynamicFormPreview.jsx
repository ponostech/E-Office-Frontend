import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, CardActions, Divider, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import OfficeInput from "../../../components/UI/Input/OfficeInput";
import FormFieldFactory from "./FormFieldFactory";

class DynamicFormPreview extends Component {

  state={
    title:"",
    subTitle: "",
    formElements:null
  }
  submitHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.formElements) {
      formData[formElementIdentifier] = this.state.formElements[
        formElementIdentifier
        ].value;
    }
  };


  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      formElements:nextProps.formElements
    })
  }
  inputChangedHandler = (event, inputIdentifier) => {
    console.log(inputIdentifier)
  };

  render() {
    const { formElements } = this.state;
    const formElementsArray = [];
    for (let key in this.state.formElements) {
      formElementsArray.push({
        id: key,
        config: this.state.formElements[key]
      });
    }

    let form = (
      <GridItem md={6}>
      <form onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => (
          <FormFieldFactory
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <CardActions>
          <Button variant={"outlined"} color={"primary"}>Save</Button>
          <Button variant={"outlined"} color={"secondary"}>Reset</Button>
        </CardActions>
      </form>
      </GridItem>
    );
    return (
      <GridContainer style={{height:"80vh"}}>
        <GridItem md={12} lg={12}>
          <Typography contentEditable={true} variant={"h6"}>Title</Typography>
          <Typography contentEditable={true} variant={"subtitle2"}>Subtitle</Typography>
        </GridItem>

        <GridItem md={12}>
          <Divider/>
        </GridItem>

        {form}
      </GridContainer>
    );
  }
}

DynamicFormPreview.propTypes={
  formElements:PropTypes.object.isRequired
}
export default DynamicFormPreview;