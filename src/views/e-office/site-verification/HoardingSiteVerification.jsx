import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem";
import FormFieldFactory from "../../../components/form-builder/FormFieldFactory";
import GridContainer from "../../../components/Grid/GridContainer";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import WidgetConstant from "../../../components/form-builder/WidgetConstant";
import { SiteVerificationService } from "../../../services/SiteVerificationService";

class HoardingSiteVerification extends Component {
  siteVerification = new SiteVerificationService();
  state = {};

  componentDidMount() {
    this.props.doLoad(true);
    this.siteVerification.getTemplate("hoarding", errorMessage => console.log(errorMessage), template => {
      this.setState({
        title: template.title,
        subTitle: template.subTitle,
        formElements: template.formElements
      });
    })
      .finally(() => this.props.doLoad(false));
  }

  checkValidity(value, validation) {
    let isValid = true;

    if (validation.required) {
      isValid = Boolean(value);
    } else if (validation.pattern) {
      isValid = value.match(validation.pattern);
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
    } else {
      //TODO::submit form data
    }
    console.log(formData);
    // this.siteVerification.submit
  };

  inputChangedHandler = (event, key) => {
    const newElements = [
      ...this.state.formElements
    ];

    let element = newElements[key];
    if (element.elementType === WidgetConstant.SELECT) {
      element.value = event;
    } else if (element.elementType === WidgetConstant.CHECKBOX) {
      element.value = event.target.checked;
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
    let form = (<p>No site verification is generated</p>);
    if (formElements) {
      form = (
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
    }

    return (
      <>
        <Card>
          <CardHeader title={this.state.title ? this.state.title : ""} subheader={this.state.subTitle ? this.state.subTitle : ""}/>
          <Divider/>
          <CardContent>
            <GridContainer justify={"flex-start"}>
                  {form}
            </GridContainer>
          </CardContent>
          <Divider/>
          <CardActions style={{ justifyContent: "flex-end" }}>

            <Button variant={"outlined"} onClick={this.onSubmit.bind(this)} color={"primary"}> Submit</Button>
            {"\u00A0 "}
            {"\u00A0 "}
            {"\u00A0 "}
            {"\u00A0 "}
            <Button variant={"outlined"} color={"secondary"} onClick={e => window.location.reload()}> Reset</Button>
          </CardActions>
        </Card>

      </>
    );
  }
}

export default HoardingSiteVerification;