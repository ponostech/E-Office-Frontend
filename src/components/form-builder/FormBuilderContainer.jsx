import React, { Component } from "react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import {
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography
} from "@material-ui/core";
import Card from "../Card/Card";
import SelectFieldDialog from "./config-dialog/SelectFieldDialog";
import DynamicFormPreview from "./DynamicFormPreview";
import TextFieldDialog from "./config-dialog/TextFieldDialog";
import NumberFieldDialog from "./config-dialog/NumberFieldDialog";
import WidgetConstant from "./WidgetConstant";
import PatternFieldDialog from "./config-dialog/PatternFieldDialog";

const widgets = [
  { name: WidgetConstant.TEXTFIELD, icon: "keyboard_arrow_right" },
  { name: WidgetConstant.EMAIL, icon: "email" },
  { name: WidgetConstant.PHONE, icon: "phone" },
  { name: WidgetConstant.NUMBER, icon: "looks_one" },
  { name: WidgetConstant.ADDRESS, icon: "pin_drop" },
  { name: "Coordinate", icon: "donut_small" },
  { name: WidgetConstant.RADIO, icon: "radio_button_checked" },
  { name: WidgetConstant.CHECKBOX, icon: "checked" },
  { name: WidgetConstant.SELECT, icon: "list" }
];

class FormBuilderContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openTextDialog: false,
      openNumberDialog: false,
      openSelectDialog: false,
      openPatternDialog: false,
      selectedWidget: null,

      formElements: []
    };
  }

  handleClick = (identifier, event) => {
    switch (identifier.name) {
      case WidgetConstant.TEXTFIELD :
        this.setState({ selectedWidget: identifier, openTextDialog: true });
        break;
      case  WidgetConstant.CHECKBOX :
        this.setState({ selectedWidget: identifier, openTextDialog: true });
        break;
      case WidgetConstant.ADDRESS:
        this.setState({ selectedWidget: identifier, openTextDialog: true });
        break;
      case WidgetConstant.RADIO:
        this.setState({ selectedWidget: identifier, openSelectDialog: true });
        break;
      case WidgetConstant.SELECT :
        this.setState({ selectedWidget: identifier, openSelectDialog: true });
        break;
      case WidgetConstant.EMAIL:
        this.setState({ selectedWidget: identifier, openPatternDialog: true });
        break;
      case WidgetConstant.PHONE :
        this.setState({ selectedWidget: identifier, openPatternDialog: true });
        break;
      case WidgetConstant.NUMBER:
        this.setState({ selectedWidget: identifier, openNumberDialog: true });
        break;
      default:
        this.setState({ selectedWidget: identifier, openTextDialog: true });
        break;

    }
  };

  addWidget = (key, config) => {
    this.setState({
      openNumberDialog: false,
      openSelectDialog: false,
      openPatternDialog: false,
      openTextDialog: false
    });
    if (!key || !config) {
      return;
    }
    let element = {
      key,
      config
    };
    this.state.formElements.push(element);
  };

  render() {
    const self = this;
    return (
      <Card style={{ padding: 15 }}>
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
                      <ListItem onClick={self.handleClick.bind(this, item)} button={true} color={"primary"} key={index}>
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

            <Card style={{ padding: 20 }}>
              <DynamicFormPreview formElements={this.state.formElements}/>
            </Card>

          </GridItem>

          <TextFieldDialog widget={this.state.selectedWidget} open={this.state.openTextDialog}
                           onClose={this.addWidget.bind(this)}/>
          <PatternFieldDialog widget={this.state.selectedWidget} open={this.state.openPatternDialog}
                              onClose={this.addWidget.bind(this)}/>
          <NumberFieldDialog widget={this.state.selectedWidget} open={this.state.openNumberDialog}
                             onClose={this.addWidget.bind(this)}/>
          <SelectFieldDialog widget={this.state.selectedWidget} open={this.state.openSelectDialog}
                             onClose={this.addWidget.bind(this)}/>
        </GridContainer>
      </Card>

    );
  }
}

export default FormBuilderContainer;