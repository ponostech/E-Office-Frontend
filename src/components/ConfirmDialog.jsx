import React, { Component } from "react";
import { Button, CardActions, Dialog, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import PropTypes from "prop-types";

// usage
// <ConfirmDialog open={function() {
//   }} onConfirm={function(data) {
//   }} onCancel={function() {
//   }}/>

class ConfirmDialog extends Component {


  render() {
    const { title, message, primaryButtonText, secondaryButtonText, onConfirm, onCancel, data, open, ...rest } = this.props;

    return (
      <Dialog open={open} {...rest}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={"primary"} onClick={onConfirm(data)}> {primaryButtonText}</Button>
          <Button color={"secondary"} onClick={onCancel}> {secondaryButtonText}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmDialog.defaultProps = {
  title: "Confirm Dialog",
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