import React, {Component} from "reactn";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import {
  Card,
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography
} from "@material-ui/core";
import OfficeSnackbar from "../OfficeSnackbar";
import DynamicFormPreview from "./DynamicFormPreview";
import FileUploadFieldDialog from "./config-dialog/FileUploadFieldDialog";
import ImageUploadFieldDialog from "./config-dialog/ImageUploadFieldDialog";
import TextFieldDialog from "./config-dialog/TextFieldDialog";
import PatternFieldDialog from "./config-dialog/PatternFieldDialog";
import NumberFieldDialog from "./config-dialog/NumberFieldDialog";
import SelectFieldDialog from "./config-dialog/SelectFieldDialog";
import {SiteVerificationService} from "../../services/SiteVerificationService";
import WidgetConstant from "./WidgetConstant";
import SearchIcon from '@material-ui/icons/Search'
import {withRouter} from "react-router-dom";

const widgets = [
  {name: WidgetConstant.TEXTFIELD, icon: "keyboard_arrow_right"},
  {name: WidgetConstant.EMAIL, icon: "email"},
  {name: WidgetConstant.PHONE, icon: "phone"},
  {name: WidgetConstant.NUMBER, icon: "looks_one"},
  {name: WidgetConstant.ADDRESS, icon: "pin_drop"},
  {name: "Coordinate", icon: "donut_small"},
  {name: WidgetConstant.RADIO, icon: "radio_button_checked"},
  {name: WidgetConstant.CHECKBOX, icon: "checked"},
  {name: WidgetConstant.SELECT, icon: "list"},
  {name: WidgetConstant.FILE_UPLOAD, icon: "attach_file"},
  {name: WidgetConstant.IMAGE_UPLOAD, icon: "picture_in_picture"}
];

class EditSiteVerificationTemplate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: null,

      openTextDialog: false,
      openNumberDialog: false,
      openSelectDialog: false,
      openPatternDialog: false,
      openFileDialog: false,
      openImageDialog: false,
      selectedWidget: null,

      formElements: [],
      selectedType: undefined
    };
    this.siteVerificationService = new SiteVerificationService();
  }

  componentDidMount() {
    window.document.title = "e-AMC Site verification template";

    this.setGlobal({loading: true});
    const self = this;
    const module = this.props.match.params.module;
    this.setState({selectedType: {value: module, label: module}});

    this.siteVerificationService.getTemplate(module,
        errorMessage => this.setState({errorMessage}),
        template => {
          this.setState({id: template.id});
          template.data.formElements.forEach(function (item, index) {
            self.addWidget(item.elementConfig.name, item);
          })
        })
        .finally(() => {
          this.setGlobal({loading: false});
          this.setState({loading: false});
        });
  }

  clear = () => {
    this.setState({formElements: []});
  };
  handleClick = (identifier, event) => {
    switch (identifier.name) {
      case WidgetConstant.TEXTFIELD :
        this.setState({selectedWidget: identifier, openTextDialog: true});
        break;
      case  WidgetConstant.CHECKBOX :
        this.setState({selectedWidget: identifier, openTextDialog: true});
        break;
      case WidgetConstant.ADDRESS:
        this.setState({selectedWidget: identifier, openTextDialog: true});
        break;
      case WidgetConstant.RADIO:
        this.setState({selectedWidget: identifier, openSelectDialog: true});
        break;
      case WidgetConstant.SELECT :
        this.setState({selectedWidget: identifier, openSelectDialog: true});
        break;
      case WidgetConstant.EMAIL:
        this.setState({selectedWidget: identifier, openPatternDialog: true});
        break;
      case WidgetConstant.PHONE :
        this.setState({selectedWidget: identifier, openPatternDialog: true});
        break;
      case WidgetConstant.NUMBER:
        this.setState({selectedWidget: identifier, openNumberDialog: true});
        break;
      case WidgetConstant.FILE_UPLOAD:
        this.setState({selectedWidget: identifier, openFileDialog: true});
        break;
      case WidgetConstant.IMAGE_UPLOAD:
        this.setState({selectedWidget: identifier, openImageDialog: true});
        break;
      default:
        this.setState({selectedWidget: identifier, openTextDialog: true});
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
      openImageDialog: false
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
        <Card style={{padding: 15}}>
          <GridContainer>
            <GridItem md={3} lg={3}>
              <Typography variant={"h6"}>Add New Widget</Typography>
              <TextField style={{background: "#f3f3f3"}}
                         InputProps={{
                           endAdornment: <InputAdornment position={"end"}>
                             <SearchIcon color={"action"}/>
                           </InputAdornment>
                         }}
                         margin={"dense"} variant={"outlined"} fullWidth={true} placeholder={"Search"}/>
              <Divider/>
              <List>
                {
                  widgets.map(function (item, index) {
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
              <DynamicFormPreview id={this.state.id} edit={true} selectedType={this.state.selectedType}
                                  clear={this.clear}
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

            <OfficeSnackbar variant={"error"} open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}
                            onClose={e => this.setState({errorMessage: ""})}/>
          </GridContainer>
        </Card>

    );
  }
}

export default withRouter(EditSiteVerificationTemplate);