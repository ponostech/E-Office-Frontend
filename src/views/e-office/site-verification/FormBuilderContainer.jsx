import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {
  Divider,
  Icon,
  IconButton,
  List,
  ListItem, ListItemIcon,
  ListItemSecondaryAction,
  ListItemText, TextField,
  Typography
} from "@material-ui/core";
import Card from "../../../components/Card/Card";
import SelectFieldDialog from "./widget-field-dialog/SelectFieldDialog";
import DynamicFormPreview from "./DynamicFormPreview";
import TextFieldDialog from "./widget-field-dialog/TextFieldDialog";
import NumberFieldDialog from "./widget-field-dialog/NumberFieldDialog";

const widgets = [
  { name: "Textfield", icon: "keyboard_arrow_right" },
  { name: "Email", icon: "email" },
  { name: "Phone", icon: "phone" },
  { name: "Number", icon: "looks_one" },
  { name: "Address", icon: "pin_drop" },
  { name: "Coordinate", icon: "donut_small" },
  { name: "Radio", icon: "radio_button_checked" },
  { name: "Checkbox", icon: "checked" },
  { name: "Select", icon: "list" }
];

class FormBuilderContainer extends Component {

  constructor(props) {
    super(props);

    this.state={
      openTextDialog:false,
      openNumberDialog:false,
      openSelectDialog:false,
      selectedWidget:null,

      formElement:{},
    }
  }
  handleClick = (identifier,event) => {
    switch (identifier.name) {
      case "Select":
        this.setState({selectedWidget:identifier,openSelectDialog:true});
        break;
      case "Number":
        this.setState({selectedWidget:identifier,openNumberDialog:true});
        break;
      default:
        this.setState({selectedWidget:identifier,openTextDialog:true});
        break;

    }
  };

  addWidget=(type,config)=>{
    let data=this.state.formElement;
    data[type]=config;

    this.setState({
      openNumberDialog:false,
      openSelectDialog:false,
      openTextDialog:false,
      formElement:data
    });
  }
  render() {
    const self = this;
    return (
      <GridContainer>
        <GridItem md={3} lg={3}>
          <Typography variant={"h6"}>Add New Widget</Typography>
          <TextField margin={"dense"} variant={"outlined"} fullWidth={true} placeholder={"Search"}/>
          <Divider/>
          <List>
            {
              widgets.map(function(item, index) {
                return (
                  <>
                    <ListItem onClick={self.handleClick.bind(this,item)} button={true} color={"primary"} key={index}>
                      <ListItemIcon>
                        <Icon>{item.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText primary={item.name}/>
                      <ListItemSecondaryAction>
                        <IconButton onClick={self.handleClick.bind(this, item)}>
                          <Icon color={"primary"} fontSize={"default"}>add_circle</Icon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                  </>
                );
              })
            }
          </List>
        </GridItem>
        <GridItem md={9} lg={9}>

          <Card raised={true} style={{padding:30}}>
            <DynamicFormPreview formElements={this.state.formElement}/>
          </Card>

        </GridItem>

        <TextFieldDialog widget={this.state.selectedWidget} open={this.state.openTextDialog}  onClose={this.addWidget.bind(this)} />
        <NumberFieldDialog widget={this.state.selectedWidget} open={this.state.openNumberDialog}  onClose={this.addWidget.bind(this)} />
        <SelectFieldDialog widget={this.state.selectedWidget} open={this.state.openSelectDialog} onClose={this.addWidget.bind(this)} />
      </GridContainer>
    );
  }
}

export default FormBuilderContainer;