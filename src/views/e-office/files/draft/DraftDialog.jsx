import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  IconButton,
  TextField,
  Tooltip
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";

class DraftDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      options: [
        { value: "Kimi", label: "Kimi" },
        { value: "Kimi", label: "Kimi" },
        { value: "Kimi", label: "Kimi" }
      ]
    };
  }

  handleClose = (e) => {
    const { data } = this.state;
    this.props.onClose(data);
  };

  render() {
    const { open } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose.bind(this)}>
        <Card>
          <CardHeader title={"New Notesheet"} action={
            <Tooltip title={"Close"}>
              <IconButton onClick={this.handleClose.bind(this)}>
                <CloseIcon color={"action"}/>
              </IconButton>
            </Tooltip>
          }/>
          <CardContent>

            <TextField variant={"standard"} name={"date"} label={"Subject"}
                       fullWidth={true}/>
            <TextField multiline={true} variant={"standard"} rows={10} name={"date"} label={"Content"}
                       fullWidth={true}/>
            <TextField type={"file"} variant={"standard"} name={"date"} label={"Attachment"}
                       fullWidth={true}/>
          </CardContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color={"primary"} variant={"contained"}>Create</Button>
            <Button onClick={this.handleClose.bind(this)} color={"secondary"} variant={"contained"}>Close</Button>
          </DialogActions>
        </Card>
      </Dialog>
    );
  }
}

DraftDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DraftDialog;