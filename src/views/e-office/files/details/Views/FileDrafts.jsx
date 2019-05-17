import React, {Component} from 'react';
import axios from 'axios';
import DetailViewRow from "../../../common/DetailViewRow";
import LoadingView from "../../../../common/LoadingView";
import {FILE_DRAFT_LIST} from "../../../../../config/ApiRoutes";
import ErrorHandler from "../../../../common/StatusHandler";
import moment from "moment";

class FileDrafts extends Component {
  state = {
    data: [],
    errorMsg: null,
    loading: true,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(FILE_DRAFT_LIST(this.props.file.id))
        .then(res => {
          if (res.data.status) this.setState({loading: false, data: res.data.data.drafts});
          else this.setState({errorMsg: res.data.messages});
        })
        .catch(err => {
          this.setState({errorMsg: 'Network Error!'});
        })
  };

  formatCreated = (value) => {
    return "Created On: " + moment(value.created_at).format("Do MMMM YYYY");
  };

  singleRowClicked = (value) => {
    console.log("message: " + value.id);
  };

  render() {
    const {loading, errorMsg} = this.state;

    const data = this.state.data.map(value => <DetailViewRow value={value} click={this.singleRowClicked}
                                                             primary={"Draft No. " + value.id}
                                                             secondary={this.formatCreated(value)}/>);
    return (
        <>
          <p>List of Drafts</p>
          {loading ? <LoadingView align="left"/> : data}
          {errorMsg && <ErrorHandler messages={this.state.errorMsg}/>}
        </>
    )
  }
}

export default FileDrafts;