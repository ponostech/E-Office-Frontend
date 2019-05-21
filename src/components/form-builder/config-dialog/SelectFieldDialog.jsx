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
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  TextField,
  Typography
} from "@material-ui/core";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import GridContainer from "../../Grid/GridContainer";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import PropTypes from "prop-types";

class SelectFieldDialog extends Component {
  state = {
    elementType: "Select",
    elementConfig: {
      name: "name",
      label: "Name",
      placeholder: "placeholder",
      options:[]
    },
    validation: {
      required: false
    },
    valid: false,
  };


  addItem = () => {
    let options = this.state.elementConfig.options;
    options.push({ name: "unique_name", value: "Value", label: "Display Name" });
    let elementConfig=this.state.elementConfig;
    elementConfig.options = options;

    this.setState({ elementConfig });
  };
  handleDelete = (index, event) => {
    let elementConfig = [this.state.elementConfig];
    elementConfig.options.slice(index, 1);
    this.setState({ elementConfig });
  };

  handleItemChange = (index, e) => {
    let item = this.state.elementConfig.options[index];
    let temp = {};
    const { value, name } = e.target;
    switch (name) {
      case "name":
        temp.name = value;
        break;
      case "value":
        temp.value = value;
        break;
      case "label":
        temp.label = value;
        break;

    }
    Object.assign(item, temp);
  };
  handleClick = (id, event) => {
    const { widget, onClose } = this.props;
    switch (id) {
      case "save":
        const config = {
          elementType: widget.name,
          elementConfig:{
            name: this.state.elementConfig.name,
            label: this.state.elementConfig.label,
            placeholder: this.state.elementConfig.placeholder,
            options:this.state.elementConfig.options
          },
          validation:{
            required: this.state.validation.required
          },
          valid:false,
          value: null,
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
  handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        this.setState(state => {
          state.elementConfig.name = value;
        });
        break;
      case "label":
        this.setState(state => {
          state.elementConfig.label = value;
        });
        break;
      case "placeholder":
        this.setState(state => {
          state.elementConfig.placeholder = value;
        });
        break;
    }
  };
  handleRadio = event => {
    const validation = {
      required: event.target.checked
    };
    this.setState({
      validation
    });
  };

  render() {
    const { open, onClose,widget } = this.props;

    const self = this;
    return (
      <Dialog open={open} onClose={this.handleClick.bind(this,"close")} fullWidth={true} maxWidth={"md"}>

        <CardHeader title={`Configuration (${widget?widget.name:""})`} action={
          <IconButton onClick={this.handleClick.bind(this,"close")}>
            <CloseIcon color={"action"}/>
          </IconButton>
        }/>
        <Divider/>
        <DialogContent>

          <GridContainer spacing={16}>
            <TextField name={"name"} value={this.state.name} onChange={this.handleChange.bind(this)}
                       variant={"outlined"} margin={"dense"} label={"Name"} fullWidth={true}/>
            <TextField name={"label"} value={this.state.label} onChange={this.handleChange.bind(this)}
                       variant={"outlined"} margin={"dense"} label={"Label"} fullWidth={true}/>
            <TextField name={"placeholder"} value={this.state.placeholder} onChange={this.handleChange.bind(this)}
                       variant={"outlined"} margin={"dense"} label={"Place Holder"} fullWidth={true}/>

            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleRadio.bind(this)}
                  value={this.state.required}
                  color="primary"
                />
              }
              label="Required?"
            />
            <Typography variant={"subtitle2"}>Options</Typography>
            <List>
              {
                this.state.elementConfig.options.map(function(item, index) {
                  return (
                    <div key={index}>
                      <ListItem>
                        <ListItemText>
                          <TextField
                            variant={"outlined"} margin={"dense"} name={"name"} required={true}
                            onChange={self.handleItemChange.bind(this, index)} label={"Name"}/>
                          <TextField
                            variant={"outlined"} margin={"dense"} name={"value"} required={true}
                            onChange={self.handleItemChange.bind(this, index)} label={"Value"}/>
                          <TextField
                            variant={"outlined"} margin={"dense"} name={"label"} required={true}
                            onChange={self.handleItemChange.bind(this, index)} label={"Label"}/>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton onClick={self.handleDelete.bind(this, index)}>
                            <TrashIcon color={"secondary"}/>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </div>
                  );
                })
              }
            </List>
            <Button onClick={this.addItem.bind(this)} variant={"outlined"} color={"primary"}>ADD</Button>
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

SelectFieldDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default SelectFieldDialog;