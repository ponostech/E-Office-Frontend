import React, { Component } from "react";
import {
  AppBar,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton, Slide,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField, Toolbar,
  Typography
} from "@material-ui/core";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import GridContainer from "../../Grid/GridContainer";
import CloseIcon from "@material-ui/icons/CloseOutlined";
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
class SelectFieldDialog extends Component {
  state = {
    name: "",
    label: "",
    required: false,
    options: [],

    elementType: "Select",
    elementConfig: {
      name: "name",
      label: "Name",
      placeholder: "placeholder",
      options: []
    },
    validation: {
      required: false
    },
    valid: false
  };


  addItem = () => {
    let options = this.state.options;
    options.push({ name: "unique_name", value: "Value", label: "Display Name" });
    this.setState({ options });
  };
  handleDelete = (index, event) => {
    let options = [this.state.options];
     options.slice(index, 1);
    this.setState({ options });
  };

  handleItemChange = (index, e) => {
    let item = this.state.options[index];
    let temp = {};
    const { value, name } = e.target;
    switch (name) {
      case "name":
        temp.name = value;
        break;
      case "value":
        temp.value = value;
        break;
      case "label":
        temp.label = value;
        break;

    }
    Object.assign(item, temp);
  };
  handleClick = (id, event) => {
    const { widget, onClose } = this.props;
    switch (id) {
      case "save":
        const config = {
          elementType: widget.name,
          elementConfig: {
            name: this.state.name,
            label: this.state.label,
            placeholder: this.state.placeholder,
            options: this.state.options
          },
          validation: {
            required: this.state.required
          },
          valid: false,
          value: null
        };
        onClose(this.state.name, config);
        this.doClear()
        break;
      case "close":
        this.doClear()
        onClose(null, null);
        break;
      default:
        break;
    }
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleRadio = event => {
    const required = {
      required: event.target.checked
    };
    this.setState({
      required
    });
  };

  doClear=()=>{
    this.setState({
      name:"",
      label:"",
      options: [],
      required:false
    })
  }
  render() {
    const { open, onClose, widget,classes } = this.props;

    const self = this;
    return (
      <Dialog TransitionComponent={Transition} open={open} onClose={this.handleClick.bind(this, "close")} fullWidth={true} maxWidth={"md"}>

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

          <GridContainer spacing={16}>
            <TextField required={true} name={"name"} value={this.state.name} onChange={this.handleChange.bind(this)}
                       variant={"outlined"} margin={"dense"} label={"Name"} fullWidth={true}/>
            <TextField required={true} name={"label"} value={this.state.label} onChange={this.handleChange.bind(this)}
                       variant={"outlined"} margin={"dense"} label={"Label"} fullWidth={true}/>

            <FormControl component={"div"} fullWidth={true} margin={"dense"}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={this.handleRadio.bind(this)}
                    value={this.state.required}
                    color="primary"
                  />
                }
                label="Required?"
              />
            </FormControl>
            <Divider component={"li"}/>
            <br/>
            <Typography variant={"h6"}>Options : </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name/Key</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Label</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.options.map(function(item, index) {
                    return (
                      <TableRow key={index}>
                        {/*<ListItemText>*/}
                        <TableCell>
                          <TextField
                            variant={"outlined"} margin={"dense"} name={"name"} required={true}
                            onChange={self.handleItemChange.bind(this, index)} label={"Name"}/>
                        </TableCell>
                        <TableCell>

                          <TextField
                            variant={"outlined"} margin={"dense"} name={"value"} required={true}
                            onChange={self.handleItemChange.bind(this, index)} label={"Value"}/>
                        </TableCell>
                        <TableCell>

                          <TextField
                            variant={"outlined"} margin={"dense"} name={"label"} required={true}
                            onChange={self.handleItemChange.bind(this, index)} label={"Label"}/>
                        </TableCell>
                        <TableCell>
                          {/*</ListItemText>*/}
                          <IconButton onClick={self.handleDelete.bind(this, index)}>
                            <TrashIcon color={"secondary"}/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
            <Button  onClick={this.addItem.bind(this)} variant={"outlined"}
                    color={"primary"}>ADD</Button>
          </GridContainer>

        </DialogContent>
        <DialogActions>
          <Button disabled={!Boolean(this.state.name) ||
          !Boolean(this.state.label) ||
            this.state.options.length===0
          }
                  variant={"outlined"} color={"primary"}
                  onClick={this.handleClick.bind(this, "save")}>Save</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.handleClick.bind(this, "close")}>Close</Button>
        </DialogActions>
      </Dialog>

    );
  }
}

SelectFieldDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default withStyles(styles)(SelectFieldDialog);