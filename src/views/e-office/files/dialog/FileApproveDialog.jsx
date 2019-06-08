import React, {Component} from "reactn";
import axios from 'axios';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Slide,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import OfficeSelect from "../../../../components/OfficeSelect";
import Editor from "../../common/Editor";
import Divider from "@material-ui/core/Divider";
import Card from "../../../../components/Card/Card";
import Paper from "@material-ui/core/Paper";
import {FILE_DRAFT_LIST} from "../../../../config/ApiRoutes";
import {DESK} from "../../../../config/routes-constant/OfficeRoutes";
import {withRouter} from "react-router-dom";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FileApproveDialog extends Component {
  state = {
    application: '',
    permit: '',
    applicationOptions: [],
    draftOptions: [],
    editorContent: '',
    loading: true,
  };

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios.all([this.getPermitDrafts(), this.getActiveApplications()])
        .then(axios.spread((permit, applications) => {
          if (permit.data.status) this.setState({draftOptions: this.formatDrafts(permit.data.data.drafts)});
          else this.setGlobal({errorMsg: 'Permit list cannot be loaded'});
          if (applications.data.status) this.setState({applicationOptions: this.formatApplications(applications.data.data.applications)});
          else this.setGlobal({errorMsg: 'Application list cannot be loaded'});
        }))
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setState({loading: false}));
  };

  formatDrafts = (drafts) => {
    return drafts.map(val => {
      let temp = {};
      temp['value'] = val;
      temp['label'] = "Permit Draft No. " + val.id;
      return temp;
    });
  };

  formatApplications = (applications) => {
    return applications.map(val => {
      let temp = {};
      temp['value'] = val;
      temp['label'] = "Applicant Name: " + val.applicant.advertiser.name;
      return temp;
    });
  };

  getActiveApplications = () => axios.get('/files/' + this.props.file.id + '/applications', {params: {status: 'active'}});

  getPermitDrafts = () => axios.get(FILE_DRAFT_LIST(this.props.file.id, 'permit'));

  handleApplicationChange = (application) => this.setState({application});

  handlePermitChange = (permit) => this.setState({permit: permit, editorContent: permit.value.content});

  editorChange = (e) => this.setState({editorContent: e.target.getContent()});

  handleSubmit = () => {
    if (this.valid()) this.submit();
  };

  submit = () => {
    this.submitApproval()
        .then(res => {
          if (res.data.status) {
            this.setGlobal({successMsg: res.data.messages});
            this.props.history.push(DESK);
          } else {
            this.setGlobal({errorMsg: res.data.messages})
          }
        })
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
  };

  submitApproval = () => axios.post('/files/' + this.props.file.id + '/application/' + this.state.application.value.id + '/approve',
      {permit: this.state.editorContent});

  valid = () => {
    const {loading, content, application, editorContent} = this.state;
    if (loading) {
      this.setGlobal({errorMsg: "Cannot submit while loading"});
      return false;
    }

    if (content === '' || application === '' || editorContent === '') {
      this.setGlobal({errorMsg: 'Enter all the required fields'});
      return false;
    }
    return true
  };

  render() {
    // console.log(this.state);
    const {classes} = this.props;
    const {loading, editorContent, application} = this.state;

    const dialogHead =
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Approve Application
            </Typography>
            <Button onClick={this.props.onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>;

    const dialogAction =
        <>
          <Button color="primary" onClick={this.handleSubmit.bind(this, 'approve_sign')} disabled={loading}>Approve &
            Sign</Button>
          <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
        </>;

    const applicationDetails = () => <Card>
      <Paper>
        <Grid container spacing={16}>
          <Grid md item>
            <List subheader={<ListSubheader color={"primary"}>Details of Application Selected</ListSubheader>} dense>
              <Divider component="li"/>
              <ListItem>
                <ListItemText primary={"Name of Applicant"} secondary={application.value.applicant.advertiser.name}/>
              </ListItem>
              <Divider component="li"/>
              <ListItem>
                <ListItemText primary={"Application Type"}
                              secondary={application.value.applicant.advertiser.type.toUpperCase()}/>
              </ListItem>
              <Divider component="li"/>
              <ListItem>
                <ListItemText primary={"Application Type"} secondary={'Hoarding'}/>
              </ListItem>
            </List>
          </Grid>
          <Grid md item>
            <List subheader={<ListSubheader>&nbsp;</ListSubheader>} dense>
              <Divider component="li"/>
              <ListItem>
                <ListItemText primary={"Address of Applicant"}
                              secondary={application.value.applicant.advertiser.address}/>
              </ListItem>
              <Divider component="li"/>
              <ListItem>
                {application.value.applicant.photo ?
                    <img src={application.value.applicant.photo} alt="Photo"/> : "NO PHOTOGRAPH UPLOADED"}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Card>;

    return (
        <Dialog
            fullScreen={true}
            open={this.props.open}
            onClose={this.props.onClose}
            TransitionComponent={Transition}
        >
          {dialogHead}
          <DialogContent>
            <Grid container spacing={16}>
              <Grid md={12} item>
                <Grid spacing={16} container>
                  <Grid item md={4}>
                    <Grid item md={12}>
                      <List dense>
                        <ListItem button>
                          <ListItemText
                              primary="Select the Application & Draft below for further approval. "
                              secondary="Details show in the right side -> "/>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12}>
                      <OfficeSelect
                          value={this.state.application} name={"application"}
                          label={"Select Application to be Approved"}
                          variant={"outlined"} margin={"dense"} required={true} fullWidth={true}
                          options={this.state.applicationOptions}
                          placeHolder='Select Application to be Approved'
                          onChange={this.handleApplicationChange}/>
                    </Grid>
                    <Grid item md={12}>
                      <List dense>
                        <ListItem button>
                          <ListItemText
                              primary="Select the Draft Permit below."
                              secondary="Selected draft will be shown below"/>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12}>
                      <OfficeSelect
                          value={this.state.permit} name={"permit"} label={"Select Draft Permit to be Approved"}
                          variant={"outlined"} margin={"dense"} required={true} fullWidth={true}
                          options={this.state.draftOptions}
                          onChange={this.handlePermitChange}/>
                    </Grid>
                  </Grid>
                  <Grid md={8} item>{application.value && applicationDetails()}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Editor default={editorContent} onChange={this.editorChange}/>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>{dialogAction}</DialogActions>
        </Dialog>
    );
  }
}

FileApproveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  file: PropTypes.any
};

export default withRouter(withStyles(styles)(FileApproveDialog));

