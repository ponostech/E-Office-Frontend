import React, { Component } from "reactn";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, CardHeader, Icon,List } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import { FILE_DRAFT_LIST } from "../../../../../config/ApiRoutes";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";
import TextEditor from "../../../common/Editor";
import ApplicationResolver from "../common/ApplicationResolver";

class SelectApprovedDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: [],
      selectedDraft: null
    };
  }

  componentDidMount() {
    axios.get(FILE_DRAFT_LIST(this.props.file.id, "permit"))
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

  selectDraft=(draft)=>{
    this.setState({ selectedDraft: draft})
  }

  render() {
    const { drafts,selectedDraft } = this.state;
    const { onBack, onDraftSelect } = this.props;


    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CardHeader title={"Please Select Draft to Approved"}/>
          <Divider component={"div"}/>
          <List>
            {drafts.map((draft, index) =>
              <DetailViewRow key={index} click={e => this.selectDraft(draft)} primary={"Draft Permit No. " + draft.id}
                             secondary={this.formatCreated(draft)}>
                <IconButton href={"#"} onClick={e => this.selectDraft(draft)}>
                  <Icon color={"action"}>keyboard_arrow_right</Icon>
                </IconButton>
              </DetailViewRow>
            )}
          </List>
          <br/>
          <Button href={"#"} onClick={onBack} variant={"contained"} color={"default"}>Back</Button>
          <Button href={"#"} onClick={e=>onDraftSelect(selectedDraft)} variant={"contained"} color={"primary"}>Next</Button>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>

          {selectedDraft && <TextEditor default={selectedDraft.content} onChange={e=>selectedDraft.content=e.target.getContent()} />}

        </GridItem>


      </GridContainer>
    );
  }
}

SelectApprovedDraft.propTypes = {
  file: PropTypes.object.isRequired,
  onDraftSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
export default SelectApprovedDraft;