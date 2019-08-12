import React, {Component} from "reactn";
import axios from "axios";
import LoadingView from "../../../../common/LoadingView";
import {
  AppBar,
  CardHeader,
  Icon,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  Badge
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Divider from "@material-ui/core/Divider";
import ApplicationDetailsDialog from "../../../../common/ApplicationDetailsDialog";
import IconButton from "@material-ui/core/IconButton";
import SubmitDialog from "../../../../../components/SubmitDialog";
import {UPDATE_FILE_APPLICATION} from "../../../../../config/ApiRoutes";
import ApplicationState from "../../../../../utils/ApplicationState";
import {LoginService} from "../../../../../services/LoginService";
import SingleApplicationSendBackDialog from "../../../common/SingleApplicationSendBackDialog";
import ApplicationService from "../../../../../services/ApplicationService";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import {APPLICATION_MENUITEM, ApplicationContextMenu} from "../../../common/ApplicationContextMenu";
import ImposedFineDialog from "../../dialog/ImposedFineDialog";
import SendMessageDialog from "../../dialog/common/SendMessageDialog";
import Chip from "@material-ui/core/Chip";
import theme from "../../../../../assets/office/theme"

// hoarding/:id/applications
function TabContainer({children, dir}) {
  return (
      <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
        {children}
      </Typography>
  );
}

class FileApplications extends Component {
  applicationService = new ApplicationService();
  state = {
    data: [],
    singleData: [],
    loading: true,
    openDetails: false,
    openSendBackDialog: false,
    selectedApplication: null,
    tabValue: 0,
    err: "",
    submit: false,
    submitTitle: "Send Back Application",
    confirmTitle: "Do you want to delete?",

    confirmReceive: false,
    openMenu: false,
    openFineDialog: false,
    openSendMessageDialog: false

  };

  componentDidMount() {
    const apiUrl = this.getApi(this.props.url);
    this.getData(apiUrl);
  };

  getData = (url) => {
    axios.get(url,{params:{status:"all"}})
        .then(res => this.processResponse(res))
        .catch(err => this.setState({err: err.toString()}))
        .then(res => this.setState({loading: false}));
  };

  processResponse = (res) => {
    if (res.data.status) this.setState({data: res.data.data.applications});
    else this.setState({err: res.data.messages});
  };

  getApi = (url) => {
    let apiUrl = "";
    this.props.menus.view.forEach(val => {
      if (val.url === url) {
        apiUrl = val.api_url;
        return true;
      }
    });
    return apiUrl;
  };

  getByStatus = (data, status = "new") => {
    if (!data.length) return false;
    return data.filter((val) => {
      if (val.status === status) return true;
    }).map(val => this.listApplications(val, status));
  };

  onMenuClick = (menu) => {
    switch (menu) {
      case APPLICATION_MENUITEM.RECEIVE_APPLICATION:
        this.setState({confirmReceive: true, confirmTitle: "Click confirm to receive the application?"});
        break;
      case APPLICATION_MENUITEM.SEND_BACK:
        this.setState({openSendBackDialog: true});
        break;
      case APPLICATION_MENUITEM.SEND_MESSAGE:
        this.setState({openSendMessageDialog: true});
        break;
      case APPLICATION_MENUITEM.IMPOSE_FINE:
        this.setState({openFineDialog: true});
        break;
    }
  };

  receiveApplication = () => {
    this.setState({receiveConfirm: false, submit: true, submitTitle: "Receiving Application"});
    let url = UPDATE_FILE_APPLICATION(this.props.file.id, this.state.selectedApplication.id);
    axios.post(url, {status: ApplicationState.UNDER_PROCESS_APPLICATION})
        .then(res => {
          if (res.data.status) {
            this.setGlobal({successMsg: res.data.messages});
            this.componentDidMount();
          } else
            this.setGlobal({errorMsg: res.data.messages});
        })
        .catch(err => {
          this.setGlobal({errorMsg: err.toString()});
        })
        .finally(() => {
          this.setState({submit: false});
        });
  };
  listApplications = (val, status) => {
    const {fileable_type, current_user_id} = this.props.file;
    let title = "";
    let subtitle = "";
    let allowed = LoginService.getCurrentUser().id === current_user_id;

    // console.log(this.props.file)

    switch (fileable_type) {
      case "App\\Shop":
        title = "Applicant: " + val.owner;
        subtitle = "Name of Shop: " + val.name;
        break;
      case "App\\Hotel":
        title = "Applicant: " + val.owner;
        subtitle = "Name of Hotel: " + val.name;
        break;
      case "App\\Hoarding":
        title = "Applicant: " + val.applicant.advertiser.name;
        subtitle = "Contact: " + val.applicant.phone_no;
        break;
      case "App\\Kiosk":
        title = "Applicant: " + val.applicant.advertiser.name;
        subtitle = "Contact: " + val.applicant.phone_no;
        break;
      case "App\\Banner":
        title = "Applicant: " + val.name;
        subtitle = "Contact: " + val.phone;
        break;
      default:
        title = "Not Found";
        subtitle = "Not found";
        break;

    }
    let row = (
        <ListItem style={{
          boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)",
          borderRadius: 3
        }}>
          <ListItemText primary={title} secondary={subtitle} onClick={event => this.viewDetails(val)}/>
          {allowed &&
          <ListItemSecondaryAction>
            <Chip component={"div"} variant={"outlined"} color={"primary"} label={val.application_type}/>
            <Tooltip title={"Open Menu"}>
              <IconButton href={"#"} onClick={event => this.setState({openMenu: true, selectedApplication: val})}>
                <Icon color={"action"}>more_vert</Icon>
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
          }
        </ListItem>
    );
    return row;
  };
  imposeFine = (data) => {
    this.setState({openFineDialog: false});
    this.setState({submit: true, submitTitle: "Impose Fine"});
    this.applicationService.imposeFine(data,
        errorMsg => this.setGlobal({errorMsg}),
        successMsg => this.setGlobal({successMsg}))
        .finally(() => this.setState({submit: false}));
  };

  sendMessage = (msg) => {
    this.setState({openSendMessageDialog: false});
    this.setState({submit: true, submitTitle: "Sending Message"});
    this.applicationService.sendMessage(msg,
        errorMsg => this.setGlobal({errorMsg}),
        successMsg => this.setGlobal({successMsg}))
        .finally(() => this.setState({submit: false}));
    console.log(msg);
  };

  onSendBackApplication = (data) => {
    data.application_type = this.props.file.fileable_type;
    this.setState({openSendBackDialog: false});
    this.setState({submit: true, submitTitle: "Send Back Application"});
    this.applicationService.sendBack(data,
        errorMsg => this.setGlobal({errorMsg}),
        successMsg => {
          this.setGlobal({successMsg});
          this.componentDidMount();
        })
        .finally(() => this.setState({submit: false}));
  };
  handleTabChange = (event, newValue) => this.setState({tabValue: newValue});

  handleTabChangeIndex = (index) => this.setState({tabValue: index});

  viewDetails = (val) => this.setState({openDetails: true, singleData: val});

  closeDetails = () => this.setState({openDetails: false});

  closeStatus = () => this.setState({err: ""});

  render() {
    const {data, loading, tabValue, openMenu, openDetails, openSendMessageDialog, confirmTitle, openSendBackDialog, openFineDialog, singleData, confirmReceive, selectedApplication} = this.state;
    const newList = this.getByStatus(data, "new");
    const inProcessList = this.getByStatus(data, "in-process");
    const sentBackList = this.getByStatus(data, "sent-back");
    const reSubmitList = this.getByStatus(data, "resubmit");
    const rejectedList = this.getByStatus(data, "rejected");
    const cancelledList = this.getByStatus(data, "cancelled");
    const approvedList = this.getByStatus(data, "approved");

    const tabBar =
        <AppBar position="static" color="default">
          <Tabs
              value={tabValue}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
          >
            <Tab label={<Badge style={{padding: theme.spacing(0, 2)}} color="primary"
                               badgeContent={newList.length}>New</Badge>}/>
            <Tab label={<Badge style={{padding: theme.spacing(0, 2)}} color="primary"
                               badgeContent={sentBackList.length}>Sent Back</Badge>}/>
            <Tab label={<Badge style={{padding: theme.spacing(0, 2)}} color="primary"
                               badgeContent={reSubmitList.length}>Re Submit</Badge>}/>
            <Tab label={<Badge style={{padding: theme.spacing(0, 2)}} color="primary"
                               badgeContent={inProcessList.length}>In Process</Badge>}/>
            <Tab label={<Badge style={{padding: theme.spacing(0, 2)}} color="primary"
                               badgeContent={rejectedList.length}>Rejected</Badge>}/>
            <Tab label={<Badge style={{padding: theme.spacing(0, 2)}} color="primary"
                               badgeContent={cancelledList.length}>Cancelled</Badge>}/>
            <Tab label={<Badge style={{padding: theme.spacing(0, 2)}} color="primary"
                               badgeContent={approvedList.length}>Approved</Badge>}/>
          </Tabs>
        </AppBar>;

    let tabContent =
        <SwipeableViews
            axis={"x"}
            index={tabValue}
            onChangeIndex={this.handleTabChangeIndex}
        >
          <TabContainer>{loading ? <LoadingView/> :
              <List>{newList.length ? newList : "Application Not Found"}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> :
              <List>{sentBackList.length ? sentBackList : "Application Not Found"}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> :
              <List>{reSubmitList.length ? reSubmitList : "Application Not Found"}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> :
              <List>{inProcessList.length ? inProcessList : "Application Not Found"}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> :
              <List>{rejectedList.length ? rejectedList : "Application Not Found"}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> :
              <List>{cancelledList.length ? cancelledList : "Application Not Found"}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> :
              <List>{approvedList.length ? approvedList : "Application Not Found"}</List>}</TabContainer>
        </SwipeableViews>;

    return <>
      <CardHeader title="List of Applications" subheader=""/>
      <div>
        <div style={{flexGrow: 1}}>
          {tabBar}
          {tabContent}
        </div>
      </div>
      <Divider/>
      <ConfirmDialog message={confirmTitle} open={confirmReceive}
                     onCancel={() => this.setState({confirmReceive: false})}
                     onConfirm={this.receiveApplication}/>
      {openDetails &&
      <ApplicationDetailsDialog type={this.props.file.fileable_type} open={openDetails} title='View Application Details'
                                application={singleData}
                                file={this.props.file}
                                onClose={this.closeDetails}/>}
      {openSendBackDialog &&
      <SingleApplicationSendBackDialog onClose={e => this.setState({openSendBackDialog: false})}
                                       open={this.state.openSendBackDialog} application={selectedApplication}
                                       sendBackApplication={this.onSendBackApplication}/>}

      <SendMessageDialog onClose={e => this.setState({openSendMessageDialog: false})} open={openSendMessageDialog}
                         application={selectedApplication} onMessageSend={this.sendMessage}/>
      <ImposedFineDialog application={selectedApplication} open={openFineDialog}
                         onClose={e => this.setState({openFineDialog: false})} imposeFine={this.imposeFine}/>
      <SubmitDialog open={this.state.submit} title={this.state.submitTitle} text={"Please wait ..."}/>
      <ApplicationContextMenu open={openMenu} onMenuClick={this.onMenuClick}
                              onClose={e => this.setState({openMenu: false})} application={selectedApplication}/>
    </>
  };
}


export default FileApplications;
