import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem";
import FormFieldFactory from "../../../components/form-builder/FormFieldFactory";
import GridContainer from "../../../components/Grid/GridContainer";
import { Button, CardActions, Divider, Typography } from "@material-ui/core";
import WidgetConstant from "../../../components/form-builder/WidgetConstant";

class HotelSiteVerification extends Component {
  state = {
    title: "title",
    subtitle: "subtitle",

    formElements: [
      {
        elementType: WidgetConstant.CHECKBOX,
        elementConfig: {
          name: "name",
          label: "Name of the applicant",
          placeholder: ""
        },
        validation: {
          required: true
        },
        valid: false,
        value: ""
      }, {
        elementType: WidgetConstant.ADDRESS,
        elementConfig: {
          name: "address",
          label: "Address",
          placeholder: "Address"
        },
        validation: {
          required: true
        },
        valid: false,
        value: ""
      }, {
        elementType: WidgetConstant.RADIO,
        elementConfig: {
          name: "gender",
          label: "Gender",
          placeholder: "",
          options: [
            { name: "female", value: "female", label: "female" },
            { name: "male", value: "male", label: "male" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        value: ""
      }
    ]

  };

  checkValidity(value, validation) {
    let isValid = true;

    if (validation.required) {
      isValid = Boolean(value);
    }
    else if (validation.pattern) {
      isValid=value.match(validation.pattern)
    }

    return isValid;
  }

  onSubmit = event => {
    const formData = {};
    const elements = this.state.formElements;
    let valid = true;
    elements.forEach(function(element, index) {
      if (!element.valid) {
        valid = false;
      }
      formData[element.elementConfig.name] = element.value.value ? element.value.value : element.value;
    });
    if (!valid) {
      //TODO::display error message
    }else{
      //TODO::submit form data
    }
    console.log(formData);
  };

  inputChangedHandler = (event, key) => {
    const newElements = [
      ...this.state.formElements
    ];

    let element = newElements[key];
    if (element.elementType === WidgetConstant.SELECT) {
      element.value = event;
    }else if (element.elementType === WidgetConstant.CHECKBOX) {
      element.value=event.target.checked
    } else if (element.elementType === WidgetConstant.ADDRESS) {
      element.value = event;
    } else {
      element.value = event.target.value;
    }
    element.valid = this.checkValidity(element.value, element.validation);

    this.setState({ formElements: newElements });
  };

  render() {
    const { formElements } = this.state;
    let form = (
      <>
        {formElements.map((element, index) => (
          <GridItem key={index} md={6}>

            <FormFieldFactory
              key={index}
              elementType={element.elementType}
              elementConfig={element.elementConfig}
              validation={element.validation}
              value={element.value}
              changed={event => this.inputChangedHandler(event, index)}
            />
          </GridItem>
        ))}

      </>
    );
    return (
      <>
        <GridContainer>
          <GridItem md={12}>
            <Typography variant={"h6"}>{this.state.title}</Typography>
            <Typography variant={"h6"}>{this.state.subtitle}</Typography>
          </GridItem>
          <GridItem md={12}>
            <Divider/>
          </GridItem>

          <GridItem md={12}>

            <GridContainer>
              {form}
            </GridContainer>

          </GridItem>
          <GridItem md={12}>
            <CardActions style={{ justifyContent: "flex-end" }}>

              <Button variant={"outlined"} onClick={this.onSubmit.bind(this)} color={"primary"}> Submit</Button>
              {"\u00A0 "}
              {"\u00A0 "}
              {"\u00A0 "}
              {"\u00A0 "}
              <Button variant={"outlined"} color={"secondary"} onClick={e => window.location.reload()}> Reset</Button>
            </CardActions>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

export default HotelSiteVerification;