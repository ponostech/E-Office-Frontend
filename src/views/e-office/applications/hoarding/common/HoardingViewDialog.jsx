import React, {Component} from 'react';
import { IconButton, DialogContent, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {Dialog, Slide, Grid, Card, Button, Toolbar, AppBar, Typography, List, DialogActions} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import DetailViewRow from "../../../common/DetailViewRow";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { AttachFile } from "@material-ui/icons";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  docsItem: {
    cursor: 'pointer',
  },
  editor: {
    minHeight: 200
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class HoardingViewDialog extends Component {
  openDocs = (url) => {
    window.open(url).focus();
  };

  render() {
    console.log(this.props);
    const {classes, data} = this.props;

    const list = data.documents.map(val =>
      <ListItem className={classes.docsItem} onClick={() => this.openDocs(val.path)}>
        <ListItemIcon>
          <AttachFile/>
        </ListItemIcon>
        <ListItemText primary={val.name}/>
      </ListItem>);

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
          <DialogContent>
            <Grid container>
              <Grid item md>
                <List>
                  <Card>
                    <DetailViewRow primary="Name of Applicant" secondary={data.applicant.advertiser.name}/>
                    <DetailViewRow primary="Type of Applicant"
                                   secondary={data.applicant.advertiser.type.toUpperCase()}/>
                    <DetailViewRow primary="Address of Applicant" secondary={data.applicant.advertiser.address}/>
                    <DetailViewRow primary="Phone No. of Applicant" secondary={data.applicant.phone_no}/>
                    <DetailViewRow primary="Local Council" secondary={data.hoarding.local_council.name}/>
                    <DetailViewRow primary="Email of Applicant" secondary={data.applicant.email}/>
                    <DetailViewRow primary="License No. of Applicant" secondary={data.applicant.advertiser.license_no}/>
                    <DetailViewRow primary="File Number" secondary={data.hoarding.file.number}/>
                    <DetailViewRow primary="File Subject" secondary={data.hoarding.file.subject}/>
                    <DetailViewRow primary="Display Type" secondary={data.hoarding.display_type}/>
                    <DetailViewRow primary="Whether Both Sided ?" secondary={data.hoarding.both_side==0 ? "No" : "Yes"}/>
                    <DetailViewRow primary="Length (feet)" secondary={data.hoarding.length}/>
                    <DetailViewRow primary="Height (feet)" secondary={data.hoarding.height}/>
                    <DetailViewRow primary="Land Owner Name" secondary={data.hoarding.land_owner_name ? data.hoarding.land_owner_name : "NA"}/>
                    <DetailViewRow primary="Land Owner Type" secondary={data.hoarding.land_owner_type==0 ? "Private" : "Public"} />
                    <DetailViewRow primary="Road Detail" secondary={data.hoarding.road_detail ? data.hoarding.road_detail : "NA"}/>
                    <DetailViewRow primary="Ground Clearance" secondary={data.hoarding.ground_clearance ? data.hoarding.ground_clearance : "NA"}/>
                    <DetailViewRow primary="Date of Application"
                                   secondary={moment(data.created_at).format("Do MMMM YYYY")}/>
                    <DetailViewRow primary="Status" secondary={data.status.toUpperCase()}/>
                    {data.hoarding.file.desk && <DetailViewRow primary="File Location"
                                                      secondary={data.hoarding.file.desk.staff.name + " (" + data.hoarding.file.desk.staff.designation + ")"}/>}
                  </Card>
                </List>
              </Grid>
              <Grid item md>
                <List>
                  <Card>
                    <ListItem>
                      <Typography variant="subtitle1">Documents</Typography>
                    </ListItem>
                   {list.length ? list : <ListItem><ListItemText primary="No Documents"/></ListItem>}
                  </Card>
                </List>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.props.close}>Close</Button>
          </DialogActions>
        </Dialog>
    )
  };
}

export default withStyles(styles)(HoardingViewDialog);