import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField
} from "@material-ui/core";
import StandardConfigDialog from "./dialogs/StandardConfigDialog";
import FillableConfigDialog from "./dialogs/FillableConfigDialog";

const StandardWidgetList = ({ onWidgetClick }) => {
  const widgets = [
    { type: "text", label: "TextField", icon: "check" },
    { type: "text", label: "TextField", icon: "user" },
  ];
  return (
    <>
      {widgets.map((widget, i) =>
        <>
          <ListItem key={i} color={"primary"} button={true}
                    onClick={e => onWidgetClick(widget)} component={"li"}>
            <ListItemIcon color={"primary"}>
              <Icon color={"action"}>
                {widget.icon}
              </Icon>
            </ListItemIcon>
            <ListItemText primary={widget.label}/>
            <ListItemSecondaryAction>
              <IconButton href={"#"} onClick={e => onWidgetClick(widget)}>
                <Icon color={"default"} fontSize={"default"}>keyboard_arrow_right</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component={"hr"}/>
        </>
      )}
    </>
  );
};
const FillableWidgetList = ({ onWidgetClick }) => {
  const widgets = [
    { key: "applicant_name", type: "text", label: "Name of Applicant", icon: "close" }
  ];
  return (
    <>
      {widgets.map((widget, i) =>
        <>
          <ListItem key={i} color={"primary"} button={true}
                    onClick={e => onWidgetClick(widget)} component={"li"}>
            <ListItemIcon color={"primary"}>
              <Icon color={"action"}>
                {widget.icon}
              </Icon>
            </ListItemIcon>
            <ListItemText primary={widget.label}/>
            <ListItemSecondaryAction>
              <IconButton href={"#"} onClick={e => onWidgetClick(widget)}>
                <Icon color={"default"} fontSize={"default"}>keyboard_arrow_right</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component={"hr"}/>
        </>
      )}
    </>
  );
};
// {
//   key:{
//     label:"label",
//       validation:{
//       required:true,
//         min:100,
//         max:100,
//     },
//     value:"",
//     defaultValue:"",
//         options:[
          // {value:"value",label:"label"}
        // ]
//   }
// }
const DynamicForm = ({ selectedWidgetList, onWidgetValueChange, onRemoveWidget }) => {

  const getControl = (key, config,application) => {
    let value=application[key]
    switch (config) {
      case "radio":
        return <p>radio</p>;
      case "select":
        return <p>select</p>;
      default:
        return <TextField
          type={"text"}
          name={key}
          required={config.validation.required}
          label={config.label}
          value={value}
          placeholder={config.placeholder}
          onChange={event => onWidgetValueChange(key, event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position={"end"}>
                <IconButton onClick={(e) => onRemoveWidget(key)}>
                  <Icon color={"secondary"} fontSize={"default"}>delete</Icon>
                </IconButton>
              </InputAdornment>
            )
          }}
        />;

    }
  };
  return (
    <Paper>
      <Card>
        <CardHeader title={"List of selected Widget"} subheader={"Click remove button to undo"}/>
        <CardContent>

          <Grid container={true} justify={"center"} alignItems={"flex-start"}>

            {
              Object.entries(selectedWidgetList).map(([key, config]) =>
                <Grid item={true} md={6} lg={6}>
                  {getControl(key, config,{applicant_name:"kuri"})}
                </Grid>
              )
            }

          </Grid>

        </CardContent>
      </Card>
    </Paper>
  );
};

class FormBuilderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedWidgetList: {},

      openStandardConfig: false,
      openFillableConfig: false,

      formData: {}
    };
  }


  onStandardWidgetClick = (selectedWidget) => {
    this.setState({ selectedWidget, openStandardConfig: true });
  };
  onFillableWidgetClick = (selectedWidget) => {
    this.setState({ selectedWidget, openFillableConfig: true });
  };

  changeValue = (key, value) => {
    let { formData } = this.state;
    let temp = formData;
    temp[key] = value;
    this.setState({ formData: temp });
  };

  removeWidget = (key) => {
    const { selectedWidgetList } = this.state;
    let temp = selectedWidgetList;
    delete temp[key];
    this.setState({ selectedWidgetList: temp });
  };
  addConfiguredWidget = (key, value) => {
    const { selectedWidgetList } = this.state;
    let temp = selectedWidgetList;
    temp[key] = value;
    this.setState({ selectedWidgetList: temp });
  };

  render() {
    const { selectedWidgetList, openStandardConfig,openFillableConfig, selectedWidget } = this.state;

    return (
      <>
        <Grid container={true} justify={"flex-start"} alignItems={"flex-start"}>

          <Grid item={true} md={3} lg={3}>
            <List>
              <StandardWidgetList onWidgetClick={this.onStandardWidgetClick}/>
              <FillableWidgetList onWidgetClick={this.onFillableWidgetClick}/>
            </List>
          </Grid>

          <Grid item={true} md={9} lg={9}>
            <DynamicForm onRemoveWidget={this.removeWidget} onWidgetValueChange={this.changeValue}
                         selectedWidgetList={selectedWidgetList}/>
          </Grid>

        </Grid>

        <StandardConfigDialog onClose={() => this.setState({ openStandardConfig: false })}
                              open={openStandardConfig}
                              widget={selectedWidget}
                              onCreateConfiguration={this.addConfiguredWidget}
        />
        <FillableConfigDialog onClose={() => this.setState({ openFillableConfig: false })}
                              open={openFillableConfig}
                              widget={selectedWidget}
                              onCreateConfiguration={this.addConfiguredWidget}
        />
      </>
    );
  }
}

export default FormBuilderContainer;