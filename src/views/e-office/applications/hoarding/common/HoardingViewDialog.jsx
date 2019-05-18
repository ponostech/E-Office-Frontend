import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import {Card} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import {Dialog, Slide} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import DetailViewRow from "../../../common/DetailViewRow";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";

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

class HoardingViewDialog extends Component {
  render() {
    console.log(this.props);
    const {classes, data} = this.props;
    return (
        <Dialog
            fullScreen
            open={this.props.open}
            onClose={this.props.close}
            TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.props.close} aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="subtitle2" color="inherit" className={classes.flex}>
                View Hoarding Application
              </Typography>
              <Button onClick={this.props.close} color="inherit">
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <Card>
              <DetailViewRow primary="Name of Applicant" secondary={data.applicant.advertiser.name} />
              <DetailViewRow primary="Type of Applicant" secondary={data.applicant.advertiser.type.toUpperCase()} />
              <DetailViewRow primary="Address of Applicant" secondary={data.applicant.advertiser.address} />
              <DetailViewRow primary="Phone No. of Applicant" secondary={data.applicant.phone_no} />
              <DetailViewRow primary="Email of Applicant" secondary={data.applicant.email} />
              <DetailViewRow primary="Photo of Applicant" secondary={data.applicant.photo} />
              <DetailViewRow primary="License No. of Applicant" secondary={data.applicant.advertiser.license_no} />
              <DetailViewRow primary="File Number" secondary={data.file.number} />
              <DetailViewRow primary="File Subject" secondary={data.file.subject} />
              <DetailViewRow primary="Date of Application" secondary={moment(data.created_at).format("Do MMMM YYYY")} />
              <DetailViewRow primary="Status" secondary={data.status.toUpperCase()} />
              <DetailViewRow primary="File Location" secondary={data.file.desk.staff.name + " (" + data.file.desk.staff.designation + ")"} />
            </Card>
          </List>
          <DialogActions>
            <Button color="secondary" onClick={this.props.close}>Close</Button>
          </DialogActions>
        </Dialog>
    )
  };
}

export default withStyles(styles)(HoardingViewDialog);