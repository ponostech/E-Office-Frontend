import React, {Component} from 'reactn';
import axios from 'axios';
import { CardHeader, Icon, List } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import LoadingView from "../../../../common/LoadingView";
import {FILE_DRAFT_LIST} from "../../../../../config/ApiRoutes";
import ErrorHandler from "../../../../common/StatusHandler";
import moment from "moment";
import DraftSingleViewDialog from "../../../../common/DraftSingleViewDialog";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

class FileDraftPermitList extends Component {
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
    axios.get(FILE_DRAFT_LIST(id, 'permit'))
        .then(res => {
          if (res.data.status) this.setState({loading: false, data: res.data.data.drafts});
          else this.setGlobal({errorMsg: res.data.messages});
        })
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
  };

  formatCreated = (value) => "Created by - " + value.creator.staff.name + " (" + value.creator.staff.designation + ")" +
      " on " + moment(value.created_at).format("Do MMMM YYYY");

  closeDetails = () => this.setState({showDetails: false, loading: false});

  openDetails = (value) => this.setState({loading: true, singleData: value, showDetails: true});

  render() {
    const {loading, showDetails, singleData, data} = this.state;
    const content = data.length === 0 ? "No draft" :
        data.map(value => <DetailViewRow value={value} click={this.openDetails}
                                         primary={"Draft Permit No. " + value.id}
                                         secondary={this.formatCreated(value)}>
          <IconButton href={"#"} onClick={this.openDetails}>
            <Icon color={"action"}>keyboard_arrow_right</Icon>
          </IconButton>
        </DetailViewRow>);
    return (
        <>
          <CardHeader title="List of Drafts Permit"/>
          <Divider component={"div"}/>
          {loading ? <LoadingView align="left"/> : <List>{content}</List>}
          {showDetails && <DraftSingleViewDialog draft={singleData} open={showDetails} onClose={this.closeDetails}/>}
        </>
    )
  }
}

export default FileDraftPermitList;