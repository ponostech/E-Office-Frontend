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
import CloseIcon from "@material-ui/icons/CloseOutlined";
import GridContainer from "../../Grid/GridContainer";
import WidgetConstant from "../WidgetConstant";
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
class PatternFieldDialog extends Component {

  state = {
    name: "",
    label: "",
    placeholder: "",
    required: false,
    pattern: "",
    value: ""
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
          elementType: WidgetConstant.PATTERN,
          elementConfig: {
            name: this.state.name,
            label: this.state.label,
            placeholder: this.state.placeholder,
          },
          validation: {
            required: this.state.required,
            pattern:this.state.pattern
          },
          valid: false,
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

  doClear=()=>{
    this.setState({
      name:"",
      label:"",
      placeholder:"",
      pattern:"",
      value: "",
      required:false
    })
  }
  render() {
    const { open, onClose , widget,classes } = this.props;
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
            <TextField name={"name"} onChange={this.handleChange.bind(this)} required={true} value={this.state.name}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Name"}/>
            <TextField name={"label"} onChange={this.handleChange.bind(this)} required={true} value={this.state.label}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Label"}/>
            <TextField name={"placeholder"} onChange={this.handleChange.bind(this)} required={true}
                       value={this.state.placeholder}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"PlaceHolder"}/>

            <TextField name={"pattern"} onChange={this.handleChange.bind(this)} required={true}
                       value={this.state.pattern}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Pattern"}/>

                       <TextField name={"value"} onChange={this.handleChange.bind(this)} required={true}
                       value={this.state.value}
                       variant={"outlined"} fullWidth={true} margin={"dense"} label={"Default Value"}/>


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
          <Button disabled={
            !Boolean(this.state.name) ||
            !Boolean(this.state.label) ||
            !Boolean(this.state.placeholder) ||
            !Boolean(this.state.pattern)
          } variant={"outlined"} color={"primary"} onClick={this.handleClick.bind(this, "save")}>Save</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.handleClick.bind(this, "close")}>Close</Button>
        </DialogActions>
      </Dialog>

    );
  }
}

export default withStyles(styles)(PatternFieldDialog);