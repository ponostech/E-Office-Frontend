import React from 'react';
import axios from 'axios';
import {CardHeader, List} from "@material-ui/core";
import LoadingView from "../../../../common/LoadingView";
import {FILE_DRAFT_LIST} from "../../../../../config/ApiRoutes";
import DetailViewRow from "../../../common/DetailViewRow";
import ErrorHandler from "../../../../common/StatusHandler";
import DraftSingleViewDialog from "../../../../common/DraftSingleViewDialog";
import moment from "moment";

class fileDraftCancels extends React.Component {
  state = {
    data: [],
    singleData: [],
    showDetails: false,
    errorMsg: '',
    successMsg: '',
    loading: true,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.key !== this.props.location.key) this.loadData();
  }

  loadData = () => {
    this.getData(this.props.file.id).then(res => this.responseData(res))
        .catch(err => this.setState({errorMsg: err.toString()}));
  };

  getData = (id) => axios.get(FILE_DRAFT_LIST(id, 'cancel'));

  responseData = (res) => {
    if (res.data.status) this.setState({loading: false, data: res.data.data.drafts});
    else this.setState({errorMsg: res.data.messages});
  };

  formatCreated = (value) => {
    return "Created On: " + moment(value.created_at).format("Do MMMM YYYY");
  };

  openDetails = () => {

  };

  render() {
    const {loading, errorMsg, successMsg, data, showDetails, singleData} = this.state;
    const content = data.length === 0 ? "No draft" :
        data.map(value => <DetailViewRow value={value} click={this.openDetails} actionIcon={true}
                                         primary={"Draft Cancellation Order No. " + value.id}
                                         secondary={this.formatCreated(value)}/>);
    return (
        <>
          <CardHeader title="List of Drafts Cancellation" subheader="click on the list item to see details"/>
          {loading ? <LoadingView align="left"/> : <List>{content}</List>}
          {errorMsg && <ErrorHandler messages={this.state.errorMsg}/>}
          {showDetails && singleData &&
          <DraftSingleViewDialog data={singleData} open={showDetails} onClose={this.closeDetails}/>}
        </>
    )
  }
}

export default fileDraftCancels;