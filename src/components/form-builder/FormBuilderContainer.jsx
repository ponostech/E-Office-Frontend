import React, { Component } from "react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import {
  Divider,
  ExpansionPanel,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import SelectFieldDialog from "./config-dialog/SelectFieldDialog";
import DynamicFormPreview from "./DynamicFormPreview";
import TextFieldDialog from "./config-dialog/TextFieldDialog";
import NumberFieldDialog from "./config-dialog/NumberFieldDialog";
import WidgetConstant from "./WidgetConstant";
import PatternFieldDialog from "./config-dialog/PatternFieldDialog";
import FileUploadFieldDialog from "./config-dialog/FileUploadFieldDialog";
import ImageUploadFieldDialog from "./config-dialog/ImageUploadFieldDialog";
import FillableFieldGenerator from "./FillableFieldGenerator";
import Avatar from "@material-ui/core/Avatar";
import DatePickerDialog from "./config-dialog/DatePickerDialog";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FillableTextField from "./fields/FillableTextField";

const widgets = [
  { name: WidgetConstant.TEXTFIELD, icon: "keyboard_arrow_right" },
  { name: WidgetConstant.EMAIL, icon: "email" },
  { name: WidgetConstant.PHONE, icon: "phone" },
  { name: WidgetConstant.NUMBER, icon: "looks_one" },
  { name: WidgetConstant.ADDRESS, icon: "pin_drop" },
  { name: WidgetConstant.COORDINATE, icon: "donut_small" },
  { name: WidgetConstant.RADIO, icon: "radio_button_checked" },
  { name: WidgetConstant.CHECKBOX, icon: "checked" },
  { name: WidgetConstant.SELECT, icon: "list" },
  { name: WidgetConstant.DATE, icon: "date_range" },
  { name: WidgetConstant.FILE_UPLOAD, icon: "attach_file" },
  { name: WidgetConstant.IMAGE_UPLOAD, icon: "picture_in_picture" }
];

class FormBuilderContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openTextDialog: false,
      openNumberDialog: false,
      openSelectDialog: false,
      openPatternDialog: false,
      openFileDialog: false,
      openImageDialog: false,
      selectedWidget: null,

      selectedFillable: null,

      fields: [],
      formElements: []
    };
  }

  componentDidMount() {
    window.document.title = "e-AMC Site verification template";
  }

  clear = () => {
    this.setState({ formElements: [] });
  };
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
      case WidgetConstant.DATE:
        this.setState({ selectedWidget: identifier, openDateDialog: true });
        break;
      case WidgetConstant.FILE_UPLOAD:
        this.setState({ selectedWidget: identifier, openFileDialog: true });
        break;
      case WidgetConstant.IMAGE_UPLOAD:
        this.setState({ selectedWidget: identifier, openImageDialog: true });
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
      openTextDialog: false,
      openFileDialog: false,
      openImageDialog: false,
      openDateDialog: false,
      openFillableDialog:false
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
  createFields = (type) => {
    const fields = FillableFieldGenerator(type);
    this.setState({ fields });
  };
  handleFillableClick = (selectedFillable) => {
    console.log(selectedFillable);
    this.setState({ openFillableDialog: true, selectedFillable });
  };


  render() {
    const self = this;
    return (
      <GridContainer>
        <GridItem md={3} lg={3}>
          <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary href={"#"}
                                   expandIcon={<ExpandMoreIcon/>}
                                   aria-controls="panel1bh-content"
                                   id="panel1bh-header"
            >
              <Typography variant={"h6"} color={"textPrimary"}>Standard Widget</Typography>
            </ExpansionPanelSummary>
            {/*<ExpansionPanelDetails>*/}


            {/*<Typography variant={"h6"}>Add New Widget</Typography>*/}
            {/*<TextField style={{ background: "#f3f3f3" }}*/}
            {/*           InputProps={{*/}
            {/*             endAdornment: <InputAdornment position={"end"}>*/}
            {/*               <SearchIcon color={"action"}/>*/}
            {/*             </InputAdornment>*/}
            {/*           }}*/}
            {/*           margin={"dense"} variant={"outlined"} fullWidth={true} placeholder={"Search"}/>*/}
            <List>
              {
                widgets.map(function(item, index) {
                  return (
                    <>
                      <ListItem onClick={self.handleClick.bind(this, item)} button={true} color={"primary"}
                                key={index}>
                        <ListItemIcon>
                          <Icon>{item.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                        <ListItemSecondaryAction>
                          <IconButton onClick={self.handleClick.bind(this, item)}>
                            <Icon color={"default"} fontSize={"default"}>keyboard_arrow_right</Icon>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider/>
                    </>
                  );
                })
              }
            </List>

            {/*</ExpansionPanelDetails>*/}
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary href={"#"}
                                   expandIcon={<ExpandMoreIcon/>}
                                   aria-controls="panel1bh-content"
                                   id="panel1bh-header"
            >
              <Typography variant={"h6"} color={"textPrimary"}>Fillable Widgets</Typography>
            </ExpansionPanelSummary>

            <List component={"div"}>
              {
                this.state.fields.map((item, index) =>
                  <>
                    <ListItem key={index} color={"primary"} button={true}
                              onClick={e => self.handleFillableClick(item)} component={"li"}>
                      <ListItemIcon color={"primary"}>
                        <Avatar component={"span"}>
                          {index + 1}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={item.label}/>
                      <ListItemSecondaryAction>
                        <IconButton onClick={e => self.handleFillableClick(item)}>
                          <Icon color={"default"} fontSize={"default"}>keyboard_arrow_right</Icon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component={"hr"}/>
                  </>
                )
              }
            </List>
          </ExpansionPanel>

        </GridItem>
        <GridItem md={9} lg={9}>
          <DynamicFormPreview onSelectType={this.createFields} edit={false} clear={this.clear}
                              formElements={this.state.formElements}/>
        </GridItem>

        <FileUploadFieldDialog widget={this.state.selectedWidget} open={this.state.openFileDialog}
                               onClose={this.addWidget.bind(this)}/>
        <ImageUploadFieldDialog widget={this.state.selectedWidget} open={this.state.openImageDialog}
                                onClose={this.addWidget.bind(this)}/>

        <TextFieldDialog widget={this.state.selectedWidget} open={this.state.openTextDialog}
                         onClose={this.addWidget.bind(this)}/>
        <PatternFieldDialog widget={this.state.selectedWidget} open={this.state.openPatternDialog}
                            onClose={this.addWidget.bind(this)}/>
        <NumberFieldDialog widget={this.state.selectedWidget} open={this.state.openNumberDialog}
                           onClose={this.addWidget.bind(this)}/>
        <SelectFieldDialog widget={this.state.selectedWidget} open={this.state.openSelectDialog}
                           onClose={this.addWidget.bind(this)}/>

        <DatePickerDialog widget={this.state.selectedWidget} open={this.state.openDateDialog}
                          onClose={this.addWidget.bind(this)}/>


        <FillableTextField onClose={event => this.setState({ openFillableDialog: false })}
                           widget={this.state.selectedFillable} open={this.state.openFillableDialog}
                           addWidget={this.addWidget.bind(this)}/>
      </GridContainer>

    );
  }
}

export default FormBuilderContainer;