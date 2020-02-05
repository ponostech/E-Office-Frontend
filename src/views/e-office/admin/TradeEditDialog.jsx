import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
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
class TradeEditDialog extends Component {
  state = {
    id: "",
    name: "",
    rate: 0,
    fla: "0",

    nameError: "",
    rateError: ""
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { trade } = nextProps;
    if (trade) {
      this.setState({
        id: trade.id,
        name: trade.name,
        rate: trade.rate,
        fla: String(trade.fla)
      });
    }
  }

  handleRadio = e => {
    const { value } = e.target;
    this.setState({ fla: value });
  };
  close = () => {
    this.props.onClose(null);
  };
  invalid = () => {
    return !Boolean(this.state.name) || !Boolean(this.state.rate);
  };
  edit = e => {
    const { id, name, rate, fla } = this.state;
    const { onClose } = this.props;
    if (!name || !rate) {
      this.setState({ errorMessage: "Please fill the required field" });
    } else {
      onClose({ id, name, rate, fla });
    }
  };
  handleRequired = e => {
    switch (e.target.name) {
      case "name":
        this.state.name
          ? this.setState({ nameError: "" })
          : this.setState({ nameError: "Name is required" });
        break;
      case "rate":
        this.state.rate
          ? this.setState({ rateError: "" })
          : this.setState({ rateError: "Rate is required" });
        break;
      default:
        break;
    }
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { open, classes } = this.props;
    return (
      <Dialog
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={this.close.bind(this)}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              href={"#"}
              color="inherit"
              onClick={this.close.bind(this)}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="subtitle2" color="inherit" style={{ flex: 1 }}>
              Create New Trade
            </Typography>
            <Button href={"#"} onClick={this.close.bind(this)} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <TextField
            variant={"outlined"}
            name={"name"}
            margin={"dense"}
            value={this.state.name}
            label={"Name of Trade"}
            required={true}
            fullWidth={true}
            onBlur={this.handleRequired.bind(this)}
            onChange={this.handleChange.bind(this)}
            error={Boolean(this.state.nameError)}
            helperText={this.state.nameError}
          />

          <TextField
            variant={"outlined"}
            name={"rate"}
            label={"Rate"}
            margin={"dense"}
            required={true}
            type={"number"}
            value={this.state.rate}
            fullWidth={true}
            onBlur={this.handleRequired.bind(this)}
            onChange={this.handleChange.bind(this)}
            error={Boolean(this.state.rateError)}
            helperText={this.state.rateError}
          />

          <FormControl fullWidth={true} margin={"dense"}>
            <FormLabel>Required Food Licensing Authority Permit?</FormLabel>
            <RadioGroup
              defaultValue={"0"}
              value={this.state.fla}
              name={"fla"}
              row={true}
              onChange={this.handleRadio.bind(this)}
            >
              <FormControlLabel
                value={"0"}
                control={<Radio color={"primary"} />}
                label={"Yes"}
              />
              <FormControlLabel
                value={"1"}
                control={<Radio color={"primary"} />}
                label={"No"}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            disabled={this.invalid()}
            variant={"outlined"}
            color={"primary"}
            onClick={this.edit.bind(this)}
          >
            Update
          </Button>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={this.close.bind(this)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(TradeEditDialog);
