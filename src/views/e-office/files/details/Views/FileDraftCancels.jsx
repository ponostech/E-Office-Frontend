import React from "react";
import axios from "axios";
import { CardHeader, Icon, List } from "@material-ui/core";
import LoadingView from "../../../../common/LoadingView";
import { FILE_DRAFT_LIST } from "../../../../../config/ApiRoutes";
import DetailViewRow from "../../../common/DetailViewRow";
import ErrorHandler from "../../../../common/StatusHandler";
import DraftSingleViewDialog from "../../../../common/DraftSingleViewDialog";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

class fileDraftCancels extends React.Component {
  state = {
    data: [],
    singleData: [],
    showDetails: false,
    errorMsg: "",
    successMsg: "",
    loading: true
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.key !== this.props.location.key) this.loadData();
  }

  loadData = () => {
    this.getData(this.props.file.id)
      .then(res => this.responseData(res))
      .catch(err => this.setState({ errorMsg: err.toString() }));
  };

  getData = id => axios.get(FILE_DRAFT_LIST(id, "cancel"));

  responseData = res => {
    if (res.data.status)
      this.setState({ loading: false, data: res.data.data.drafts });
    else this.setState({ errorMsg: res.data.messages });
  };

  formatCreated = value => {
    return "Created On: " + moment(value.created_at).format("Do MMMM YYYY");
  };

  openDetails = draft => {
    this.setState({ singleData: draft, showDetails: true });
  };
  closeDetails = () => this.setState({ showDetails: false, loading: false });

  render() {
    const { loading, errorMsg, data, showDetails, singleData } = this.state;
    const content =
      data.length === 0
        ? "No draft"
        : data.map(value => (
            <DetailViewRow
              value={value}
              click={this.openDetails}
              actionIcon={true}
              primary={"Draft Cancellation Order No. " + value.id}
              secondary={this.formatCreated(value)}
            >
              <IconButton href={"#"} onClick={this.openDetails}>
                <Icon color={"action"}>keyboard_arrow_right</Icon>
              </IconButton>
            </DetailViewRow>
          ));
    return (
      <>
        <CardHeader
          title="List of Drafts Cancellation"
          subheader="click on the list item to see details"
        />
        <Divider component={"div"} />
        {loading ? <LoadingView align="left" /> : <List>{content}</List>}
        {errorMsg && <ErrorHandler messages={this.state.errorMsg} />}
        {showDetails && singleData && (
          <DraftSingleViewDialog
            draft={singleData}
            open={showDetails}
            onClose={this.closeDetails}
          />
        )}
      </>
    );
  }
}

export default fileDraftCancels;
