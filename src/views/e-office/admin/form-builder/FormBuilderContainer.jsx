import React, { Component } from "react";
import {
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  IconButton, InputAdornment,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField
} from "@material-ui/core";

const StandardWidgetList = ({ onWidgetClick }) => {
  const widgets = [
    { type: "text", label: "TextField", icon: "check" },
    { type: "text", label: "TextField", icon: "user" }
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
const DynamicForm = ({ selectedWidgetList,onWidgetValueChange, onRemoveWidget }) => {
  const getControl = (key, config) => {
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
          value={config.value}
          onChange={event => onWidgetValueChange(key, config.value)}
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
                  {getControl(key,value)}
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

      formData:{}
    };
  }


  onStandardWidgetClick = (selectedWidget) => {
    this.setState({ selectedWidget });
  };

  changeValue=(key,value)=>{
    let { formData } = this.state;
    let temp = formData;
    temp[key] = value;
    this.setState({formData:temp})
  }

  removeWidget=(key)=>{
    const{selectedWidgetList}=this.state;
    let temp = selectedWidgetList;
    delete temp[key];
    this.setState({selectedWidgetList:temp})
  }

  render() {
    const { selectedWidgetList } = this.state;

    return (
      <Grid container={true} justify={"flex-start"} alignItems={"flex-start"}>

        <Grid item={true} md={3} lg={3}>
          <List>
            <StandardWidgetList onWidgetClick={this.onStandardWidgetClick}/>
          </List>
        </Grid>

        <Grid item={true} md={9} lg={9}>
          <DynamicForm onRemoveWidget={this.removeWidget} onWidgetValueChange={this.changeValue} selectedWidgetList={selectedWidgetList}/>
        </Grid>

      </Grid>
    );
  }
}

export default FormBuilderContainer;