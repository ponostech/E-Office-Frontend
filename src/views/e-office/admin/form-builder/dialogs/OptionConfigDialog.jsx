import React, { Component } from "reactn";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Icon,
  IconButton,
  Slide,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

class OptionConfigDialog extends Component {
  state = {
    key: "",
    label: "",
    placeholder: "",
    defaultValue: "",
    required: false,
    options: [{ value: "value", label: "Label" }]
  };

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
    const { onCreateConfiguration, onClose, widget } = this.props;
    const {
      key,
      label,
      placeholder,
      defaultValue,
      required,
      pattern,
      min,
      max,
      options
    } = this.state;
    let config = {
      label,
      type: widget.type,
      placeholder,
      defaultValue,
      validation: {
        required,
        pattern,
        min,
        max
      },
      options
    };
    onClose();
    onCreateConfiguration(key, config);
  };
  addOptionControl = () => {
    let temp = this.state.options;
    temp.push({ value: "", label: "" });
    this.setState({ options: temp });
  };
  removeOptionByIndex = i => {
    let temp = this.state.options;
    temp.slice(i, 1);
    this.setState({ options: temp });
  };
  handleOptionChange = (index, value, field) => {
    let temp = this.state.options;
    let data = temp[index];
    if (field === "value") data["value"] = value;
    else data["label"] = value;
  };

  render() {
    const { open, onClose, widget, classes } = this.props;
    const { options } = this.state;

    return (
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={onClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              href={"#"}
              color="inherit"
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="subtitle2"
              color="inherit"
              className={classes.flex}
            >
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
              <TextField
                name={"key"}
                onChange={event => this.onChange("key", event.target.value)}
                required={true}
                value={this.state.key}
                variant={"outlined"}
                fullWidth={true}
                margin={"dense"}
                label={"Key"}
              />
            </Grid>
            <Grid md={12} sm={12} item={true}>
              <TextField
                name={"label"}
                onChange={event => this.onChange("label", event.target.value)}
                required={true}
                value={this.state.label}
                variant={"outlined"}
                fullWidth={true}
                margin={"dense"}
                label={"Label"}
              />
            </Grid>
            <Grid md={12} sm={12} item={true}>
              <TextField
                name={"placeholder"}
                onChange={event =>
                  this.onChange("placeholder", event.target.value)
                }
                required={true}
                value={this.state.placeholder}
                variant={"outlined"}
                fullWidth={true}
                margin={"dense"}
                label={"PlaceHolder"}
              />
            </Grid>

            <Grid md={12} sm={12} item={true}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={(event, checked) =>
                      this.onChange("required", checked)
                    }
                    value={this.state.required}
                    checked={this.state.required}
                    color="primary"
                  />
                }
                label="Required?"
              />
            </Grid>
          </Grid>

          <Grid item={true} md={12} lg={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Button
                      onClick={event => this.addOptionControl()}
                      href={"#"}
                      variant={"outlined"}
                      color={"primary"}
                    >
                      {" "}
                      Add Option
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {options.map((item, i) => (
                  <>
                    <TableRow>
                      <TableCell>
                        <TextField
                          fullWidth={true}
                          variant={"outlined"}
                          label={"Value"}
                          required={true}
                          onChange={event =>
                            this.handleOptionChange(
                              i,
                              event.target.value,
                              "value"
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth={true}
                          variant={"outlined"}
                          label={"Label"}
                          required={true}
                          onChange={event =>
                            this.handleOptionChange(
                              i,
                              event.target.value,
                              "label"
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          href={"#"}
                          onClick={event => this.removeOptionByIndex(i)}
                        >
                          <Icon fontSize={"small"} color={"secondary"}>
                            delete_forever
                          </Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick={event => this.createConfig()}
          >
            Create
          </Button>
          <Button variant={"outlined"} color={"secondary"} onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

OptionConfigDialog.propTypes = {
  onCreateConfiguration: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  widget: PropTypes.object.isRequired
};
export default withStyles(styles)(OptionConfigDialog);
