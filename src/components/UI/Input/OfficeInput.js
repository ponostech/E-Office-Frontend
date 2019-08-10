import React, { Component } from "react";
import {Select, TextField, MenuItem, CardActions} from "@material-ui/core";


class OfficeInput extends Component {

  render() {

    switch (this.props.elementType) {
      case "input":
        this.inputElement = (
          <TextField
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );
        break;

      case "textarea":
        this.inputElement = (
          <textarea
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );
        break;

      case "select":
        this.inputElement = (
          <Select
            onChange={this.props.changed}
            {...this.props.elementConfig}
            value={this.props.value}
          >
            {this.props.elementConfig.options.map(option => (
              <MenuItem value={option.value}>{option.displayValue}</MenuItem>
            ))}
          </Select>
        );
        break;

      default:
        this.inputElement = (
          <TextField
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );
    }

    return <>{this.inputElement}</>;
  }
}

export default OfficeInput;
