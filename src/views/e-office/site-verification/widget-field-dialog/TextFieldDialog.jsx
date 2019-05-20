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
import CloseIcon from "@material-ui/icons/Close";
import GridContainer from "../../../../components/Grid/GridContainer";

class TextFieldDialog extends Component {
  state = {
    elementType: "Textfield",
    elementConfig:{
      name: "name",
      label: "Name",
      placeholder: "placeholder",
    },
    validation:{
      required: true
    },
    valid:false,
    value: "Default value",
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("component update")
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let elementConfig=this.state.elementConfig;
    switch (name) {
      case "name":
        elementConfig.name=value;
        this.setState({elementConfig})
        break;
      case "label":
        elementConfig.label=value;
        this.setState({elementConfig})
        break;
      case "placeholder":
        elementConfig.placeholder=value;
        this.setState({elementConfig})
        break;
      case 'value':
        this.setState({[name]:value})
        break;
    }
  };
  handleRadio = event => {
    const validation={
      required:event.target.checked
    }
    this.setState({
      validation
    })
  };
  handleClick = (id, event) => {
    const { widget, onClose } = this.props;

    switch (id) {
      case "save":
        const config = {
          elementType: "Textfield",
          elementConfig:{
            name: this.state.elementConfig.name,
            label: this.state.elementConfig.label,
            placeholder: this.state.elementConfig.placeholder,
          },
          validation:{
            required: this.state.validation.required
          },
          valid:false,
          value: this.state.value,
        };
        onClose(this.state.elementConfig.name,config);
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
    const self = this;

    return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>

        <CardHeader title={"Configuration"} action={
          <IconButton onClick={this.handleClick.bind(this,"close")}>
            <CloseIcon color={"action"}/>
          </IconButton>
        }/>
        <Divider/>
        <DialogContent>

          <GridContainer>
            <TextField name={"name"} onChange={this.handleChange.bind(this)} required={true} value={this.state.elementConfig.name}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Name"}/>
            <TextField name={"label"} onChange={this.handleChange.bind(this)} required={true} value={this.state.elementConfig.label}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Label"}/>
            <TextField name={"placeholder"} onChange={this.handleChange.bind(this)} required={true}
                       value={this.state.elementConfig.placeholder}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"PlaceHolder"}/>

            <TextField name={"value"} onChange={this.handleChange.bind(this)} required={true} value={this.state.value}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Default Value"}/>

            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleRadio.bind(this)}
                  value={this.state.validation.required}
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

export default TextFieldDialog;