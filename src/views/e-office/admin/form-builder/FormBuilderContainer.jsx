import React, { Component } from "reactn";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import StandardConfigDialog from "./dialogs/StandardConfigDialog";
import FillableConfigDialog from "./dialogs/FillableConfigDialog";
import FileUploadConfigDialog from "./dialogs/FileUploadConfigDialog";
import { HOTEL_FILLABLE, SHOP_FILLABLE, WIDGET_TYPE } from "./constant";
import ImageListConfigDialog from "./dialogs/ImageListConfigDialog";
import DatePickerConfigDialog from "./dialogs/DatePickerConfigDialog";
import LocalCouncilConfig from "./dialogs/fillable/LocalCouncilConfig";
import { getControl } from "./ControlResolver";
import OfficeSelect from "../../../../components/OfficeSelect";
import OptionConfigDialog from "./dialogs/OptionConfigDialog";
import CheckableConfigDialog from "./dialogs/CheckableConfigDialog";
import { SiteVerificationService } from "../../../../services/SiteVerificationService";
import SubmitDialog from "../../../../components/SubmitDialog";
import CoordinateConfigDialog from "./dialogs/CoordinateConfigDialog";
import NumberConfigDialog from "./dialogs/NumberConfigDialog";

const StandardWidgetList = ({ onWidgetClick }) => {
  const widgets = [
    { type: WIDGET_TYPE.TEXT_FIELD, label: "TextField", icon: "text_format" },
    { type: WIDGET_TYPE.NUMBER_FIELD, label: "Number Field", icon: "plus_one" },
    { type: WIDGET_TYPE.COORDINATE, label: "Coordinate", icon: "donut_small" },
    { type: WIDGET_TYPE.SELECT, label: "Select", icon: "view_list" },
    { type: WIDGET_TYPE.RADIO, label: "Radio", icon: "radio_button_checked" },
    { type: WIDGET_TYPE.CHECKBOX, label: "Checkbox", icon: "check_circle" },
    { type: WIDGET_TYPE.SWITCH, label: "Switch", icon: "toggle_on" },
    {
      type: WIDGET_TYPE.DATE_PICKER,
      label: "Date Picker",
      icon: "calendar_today"
    },

    {
      type: WIDGET_TYPE.FILE_UPLOAD,
      label: "File upload",
      icon: "picture_as_pdf"
    },
    {
      type: WIDGET_TYPE.IMAGE_LIST,
      label: "Image list upload",
      icon: "camera_roll"
    }
  ];
  return (
    <>
      {widgets.map((widget, i) => (
        <>
          <ListItem
            key={i}
            color={"primary"}
            button={true}
            onClick={e => onWidgetClick(widget)}
            component={"li"}
          >
            <ListItemIcon color={"primary"}>
              <Icon color={"action"}>{widget.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={widget.label} />
            <ListItemSecondaryAction>
              <IconButton href={"#"} onClick={e => onWidgetClick(widget)}>
                <Icon color={"default"} fontSize={"default"}>
                  keyboard_arrow_right
                </Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component={"hr"} />
        </>
      ))}
    </>
  );
};
const FillableWidgetList = ({ onWidgetClick, selectedSiteVerification }) => {
  let widgets = [];
  switch (selectedSiteVerification.value) {
    case "shop":
      widgets = SHOP_FILLABLE;
      break;
    case "hotel":
      widgets = HOTEL_FILLABLE;
      break;
    default:
      break;
  }
  return (
    <>
      {widgets.map((widget, i) => (
        <>
          <ListItem
            key={i}
            color={"primary"}
            button={true}
            onClick={e => onWidgetClick(widget)}
            component={"li"}
          >
            <ListItemIcon color={"primary"}>
              <Icon color={"action"}>{widget.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={widget.label} />
            <ListItemSecondaryAction>
              <IconButton href={"#"} onClick={e => onWidgetClick(widget)}>
                <Icon color={"default"} fontSize={"default"}>
                  keyboard_arrow_right
                </Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component={"hr"} />
        </>
      ))}
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
const DynamicForm = ({
  module,
  onSave,
  onClear,
  selectedWidgetList,
  onWidgetValueChange,
  onRemoveWidget,
  selectedSiteVerification,
  changeSiteVerification
}) => {
  const options = [
    { value: "hoarding", label: "Hoarding Site verification" },
    { value: "kiosk", label: "Kiosk Site verification" },
    { value: "shop", label: "Shop Site verification" },
    { value: "hotel", label: "Hotel Site verification" }
  ];

  return (
    <Paper>
      <Card>
        <CardHeader
          title={"Site verification form builder"}
          subheader={"Select widget from the left to make form"}
          action={
            module ? (
              <Typography variant={"h6"}>
                Edit : {module} Verification Form
              </Typography>
            ) : (
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
            )
          }
        />
        <Divider />
        <CardContent style={{ minHeight: "80%" }}>
          <Grid container={true} justify={"center"} alignItems={"flex-start"}>
            {Object.entries(selectedWidgetList).map(([key, config]) => (
              <>
                <Grid item={true} md={5} lg={5}>
                  {getControl(key, config, {}, onWidgetValueChange)}
                </Grid>
                <Grid item={true} md={1} lg={1}>
                  <IconButton href={"#"} onClick={e => onRemoveWidget(key)}>
                    <Icon color={"secondary"} fontSize={"default"}>
                      delete
                    </Icon>
                  </IconButton>
                </Grid>
              </>
            ))}
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick={e => onSave()}
          >
            Save
          </Button>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={event => onClear()}
          >
            Clear
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

class FormBuilderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSiteVerification: {
        value: "shop",
        label: "Shop site verification"
      },
      selectedWidgetList: {},

      openStandardConfig: false,
      openNumberConfig: false,
      openCoordinateConfig: false,
      openFillableConfig: false,
      openFileUploadConfig: false,
      openImageListConfig: false,
      openDateConfig: false,
      openOptionDialog: false,

      openLocalCouncilConfig: false,
      formData: {},
      submit: false
    };
    this.siteVerificationService = new SiteVerificationService();
  }

  componentDidMount() {
    let module = this.props.match.params.module;
    if (module) {
      this.siteVerificationService
        .getTemplate(
          module,
          errorMsg => this.setGlobal({ errorMsg }),
          res => this.setState({ selectedWidgetList: res.data.formElements })
        )
        .finally(() => this.setGlobal({ loading: false }));
    }
  }

  saveConfig = () => {
    const { selectedWidgetList, selectedSiteVerification } = this.state;
    const type = selectedSiteVerification.value;
    let data = {
      formElements: selectedWidgetList
    };
    this.setState({ submit: true });
    if (selectedWidgetList !== null && selectedWidgetList !== undefined) {
      this.siteVerificationService
        .createTemplate(
          type,
          data,
          errorMsg => this.setGlobal({ errorMsg }),
          successMsg => this.setGlobal({ successMsg })
        )
        .finally(() => this.setState({ submit: false }));
    }
  };

  clearItems = () => this.setState({ selectedWidgetList: {} });

  onStandardWidgetClick = selectedWidget => {
    this.setState({ selectedWidget });
    switch (selectedWidget.type) {
      case WIDGET_TYPE.TEXT_FIELD:
        this.setState({ openStandardConfig: true });
        break;
      case WIDGET_TYPE.NUMBER_FIELD:
        this.setState({ openNumberConfig: true });
        break;
      case WIDGET_TYPE.COORDINATE:
        this.setState({ openCoordinateConfig: true });
        break;
      case WIDGET_TYPE.CHECKBOX:
        this.setState({ openSwitchConfig: true });
        break;
      case WIDGET_TYPE.SWITCH:
        this.setState({ openSwitchConfig: true });
        break;
      case WIDGET_TYPE.DATE_PICKER:
        this.setState({ openDateConfig: true });
        break;
      case WIDGET_TYPE.SELECT:
        this.setState({ openOptionDialog: true });
        break;
      case WIDGET_TYPE.RADIO:
        this.setState({ openOptionDialog: true });
        break;
      case WIDGET_TYPE.IMAGE_LIST:
        this.setState({ openImageListConfig: true });
        break;
      case WIDGET_TYPE.FILE_UPLOAD:
        this.setState({ openFileUploadConfig: true });
        break;
      default:
        break;
    }
  };
  onFillableWidgetClick = selectedWidget => {
    this.setState({ selectedWidget });
    switch (selectedWidget.type) {
      // case FILLABLE_TYPE.TEXT_FIELD:
      //   this.setState({ openFillableTextFieldConfig: true });
      //   break;
      // case FILLABLE_TYPE.LOCAL_COUNCIL:
      //   this.setState({ openFillableLocalCouncilConfig: true });
      //   break;
      // case FILLABLE_TYPE.TRADE:
      //   this.setState({ openFillableTradeConfig: true });
      //   break;
      // case FILLABLE_TYPE.RADIO:
      //   this.setState({ openFillableSelectConfig: true });
      //   break;
      // case FILLABLE_TYPE.CHECKBOX:
      //   this.setState({ openFillableCheckableConfig: true });
      //   break;
      // case FILLABLE_TYPE.DATE:
      //   this.setState({ openFillableDateConfig: true });
      //   break;
      default:
        this.setState({ openFillableConfig: true });
        break;
    }
  };

  changeValue = (key, value) => {
    let { formData } = this.state;
    let temp = formData;
    temp[key] = value;
    this.setState({ formData: temp });
  };

  removeWidget = key => {
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
    const {
      selectedWidgetList,
      openSwitchConfig,
      openStandardConfig,
      openFillableConfig,
      openCoordinateConfig,
      openNumberConfig,
      submit,
      openFileUploadConfig,
      openOptionDialog,
      openDateConfig,
      openImageListConfig,
      selectedWidget,
      selectedSiteVerification
    } = this.state;
    const { openLocalCouncilConfig } = this.state;
    const module = this.props.match.params.module;

    return (
      <>
        <Grid
          spacing={3}
          container={true}
          justify={"flex-start"}
          alignItems={"flex-start"}
        >
          <Grid item={true} md={3} lg={3}>
            <Paper>
              <Card>
                <CardHeader
                  title={"Standard Widget"}
                  subheader={"Please select widget from a list"}
                />
                <CardContent>
                  <StandardWidgetList
                    onWidgetClick={this.onStandardWidgetClick}
                  />
                </CardContent>
                <Divider component={"div"} />
                <CardHeader
                  title={"Fillable widget"}
                  subheader={
                    "Select type of site verification before you select fillable widget"
                  }
                />
                <CardContent>
                  <FillableWidgetList
                    selectedSiteVerification={selectedSiteVerification}
                    onWidgetClick={this.onFillableWidgetClick}
                  />
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          <Grid item={true} md={9} lg={9}>
            <DynamicForm
              module={module}
              onRemoveWidget={this.removeWidget}
              onWidgetValueChange={this.changeValue}
              selectedWidgetList={selectedWidgetList}
              selectedSiteVerification={selectedSiteVerification}
              onSave={this.saveConfig}
              onClear={this.clearItems}
              changeSiteVerification={val =>
                this.setState({ selectedSiteVerification: val })
              }
            />
          </Grid>
        </Grid>

        <StandardConfigDialog
          onClose={() => this.setState({ openStandardConfig: false })}
          open={openStandardConfig}
          widget={selectedWidget}
          onCreateConfiguration={this.addConfiguredWidget}
        />

        <NumberConfigDialog
          onClose={() => this.setState({ openNumberConfig: false })}
          open={openNumberConfig}
          widget={selectedWidget}
          onCreateConfiguration={this.addConfiguredWidget}
        />

        <CheckableConfigDialog
          onClose={() => this.setState({ openSwitchConfig: false })}
          open={openSwitchConfig}
          widget={selectedWidget}
          onCreateConfiguration={this.addConfiguredWidget}
        />

        <CoordinateConfigDialog
          onClose={() => this.setState({ openCoordinateConfig: false })}
          open={openCoordinateConfig}
          widget={selectedWidget}
          onCreateConfiguration={this.addConfiguredWidget}
        />

        <OptionConfigDialog
          onClose={() => this.setState({ openOptionDialog: false })}
          open={openOptionDialog}
          widget={selectedWidget}
          onCreateConfiguration={this.addConfiguredWidget}
        />
        <FileUploadConfigDialog
          onClose={() => this.setState({ openFileUploadConfig: false })}
          widget={selectedWidget}
          open={openFileUploadConfig}
          onCreateConfiguration={this.addConfiguredWidget}
        />
        <ImageListConfigDialog
          onClose={() => this.setState({ openImageListConfig: false })}
          widget={selectedWidget}
          open={openImageListConfig}
          onCreateConfiguration={this.addConfiguredWidget}
        />

        <FillableConfigDialog
          onClose={() => this.setState({ openFillableConfig: false })}
          open={openFillableConfig}
          widget={selectedWidget}
          onCreateConfiguration={this.addConfiguredWidget}
        />
        <DatePickerConfigDialog
          onClose={() => this.setState({ openDateConfig: false })}
          open={openDateConfig}
          widget={selectedWidget}
          onCreateConfiguration={this.addConfiguredWidget}
        />
        <LocalCouncilConfig
          onClose={() => this.setState({ openLocalCouncilConfig: false })}
          open={openLocalCouncilConfig}
          widget={selectedWidget}
          onCreateConfiguration={this.addConfiguredWidget}
        />

        <SubmitDialog
          open={submit}
          title={"Create Site verification form"}
          text={"Please wait ..."}
        />
      </>
    );
  }
}

FormBuilderContainer.propTypes = {
  selectedSiteVerification: PropTypes.string.isRequired,
  selectedWidgetList: PropTypes.string.isRequired
};

export default FormBuilderContainer;
