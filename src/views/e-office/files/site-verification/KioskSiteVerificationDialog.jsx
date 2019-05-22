import React, { Component } from "react";
import {
  Button,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider, Typography
} from "@material-ui/core";
import { SiteVerificationService } from "../../../../services/SiteVerificationService";
import WidgetConstant from "../../../../components/form-builder/WidgetConstant";
import GridItem from "../../../../components/Grid/GridItem";
import FormFieldFactory from "../../../../components/form-builder/FormFieldFactory";
import GridContainer from "../../../../components/Grid/GridContainer";
import PropTypes from "prop-types";


class KioskSiteVerificationDialog extends Component {
  siteVerification = new SiteVerificationService();
  state = {

    loading:true
  };

  componentDidMount() {
    this.siteVerification.getTemplate("kiosk", errorMessage => console.log(errorMessage), template => {
      this.setState({
        title: template.title,
        subTitle: template.subTitle,
        formElements: template.formElements
      });
    })
      .finally(() => this.setState({loading:false}));
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
    const { file } = this.props;
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
    let url="site-verifications/kiosk/"+file.fileable_id;
    let template={
      title:this.state.title,
      subTitle:this.state.subTitle,
      formElements:this.state.formElements
    }
    this.props.onClose(url,formData,template);
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
    const { formElements,loading } = this.state;
    const { open, onClose,file } = this.props;

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
      <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={onClose}>
        <DialogTitle title={"title"}>
          <Typography variant={"title"}>FILE NO: {file.number}</Typography>
          <Typography variant={"subtitle1"}>SITE VERIFICATION OF {file.subject}</Typography>
        </DialogTitle>
        <Divider/>

        <DialogContent>
          <GridContainer justify={"flex-start"}>
            {loading?"loading":form}
          </GridContainer>
        </DialogContent>
        <Divider/>
      <DialogActions>
        <Button variant={"outlined"} onClick={this.onSubmit.bind(this)} color={"primary"}> Submit</Button>
        {"\u00A0 "}
        {"\u00A0 "}
        {"\u00A0 "}
        {"\u00A0 "}
        <Button variant={"outlined"} color={"secondary"} onClick={e => onClose(null)}> Close</Button>
      </DialogActions>
      </Dialog>
    );
  }
}
KioskSiteVerificationDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired,
  file:PropTypes.object.isRequired
}

export default KioskSiteVerificationDialog;