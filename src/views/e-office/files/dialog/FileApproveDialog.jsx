import React, { Component } from "reactn";
import axios from "axios";
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
  Slide,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import OfficeSelect from "../../../../components/OfficeSelect";
import Editor from "../../common/Editor";
import { FILE_DRAFT_LIST } from "../../../../config/ApiRoutes";
import { DESK } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import DetailViewRow from "../../common/DetailViewRow";
import { FILEABLE_TYPE } from "../details/Views/FileApplicationDetails";
import moment from "moment";

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
    application: null,
    permit: "",
    applicationOptions: [],
    draftOptions: [],
    editorContent: "",
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.all([this.getPermitDrafts(), this.getActiveApplications()])
      .then(axios.spread((permit, applications) => {
        if (permit.data.status) this.setState({ draftOptions: this.formatDrafts(permit.data.data.drafts) });
        else this.setGlobal({ errorMsg: "Permit list cannot be loaded" });
        if (applications.data.status) this.setState({ applicationOptions: this.formatApplications(applications.data.data.applications) });
        else this.setGlobal({ errorMsg: "Application list cannot be loaded" });
      }))
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setState({ loading: false }));
  };

  formatDrafts = (drafts) => {
    return drafts.map(val => {
      let temp = {};
      temp["value"] = val;
      temp["label"] = "Permit Draft No. " + val.id;
      return temp;
    });
  };

  formatApplications = (applications) => {
    return applications.map(val => {
      let temp = {};
      temp.value = val;
      if (val.file.fileable_type === FILEABLE_TYPE.HOTEL || val.file.fileable_type === FILEABLE_TYPE.SHOP) {
        temp.label = val.owner;
      } else if (val.file.fileble_type === FILEABLE_TYPE.HOARDING || val.file.fileable_type === FILEABLE_TYPE.KIOSK) {
        temp.label = val.file.applicant.advertiser.name;
      } else if (val.file.fileable_type === FILEABLE_TYPE.BANNER)
        temp["label"] = val.applicant;
      return temp;
    });
  };

  getActiveApplications = () => axios.get("/files/" + this.props.file.id + "/applications", { params: { status: "active" } });

  getPermitDrafts = () => axios.get(FILE_DRAFT_LIST(this.props.file.id, "permit"));

  handleApplicationChange = (application) => {
    this.setState({ application });
  }

  handlePermitChange = (permit) => this.setState({ permit: permit, editorContent: permit.value.content });

  editorChange = (e) => this.setState({ editorContent: e.target.getContent() });

  handleSubmit = () => {
    if (this.valid()) this.submit();
  };
  renderDetailView=()=>{
    const { application } = this.state;
    if (application===null)
      return "";
    const { fileable_type } = this.state.application;
    let rows = [];

    switch (fileable_type) {
      case FILEABLE_TYPE.KIOSK:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Address", value: application.length },
          { name: "Local Council", value: application.local_council.name },
          { name: "Length", value: application.length + " ft" },
          { name: "Height", value: application.height + " ft" },
          { name: "Ground Clearance", value: application.ground_clearance ? application.ground_clearance : "NA" },
          { name: "Road Detail", value: application.road_detail ? application.road_detail : "NA" },
          { name: "Both Sided", value: application.both_side ? "Yes" : "No" },
          { name: "Collapsible", value: application.collapsible ? "Yes" : "No" },
          { name: "Display Type", value: application.display_type },
          { name: "Name of Landowner", value: application.land_owner_name },
          { name: "Type of Landowner", value: application.land_owner_type ? "Public" : "Private" }
        );
        break;
      case FILEABLE_TYPE.HOARDING:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Address", value: application.length },
          { name: "Local Council", value: application.local_council.name },
          { name: "Length", value: application.length + " ft" },
          { name: "Height", value: application.height + " ft" },
          { name: "Ground Clearance", value: application.ground_clearance ? application.ground_clearance : "NA" },
          { name: "Road Detail", value: application.road_detail ? application.road_detail : "NA" },
          { name: "Both Sided", value: application.both_side ? "Yes" : "No" },
          { name: "Display Type", value: application.display_type },
          { name: "Name of Landowner", value: application.land_owner_name },
          { name: "Type of Landowner", value: application.land_owner_type ? "Public" : "Private" }
        );
        break;
      case FILEABLE_TYPE.BANNER:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Name", value: application.name },
          { name: "Phone", value: application.phone },
          { name: "Type of Applicant", value: application.applicant_type },
          { name: "Address", value: application.address },
          { name: "Type of Advertisement", value: application.advertisement_type },
          { name: "Content/Wording", value: application.content ? application.content : "NA" },
          { name: "Detail", value: application.detail ? application.detail : "NA" }
        );
        let tableData = [];
        application.advertisements.map(item => tableData.push(
          [item.length, item.height, item.locations, moment(item.from).format("Do MMM YYYY"), moment(item.to).format("Do MMM YYYY")]
        ));
        this.setState({ tableData });
        break;
      case FILEABLE_TYPE.SHOP:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Name of Owner", value: application.owner },
          { name: "Phone", value: application.phone },
          { name: "Email", value: application.email },
          { name: "Address of Applicant", value: application.owner_address },
          { name: "Type of Applicant", value: application.type },
          { name: "Name of the Shop", value: application.name },
          // { name: "Name of Trade", value:application.trade.name},
          { name: "Proposed Location", value: application.address },
          { name: "Local Council", value: application.local_council.name },
          { name: "Details of Business", value: application.details ? application.details : "NA" },
          { name: "ESTD", value: moment(application.estd).format("Do MMM YYYY") },
          { name: "TIN", value: application.tin_no ? application.tin_no : "NA" },
          { name: "CST", value: application.cst_no ? application.cst_no : "NA" },
          { name: "GST", value: application.gst_no ? application.gst_no : "NA" },
          { name: "PAN", value: application.pan_no ? application.pan_no : "NA" },
          { name: "Type of Premised", value: application.premise_type }
        );
        break;
      case FILEABLE_TYPE.HOTEL:
        rows.push(
          { name: "Date", value: moment(application.created_at).format("Do MMM YYYY") },
          { name: "Name of Owner", value: application.owner },
          { name: "Phone", value: application.phone },
          { name: "Email", value: application.email },
          { name: "Address of Applicant", value: application.owner_address },
          { name: "Type of Applicant", value: application.type },
          { name: "Name of the Shop", value: application.name },
          // { name: "Name of Trade", value:application.trade.name},
          { name: "Proposed Location", value: application.address },
          { name: "Local Council", value: application.local_council.name },
          { name: "Details of Business", value: application.details ? application.details : "NA" },
          { name: "ESTD", value: moment(application.estd).format("Do MMM YYYY") },
          { name: "TIN", value: application.tin_no ? application.tin_no : "NA" },
          { name: "CST", value: application.cst_no ? application.cst_no : "NA" },
          { name: "GST", value: application.gst_no ? application.gst_no : "NA" },
          { name: "PAN", value: application.pan_no ? application.pan_no : "NA" },
          { name: "No of AC Room", value: application.ac_rooms },
          { name: "No of Non AC Room", value: application.non_ac_rooms },
          { name: "No of Conference Hall", value: application.conference_halls },
          { name: "No of Banquet", value: application.banquet_halls },
          { name: "Facilities", value: application.facilities ? application.facilities : "NA" },
          { name: "Type of Premised", value: application.premise_type }
        );
        break;

    }
    let detailView=
      <List>
        {
          rows.map((item, index) => <DetailViewRow key={index} primary={item.name} secondary={item.value}/>)
        }
      </List>;
    return detailView;
  }

  submit = () => {
    this.submitApproval()
      .then(res => {
        if (res.data.status) {
          this.setGlobal({ successMsg: res.data.messages });
          this.props.history.push(DESK);
        } else {
          this.setGlobal({ errorMsg: res.data.messages });
        }
      })
      .catch(err => this.setGlobal({ errorMsg: err.toString() }));
  };

  submitApproval = () => axios.post("/files/" + this.props.file.id + "/application/" + this.state.application.value.id + "/approve",
    { permit: this.state.editorContent });

  valid = () => {
    const { loading, content, application, editorContent } = this.state;
    if (loading) {
      this.setGlobal({ errorMsg: "Cannot submit while loading" });
      return false;
    }

    if (content === "" || application === "" || editorContent === "") {
      this.setGlobal({ errorMsg: "Enter all the required fields" });
      return false;
    }
    return true;
  };

  render() {
    // console.log(this.state);
    const { classes } = this.props;
    const { loading, editorContent, application } = this.state;

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
        <Button color="primary" onClick={this.handleSubmit.bind(this, "approve_sign")} disabled={loading}>Approve &
          Sign</Button>
        <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
      </>;

    const applicationDetails = () => {

    };

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
                <Grid md={8} item>{application && this.renderDetailView() }</Grid>
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

