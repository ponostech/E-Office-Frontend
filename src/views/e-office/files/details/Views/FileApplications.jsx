import React, { Component } from "reactn";
import axios from "axios";
import LoadingView from "../../../../common/LoadingView";
import DetailViewRow from "../../../common/DetailViewRow";
import { AppBar, CardHeader, Icon, List, Tab, Tabs, Tooltip, Typography } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Divider from "@material-ui/core/Divider";
import ErrorHandler from "../../../../common/StatusHandler";
import ApplicationDetailsDialog from "../../../../common/ApplicationDetailsDialog";
import IconButton from "@material-ui/core/IconButton";
import SubmitDialog from "../../../../../components/SubmitDialog";
import { UPDATE_FILE_APPLICATION } from "../../../../../config/ApiRoutes";
import ApplicationState from "../../../../../utils/ApplicationState";
import { LoginService } from "../../../../../services/LoginService";

// hoarding/:id/applications
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class FileApplications extends Component {
  state = {
    data: [],
    singleData: [],
    loading: true,
    openDetails: false,
    tabValue: 0,
    err: ""
  };
  function;

  componentDidMount() {
    const apiUrl = this.getApi(this.props.url);
    this.getData(apiUrl);
  };

  getData = (url) => {
    axios.get(url)
      .then(res => this.processResponse(res))
      .catch(err => this.setState({ err: err.toString() }))
      .then(res => this.setState({ loading: false }));
  };

  processResponse = (res) => {
    if (res.data.status) this.setState({ data: res.data.data.applications });
    else this.setState({ err: res.data.messages });
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

  receiveApplication = (application) => {
    this.setState({ submit: true });
    let url = UPDATE_FILE_APPLICATION(this.props.file.id, application.id);
    axios.post(url, { status: ApplicationState.UNDER_PROCESS_APPLICATION })
      .then(res => {
        if (res.data.status) {
          this.setGlobal({ successMsg: res.data.messages });
          this.componentDidMount();
        } else
          this.setGlobal({ errorMsg: res.data.messages });
      })
      .catch(err => {
        this.setGlobal({ errorMsg: err.toString() });
      })
      .finally(() => {
        this.setState({ submit: false });
      });
  };
  listApplications = (val, status) => {
    const { fileable_type,current_user_id } = this.props.file;
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
    return <DetailViewRow key={val.id} primary={title} secondary={subtitle} value={val}
                          type={fileable_type} click={this.viewDetails}>
      {
        status === "new" && allowed && <Tooltip title={"Receive Application"}>
          <IconButton href={"#"} onClick={event => this.receiveApplication(val)}>
            <Icon color={"primary"}>desktop_mac</Icon>
          </IconButton>
        </Tooltip>
      }
    </DetailViewRow>;
  };


  handleTabChange = (event, newValue) => this.setState({ tabValue: newValue });

  handleTabChangeIndex = (index) => this.setState({ tabValue: index });

  viewDetails = (val) => this.setState({ openDetails: true, singleData: val });

  closeDetails = () => this.setState({ openDetails: false });

  closeStatus = () => this.setState({ err: "" });

  render() {
    const { data, loading, tabValue, err, openDetails, singleData } = this.state;
    const newList = this.getByStatus(data, "new");
    const inProcessList = this.getByStatus(data, "in-process");
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
          variant="fullWidth"
        >
          <Tab label="New Applications"/>
          <Tab label="In Process Applications"/>
          <Tab label="Rejected Applications"/>
          <Tab label="Cancelled Applications"/>
          <Tab label="Approved Applications"/>
        </Tabs>
      </AppBar>;

    let tabContent =
      <SwipeableViews
        axis={"x"}
        index={tabValue}
        onChangeIndex={this.handleTabChangeIndex}
      >
        <TabContainer>{loading ? <LoadingView/> :
          <List>{newList.length ? newList : "Not Available"}</List>}</TabContainer>
        <TabContainer>{loading ? <LoadingView/> :
          <List>{inProcessList.length ? inProcessList : "Not Available"}</List>}</TabContainer>
        <TabContainer>{loading ? <LoadingView/> :
          <List>{rejectedList.length ? rejectedList : "Not Available"}</List>}</TabContainer>
        <TabContainer>{loading ? <LoadingView/> :
          <List>{cancelledList.length ? cancelledList : "Not Available"}</List>}</TabContainer>
        <TabContainer>{loading ? <LoadingView/> :
          <List>{approvedList.length ? approvedList : "Not Available"}</List>}</TabContainer>
      </SwipeableViews>;

    return <>
      <CardHeader title="List of Applications" subheader=""/>
      <div>
        {tabBar}
        {tabContent}
      </div>
      <Divider/>
      <SubmitDialog open={this.state.submit} text={"Please wait ..."} title={"Receive Application"}/>
      {err && <ErrorHandler messages={err} onClose={this.closeStatus}/>}
      {openDetails &&
      <ApplicationDetailsDialog type={this.props.file.fileable_type} open={openDetails} title='View Application Details'
                                content={singleData}
                                onClose={this.closeDetails}/>}
    </>;
  }
}


export default FileApplications;
