import React, { Component } from "react";
import { CircularProgress, Dialog, DialogContent, DialogContentText } from "@material-ui/core";
import PropTypes from "prop-types";
class SubmitDialog extends Component {
  render() {
    const { open,text } = this.props;
    return (
      <Dialog open={open}>
        <DialogContent>
          <CircularProgress variant={"indeterminate"} color={"primary"}/>
          <DialogContentText>
            {text}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

SubmitDialog.propTypes={
  open:PropTypes.bool.isRequired,
  text:PropTypes.string
}

export default SubmitDialog;