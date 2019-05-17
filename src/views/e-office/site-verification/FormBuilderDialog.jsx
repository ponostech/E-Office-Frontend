import React, { Component } from "react";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
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
    this.setState({selectedControl:selected})
    this.renderControl(selected)
  };

  renderControl=(selected)=>{
    let config = null;
      switch (selected.value) {
        case 'text':
          config={
            name:"text",
            placeHolder:"",
            required:false,
            pattern:"",
          }
          break;
        case "email":
          config={
            name:"email",
            placeHolder:"",
            required:false,
            pattern: ""
          }
          break;
        case "number":
          config={
            name:"number",
            placeHolder:"",
            required:false,
            min:0,
            max:10
          }
          break;
          case "radio":
          config={
            placeHolder:"",
            required:false,
            options:[]
          }
          break;
          case "select":
          config={
            placeHolder:"",
            required:false,
            options:[]
          }
          break;
        case "address":
          config={
            placeHolder:"",
            required:false,
          };
          break;
        case 'coordinate':
          config={
            required:true
          }
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

          {this.state.config?<FormBuilderConfigView config={this.state.config}/>:""}
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