import React, { Component } from "react";
import { Card, CardActions } from "@material-ui/core";
import OfficeInput from "../components/UI/Input/OfficeInput";
import GridItem from "../components/Grid/GridItem";

class Form extends Component {
  state = {
    AMCForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        value: ""
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Fill your address"
        },
        validation: {
          required: false
        },
        valid: true,
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Fill your email address"
        },
        validation: {
          required: false
        },
        valid: true,
        value: ""
      },
      select: {
        elementType: "select",
        elementConfig: {
          placeholder: 'Select',
          options: [
            { value: "one", displayValue: "One" },
            { value: "two", displayValue: "Two" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  static checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  submitHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.AMCForm) {
      formData[formElementIdentifier] = this.state.AMCForm[
        formElementIdentifier
      ].value;
    }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedAMCForm = {
      ...this.state.AMCForm
    };

    const updatedFormElement = {
      ...updatedAMCForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = Form.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedAMCForm[inputIdentifier] = updatedFormElement;
    this.setState({ AMCForm: updatedAMCForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.AMCForm) {
      formElementsArray.push({
        id: key,
        config: this.state.AMCForm[key]
      });
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => (
          <OfficeInput
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <CardActions>
          <input type="submit"/>
        </CardActions>
      </form>
    );

    return (
      <GridItem>
        <h3>Form</h3>
        <GridItem>
          <Card>{form}</Card>
        </GridItem>
      </GridItem>
    );
  }
}

export default Form;
