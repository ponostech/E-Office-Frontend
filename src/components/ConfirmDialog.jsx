import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import PropTypes from "prop-types";

// usage
// <ConfirmDialog open={function() {
//   }} onConfirm={function(data) {
//   }} onCancel={function() {
//   }}/>

class ConfirmDialog extends Component {
  handleClick = name => {
    const { onConfirm, onCancel } = this.props;
    if (name === "confirm") {
      onConfirm();
    } else if (name === "cancel") {
      onCancel();
    }
  };

  render() {
    const {
      title,
      message,
      primaryButtonText,
      secondaryButtonText,
      open
    } = this.props;

    return (
      <Dialog open={open} maxWidth={"sm"} fullWidth={true}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            name={"confirm"}
            variant={"outlined"}
            color={"primary"}
            onClick={this.handleClick.bind(this, "confirm")}
          >
            {" "}
            {primaryButtonText}
          </Button>
          <Button
            name={"cancel"}
            variant={"outlined"}
            color={"secondary"}
            onClick={this.handleClick.bind(this, "cancel")}
          >
            {" "}
            {secondaryButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmDialog.defaultProps = {
  title: "Confirmation",
  message: "Do you want to delete?",
  primaryButtonText: "Confirm",
  secondaryButtonText: "Cancel"
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.any
};

export default ConfirmDialog;
