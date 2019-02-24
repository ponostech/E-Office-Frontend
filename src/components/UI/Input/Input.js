import React from "react";
import { TextField } from "@material-ui/core";

const input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <TextField
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        >
          {props.elementConfig.options.map(option => (
            <option value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
          <TextField
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed}
          />
      );
  }

  return (
    <div>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
