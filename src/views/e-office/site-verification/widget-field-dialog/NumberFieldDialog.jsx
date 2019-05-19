import React, { Component } from "react";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import GridContainer from "../../../../components/Grid/GridContainer";

class NumberFieldDialog extends Component {

  state = {
    elementType: "Number",
    elementConfig:{
      type:"Number",
      name: "name",
      label: "Name",
      placeholder: "placeholder",
    },
    validation:{
      required: true,
      minimum: 0,
      maximum: 100,
    },
    valid:false,
    value: "Default value",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    let elementConfig=this.state.elementConfig;
    let validation=this.state.validation;
    switch (name) {
      case "name":
        elementConfig.name=value;
        this.setState({elementConfig});
        break;
      case "label":
        elementConfig.label=value;
        this.setState({elementConfig});
        break;
      case "placeholder":
        elementConfig.placeholder=value;
        this.setState({elementConfig});
        break;
      case "minimum":
        validation.minimum=value;
        this.setState({ validation});
        break;
      case "maximum":
        validation.maximum = value;
        this.setState({validation});
        break;
      case 'value':
        this.setState({[name]:value});
        break;
    }
  };

  handleRadio = event => {
    const validation={
      required:event.target.checked
    }
    this.setState({ validation })
  };
  handleClick = (id, event) => {
    const { widget, onClose } = this.props;
    switch (id) {
      case "save":
        onClose(widget.name,this.state);
        break;
      case "close":
        onClose(null,null);
        break;
      default:
        break;
    }
  };

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>

        <CardHeader title={"Configuration"} action={
          <IconButton onClick={onClose}>
            <CloseIcon color={"action"}/>
          </IconButton>
        }/>
        <Divider/>
        <DialogContent>

          <GridContainer>
            <TextField onChange={this.handleChange.bind(this)} required={true} value={this.state.elementConfig.name}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Name"}/>
            <TextField onChange={this.handleChange.bind(this)} required={true} value={this.state.elementConfig.label}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Label"}/>
            <TextField onChange={this.handleChange.bind(this)} required={true} value={this.state.elementConfig.placeholder}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"PlaceHolder"}/>
            <TextField onChange={this.handleChange.bind(this)} required={true} type={"number"}
                       value={this.state.validation.minimum} variant={"outlined"} fullWidth={true} margin={"dense"}
                       label={"Minimum"}/>
            <TextField onChange={this.handleChange.bind(this)} required={true} type={"number"}
                       value={this.state.validation.maximum} variant={"outlined"} fullWidth={true} margin={"dense"}
                       label={"Maximum"}/>

            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleRadio.bind(this)}
                  value={this.state.validation.required}
                  color="primary"
                />
              }
              label="Required?"
            />
          </GridContainer>

        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} color={"primary"} onClick={this.handleClick.bind(this, "save")}>Save</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.handleClick.bind(this, "close")}>Close</Button>
        </DialogActions>
      </Dialog>

    );
  }
}

export default NumberFieldDialog;