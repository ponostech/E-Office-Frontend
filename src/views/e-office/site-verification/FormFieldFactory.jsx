import React, { Component } from "react";
import { MenuItem, Select, TextField } from "@material-ui/core";
import OfficeSelect from "../../../components/OfficeSelect";

class FormFieldFactory extends Component {

  render() {

    switch (this.props.elementType) {
      case "Textfield":
        this.inputElement = (
          <TextField
            variant={"outlined"}
            fullWidth={true}
            margin={"dense"}
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );
        break;

      case "Number":
        this.inputElement = (
          <TextField
            {...this.props.elementConfig}
            inputProps={{
              min:this.props.validation.minimum,
              max:this.props.validation.maximum,
            }}
            variant={"outlined"}
            fullWidth={true}
            margin={"dense"}
            required={this.props.validation.required}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );
        break;

      case "Select":
        this.inputElement = (
          <OfficeSelect
            {...this.props.elementConfig}
            variant={"outlined"}
            fullWidth={true}
            margin={"dense"}
            required={this.props.validation.required}
            value={this.props.value}
            onChange={this.props.changed}
            options={this.props.elementConfig.options}
          />
        );
        break;

      default:
          this.inputElement = (
            <TextField
              variant={"outlined"}
              fullWidth={true}
              margin={"dense"}
              {...this.props.elementConfig}
              value={this.props.value}
              onChange={this.props.changed}
            />
          );
        break;
    }

    return <>{this.inputElement}</>;
  }

}

export default FormFieldFactory;