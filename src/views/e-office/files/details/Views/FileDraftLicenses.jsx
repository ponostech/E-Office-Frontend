import React, {Component} from 'react';
import axios from 'axios';
import {CardHeader} from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import LoadingView from "../../../../common/LoadingView";
import {FILE_DRAFT_LIST} from "../../../../../config/ApiRoutes";
import ErrorHandler from "../../../../common/StatusHandler";
import moment from "moment";
import DraftSingleViewDialog from "../../../../common/DraftSingleViewDialog";

class FileDraftLicensesList extends Component {
  state = {
    showDetails: false,
    data: [],
    singleData: [],
    errorMsg: null,
    loading: true,
  };

  componentDidMount() {
    this.getData(this.props.file.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.key !== this.props.location.key) this.getData(this.props.file.id);
  }

  getData = (id) => {
    axios.get(FILE_DRAFT_LIST(id, 'license'))
        .then(res => {
          if (res.data.status) this.setState({loading: false, data: res.data.data.drafts});
          else this.setState({errorMsg: res.data.messages});
        })
        .catch(err => this.setState({errorMsg: err.toString()}))
  };

  formatCreated = (value) => "Created by - " + value.creator.staff.name + " (" + value.creator.staff.designation + ")" +
      " on " + moment(value.created_at).format("Do MMMM YYYY");

  closeDetails = () => this.setState({showDetails: false, loading: false});

  openDetails = (value) => this.setState({loading: true, singleData: value, showDetails: true});

  render() {
    const {loading, errorMsg, showDetails, singleData} = this.state;
    const data = this.state.data.map(value => <DetailViewRow value={value} click={this.openDetails}
                                                             primary={"Draft Permit No. " + value.id}
                                                             secondary={this.formatCreated(value)}/>);
    return (
        <>
          <CardHeader title="List of Drafts Licenses"/>
          {loading ? <LoadingView align="left"/> : data}
          {errorMsg && <ErrorHandler messages={this.state.errorMsg}/>}
          {showDetails && <DraftSingleViewDialog data={singleData} open={showDetails} onClose={this.closeDetails}/>}
        </>
    )
  }
}

export default FileDraftLicensesList;