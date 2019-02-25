import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";

class Form extends Component {
  state = {
    AMCForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: ""
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Fill your address"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Fill your email address"
        },
        value: ""
      },
      select: {
        elementType: "select",
        elementConfig: {
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
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
      </form>
    );

    return (
      <div>
        <h3>Form</h3>
        {form}
      </div>
    );
  }
}

export default Form;
