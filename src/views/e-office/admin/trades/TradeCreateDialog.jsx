import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { TradeViewModel } from "../../../model/TradeViewModel";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
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

class TradeCreateDialog extends Component {
  state = {
    name: "",
    rate: "",
    fla: "1",

    nameError: "",
    rateError: "",
    flaError: "",

    submit: false,
    flas: [
      { value: 0, label: "No" },
      { value: 1, label: "Yes" }
    ]
  };

  componentDidMount() {

  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    switch (name) {
      case "name":
        this.state.name==="" ? this.setState({ nameError: TradeViewModel.REQUIRED_NAME }) : this.setState({ nameError: "" });
        break;
      case "rate":
        this.state.rate ===""? this.setState({ rateError: TradeViewModel.REQUIRED_RATE }) : this.setState({ rateError: "" });
        break;
      case "fla":
        this.state.fla ? this.setState({ flaError: "" }) : this.setState({ flaError: TradeViewModel.REQUIRED_FLA });
        break;

    }
    this.setState({ prestine: false });
  };

  close = () => {
    this.props.onClose(null);
  };

  invalid = () => {
    return !Boolean(this.state.name) || !Boolean(this.state.rate);
  };
  save = (e) => {
    const { name, fla, rate } = this.state;
    if (this.invalid()) {
      this.setState({ errorMessage: "Please fill all the required field" });
    } else {
      let data = {
        name,
        fla,
        rate
      };
      this.props.onClose(data);
    }

  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        value.length === 0 ? this.setState({ nameError: TradeViewModel.REQUIRED_NAME }) : this.setState({ nameError: "" });
        break;
      case "rate":
        value.length === 0 ? this.setState({ rateError: TradeViewModel.REQUIRED_RATE }) : this.setState({ rateError: "" });
        break;
      case "fla":
        value.length === 0 ? this.setState({ rateError: TradeViewModel.REQUIRED_FLA }) : this.setState({ flaError: "" });
        break;
      default:
        break;
    }
  };


  render() {
    const { classes } = this.props;
    const { open, onClose } = this.props;

    return (
      <Dialog TransitionComponent={Transition} open={open} onClose={onClose} fullWidth={true} maxWidth={"sm"}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={this.close.bind(this)} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Create New Trade
            </Typography>
            <Button href={"#"} onClick={this.close.bind(this)} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <TextField
            name={"name"}
            value={this.state.name}
            ref={"nameRef"}
            onBlur={this.handleBlur.bind(this)}
            required={true}
            variant={"outlined"}
            margin={"dense"}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            label={"Name of Trade"}
            error={Boolean(this.state.nameError)}
            helperText={this.state.nameError}
          />

          <TextField
            name={"rate"}
            value={this.state.rate}
            type={"number"}
            onBlur={this.handleBlur.bind(this)}
            required={true}
            variant={"outlined"}
            margin={"dense"}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            label={"Rate"}
            error={Boolean(this.state.rateError)}
            helperText={this.state.rateError}
          />

          <FormControl component={"div"} fullWidth={true} margin={"dense"}>
            <FormLabel component={"div"}>Whether Food Licensing Authority permit is required?</FormLabel>
            <RadioGroup
              defaultValue={"0"}
              value={this.state.fla}
              name={"landlordType"}
              row={true}
              onChange={event => this.setState({ fla: event.target.value })}
            >
              <FormControlLabel value={"1"} control={<Radio color={"primary"}/>}
                                label={"Yes"}/>
              <FormControlLabel value={"0"} control={<Radio color={"primary"}/>}
                                label={"No"}/>
            </RadioGroup>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            name={"primary"}
            disabled={this.invalid()}
            color={"primary"} variant={"outlined"}
            onClick={this.save.bind(this)}>
            Save
          </Button>
          <Button name={"secondary"}
                  color={"secondary"}
                  variant={"outlined"}
                  onClick={this.close.bind(this)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

    );
  }
}

export default withStyles(styles)(TradeCreateDialog);