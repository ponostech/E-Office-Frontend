import React, { Component } from "react";
import { CircularProgress, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import PropTypes from "prop-types";
class SubmitDialog extends Component {
  render() {
    const { open,text,title } = this.props;
    return (
      <Dialog fullWidth={true} maxWidth={"xs"} open={open}>
        <DialogTitle title={"Submit"}>
         {title}
        </DialogTitle>
        <DialogContent>
          <div style={{margin:10,display:'flex',justify:'center',alignItems:"center"}}>
          <CircularProgress style={{margin:20}} variant={"indeterminate"} color={"primary"}/>
            {text}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
SubmitDialog.defaultProps={
  title:"Submit Application",
  text:"Please wait ... ",
}

SubmitDialog.propTypes={
  open:PropTypes.bool.isRequired,
  text:PropTypes.string,
  title:PropTypes.string,
}

export default SubmitDialog;