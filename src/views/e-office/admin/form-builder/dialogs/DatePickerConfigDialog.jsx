import React, { Component } from "reactn";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  Slide,
  Switch,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { WIDGET_TYPE } from "../constant";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  editor: {
    minHeight: 200
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DatePickerConfigDialog extends Component {
  state = {
    key: "",
    label: "",
    placeholder: "",
    defaultValue: "",
    required: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("component update");
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleRadio = value => {
    this.setState({
      required: value
    });
  };

  doClear = () => {
    this.setState({
      name: "",
      label: "",
      placeholder: "",
      value: "",
      pattern: "",
      required: false
    });
  };
  createConfig = () => {
    const { onCreateConfiguration,onClose } = this.props;
    const { key, label, placeholder, defaultValue, required, pattern,min,max } = this.state;
    let config = {
      label,
      type:WIDGET_TYPE.DATE_PICKER,
      fillable:false,
      placeholder,
      defaultValue,
      validation: {
        required,
        pattern,
        min,max
      }
    };
    onClose();
    onCreateConfiguration(key, config);
  };

  render() {
    const { open, onClose, widget, classes } = this.props;
    const self = this;

    return (
      <Dialog TransitionComponent={Transition} open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Configuration ({widget ? widget.label : ""})
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>

          <Grid container={true} spacing={2}>
            <Grid md={12} sm={12} item={true}>
              <TextField name={"key"}
                         onChange={event => this.onChange("key", event.target.value)}
                         required={true}
                         value={this.state.key}
                         variant={"outlined"}
                         fullWidth={true}
                         margin={"dense"}
                         label={"Key"}/>
            </Grid>
            <Grid md={12} sm={12} item={true}>
              <TextField name={"label"}
                         onChange={event => this.onChange("label", event.target.value)}
                         required={true}
                         value={this.state.label}
                         variant={"outlined"}
                         fullWidth={true}
                         margin={"dense"}
                         label={"Label"}/>
            </Grid>
            <Grid md={12} sm={12} item={true}>
              <TextField name={"placeholder"}
                         onChange={event => this.onChange("placeholder", event.target.value)}
                         required={true}
                         value={this.state.placeholder}
                         variant={"outlined"}
                         fullWidth={true}
                         margin={"dense"}
                         label={"PlaceHolder"}/>
            </Grid>

            <Grid md={12} sm={12} item={true}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={value => this.onChange("required", value)}
                    value={this.state.required}
                    checked={this.state.required}
                    color="primary"
                  />
                }
                label="Required?"
              />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} color={"primary"} onClick={event => this.createConfig()}>Create</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

    );
  }
}

DatePickerConfigDialog.propTypes = {
  onCreateConfiguration: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  widget: PropTypes.object.isRequired
};
export default withStyles(styles)(DatePickerConfigDialog);