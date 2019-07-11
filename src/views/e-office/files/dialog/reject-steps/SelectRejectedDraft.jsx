import React, { Component } from "reactn";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, CardActions, CardHeader, Icon,List } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import { FILE_DRAFT_LIST } from "../../../../../config/ApiRoutes";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";
import TextEditor from "../../../common/Editor";

class SelectRejectedDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: [],
      selectedDraft:null
    };
  }

  componentDidMount() {
    axios.get(FILE_DRAFT_LIST(this.props.file.id, "reject"))
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

  selectDraft=(selectedDraft)=>{
    this.setState({selectedDraft})
  }

  render() {
    const { drafts,selectedDraft } = this.state;
    const { onBack, onDraftSelect } = this.props;

    return (
      <GridContainer>
        <GridItem md={4}>
          <CardHeader title={"Please Select Draft to Reject"}/>
          <Divider component={"div"}/>
          <List>
            {drafts.map((draft, index) =>
              <DetailViewRow key={index} click={e => this.selectDraft(draft)} primary={"Draft Reject Order No. " + draft.id}
                             secondary={this.formatCreated(draft)}>
                <IconButton href={"#"} onClick={e => this.selectDraft(draft)}>
                  <Icon color={"action"}>keyboard_arrow_right</Icon>
                </IconButton>
              </DetailViewRow>
            )}
          </List>
          <br/>
          <br/>
          <Button href={"#"} onClick={onBack} variant={"contained"} color={"default"}>Back</Button>
          {"\u00A0 "}
          {"\u00A0 "}
          {"\u00A0 "}
          <Button disabled={!Boolean(selectedDraft)} href={"#"} onClick={event => onDraftSelect(selectedDraft)} variant={"contained"} color={"primary"}>Next</Button>
        </GridItem>
        <GridItem md={8}>
          <TextEditor default={selectedDraft?selectedDraft.content:""} onChange={event=>selectedDraft.content=event.target.getContent()}/>
        </GridItem>

      </GridContainer>
    );
  }
}

SelectRejectedDraft.propTypes = {
  file: PropTypes.object.isRequired,
  onDraftSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
export default SelectRejectedDraft;