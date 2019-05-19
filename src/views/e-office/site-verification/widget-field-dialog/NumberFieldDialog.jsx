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
    switch (name) {
      case "name":
        this.setState(state=>{
          state.elementConfig.name=value
        });
        break;
      case "label":
        this.setState(state=>{
          state.elementConfig.label=value
        });
        break;
      case "placeholder":
        this.setState(state=>{
          state.elementConfig.placeholder=value
        });
        break;
      case "minimum":
        this.setState(state=>{
          state.validation.minimum=value;
        })
        break;
        case "maximum":
        this.setState(state=>{
          state.validation.maximum=value;
        })
        break;
      case 'value':
        this.setState({[name]:value})

    }
  };
  handleRadio = event => {
    const validation={
      required:event.target.checked
    }
    this.setState({ validation })
  };
  handleClick = (id, event) => {
    switch (id) {
      case "save":
        this.props.onClose(this.state);
        break;
      case "close":
        this.props.onClose(null);
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