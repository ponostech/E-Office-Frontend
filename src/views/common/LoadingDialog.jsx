import React, { Component } from "react";
import { CircularProgress, Dialog, DialogContent, DialogTitle, LinearProgress } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

class LoadingDialog extends Component {
  render() {
    const { open,title,message,...rest } = this.props;
    return (
      <Dialog {...rest} open={open} fullWidth={true} maxWidth={"sm"} >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
        <LinearProgress variant={"indeterminate"} color={"primary"}/>
          {message}
        </DialogContent>
      </Dialog>
    );
  }
}

export default LoadingDialog;