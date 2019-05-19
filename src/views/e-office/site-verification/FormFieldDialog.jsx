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
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import GridContainer from "../../../components/Grid/GridContainer";
import PropTypes from "prop-types";
import SelectOptionView from "./SelectOptionView";


function TextfieldConfig(props) {

  return (
    <>
      <TextField fullWidth={true} margin={"dense"} label={"Name"}/>
      <TextField fullWidth={true} margin={"dense"} label={"Label"}/>
      <TextField fullWidth={true} margin={"dense"} label={"PlaceHolder"}/>
      <TextField fullWidth={true} margin={"dense"} label={"Pattern"}/>

      <FormControlLabel
        control={
          <Switch
            // onChange={this.handleRadio("checkedB")}
            value="checkedB"
            color="primary"
          />
        }
        label="Is Required?"
      />
    </>
  );
}



class FormFieldDialog extends Component {
  state = {
    name: "",
    label: "",
    placeHolder: "",
    selectedControl: undefined,
    config: null
  };

  getField = (field) => {
    let view = null;
    switch (field) {
      case "Radio":
        view = <TextfieldConfig/>;
        break;
      case "Check":
        view = <TextfieldConfig/>;
        break;
      default:
        view = <TextfieldConfig/>;
        break;
    }
    return view;
  }

  render() {
    const { open, onClose, widget } = this.props;

    return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
        <CardHeader title={"Configuration"} action={
          <IconButton onClick={onClose}>
            <CloseIcon color={"action"}/>
          </IconButton>
        }/>
        <Divider/>
        <DialogContent style={{ height: "90vh" }}>

          <GridContainer>
            {
              widget ? this.getField(widget.name):""
            }
          </GridContainer>

          <Divider/>

        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} color={"primary"}>Save</Button>
          <Button variant={"outlined"} color={"secondary"}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

FormFieldDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  hasOptions: PropTypes.bool.isRequired,
  widget: PropTypes.object.isRequired
};
export default FormFieldDialog;