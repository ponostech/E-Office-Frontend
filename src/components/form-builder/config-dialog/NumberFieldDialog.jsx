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
import GridContainer from "../../Grid/GridContainer";
import WidgetConstant from "../WidgetConstant";

class NumberFieldDialog extends Component {

  state = {
    name: "",
    label: "",
    placeholder: "",
    minimum: 0,
    maximum:100,
    required:false,

    value: "Default value",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({[name]:value})
  };

  handleRadio = event => {
    this.setState({ required:event.target.checked })
  };
  handleClick = (id, event) => {
    const { widget, onClose } = this.props;
    switch (id) {
      case "save":
        const config = {
          elementType: WidgetConstant.NUMBER,
          elementConfig:{
            name: this.state.name,
            label: this.state.label,
            placeholder: this.state.placeholder,
          },
          validation:{
            required: this.state.required
          },
          valid:false,
          value: this.state.value,
        };
        onClose(this.state.name,config);
        this.doClear();
        break;
      case "close":
        this.doClear();
        onClose(null,null);
        break;
      default:
        break;
    }
  };
  doClear=()=>{
    this.setState({
      name:"",
      label:"",
      placeholder:"",
      pattern:"",
      value: "",
      required:false
    })
  }
  render() {
    const { open, onClose,widget } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClick.bind(this,"close")} fullWidth={true} maxWidth={"md"}>

        <CardHeader title={`Configuration (${widget?widget.name:""})`} action={
          <IconButton onClick={onClose}>
            <CloseIcon color={"action"}/>
          </IconButton>
        }/>
        <Divider/>
        <DialogContent>

          <GridContainer>
            <TextField name={"name"} onChange={this.handleChange.bind(this)} required={true} value={this.state.name}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Name"}/>
            <TextField name={"label"} onChange={this.handleChange.bind(this)} required={true} value={this.state.label}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Label"}/>
            <TextField name={"placeholder"} onChange={this.handleChange.bind(this)} required={true} value={this.state.placeholder}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"PlaceHolder"}/>
            <TextField name={"minimum"} onChange={this.handleChange.bind(this)} required={true} type={"number"}
                       value={this.state.minimum} variant={"outlined"} fullWidth={true} margin={"dense"}
                       label={"Minimum"}/>
            <TextField name={"maximum"} onChange={this.handleChange.bind(this)} required={true} type={"number"}
                       value={this.state.maximum} variant={"outlined"} fullWidth={true} margin={"dense"}
                       label={"Maximum"}/>

            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleRadio.bind(this)}
                  value={this.state.required}
                  checked={this.state.required}
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