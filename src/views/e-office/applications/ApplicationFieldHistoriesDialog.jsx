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
import PropTypes from "prop-types";
import { ListItemIcon, Icon } from "@material-ui/core";
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

class ApplicationFieldHistoriesDialog extends React.Component {
  state = {};

  render() {
    console.log("dialog", this.props.data.response.data.logs);
    const { classes, data } = this.props;
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={this.props.open}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="subtitle2"
              color="inherit"
              className={classes.flex}
            >
              {data.field.primary}: Field Changed History
            </Typography>
            <Button onClick={this.props.onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {this.props.data.response.data.logs.length ? (
            this.props.data.response.data.logs.map(val => (
              <>
                <ListItem button>
                  <ListItemIcon>
                    <Icon color="primary">done</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      'Changed from "' +
                      val.old_value +
                      '" to "' +
                      val.new_value +
                      '"'
                    }
                    secondary={moment(val.new_date.date).format(
                      "Do MMMM YYYY (dddd)"
                    )}
                  />
                </ListItem>
                <Divider />
              </>
            ))
          ) : (
            <ListItem button>
              <ListItemText secondary="No log found" color="secondary" />
            </ListItem>
          )}
        </List>
        <DialogActions>
          <Button color="secondary" onClick={this.props.onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ApplicationFieldHistoriesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default withStyles(styles)(ApplicationFieldHistoriesDialog);
