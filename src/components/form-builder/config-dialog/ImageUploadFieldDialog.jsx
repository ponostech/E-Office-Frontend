import React, { Component } from "react";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import GridContainer from "../../Grid/GridContainer";
import WidgetConstant from "../WidgetConstant";
import PropTypes from "prop-types";

class ImageUploadFieldDialog extends Component {

  state = {
    name: "",
    label: "",
    placeholder: "",
    required: false
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRadio = event => {
    this.setState({ required: event.target.checked });
  };
  handleClick = (id, event) => {
    const { widget, onClose } = this.props;
    switch (id) {
      case "save":
        const config = {
          elementType: WidgetConstant.IMAGE_UPLOAD,
          elementConfig: {
            name: this.state.name,
            label: this.state.label,
            placeholder: this.state.placeholder
          },
          validation: {
            required: this.state.required
          },
          valid: true,
          value: this.state.value
        };
        this.doClear();
        onClose(this.state.name, config);
        break;
      case "close":
        this.doClear();
        onClose(null, null);
        break;
      default:
        break;
    }
  };

  doClear = () => {
    this.setState({
      name: "",
      label: "",
      placeholder: "",
      pattern: "",
      value: "",
      required: false
    });
  };

  render() {
    const { open, onClose, widget } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClick.bind(this, "close")} fullWidth={true} maxWidth={"md"}>

        <CardHeader title={`Configuration (${widget ? widget.name : ""})`} action={
          <IconButton onClick={onClose}>
            <CloseIcon color={"action"}/>
          </IconButton>
        }/>
        <Divider/>
        <DialogContent>

          <GridContainer>
            <TextField name={"name"} onChange={this.handleChange.bind(this)} required={true} value={this.state.name}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Name/Key"}/>
            <TextField name={"label"} onChange={this.handleChange.bind(this)} required={true} value={this.state.label}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Label"}/>
          </GridContainer>

        </DialogContent>
        <DialogActions>
          <Button disabled={
            !Boolean(this.state.name) ||
            !Boolean(this.state.label)
          } variant={"outlined"} color={"primary"} onClick={this.handleClick.bind(this, "save")}>Save</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.handleClick.bind(this, "close")}>Close</Button>
        </DialogActions>
      </Dialog>

    );
  }
}

ImageUploadFieldDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  widget: PropTypes.object.isRequired

};
export default ImageUploadFieldDialog;