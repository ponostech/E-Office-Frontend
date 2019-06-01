import React, {Component} from 'react';
import axios from 'axios';
import DetailViewRow from "../../../common/DetailViewRow";
import LoadingView from "../../../../common/LoadingView";
import {FILE_DRAFT_LIST} from "../../../../../config/ApiRoutes";
import ErrorHandler from "../../../../common/StatusHandler";
import moment from "moment";
import {CardHeader, List} from "@material-ui/core";

class FileDrafts extends Component {
  state = {
    data: [],
    errorMsg: null,
    loading: true,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.key !== this.props.location.key) this.getData();
  }

  getData = () => {
    axios.get(FILE_DRAFT_LIST(this.props.file.id))
        .then(res => {
          if (res.data.status) this.setState({loading: false, data: res.data.data.drafts});
          else this.setState({errorMsg: res.data.messages});
        })
        .catch(err => this.setState({errorMsg: err.toString()}))
  };

  formatCreated = (value) => {
    return "Created On: " + moment(value.created_at).format("Do MMMM YYYY");
  };

  singleRowClicked = (value) => {
    console.log("message: " + value.id);
  };

  render() {
    const {loading, errorMsg, data} = this.state;
    const content = data.length === 0 ? "No draft" :
        data.map(value => <DetailViewRow value={value} click={this.singleRowClicked}
                                         primary={"Draft No. " + value.id} secondary={this.formatCreated(value)}/>);
    return (
        <>
          <CardHeader title="List of Drafts" subheader="See details below"/>
          {loading ? <LoadingView align="left"/> : <List>{content}</List>}
          {errorMsg && <ErrorHandler messages={this.state.errorMsg}/>}
        </>
    )
  }
}

export default FileDrafts;