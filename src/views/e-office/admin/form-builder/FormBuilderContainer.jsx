import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  IconButton,
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
import FileUploadConfigDialog from "./dialogs/FileUploadConfigDialog";
import { WIDGET_TYPE } from "./constant";
import ImageListConfigDialog from "./dialogs/ImageListConfigDialog";
import DatePickerConfigDialog from "./dialogs/DatePickerConfigDialog";
import LocalCouncilConfig from "./dialogs/fillable/LocalCouncilConfig";
import { getControl } from "./ControlResolver";
import OfficeSelect from "../../../../components/OfficeSelect";
import OptionConfigDialog from "./dialogs/OptionConfigDialog";

const StandardWidgetList = ({ onWidgetClick }) => {
  const widgets = [
    { type: WIDGET_TYPE.TEXT_FIELD, label: "TextField", icon: "check" },
    { type: WIDGET_TYPE.SELECT, label: "Select", icon: "user" },
    { type: WIDGET_TYPE.RADIO, label: "Radio", icon: "user" },
    { type: WIDGET_TYPE.CHECKBOX, label: "Checkbox", icon: "user" },
    { type: WIDGET_TYPE.SWITCH, label: "Switch", icon: "user" },
    { type: WIDGET_TYPE.DATE_PICKER, label: "Date Picker", icon: "account_circle" },

    { type: WIDGET_TYPE.FILE_UPLOAD, label: "File upload", icon: "account_circle" },
    { type: WIDGET_TYPE.IMAGE_LIST, label: "Image list upload", icon: "account_circle" }
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
    { key: "local_council", type: "text", label: "Local Council", icon: "close" }
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
const DynamicForm = ({ selectedWidgetList, onWidgetValueChange, onRemoveWidget, selectedSiteVerification, changeSiteVerification }) => {

  const options = [

    { value: "hoarding", label: "Hoarding Site verification" },
    { value: "kiosk", label: "Kiosk Site verification" },
    { value: "shop", label: "Shop Site verification" }
  ];


  return (
    <Paper>
      <Card>
        <CardHeader title={"Site verfication form builder"}
                    subheader={"Select widget from the left to make site verification from"} action={

          <OfficeSelect
            label={"Type of site verification"}
            variant={"outlined"}
            margin={"dense"}
            value={selectedSiteVerification}
            onChange={val => {
              changeSiteVerification(val);
            }}
            options={options}
          />
        }/>
        <Divider/>
        <CardContent>

          <Grid container={true} justify={"center"} alignItems={"flex-start"}>

            {
              Object.entries(selectedWidgetList).map(([key, config]) =>
                <>
                  <Grid item={true} md={6} lg={6}>
                    {getControl(key, config, { applicant_name: "kuri" }, onWidgetValueChange)}
                  </Grid>
                  <Grid item={true} md={1} lg={1}>
                    <IconButton href={"#"} onClick={(e) => onRemoveWidget(key)}>
                      <Icon color={"secondary"} fontSize={"default"}>delete</Icon>
                    </IconButton>
                  </Grid>
                </>
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
      selectedSiteVerification: { value: "shop", label: "Shop site verification" },
      selectedWidgetList: {},

      openStandardConfig: false,
      openFillableConfig: false,
      openFileUploadConfig: false,
      openImageListConfig: false,
      openDateConfig: false,
      openOptionDialog: false,

      openLocalCouncilConfig: false,
      formData: {}
    };
  }


  onStandardWidgetClick = (selectedWidget) => {
    this.setState({selectedWidget})
    switch (selectedWidget.type) {
      case WIDGET_TYPE.TEXT_FIELD:
        this.setState({openStandardConfig:true})
        break;
      case WIDGET_TYPE.CHECKBOX:
        this.setState({openStandardConfig:true})
        break;
      case WIDGET_TYPE.SWITCH:
        this.setState({openStandardConfig:true})
        break;
      case WIDGET_TYPE.DATE_PICKER:
        this.setState({openDateConfig:true})
        break;
      case WIDGET_TYPE.SELECT:
        this.setState({openOptionDialog:true})
        break;
      case WIDGET_TYPE.RADIO:
        this.setState({openOptionDialog:true})
        break;
      default:
        break
    }
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
    const { selectedWidgetList, openStandardConfig, openFillableConfig, openFileUploadConfig, openOptionDialog, openDateConfig, openImageListConfig, selectedWidget, selectedSiteVerification } = this.state;
    const { openLocalCouncilConfig } = this.state;

    return (
      <>
        <Grid container={true} justify={"flex-start"} alignItems={"flex-start"}>

          <Grid item={true} md={3} lg={3}>
            <List>
              <StandardWidgetList onWidgetClick={this.onStandardWidgetClick}/>
              <Divider component={"div"}/>
              <FillableWidgetList onWidgetClick={this.onFillableWidgetClick}/>
            </List>
          </Grid>

          <Grid item={true} md={9} lg={9}>
            <DynamicForm onRemoveWidget={this.removeWidget} onWidgetValueChange={this.changeValue}
                         selectedWidgetList={selectedWidgetList} selectedSiteVerification={selectedSiteVerification}
                         changeSiteVerification={val => this.setState({ selectedSiteVerification: val })}/>
          </Grid>

        </Grid>

        <StandardConfigDialog onClose={() => this.setState({ openStandardConfig: false })}
                              open={openStandardConfig}
                              widget={selectedWidget}
                              onCreateConfiguration={this.addConfiguredWidget}/>

        <OptionConfigDialog onClose={() => this.setState({ openOptionDialog: false })}
                            open={openOptionDialog}
                            widget={selectedWidget}
                            onCreateConfiguration={this.addConfiguredWidget}/>
        <FileUploadConfigDialog onClose={() => this.setState({ openFileUploadConfig: false })}
                                open={openFileUploadConfig}
                                onCreateConfiguration={this.addConfiguredWidget}/>
        <ImageListConfigDialog onClose={() => this.setState({ openImageListConfig: false })}
                               open={openImageListConfig}
                               onCreateConfiguration={this.addConfiguredWidget}/>

        <FillableConfigDialog onClose={() => this.setState({ openFillableConfig: false })}
                              open={openFillableConfig}
                              widget={selectedWidget}
                              onCreateConfiguration={this.addConfiguredWidget}/>
        <DatePickerConfigDialog onClose={() => this.setState({ openDateConfig: false })}
                                open={openDateConfig}
                                widget={selectedWidget}
                                onCreateConfiguration={this.addConfiguredWidget}/>
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