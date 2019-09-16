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

class FillableConfigDialog extends Component {
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

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.widget) {
      this.setState({ label: nextProps.widget.label });
    }
  }

  doClear = () => {
    this.setState({
      name: "",
      label: "",
      placeholder: "",
      defaultValue: "",
      pattern: ".*",
      required: false,
      min: 0,
      max: 1000
    });
  };
  createConfig = () => {
    const { onCreateConfiguration, onClose, widget } = this.props;
    const { key, label, placeholder, defaultValue, required, pattern, min, max } = this.state;
    let config = {
      label,
      placeholder,
      type: widget.type,
      defaultValue,
      validation: {
        required,
        pattern,
        min, max
      }
    };
    onClose();
    onCreateConfiguration(widget.key, config);
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
              <FormControlLabel
                control={
                  <Switch
                    onChange={(event, checked) => this.onChange("required", checked)}
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

FillableConfigDialog.propTypes = {
  onCreateConfiguration: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  widget: PropTypes.object.isRequired
};
export default withStyles(styles)(FillableConfigDialog);