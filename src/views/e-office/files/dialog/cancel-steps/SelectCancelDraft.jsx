import React, { Component } from "reactn";
import PropTypes from "prop-types";
import { Button, CardHeader, Icon, List } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";
import TextEditor from "../../../common/Editor";
import ApplicationService from "../../../../../services/ApplicationService";

class SelectCancelDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: [],
      selectedDraft: null
    };
    this.applicationService = new ApplicationService();
  }

  componentDidMount() {
    this.applicationService
      .getFileDrafts(
        this.props.file.id,
        "cancel",
        errorMsg => this.setGlobal({ errorMsg }),
        drafts => this.setState({ drafts })
      )
      .finally(() => console.log("cancel draft request complete"));
  }

  formatCreated = value => {
    return "Created On: " + moment(value.created_at).format("Do MMMM YYYY");
  };

  selectDraft = selectedDraft => {
    const { application, file } = this.props;
    let params = {
      application_id: application.id,
      application_type: file.fileable_type
    };
    this.applicationService
      .getDraft(
        selectedDraft.id,
        params,
        errorMsg => this.setGlobal({ errorMsg }),
        selectedDraft => this.setState({ selectedDraft })
      )
      .finally(() => console.log("draft request complete"));
  };
  render() {
    const { drafts, selectedDraft } = this.state;
    const { onBack, onDraftSelect, createCancelDraft } = this.props;

    return (
      <GridContainer>
        <GridItem md={4}>
          <CardHeader title={"Please Select Draft to Cancelled"} />
          <Divider component={"div"} />
          {drafts.length === 0 && (
            <Button
              href={"#"}
              variant={"text"}
              onClick={e => createCancelDraft()}
            >
              Create Cancel Draft
            </Button>
          )}

          <List>
            {drafts.map((draft, index) => (
              <DetailViewRow
                key={index}
                click={e => this.selectDraft(draft)}
                primary={"Draft Cancellation Order No. " + draft.id}
                secondary={this.formatCreated(draft)}
              >
                <IconButton href={"#"} onClick={e => this.selectDraft(draft)}>
                  <Icon color={"action"}>keyboard_arrow_right</Icon>
                </IconButton>
              </DetailViewRow>
            ))}
          </List>
          <br />
          <br />
          <Button
            href={"#"}
            onClick={onBack}
            variant={"contained"}
            color={"default"}
          >
            Back
          </Button>
          {"\u00A0 "}
          {"\u00A0 "}
          {"\u00A0 "}
          <Button
            disabled={!Boolean(selectedDraft)}
            href={"#"}
            onClick={event => onDraftSelect(selectedDraft)}
            variant={"contained"}
            color={"primary"}
          >
            Next
          </Button>
        </GridItem>
        <GridItem md={8}>
          {selectedDraft && (
            <TextEditor
              default={selectedDraft.content}
              onChange={event =>
                (selectedDraft.content = event.target.getContent())
              }
            />
          )}
        </GridItem>
      </GridContainer>
    );
  }
}

SelectCancelDraft.propTypes = {
  file: PropTypes.object.isRequired,
  onDraftSelect: PropTypes.func.isRequired,
  createCancelDraft: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
export default SelectCancelDraft;
