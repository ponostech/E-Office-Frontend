import React, { Component } from "reactn";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, CardContent, CardHeader, Icon, List, TextField } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import { FILE_DRAFT_LIST } from "../../../../../config/ApiRoutes";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";
import TextEditor from "../../../common/Editor";
import ApplicationResolver from "../common/ApplicationResolver";

class CreateReasonDialog extends Component {
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

  render() {
    const { onBack,reason, onCreateReason,onNext } = this.props;


    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>

          <CardHeader title={"Type Reason"}/>
          <Divider component={"div"}/>
          <CardContent>
            <TextField value={reason} label={"Reason"} required={true} variant={"outlined"} fullWidth={true} name={"reason"} multiline={true} rows={5}
                       onChange={event => onCreateReason(event.target.value)} />
          </CardContent>
          <Button href={"#"} onClick={onBack} variant={"contained"} color={"default"}>Back</Button>
          <Button disabled={!Boolean(reason)} href={"#"} onClick={e=>onNext()} variant={"contained"} color={"primary"}>Next</Button>

        </GridItem>
      </GridContainer>
    );
  }
}

CreateReasonDialog.propTypes = {
  file: PropTypes.object.isRequired,
  reason: PropTypes.string.isRequired,
  onCreateReason: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};
export default CreateReasonDialog;