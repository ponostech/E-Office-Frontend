import React, { Component } from "react";
import {
  AppBar,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  IconButton, Slide,
  Switch,
  TextField, Toolbar, Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import GridContainer from "../../Grid/GridContainer";
import WidgetConstant from "../WidgetConstant";
import withStyles from "@material-ui/core/styles/withStyles";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
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
class DatePickerDialog extends Component {
  state = {
    name: "",
    label: "",
    placeholder: "",
    value:"",
    required:false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("component update")
  }

  handleChange = (name,value) => {
    this.setState({[name]:value})
  };

  handleRadio = event => {
    this.setState({
      required:event.target.checked
    })
  };
  handleClick = (id, event) => {
    const { widget, onClose } = this.props;

    switch (id) {
      case "save":
        const config = {
          elementType:WidgetConstant.DATE,
          elementConfig:{
            name: this.state.name,
            label: this.state.label,
            placeholder: this.state.placeholder,
          },
          validation:{
            required: this.state.required
          },
          valid:false,
          value: this.state.value,
        };
        onClose(this.state.name,config);
        this.doClear();
        break;
      case "close":
        this.doClear();
        onClose(null,null);
        break;
      default:
        break;
    }
  };
  doClear=()=>{
    this.setState({
      name:"",
      label:"",
      placeholder:"",
      value: new Date(),
      required:false
    })
  }

  render() {
    const { open, onClose ,widget,classes} = this.props;
    const self = this;

    return (
      <Dialog TransitionComponent={Transition} open={open} onClose={this.handleClick.bind(this,"close")} fullWidth={true} maxWidth={"md"}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={this.handleClick.bind(this,"close")} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Configuration ({widget?widget.name:""})
            </Typography>
            <Button href={"#"} onClick={this.handleClick.bind(this,"close")} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>

          <GridContainer>
            <TextField name={"name"} onChange={e=>this.handleChange("name",e.target.value)} required={true} value={this.state.name}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Name"}/>

            <TextField name={"label"} onChange={e => this.handleChange("label",e.target.value)} required={true} value={this.state.label}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Label"}/>

            <TextField name={"placeholder"} onChange={e => this.handleChange("placeholder",e.target.value)} required={true}
                       value={this.state.placeholder}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"PlaceHolder"}/>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                fullWidth={true}
                InputLabelProps={
                  { shrink: true }
                }
                label={"Default Value"}
                margin="dense"
                variant="outlined"
                value={this.state.estd}
                onChange={date=>this.handleChange("value",date)}
                format={"dd/MM/yyyy"}
              />
            </MuiPickersUtilsProvider>

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
          <Button variant={"outlined"} color={"primary"} onClick={this.handleClick.bind(this, "save")}>Save</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.handleClick.bind(this, "close")}>Close</Button>
        </DialogActions>
      </Dialog>

    );
  }
}

export default withStyles(styles)(DatePickerDialog);