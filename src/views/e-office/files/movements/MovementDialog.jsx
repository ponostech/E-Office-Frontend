import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import OfficeSelect from "../../../../components/OfficeSelect";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";

class MovementDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},

      user: undefined,
      action: { value: "one", label: "Action one" },
      priority: { value: "regular", label: "Regular" },
      options: [
        { value: "Kimi", label: "Kimi" },
        { value: "Kimi", label: "Kimi" },
        { value: "Kimi", label: "Kimi" }
      ], actions: [
        { value: "one", label: "Action one" },
        { value: "Kimi", label: "Kimi" },
        { value: "Kimi", label: "Kimi" }
      ], priorities: [
        { value: "regular", label: "Regular" },
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
      <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={this.handleClose.bind(this)}>
        <Card style={{ padding: 20 }}>
          <CardHeader title={"File movement"} action={
            <Tooltip title={"Close"}>
              <IconButton onClick={this.handleClose.bind(this)}>
                <CloseIcon color={"action"}/>
              </IconButton>
            </Tooltip>
          }/>
          <CardContent>
            <Typography variant={"headline"}>
              File No: 1223
            </Typography>
            <Typography variant={"subheading"}>
              Subject: Matter relating to blah
            </Typography>

            <Divider style={{ marginBottom: 10, marginTop: 10 }}/>
            <OfficeSelect
              value={this.state.user}
              options={this.state.options}
              name={"to"}
              label={"To"}
              margin={"dense"}
              variant={"standard"}
              fullWidth={true}
            />

            <TextField margin={"dense"} required={true} type={"date"} InputLabelProps={{ shrink: true }}
                       variant={"standard"} name={"date"} label={"Date"} fullWidth={true}/>
            <OfficeSelect
              value={this.state.action}
              options={this.state.actions}
              name={"action"}
              label={"Action"}
              margin={"dense"}
              variant={"standard"}
              fullWidth={true}
            />
            <OfficeSelect
              value={this.state.priority}
              options={this.state.priorities}
              name={"priority"}
              label={"Priority"}
              margin={"dense"}
              variant={"standard"}
              fullWidth={true}
            />
            <TextField margin={"dense"}
                       variant={"standard"} name={"remark"} label={"Remark"} fullWidth={true} multiline={3} rows={3}/>
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