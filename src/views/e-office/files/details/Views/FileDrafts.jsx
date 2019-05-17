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
    // files/{file_id}/drafts/{type?}
    axios.get(FILE_DRAFT_LIST(this.props.file.id))
        .then(res => {
          // console.log("response", res);
          if (res.data.status) {
            this.setState({loading: false, data: res.data.data.drafts});
          } else {
            this.setState({errorMsg: res.data.messages});
          }
        })
        .catch(err => {
          this.setState({errorMsg: 'Network Error!'});
        })
  }

  render() {
    const {loading, errorMsg} = this.state;

    // let fake = <LoadingDialog/>;
    // for (let i = 1; i <= 10; i++) {
    // fake.push(<DetailViewRow primary={"Draft " + i} secondary="File No."/>);
    // }
    const data = this.state.data.map(value => <DetailViewRow primary={"Draft No. " + value.id}
                                                             secondary={"Created On: " + moment(value.created_at).format("Do MMMM YYYY")}/>);
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