import React, { Component } from "reactn";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, CardActions, CardHeader, Icon, InputAdornment, List } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import { FILE_DRAFT_LIST } from "../../../../../config/ApiRoutes";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";
import TextEditor from "../../../common/Editor";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import CalendarIcon from "@material-ui/core/SvgIcon/SvgIcon";

class SelectApprovedDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: [],
      selectedDraft: null,

      validity: null,
      validityError: ""
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

  selectDraft = (draft) => {
    this.setState({ selectedDraft: draft });
  };

  render() {
    const { drafts, selectedDraft, validity, validityError } = this.state;
    const { onBack, onDraftSelect,onSetValidity,createDraft } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          {drafts.length!==0 &&<CardHeader title={"Please Select Draft to Approved"}/>}
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
            {drafts.length===0 && <Button href={"#"} variant={"text"} color={"primary"} onClick={event => createDraft()}>Create Draft</Button>}
          </List>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              InputLabelProps={
                { shrink: true }
              }
              InputProps={{
                endAdornment:
                  <InputAdornment position={"end"}>
                    <CalendarIcon color={"action"}/>
                  </InputAdornment>
              }}
              fullWidth={true}
              label={"Set Validity"}
              error={Boolean(validityError)}
              onBlur={e=>Boolean(e.target.value)?this.setState({validityError:""}):this.setState({validityError:"Validity is required"})}
              helperText={validityError}
              margin="dense"
              name={"validity"}
              variant="outlined"
              value={validity}
              onChange={val=>this.setState({validity:val})}
              format={"dd/MM/yyyy"}
            />
          </MuiPickersUtilsProvider>
          <br/>
          <Button href={"#"} onClick={onBack} variant={"contained"} color={"default"}>Back</Button>
          {"\u00A0 "}
          {"\u00A0 "}
          {"\u00A0 "}
          <Button disabled={!Boolean(validity) || !Boolean(selectedDraft)} href={"#"} onClick={e => {
            onDraftSelect(selectedDraft)
            onSetValidity(validity)
          }} variant={"contained"}
                  color={"primary"}>Next</Button>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>

          {selectedDraft &&
          <TextEditor default={selectedDraft?selectedDraft.content:""} onChange={e => selectedDraft.content = e.target.getContent()}/>}

        </GridItem>


      </GridContainer>
    );
  }
}

SelectApprovedDraft.propTypes = {
  file: PropTypes.object.isRequired,
  onDraftSelect: PropTypes.func.isRequired,
  onSetValidity: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
export default SelectApprovedDraft;