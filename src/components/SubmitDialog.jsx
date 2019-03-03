import React, { Component } from "react";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";

class SubmitDialog extends Component {
  render() {
    const { open,text } = this.props;
    return (
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default SubmitDialog;