import React, {Component} from 'react';
import axios from 'axios';
import DetailViewRow from "../../../common/DetailViewRow";
import LoadingView from "../../../../common/LoadingView";
import {FILE_DRAFT_LIST} from "../../../../../config/ApiRoutes";
import ErrorHandler from "../../../../common/StatusHandler";
import moment from "moment";
import { CardHeader, Icon, List } from "@material-ui/core";
import DraftSingleViewDialog from "../../../../common/DraftSingleViewDialog";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

class FileDrafts extends Component {
  state = {
    data: [],
    errorMsg: null,
    loading: true,
    showDetails:false,
    singleData:null
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
  closeDetails = () => this.setState({showDetails: false});

  formatCreated = (value) => {
    return "Created On: " + moment(value.created_at).format("Do MMMM YYYY");
  };

  singleRowClicked = (singleData) => {
    this.setState({singleData,showDetails:true})
  };

  render() {
    const {loading, showDetails,singleData, data} = this.state;
    const content = data.length === 0 ? "No draft" :
        data.map(value => <DetailViewRow actionIcon={true } value={value} click={this.singleRowClicked}
                                         primary={"Draft No. " + value.id} secondary={this.formatCreated(value)}>
          <IconButton href={"#"} onClick={e=>this.singleRowClicked(value)}>
            <Icon color={"action"}>keyboard_arrow_right</Icon>
          </IconButton>
        </DetailViewRow>);
    return (
        <>
          <CardHeader title="List of Drafts" subheader="See details below"/>
          <Divider/>
          {loading ? <LoadingView align="left"/> : <List>{content}</List>}
          {showDetails && <DraftSingleViewDialog draft={singleData} open={showDetails} onClose={this.closeDetails}/>}

        </>
    )
  }
}

export default FileDrafts;