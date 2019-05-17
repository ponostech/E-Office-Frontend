import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import { FormControlLabel, Switch, TextField } from "@material-ui/core";

class FormBuilderConfigView extends Component {

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const{config}=this.props;

    let view=null;
    switch (config.name) {
      case 'text':
        view=(
          <div>
            <TextField label={"Place holder"} variant={"outlined"}/>
            <TextField label={"Pattern"} variant={"outlined"}/>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Primary"
            />
            </div>
        )
        break;
      case "email":
        view=(
          <div>
            <TextField label={"Place holder"} variant={"outlined"}/>
            <TextField label={"Pattern"} variant={"outlined"}/>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Primary"
            />
          </div>
        )
        break;
        case "number":
        view=(
          <div>
            <TextField label={"Place holder"} variant={"outlined"}/>
            <TextField label={"Pattern"} variant={"outlined"}/>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Is Required?"
            />
            <div>
              <TextField type={"number"} variant={"outlined"} label={"Minimum"}/>
              <TextField type={"number"} variant={"outlined"} label={"Maximum"}/>
            </div>
          </div>
        )
        break;
        case "select":
        view=(
          <div>
            <TextField label={"Place holder"} variant={"outlined"}/>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Is Required?"
            />
            <div>

            </div>
          </div>
        )
        break;
    }
    return (
      <GridContainer>
        {view}
      </GridContainer>
    );
  }
}

export default FormBuilderConfigView;