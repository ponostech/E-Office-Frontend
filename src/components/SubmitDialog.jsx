import React, { Component } from "react";
import { CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
class SubmitDialog extends Component {
  render() {
    const { open,text } = this.props;
    return (
      <Dialog fullWidth={true} maxWidth={"sm"} open={open}>
        <DialogTitle title={"Submit"}>
          Submit
        </DialogTitle>
        <DialogContent>
          <div style={{margin:10,display:'flex',justify:'center'}}>
          <CircularProgress style={{margin:20}} variant={"indeterminate"} color={"primary"}/>
            {text}
          </div>
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