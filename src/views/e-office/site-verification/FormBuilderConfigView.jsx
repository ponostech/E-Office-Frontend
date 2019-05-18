import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import { TextField } from "@material-ui/core";
import SelectOptionView from "./SelectOptionView";
import PropTypes from "prop-types";

class FormBuilderConfigView extends Component {

  state = {
    type: "",

    name: "",
    label: "",
    placeHolder: "",
    required: false,
    minimum: 0,
    maximum: 100,
    pattern: /^\d{10}$/,

    options: []
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  addOptions = (options) => {
    this.setState({ type: "select", options });
  };

  render() {
    const { config } = this.props;

    let view = null;
    switch (config.name) {
      case "text":
        view = (
          <TextField value={this.state.pattern} onChange={e => this.setState({ type: "text", pattern: e.target.value })}
                     label={"Pattern"} variant={"outlined"}/>
        );
        break;
      case "email":
        view = (
          <TextField value={this.state.pattern}
                     onChange={e => this.setState({ type: "email", pattern: e.target.value })} label={"Pattern"}
                     variant={"outlined"}/>
        );
        break;
      case "number":
        view = (
          <div>
            <TextField value={this.state.minimum}
                       onChange={e => this.setState({ type: "number", minimum: e.target.value })} type={"number"}
                       variant={"outlined"} label={"Minimum"}/>
            <TextField value={this.state.maximum}
                       onChange={e => this.setState({ type: "number", maximum: e.target.value })} type={"number"}
                       variant={"outlined"} label={"Maximum"}/>
          </div>
        );
        break;
      case "select":
        view = (
          <SelectOptionView onChange={this.addOptions}/>
        );
        break;
      case "address":
        this.setState({ type: "address" });
        break;
      case "coordinate":
        this.setState({ type: "coordinate" });
        break;
      default:
        break;
    }
    return (
      <GridContainer>
        {view}
      </GridContainer>
    );
  }
}

FormBuilderConfigView.propTypes = {
  save: PropTypes.func.isRequired
};

export default FormBuilderConfigView;