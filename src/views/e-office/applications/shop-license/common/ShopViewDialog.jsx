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

class ShopViewDialog extends Component {
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
              View Shop Application
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
                  <DetailViewRow primary="Local Council" secondary={data.local_council.name}/>
                  <DetailViewRow primary="Mobile" secondary={data.phone}/>
                  <DetailViewRow primary="Shop Name" secondary={data.name}/>
                  <DetailViewRow primary="Proposed Location" secondary={data.address}/>
                  <DetailViewRow primary="Date of Application"
                                 secondary={moment(data.created_at).format("Do MMMM YYYY")}/>
                  <DetailViewRow primary="Details of Business" secondary={data.details}/>
                  <DetailViewRow primary="Email" secondary={data.email ? data.email : "NA"}/>
                  <DetailViewRow primary="CST No" secondary={data.cst_no ? data.cst_no : "NA"}/>
                  <DetailViewRow primary="GST No" secondary={data.gst_no ? data.gst_no : "NA"}/>
                  <DetailViewRow primary="TIN No" secondary={data.tin_no ? data.tin_no : "NA"}/>
                  <DetailViewRow primary="PAN No" secondary={data.pan_no ? data.pan_no : "NA"}/>
                  <DetailViewRow primary="Premise Type" secondary={data.premise_type}/>
                  <DetailViewRow primary="Status" secondary={data.status.toUpperCase()}/>

                </Card>
              </List>
            </Grid>
            <Grid item xs>
              <ListItem>
                <Typography variant="subtitle1">Documents </Typography>
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

export default withStyles(styles)(ShopViewDialog);