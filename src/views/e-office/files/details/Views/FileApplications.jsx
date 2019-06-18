import React, {Component} from 'react';
import axios from 'axios';
import LoadingView from "../../../../common/LoadingView";
import DetailViewRow from "../../../common/DetailViewRow";
import {CardHeader, Tabs, Tab, AppBar, Typography, List} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Divider from "@material-ui/core/Divider";
import ErrorHandler from "../../../../common/StatusHandler";
import ApplicationDetailsDialog from '../../../../common/ApplicationDetailsDialog';

// hoarding/:id/applications
function TabContainer({children, dir}) {
  return (
      <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
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
    err: '',
  };
  function;

  componentDidMount() {
    const apiUrl = this.getApi(this.props.url);
    this.getData(apiUrl);
  };

  getData = (url) => {
    axios.get(url)
        .then(res => this.processResponse(res))
        .catch(err => this.setState({err: err.toString()}))
        .then(res => this.setState({loading: false}));
  };

  processResponse = (res) => {
    if (res.data.status) this.setState({data: res.data.data.applications});
    else this.setState({err: res.data.messages})
  };

  getApi = (url) => {
    let apiUrl = '';
    this.props.menus.view.forEach(val => {
      if (val.url === url) {
        apiUrl = val.api_url;
        return true;
      }
    });
    return apiUrl;
  };

  getByStatus = (data, status = 'new') => {
    if (!data.length) return false
    return data.filter((val) => {
      if (val.status === status) return true;
    }).map(val => <DetailViewRow key={val.id} primary={val.applicant.advertiser.name}
                                 secondary={val.status.toUpperCase()} click={this.viewDetails} value={val}/>);
  };

  handleTabChange = (event, newValue) => this.setState({tabValue: newValue});

  handleTabChangeIndex = (index) => this.setState({tabValue: index});

  viewDetails = (val) => this.setState({openDetails: true, singleData: val});

  closeDetails = () => this.setState({openDetails: false});

  closeStatus = () => this.setState({err: ''});

  render() {
    const {data, loading, tabValue, err, openDetails, singleData} = this.state;
    const newList = this.getByStatus(data, 'new');
    const inProcessList = this.getByStatus(data, 'in-process');
    const rejectedList = this.getByStatus(data, 'rejected');
    const cancelledList = this.getByStatus(data, 'cancelled');
    const approvedList = this.getByStatus(data, 'approved');

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
            axis={'x'}
            index={tabValue}
            onChangeIndex={this.handleTabChangeIndex}
        >
          <TabContainer>{loading ? <LoadingView/> : <List>{newList.length ? newList : 'Not Available'}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> : <List>{inProcessList.length ? inProcessList : 'Not Available'}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> : <List>{rejectedList.length ? rejectedList : 'Not Available'}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> : <List>{cancelledList.length ? cancelledList : 'Not Available'}</List>}</TabContainer>
          <TabContainer>{loading ? <LoadingView/> : <List>{approvedList.length ? approvedList : 'Not Available'}</List>}</TabContainer>
        </SwipeableViews>;

    return <>
      <CardHeader title="List of Applications" subheader=""/>
      <div>
        {tabBar}
        {tabContent}
      </div>
      <Divider/>
      {err && <ErrorHandler messages={err} onClose={this.closeStatus}/>}
      {openDetails && <ApplicationDetailsDialog open={openDetails} title='View Application Details' content={singleData}
                                                onClose={this.closeDetails}/>}
    </>
  }
}


export default FileApplications;
