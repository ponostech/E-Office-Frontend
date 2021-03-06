import React, { Component } from "reactn";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  Slide,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import OfficeSelect from "../../../../components/OfficeSelect";
import Editor from "../../common/Editor";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  FILE_ACTION_TYPES,
  FILE_PRIORITIES
} from "../../../../config/ApiRoutes";
import LoadingView from "../../../common/LoadingView";
import CalendarIcon from "@material-ui/icons/Today";
import DialogContent from "@material-ui/core/DialogContent";
import ErrorHandler from "../../../common/StatusHandler";
import { AttachmentView } from "../../../../components/NotesheetAttachmentItem";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  editor: {
    minHeight: 200
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NoteCreateDialog extends Component {
  state = {
    content: "",
    action: null,
    priority: null,
    fixedDate: null,
    priorityTypes: [],
    actionTypes: [],

    attachments: [],
    hasError: false,
    errorMsg: ""
  };

  componentDidMount() {
    axios
      .all([this.getFileActionTypes(), this.getFilePriorities()])
      .then(
        axios.spread((actions, priorities) =>
          this.processResult(actions, priorities)
        )
      )
      .then(() => this.setGlobal({ loading: false }))
      .catch(err => this.setGlobal({ errorMsg: err.toString() }));
  }

  processResult = (actions, priorities) => {
    let stateList = {
      actionTypes: actions.data.data.actions,
      priorityTypes: priorities.data.data.priorities
    };

    if (this.props.note) {
      // if edit note
      let tempList = {
        content: this.props.note.content,
        action: {
          value: this.props.note.action,
          label: this.props.note.action
        },
        priority: {
          value: this.props.note.priority,
          label: this.props.note.priority
        },
        fixedDate: this.props.note.fixed_date
      };
      stateList = { ...stateList, ...tempList };
    }
    this.setState(stateList);
  };

  getFileActionTypes = () => axios.get(FILE_ACTION_TYPES);

  getFilePriorities = () => axios.get(FILE_PRIORITIES);

  handleDateChange = dateDate => this.setState({ fixedDate: dateDate });

  handleSelect = (name, e) => this.setState({ [name]: e });

  handleSelectBlur = (identifier, e) => {
    if (identifier === "priority")
      this.state.priority
        ? this.setState({ priorityError: "" })
        : this.setState({ priorityError: "Priority Type is required" });
    else if (identifier === "action")
      this.state.action
        ? this.setState({ actionError: "" })
        : this.setState({ actionError: "Select Type of action" });
  };

  editorChange = e => this.setState({ content: e.target.getContent() });

  onSubmitNote = action => {
    if (this.valid()) {
      let data = {
        id: this.props.id,
        file_id: this.props.file.id,
        content: this.state.content,
        action: this.state.action.value,
        priority: this.state.priority.value,
        draft: 1,
        attachments: this.state.attachments
      };

      if (this.state.fixedDate)
        data.fixed_date = moment(this.state.fixedDate).format("YYYY-MM-DD");
      if (action === "confirm") data.draft = 0;

      // //Edit
      // if (this.props.editNote) {
      //     this.props.onClose(data,"edit")
      // }else{
      //   //Create
      //      this.props.onClose(data,"create");
      // }
      // this.setGlobal({successMsg: 'File updated successfully'});
      this.props.onClose(data);
    } else {
      this.setGlobal({ errorMsg: "Please fill all the required field." });
    }
  };

  valid = () =>
    this.state.content !== "" &&
    this.state.action !== null &&
    this.state.priority !== null;

  handleClose = () => this.props.onClose(null);

  onSuccess = attachments => {
    this.setState({ attachments });
  };

  render() {
    const { classes, open, edit } = this.props;
    const { loading, errorMsg } = this.state;
    let content = (
      <CardContent>
        <Grid container spacing={6}>
          <Grid item lg={12}>
            <Editor onChange={this.editorChange} default={this.state.content} />
          </Grid>
          <Grid item={true} lg={6}>
            <OfficeSelect
              variant={"outlined"}
              margin={"dense"}
              value={this.state.priority}
              required={true}
              fullWidth={true}
              name={"priority"}
              error={!!this.state.priorityError}
              onBlur={this.handleSelectBlur.bind(this, "priority")}
              onChange={this.handleSelect.bind(this, "priority")}
              ClearAble={true}
              label={"Set Priority"}
              helperText={this.state.priorityError}
              options={this.state.priorityTypes}
            />

            <OfficeSelect
              variant={"outlined"}
              margin={"dense"}
              value={this.state.action}
              required={true}
              fullWidth={true}
              name={"action"}
              error={!!this.state.actionError}
              onBlur={this.handleSelectBlur.bind(this, "action")}
              onChange={this.handleSelect.bind(this, "action")}
              ClearAble={true}
              label={"Select Action"}
              helperText={this.state.actionError}
              options={this.state.actionTypes}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                fullWidth={true}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"end"}>
                      <CalendarIcon />
                    </InputAdornment>
                  )
                }}
                label={"Fixed Date (if any)"}
                error={Boolean(this.state.dateError)}
                helperText={this.state.dateError}
                margin="dense"
                name={"fixedDate"}
                variant="outlined"
                value={this.state.fixedDate}
                onChange={this.handleDateChange}
                format={"dd/MM/yyyy"}
              />
            </MuiPickersUtilsProvider>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Grid>
          <Grid item={true} lg={6}>
            <Typography style={{ textTransform: "capitalize" }} variant={"h6"}>
              Notesheet Attachment
            </Typography>
            <AttachmentView
              acceptedFiles={"image/*"}
              onSuccess={this.onSuccess}
              attachments={this.state.attachments}
            />
          </Grid>
        </Grid>
      </CardContent>
    );

    const addActionList = (
      <DialogActions>
        <Button
          href={"#"}
          color="primary"
          onClick={this.onSubmitNote.bind(this, "draft")}
        >
          Save Draft
        </Button>
        <Button
          href={"#"}
          color="primary"
          onClick={this.onSubmitNote.bind(this, "confirm")}
        >
          Save
        </Button>
        <Button
          href={"#"}
          color="secondary"
          onClick={this.handleClose.bind(this)}
        >
          Cancel
        </Button>
      </DialogActions>
    );

    const editActionList = (
      <DialogActions>
        <Button
          href={"#"}
          color="primary"
          onClick={this.onSubmitNote.bind(this, "draft")}
        >
          Save Draft
        </Button>
        <Button
          href={"#"}
          color="primary"
          onClick={this.onSubmitNote.bind(this, "confirm")}
        >
          Confirm
        </Button>
        <Button
          href={"#"}
          color="secondary"
          onClick={this.handleClose.bind(this)}
        >
          Cancel Edit
        </Button>
      </DialogActions>
    );

    return (
      <>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose.bind(this)}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                href={"#"}
                color="inherit"
                onClick={this.handleClose.bind(this)}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="subtitle2"
                color="inherit"
                className={classes.flex}
              >
                Create Note
              </Typography>
              <Button
                href={"#"}
                onClick={this.handleClose.bind(this)}
                color="inherit"
              >
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <List>
              <Card>
                <CardHeader
                  title={"File No.: " + this.props.file.number}
                  subheader={"Subject: " + this.props.file.subject}
                />
                <Divider />
                {loading ? <LoadingView /> : content}
              </Card>
            </List>
            {errorMsg && <ErrorHandler messages={errorMsg} />}
          </DialogContent>
          <Divider component={"li"} />
          {loading ? "" : edit ? editActionList : addActionList}
        </Dialog>
      </>
    );
  }
}

NoteCreateDialog.defaultProps = {
  note: null
};

NoteCreateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired
};

export default withStyles(styles)(NoteCreateDialog);
