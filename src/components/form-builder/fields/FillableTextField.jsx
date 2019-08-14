import React, { Component } from "react";
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
import GridContainer from "../../Grid/GridContainer";
import WidgetConstant from "../WidgetConstant";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

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
const initialState={
  name: "",
  label: "",
  placeholder: "",
  required:false
}

class FillableTextField extends Component {
  constructor(props) {
    super(props);
    this.state=initialState
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { widget } = nextProps;
    if (widget) {
      this.state = {
        name: widget.key,
        label: widget.label,
        placeholder: widget.label,
        required: false
      };
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("component update");
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleRadio = event => {
    this.setState({
      required: event.target.checked
    });
  };
  handleClick = (id, event) => {
    const { widget, addWidget, onClose } = this.props;

    switch (id) {
      case "save":
        const config = {
          elementType: WidgetConstant.FILLABLE,
          elementConfig: {
            type:widget.type,
            name: widget.key,
            label: this.state.label,
            placeholder: this.state.placeholder
          },
          validation: {
            required: this.state.required
          },
          valid: false,
          value: this.state.value
        };
        addWidget(widget.key, config);
        this.doClear();
        break;
      case "close":
        this.doClear();
        onClose();
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
      value: "",
      required: false
    });
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
              Configuration ({widget ? widget.name : ""})
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>

          <GridContainer>

            <TextField name={"label"} onChange={e => this.handleChange("label", e.target.value)} required={true}
                       value={this.state.label}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Label"}/>
            <TextField name={"placeholder"} onChange={e => this.handleChange("placeholder", e.target.value)}
                       required={true}
                       value={this.state.placeholder}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"PlaceHolder"}/>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleRadio.bind(this)}
                  value={this.state.required}
                  checked={this.state.required}
                  color="primary"
                />
              }
              label="Required?"
            />
          </GridContainer>

        </DialogContent>
        <DialogActions>
          <Button href={"#"} variant={"outlined"} color={"primary"}
                  onClick={this.handleClick.bind(this, "save")}>Save</Button>
          <Button href={"#"} variant={"outlined"} color={"secondary"}
                  onClick={this.handleClick.bind(this, "close")}>Close</Button>
        </DialogActions>
      </Dialog>

    );
  }
}

FillableTextField.propTypes = {
  widget: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addWidget: PropTypes.func.isRequired
};

export default withStyles(styles)(FillableTextField);