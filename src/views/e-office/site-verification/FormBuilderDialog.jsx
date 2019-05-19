import React, { Component } from "react";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider, FormControlLabel,
  IconButton, Switch,
  TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import OfficeSelect from "../../../components/OfficeSelect";
import FormBuilderConfigView from "./FormBuilderConfigView";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

class FormBuilderDialog extends Component {
  state = {
    name:"",
    label:"",
    placeHolder:"",
    selectedControl:undefined,
    config:null,


    selectOptions: [
      { value: "text", label: "Textfield" },
      { value: "radio", label: "Radio" },
      { value: "checkbox", label: "Checkbox" },
      { value: "select", label: "Select" },
      { value: "email", label: "Email" },
      { value: "number", label: "Number" },
      { value: "address", label: "Address" },
      { value: "coordinate", label: "Coordinate" }
    ]
  };
  handleSelectChanged = (selected) => {
    this.setState({selectedControl:selected});
    this.renderControl(selected)
  };

  handleRadio = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleChange=(e)=>{
    // this.setState({[e.target.name]:e.target.value});
  }

  renderControl=(selected)=>{
    let config = {
      name:selected.value,
      placeHolder:"Place holder",
      required:true
    };
      switch (selected.value) {
        case 'text':
          config.pattern="";
          break;
        case "email":
          config.pattern="";
          break;
        case "number":
          config.minimum=0;
          config.maximum=100;
          break;
          case "radio":
            config.options = [];
          break;
        case "select":
          config.options=[];
          break;
        default:
          break;
      }
      this.setState({config})
  }

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
        <CardHeader title={"Add New Widget"} action={
          <IconButton onClick={onClose}>
            <CloseIcon color={"action"}/>
          </IconButton>
        }/>
        <Divider/>
        <DialogContent style={{height:"90vh"}}>

          <GridContainer>
            <GridItem md={6}>

          <TextField
            variant={"outlined"}
            fullWidth={true}
            margin={"dense"}
            label={"Name of Field (Name must be unique)"}
            value={this.state.name}
            required={true}/>
            </GridItem>

            <GridItem md={6}>
              <TextField
                variant={"outlined"}
                fullWidth={true}
                margin={"dense"}
                label={"Label"}
                value={this.state.label}
                required={true}/>
            </GridItem>

            <GridItem md={6}>
              <TextField
                variant={"outlined"}
                fullWidth={true}
                margin={"dense"}
                label={"PlaceHolder"}
                value={this.state.placeHolder}
                required={true}/>
            </GridItem>

            <GridItem md={6}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={this.handleRadio('checkedB')}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Is Required?"
              />
            </GridItem>

            <GridItem md={12}>
              <OfficeSelect
                variant={"outlined"}
                fullWidth={true}
                margin={"dense"}
                label={"Select Widget"}
                required={true}
                value={this.state.selectedControl}
                onChange={this.handleSelectChanged.bind(this)}
                options={this.state.selectOptions}/>
            </GridItem>


          </GridContainer>

          <Divider/>

          {/*{this.state.config?<FormBuilderConfigView  config={this.state.config}/>:""}*/}
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button variant={"outlined"} color={"primary"}>Save</Button>
          <Button variant={"outlined"} color={"secondary"}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FormBuilderDialog;