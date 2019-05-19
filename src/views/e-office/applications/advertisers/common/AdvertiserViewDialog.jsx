import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button, List, Slide, Card} from "@material-ui/core";
import {Dialog, Grid, DialogContent, DialogActions, withStyles} from "@material-ui/core";
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

class AdvertiserViewDialog extends Component {
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
                View Advertiser Application
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
                    <DetailViewRow primary="Name of Applicant" secondary={data.name}/>
                    <DetailViewRow primary="Type of Applicant" secondary={data.type.toUpperCase()}/>
                    <DetailViewRow primary="Address of Applicant" secondary={data.address}/>
                    <DetailViewRow primary="Date of Application"
                                   secondary={moment(data.created_at).format("Do MMMM YYYY")}/>
                    <DetailViewRow primary="Status" secondary={data.status.toUpperCase()}/>
                  </Card>
                </List>
              </Grid>
              <Grid item md>
                <List>
                  <Card>
                    <DetailViewRow primary="Name of Applicant" secondary={data.name}/>
                    <DetailViewRow primary="Type of Applicant" secondary={data.type.toUpperCase()}/>
                    <DetailViewRow primary="Address of Applicant" secondary={data.address}/>
                    <DetailViewRow primary="Date of Application"
                                   secondary={moment(data.created_at).format("Do MMMM YYYY")}/>
                    <DetailViewRow primary="Status" secondary={data.status.toUpperCase()}/>
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

export default withStyles(styles)(AdvertiserViewDialog);