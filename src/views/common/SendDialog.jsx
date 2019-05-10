import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import OfficeSelect from "../../components/OfficeSelect";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { FormatStaff } from "../../utils/Util";

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

class SendDialog extends React.Component {
  state = {
    user_id: null,
    staffs: [],
    recipient_id: null,
    loading: true
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const staffs = FormatStaff(nextProps.staffs);
    this.setState({ staffs });
  }

  handleOfficeSelect = (identifier, value) => {
    this.setState({
      [identifier]: value
    });
  };

  handleSubmit = () => {
    this.props.onSend(this.props.file.id, this.state.recipient_id.value);
  };

  getFileDetail = () => {
    return (
      <>
        <ListItem button>
          <ListItemText primary="Computer File. No." secondary={this.props.file.id}/>
        </ListItem>
        <ListItem button>
          <ListItemText primary="File No." secondary={this.props.file.number}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Subject: " secondary={this.props.file.subject}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Branch: " secondary={this.props.file.branch}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Classification: " secondary={this.props.file.classification}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Created On: " secondary={this.props.file.created_at}/>
        </ListItem>
      </>
    );
  };

  render() {
    // console.log("File",this.props.file);
    const { classes } = this.props;
    let self = this;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Send File to:{this.state.recipient_id ? this.state.recipient_id.label : ""}
            </Typography>
            <Button onClick={this.props.onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText
              primary="Select user below to assign the file to Officer/Staffs. Select carefully!"
              secondary="Details of File shown below."/>
          </ListItem>
          <ListItem button>
            <Grid container>
              <Grid item xs={12}>
                <OfficeSelect
                  value={this.state.recipient_id}
                  options={this.state.staffs}
                  name={"recipient_id"}
                  label={"Send File To"}
                  variant={"outlined"}
                  margin={"dense"}
                  required={true}
                  fullWidth={true}
                  onChange={this.handleOfficeSelect.bind(this, "recipient_id")}/>
              </Grid>
            </Grid>
          </ListItem>

          {
            self.props.file ? self.getFileDetail() : ""
          }
          <Divider/>
        </List>
        <DialogActions>
          <Button disabled={!Boolean(this.state.recipient_id)} color="primary"
                  onClick={this.handleSubmit.bind(this)}>Assign</Button>
          <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SendDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  staffs: PropTypes.array.isRequired,
  file: PropTypes.any
};
export default withStyles(styles)(SendDialog);

