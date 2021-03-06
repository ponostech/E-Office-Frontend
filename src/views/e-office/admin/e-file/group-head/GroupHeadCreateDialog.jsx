import React, { Component } from "reactn";
import { Button, Dialog, DialogActions, TextField, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class GroupHeadCreateDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      label: "",

      valueError: "",
      labelError: "",

      loading:false
    };
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  save = (e) => {
    const invalid = this.state.value === "" || this.state.label === "";
    if (invalid) {
      this.setGlobal({ errorMsg: "Please fill all the required fields" });
    } else {
      let data = {
        value: this.state.value,
        label: this.state.label,
        type: "group"
      };
      this.clear()
      this.props.onCreate(data);
    }
  };
  clear=()=>this.setState({value:"",label:""})
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "value":
        value === "" ? this.setState({ valueError: "Value is required" }) : this.setState({ valueError: "" });
        break;
      case "label":
        value === "" ? this.setState({ labelError: "Label is required" }) : this.setState({ labelError: "" });
        break;
      default:
        break;
    }
  };

  render() {
    const { open, onClose, classes } = this.props;
    const { value, label } = this.state;
    return (
      <Dialog TransitionComponent={Transition} open={open} onClose={onClose} fullWidth={true}
              maxWidth={"sm"}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Create Group Head
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        {this.state.loading === false &&

        <DialogContent>
          <TextField
            required={true}
            error={Boolean(this.state.valueError)}
            helperText={this.state.valueError}
            margin={"dense"}
            label={"Value"}
            variant={"outlined"}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            name={"value"}
            value={this.state.value}
            fullWidth={true}/>

          <TextField
            required={true}
            error={Boolean(this.state.labelError)}
            helperText={this.state.labelError}
            margin={"dense"}
            label={"Label"}
            variant={"outlined"}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            name={"label"}
            value={this.state.label}
            fullWidth={true}/>
        </DialogContent>
        }
        <DialogActions>
          <Button disabled={!Boolean(value) || !Boolean(label)} href={"#"}
                  variant={"outlined"} color={"primary"} onClick={this.save.bind(this)}>Save</Button>
          <Button href={"#"} variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(GroupHeadCreateDialog);