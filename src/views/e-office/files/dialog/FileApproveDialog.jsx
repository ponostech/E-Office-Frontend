import React from "react";
import {
  withStyles,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  ListSubheader
} from "@material-ui/core";
import {IconButton, Typography, Slide, DialogActions, Grid, DialogContent} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import OfficeSelect from "../../../../components/OfficeSelect";
import Editor from "../../common/Editor";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Card from "../../../../components/Card/Card";
import Paper from "@material-ui/core/Paper";
import {KeyboardArrowRight} from "@material-ui/icons";

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

class FileApproveDialog extends React.Component {
  state = {
    application: [],
    permit: [],
    applicationOptions: [
      {label: 'One', value: 'one'},
      {label: 'Two', value: 'Two'},
      {label: 'Three', value: 'Three'},
    ],
    draftOptions: [
      {label: 'Draft One', value: 'Draft one'},
      {label: 'Draft Two', value: 'Draft Two'},
      {label: 'Draft Three', value: 'Draft Three'},],
  };

  handleOfficeSelect = (identifier, value) => this.setState({[identifier]: value});

  handleSubmit = () => {
    alert("submit")
  };

  render() {
    const {classes} = this.props;
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
          <Button color="primary" onClick={this.handleSubmit.bind(this, 'approve_sign')}>Approve & Sign</Button>
          <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
        </>;

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
                          value={this.state.application} name={"application"} label={"Select Application"}
                          variant={"outlined"} margin={"dense"} required={true} fullWidth={true}
                          options={this.state.applicationOptions}
                          onChange={this.handleOfficeSelect.bind(this, "application")}/>
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
                          value={this.state.permit} name={"permit"} label={"Select Draft Permit"}
                          variant={"outlined"} margin={"dense"} required={true} fullWidth={true}
                          options={this.state.draftOptions}
                          onChange={this.handleOfficeSelect.bind(this, "permit")}/>
                    </Grid>
                  </Grid>
                  <Grid md={8} item>
                    <Card>
                      <Paper>
                        <Grid container spacing={16}>
                          <Grid md item>
                            <List subheader={<ListSubheader color={"primary"}>Details of Application Selected</ListSubheader>} dense>
                              <Divider component="li"/>
                              <ListItem>
                                <ListItemText primary={"Name of Applicant"} secondary={'Lala'}/>
                              </ListItem>
                              <Divider component="li"/>
                              <ListItem>
                                <ListItemText primary={"Application Type"} secondary={'Hoarding'}/>
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
                                <ListItemText primary={"Address of Applicant"} secondary={'Electric Veng'}/>
                              </ListItem>
                              <Divider component="li"/>
                              <ListItem>
                                <ListItemText primary={"Photo"} secondary={'Photo'}/>
                              </ListItem>
                              <Divider component="li"/>
                              <ListItem>
                                <ListItemText primary={"Photo"} secondary={'Photo'}/>
                              </ListItem>
                            </List>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Editor/>
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

export default withStyles(styles)(FileApproveDialog);

