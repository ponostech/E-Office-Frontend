import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip
} from "@material-ui/core";
import OfficeSelect from "../../../../components/OfficeSelect";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";

class MovementDialog extends Component {

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
          <CardHeader title={"File movement"} action={
            <Tooltip title={"Close"}>
              <IconButton onClick={this.handleClose.bind(this)}>
                <CloseIcon color={"action"}/>
              </IconButton>
            </Tooltip>
          }/>
          <CardContent>
              <OfficeSelect
                options={this.state.options}
                name={"to"}
                margin={"dense"}
                fullWidth={true}
              />
              <TextField type={"date"} variant={"standard"} name={"date"} label={"Date"} fullWidth={true}/>
              <TextField multiline={true} variant={"standard"} rows={3} name={"date"} label={"Remark"}
                         fullWidth={true}/>

          </CardContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} color={"primary"} variant={"contained"}>Send</Button>
          <Button onClick={this.handleClose.bind(this)} color={"secondary"} variant={"contained"}>Close</Button>
        </DialogActions>
        </Card>
      </Dialog>
    );
  }
}

MovementDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MovementDialog;