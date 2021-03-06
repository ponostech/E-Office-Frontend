import React from "react";
import axios from "axios";
import moment from "moment";
import {withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Dialog from "@material-ui/core/Dialog/index";
import List from "@material-ui/core/List/index";
import Divider from "@material-ui/core/Divider/index";
import AppBar from "@material-ui/core/AppBar/index";
import IconButton from "@material-ui/core/IconButton/index";
import Typography from "@material-ui/core/Typography/index";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Toolbar from "@material-ui/core/Toolbar";
import {Card, CardContent, CardHeader, InputAdornment} from "@material-ui/core";
import OfficeSelect from "../../../../components/OfficeSelect";
import Editor from "../../common/Editor";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {FILE_ACTION_TYPES, FILE_PRIORITIES} from "../../../../config/ApiRoutes";
import LoadingView from "../../../common/LoadingView";
import NotesheetAttachment from "../../../../components/NotesheetAttachment";
import CalendarIcon from "@material-ui/icons/Today";
import PropTypes from "prop-types";

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

class DraftCreateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      action: null,
      priority: null,
      fixedDate: null,
      priorityTypes: [],
      actionTypes: [],
      files: [],

      hasError: false,
      loading: true
    };

  };

  componentDidMount() {
    axios.all([this.getFileActionTypes(), this.getFilePriorities()])
        .then(axios.spread((actions, priorities) => this.setState({
          actionTypes: actions.data.data.actions,
          priorityTypes: priorities.data.data.priorities,
          loading: false
        })))
        .catch(err => this.setState({hasError: true}));
  }

  getFileActionTypes = () => axios.get(FILE_ACTION_TYPES);

  getFilePriorities = () => axios.get(FILE_PRIORITIES);

  handleDateChange = dateDate => this.setState({fixedDate: dateDate});

  handleSelect = (name, e) => this.setState({[name]: e});

  handleSelectBlur = (identifier, e) => {
    if (identifier === "priority") this.state.priority ? this.setState({priorityError: ""}) : this.setState({priorityError: "Priority Type is required"});
    else if (identifier === "action") this.state.action ? this.setState({actionError: ""}) : this.setState({actionError: "Select Type of action"});
  };

  editorChange = (e) => this.setState({content: e.target.getContent()});

  onSubmitNote = (action) => {
    let data = {
      file_id: this.props.file.id,
      content: this.state.content,
      action: this.state.action.value,
      priority: this.state.priority.value,
      status: 0
    };

    if (this.state.fixedDate) data.fixed_date = moment(this.state.fixedDate).format("YYYY-MM-DD");
    if (action === "confirm") data.status = 1;

    this.props.onClose(data);
  };

  handleClose = () => this.props.onClose(null);

  render() {
    const {classes, open} = this.props;
    const {loading} = this.state;
    let content = <CardContent>
      <Grid container spacing={16}>
        <Grid item lg={12}>
          <Editor onChange={this.editorChange} default={this.state.content}/>
        </Grid>
        <Grid item={true} lg={6}>
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
              options={this.state.actionTypes}/>

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
              options={this.state.priorityTypes}/>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                fullWidth={true}
                InputLabelProps={
                  {shrink: true}
                }
                InputProps={{
                  endAdornment:
                      <InputAdornment position={"end"}>
                        <CalendarIcon/>
                      </InputAdornment>
                }}
                label={"Fixed Date"}
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
        </Grid>
        <Grid item={true} lg={6}>
          <Typography variant={"h5"} style={{textAlign: "center"}}>Notesheet Attachment</Typography>
          <NotesheetAttachment onSuccess={(files) => this.setState({files})}/>
        </Grid>
      </Grid>
    </CardContent>;

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={this.handleClose.bind(this)}
            TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose.bind(this)} aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="subtitle2" color="inherit" className={classes.flex}>
                Create Note
              </Typography>
              <Button onClick={this.handleClose.bind(this)} color="inherit">
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <Card>
              <CardHeader title={"File No.: " + this.props.file.number}
                          subheader={"Subject: " + this.props.file.subject}/>
              <Divider/>
              {loading ? <LoadingView/> : content}
            </Card>
          </List>
          <Divider/>
          {loading ? "" : <DialogActions>
            <Button color="primary" onClick={this.onSubmitNote.bind(this, "draft")}>Save Draft</Button>
            <Button color="primary" onClick={this.onSubmitNote.bind(this, "confirm")}>Save</Button>
            <Button color="secondary" onClick={this.handleClose.bind(this)}>Cancel</Button>
          </DialogActions>}
        </Dialog>
    );
  };
}

DraftCreateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired
};


export default withStyles(styles)(DraftCreateDialog);

