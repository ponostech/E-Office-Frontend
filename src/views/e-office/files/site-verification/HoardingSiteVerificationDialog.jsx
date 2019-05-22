import React, { Component } from "react";
import {
  Button,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider
} from "@material-ui/core";
import { SiteVerificationService } from "../../../../services/SiteVerificationService";
import WidgetConstant from "../../../../components/form-builder/WidgetConstant";
import GridItem from "../../../../components/Grid/GridItem";
import FormFieldFactory from "../../../../components/form-builder/FormFieldFactory";
import GridContainer from "../../../../components/Grid/GridContainer";
import PropTypes from "prop-types";

class HoardingSiteVerificationDialog extends Component {
  siteVerification = new SiteVerificationService();
  state = {};

  componentDidMount() {
    this.siteVerification.fetch("hoarding", errorMessage => console.log(errorMessage), template => {
      this.setState({
        title: template.title,
        subTitle: template.subTitle,
        formElements: template.formElements
      });
    })
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
    this.props.onClose(null)
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
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle title={"fd"}>
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <GridContainer justify={"flex-start"}>
            {form}
          </GridContainer>
        </DialogContent>
        <Divider/>
      <DialogActions>
        <Button variant={"outlined"} onClick={this.onSubmit.bind(this)} color={"primary"}> Submit</Button>
        {"\u00A0 "}
        {"\u00A0 "}
        {"\u00A0 "}
        {"\u00A0 "}
        <Button variant={"outlined"} color={"secondary"} onClick={e => onClose(null)}> Reset</Button>
      </DialogActions>
      </Dialog>
    );
  }
}
HoardingSiteVerificationDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired

}

export default HoardingSiteVerificationDialog;