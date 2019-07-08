import React, { Component } from "reactn";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, CardHeader, Icon,List } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import { FILE_DRAFT_LIST } from "../../../../../config/ApiRoutes";
import Divider from "@material-ui/core/Divider";
import moment from "moment";

class SelectCancelDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: []
    };
  }

  componentDidMount() {
    axios.get(FILE_DRAFT_LIST(this.props.file.id, "cancel"))
      .then(res => {
        if (res.data.status)
          this.setState({ drafts: res.data.data.drafts });
        else
          this.setGlobal({ errorMsg: res.data.messages });
      })
      .catch(err => {
        this.setGlobal({ errorMsg: err.toString() });
      });
  }

  formatCreated = (value) => {
    return "Created On: " + moment(value.created_at).format("Do MMMM YYYY");
  };


  render() {
    const { drafts } = this.state;
    const { onBack, onDraftSelect } = this.props;

    return (
      <>
        <CardHeader title={"Please Select Draft to Canceled"}/>
        <Divider component={"div"}/>
        <List>
        {drafts.map((draft, index) =>
          <DetailViewRow key={index} click={e => onDraftSelect(draft)} primary={"Draft Cancellation Order No. " + draft.id}
                         secondary={this.formatCreated(draft)}>
            <IconButton href={"#"} onClick={e => onDraftSelect(draft)}>
              <Icon color={"action"}>keyboard_arrow_right</Icon>
            </IconButton>
          </DetailViewRow>
        )};
        </List>
        <br/>
        <br/>
        <br/>
        <Button href={"#"} onClick={onBack} variant={"contained"} color={"primary"}>Back</Button>
      </>
    );
  }
}

SelectCancelDraft.propTypes = {
  file: PropTypes.object.isRequired,
  onDraftSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
export default SelectCancelDraft;