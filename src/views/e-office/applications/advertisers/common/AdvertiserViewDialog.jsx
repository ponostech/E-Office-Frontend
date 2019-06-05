import React, {Component} from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  Slide,
  Card,
  ListItem,
  ListItemText, ListItemIcon
} from "@material-ui/core";
import {Dialog, Grid, DialogContent, DialogActions, withStyles} from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { AttachFile, Close } from "@material-ui/icons";

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
  bigAvatar: {
    width: 200,
    height: 'auto',
    textAlign: 'center',
  },
  editor: {
    minHeight: 200
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AdvertiserViewDialog extends Component {
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
                    <ListItem>
                      <Typography variant="subtitle1">Documents</Typography>
                    </ListItem>
                    <ListItem>
                      <img alt="Photo of Applicant" src={data.passport} className={classes.bigAvatar}/>
                    </ListItem>
                    {list.length ? list : <ListItem><ListItemText primary="No Documents"/></ListItem>}
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