import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import FormControlUtils from "../../../../utils/FormControlUtils";

class ReceiptMovementDialog extends Component {
  constructor(props){
    super(props);
    this.state={
      to:undefined,

      data:{

      },
      toError:''
    }
  }
  handleChange=(e)=>{
    const{name,value}=e.target;
    this.setState({[name]:value})
  }
  handleClick=(e)=>{
    const {open,onClose,receipt } = this.props;
    const{name} =e.target;
    switch (name) {
      case "sent":
        onClose(this.state.data)
        break;
      case "cancel":
        onClose(null);
        break;
      default:
        break

    }
  }
  render() {
    const {to,cc, toError } = this.state;
    const {open,onClose,receipt } = this.props;

    return (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle title={"Sent Receipt"}>
            Sent Receipt
          </DialogTitle>
          <DialogContent>
            <Typography variant={"headline"}>Receipt No:123123123
            </Typography>
            <Typography variant={"subheading"}>Receipt No:123123123
            </Typography>
            {FormControlUtils.Input("user",this.state.to,"To",true,Boolean(toError),toError,"dense",this.handleChange,true)}
            {FormControlUtils.Input("user",this.state.to,"To",true,Boolean(toError),toError,"dense",this.handleChange,true)}
            {FormControlUtils.Input("user",this.state.to,"To",true,Boolean(toError),toError,"dense",this.handleChange,true)}
            {FormControlUtils.Input("user",this.state.to,"To",true,Boolean(toError),toError,"dense",this.handleChange,true)}
            {FormControlUtils.TextArea("user",this.state.to,"To",true,Boolean(toError),toError,"dense",this.handleChange,true)}
          </DialogContent>
          <DialogActions>
            <Button name={"sent"} onClick={this.handleClick.bind(this)} color={"primary"} variant={"contained"}> Sent</Button>
            <Button name={"cancel"} onClick={this.handleClick.bind(this)} color={"secondary"} variant={"contained"}> Cancel</Button>
          </DialogActions>
        </Dialog>
    );
  }
}

ReceiptMovementDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired,
  receipt:PropTypes.object.isRequired
}

export default ReceiptMovementDialog;