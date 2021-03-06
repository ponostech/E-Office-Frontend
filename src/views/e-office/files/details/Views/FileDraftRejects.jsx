import React from "react";
import axios from "axios";
import { CardHeader, Icon, List } from "@material-ui/core";
import LoadingView from "../../../../common/LoadingView";
import { FILE_DRAFT_LIST } from "../../../../../config/ApiRoutes";
import DetailViewRow from "../../../common/DetailViewRow";
import DraftSingleViewDialog from "../../../../common/DraftSingleViewDialog";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

class FileDraftRejects extends React.Component {
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

  getData = id => axios.get(FILE_DRAFT_LIST(id, "reject"));

  responseData = res => {
    if (res.data.status)
      this.setState({ loading: false, data: res.data.data.drafts });
    else this.setState({ errorMsg: res.data.messages });
  };

  formatCreated = value => {
    return "Created On: " + moment(value.created_at).format("Do MMMM YYYY");
  };
  closeDetails = () => this.setState({ showDetails: false, loading: false });

  openDetails = draft => {
    this.setState({ singleData: draft, showDetails: true });
  };

  render() {
    const { loading, data, showDetails, singleData } = this.state;
    const content =
      data.length === 0
        ? "No draft"
        : data.map(value => (
            <DetailViewRow
              value={value}
              click={() => this.openDetails(value)}
              primary={"Draft Reject Order No. " + value.id}
              secondary={this.formatCreated(value)}
            >
              <IconButton href={"#"} onClick={e => this.openDetails(value)}>
                <Icon color={"action"}>keyboard_arrow_right</Icon>
              </IconButton>
            </DetailViewRow>
          ));
    return (
      <>
        <CardHeader
          title="List of Drafts Reject"
          subheader="click on the list item to see details"
        />
        <Divider component={"div"} />
        {loading ? <LoadingView align="left" /> : <List>{content}</List>}
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

export default FileDraftRejects;
