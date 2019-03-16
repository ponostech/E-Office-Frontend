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


  handleConfirm=(e) =>{
    const { onConfirm, onCancel } = this.props;
    if (e.target.name === "confirm") {
      onConfirm();
    }else {
      onCancel()
    }
  }
  handleCancel=(e)=>{

  }
  render() {
    const { title, message, primaryButtonText, secondaryButtonText, onConfirm, onCancel, data, open, ...rest } = this.props;

    return (
      <Dialog open={open}  maxWidth={"sm"} fullWidth={true}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} color={"primary"} onClick={this.handleConfirm.bind(this)}> {primaryButtonText}</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.handleCancel.bind(this)}> {secondaryButtonText}</Button>
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