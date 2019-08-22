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
  TextField,
  FormControl
} from "@material-ui/core";
import StandardConfigDialog from "./dialogs/StandardConfigDialog";
import FillableConfigDialog from "./dialogs/FillableConfigDialog";
import FileUploadConfigDialog from "./dialogs/FileUploadConfigDialog";
import { OfficeDatePicker, OfficeImageList, OfficeLocalCouncil, SiteFileUpload } from "./fields";
import { FILLABLE_TYPE, WIDGET_TYPE } from "./constant";
import ImageListConfigDialog from "./dialogs/ImageListConfigDialog";
import DatePickerConfigDialog from "./dialogs/DatePickerConfigDialog";
import LocalCouncilConfig from "./dialogs/fillable/LocalCouncilConfig";

const StandardWidgetList = ({ onWidgetClick }) => {
  const widgets = [
    { type: "text", label: "TextField", icon: "check" },
    { type: "text", label: "TextField", icon: "user" },
    { type: WIDGET_TYPE.FILE_UPLOAD, label: "File upload", icon: "account_circle" },
    { type: WIDGET_TYPE.IMAGE_LIST, label: "Image list upload", icon: "account_circle" },
    { type: WIDGET_TYPE.DATE_PICKER, label: "Date Picker", icon: "account_circle" },
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
    { key: "applicant_name", type: "text", label: "Name of Applicant", icon: "close" },
    { key: "local_council", type: "text", label: "Local Council", icon: "close" },
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
    let value=application[key];
    switch (config.type) {
      case WIDGET_TYPE.FILE_UPLOAD:
        return <FormControl component={"div"}>
          <SiteFileUpload onChange={onWidgetValueChange} config={config} key={key} application={application}/>
          <IconButton href={"#"} onClick={(e) => onRemoveWidget(key)}>
            <Icon color={"secondary"} fontSize={"default"}>delete</Icon>
          </IconButton>
        </FormControl>
      case WIDGET_TYPE.IMAGE_LIST:
        return <div>
          <OfficeImageList application={null} key={key} config={config} onChange={onWidgetValueChange}/>
          <IconButton href={"#"} onClick={(e) => onRemoveWidget(key)}>
            <Icon color={"secondary"} fontSize={"default"}>delete</Icon>
          </IconButton>
        </div>
      case FILLABLE_TYPE.LOCAL_COUNCIL:
        return <div>
          <OfficeLocalCouncil application={{local_council:{value:"Zarkawt",label:"Zarkawt"}}} key={key} config={config} onChange={onWidgetValueChange}/>
          <IconButton href={"#"} onClick={(e) => onRemoveWidget(key)}>
            <Icon color={"secondary"} fontSize={"default"}>delete</Icon>
          </IconButton>
        </div>
      case WIDGET_TYPE.DATE_PICKER:
        return <div>
          <OfficeDatePicker onChange={val=>onWidgetValueChange(key,val)} config={config} key={key} application={application}/>
          <IconButton href={"#"} onClick={(e) => onRemoveWidget(key)}>
            <Icon color={"secondary"} fontSize={"default"}>delete</Icon>
          </IconButton>
        </div>
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
      openFileUploadConfig: false,
      openImageListConfig: false,
      openDateConfig: false,

      openLocalCouncilConfig:false,
      formData: {}
    };
  }


  onStandardWidgetClick = (selectedWidget) => {
    this.setState({ selectedWidget, openDateConfig: true });
  };
  onFillableWidgetClick = (selectedWidget) => {
    this.setState({ selectedWidget, openLocalCouncilConfig: true });
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
    const { selectedWidgetList, openStandardConfig,openFillableConfig,openFileUploadConfig,openDateConfig,openImageListConfig, selectedWidget } = this.state;
    const { openLocalCouncilConfig } = this.state;

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
        <FileUploadConfigDialog onClose={() => this.setState({ openFileUploadConfig: false })}
                              open={openFileUploadConfig}
                              onCreateConfiguration={this.addConfiguredWidget}
        />
        <ImageListConfigDialog onClose={() => this.setState({ openImageListConfig: false })}
                              open={openImageListConfig}
                              onCreateConfiguration={this.addConfiguredWidget}
        />

        <FillableConfigDialog onClose={() => this.setState({ openFillableConfig: false })}
                              open={openFillableConfig}
                              widget={selectedWidget}
                              onCreateConfiguration={this.addConfiguredWidget}
        />
        <DatePickerConfigDialog onClose={() => this.setState({ openDateConfig: false })}
                              open={openDateConfig}
                              widget={selectedWidget}
                              onCreateConfiguration={this.addConfiguredWidget}
        />
        <LocalCouncilConfig onClose={() => this.setState({ openLocalCouncilConfig: false })}
                              open={openLocalCouncilConfig}
                              widget={selectedWidget}
                              onCreateConfiguration={this.addConfiguredWidget}
        />
      </>
    );
  }
}

export default FormBuilderContainer;