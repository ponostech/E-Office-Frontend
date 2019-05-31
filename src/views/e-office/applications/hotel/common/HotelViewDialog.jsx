import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, withStyles, Grid} from "@material-ui/core";
import {Button, List, Typography, Card, DialogContent, DialogActions, Dialog, Slide} from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import moment from "moment";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {AttachFile, Close} from "@material-ui/icons";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  editor: {
    minHeight: 200
  },
  docsItem: {
    cursor: 'pointer',
  },
  bigAvatar: {
    width: 200,
    height: 'auto',
    textAlign: 'center',
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class HotelViewDialog extends Component {
  openDocs = (url) => {
    window.open(url).focus();
  };

  render() {
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
                <Close/>
              </IconButton>
              <Typography variant="subtitle2" color="inherit" className={classes.flex}>
                View Hotel/Lodging Application
              </Typography>
              <Button onClick={this.props.close} color="inherit">
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Grid container spacing={16}>
              <Grid item xs>
                <List>
                  <Card>
                    <DetailViewRow primary="Name of Applicant" secondary={data.owner}/>
                    <DetailViewRow primary="Type of Applicant" secondary={data.type.toUpperCase()}/>
                    <DetailViewRow primary="Owner Address" secondary={data.owner_address}/>
                    <DetailViewRow primary="Mobile" secondary={data.phone}/>
                    <DetailViewRow primary="Owner Type" secondary={data.type}/>
                    <DetailViewRow primary="Shop Name" secondary={data.name}/>
                    <DetailViewRow primary="Proposed Location" secondary={data.address}/>
                    <DetailViewRow primary="Date of Application"
                                   secondary={moment(data.created_at).format("Do MMMM YYYY")}/>
                    <DetailViewRow primary="Details of Business" secondary={data.details}/>
                    <DetailViewRow primary="Email" secondary={data.email}/>
                    <DetailViewRow primary="CST No" secondary={data.cst_no}/>
                    <DetailViewRow primary="GST No" secondary={data.gst_no}/>
                    <DetailViewRow primary="TIN No" secondary={data.tin_no}/>
                    <DetailViewRow primary="PAN No" secondary={data.pan_no}/>
                    <DetailViewRow primary="Premise Type" secondary={data.premise_type}/>
                    <DetailViewRow primary="No. of AC Room" secondary={data.ac_rooms}/>
                    <DetailViewRow primary="No. of Non AC Room" secondary={data.non_ac_rooms}/>
                    <DetailViewRow primary="Year of Establishment" secondary={data.estd}/>
                    <DetailViewRow primary="No. of Banquet Hall" secondary={data.banquet_halls}/>
                    <DetailViewRow primary="No. of Conference Hall" secondary={data.conference_halls}/>
                    <DetailViewRow primary="Any other facilities" secondary={data.other_facilities}/>
                    <DetailViewRow primary="Status" secondary={data.status.toUpperCase()}/>

                  </Card>
                </List>
              </Grid>
              <Grid item xs>
                <ListItem>
                  <Typography variant="subtitle1">Documents</Typography>
                </ListItem>
                <ListItem>
                  <img alt="Photo of Applicant" src={data.passport} className={classes.bigAvatar}/>
                </ListItem>
                {list.length ? list : <ListItem><ListItemText primary="No Documents"/></ListItem>}
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

export default withStyles(styles)(HotelViewDialog);