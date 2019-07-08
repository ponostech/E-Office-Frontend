import React, { Component } from "react";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import LoadingView from "../../../common/LoadingView";
import PropTypes from "prop-types";
import OfficeSelect from "../../../../components/OfficeSelect";


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

class ImposedFineDialog extends Component {
  constructor(props) {
    super(props);

    this.state={
      application:null,
      reason: "",
      amount: 0,

      applicationError: "",
      reasonError: "",
      amountError: "",

      applications:[]
    }
  }
  handleClose=()=>{
    this.props.onClose(null);
  }
  onChange=(name,value)=>{
    this.setState({[name]:value})
  }
  onBlur=(name,value)=>{
    switch (name) {
      case "application":
        value?this.setState({applicationError:""}):this.setState({applicationError:"Application is required"})
        break;
      case "reason":
        value?this.setState({reasonError:""}):this.setState({reasonError:"Reason is required"})
        break;
      case "amount":
        value?this.setState({ amountError: ""}):this.setState({amountError:"Amount is required"});
        break;
      default:
        break;
    }
  }

  render() {
    const { application, applications, reason, amount } = this.state;
    const { applicationError, reasonError, amountError } = this.state;
    const { open, onClose, classes } = this.props;

    let content = (
      <>
        <OfficeSelect
          value={application}
          label={"Select Application"}
          name={"application"}
          variant={"outlined"}
          margin={"dense"}
          fullWidth={true}
          required={true}
          helperText={applicationError}
          error={Boolean(applicationError)}
          onBlur={event => this.onBlur("application", event.target.value)}
          onChange={val => this.onChange("application", val)}
          options={applications}/>
        <TextField name={"reason"}
                   value={reason}
                   margin={"dense"}
                   fullWidth={true}
                   variant={"outlined"}
                   onChange={event => this.onChange("reason", event.target.value)}
                   label={"Reason"}
                   required={true}
                   onBlur={event => this.onBlur("reason", event.target.value)}
                   error={Boolean(reasonError)}
                   helperText={reasonError}
        />
        <TextField name={"amount"}
                   InputProps={{
                     inputProps: {
                       min: 0
                     },
                     startAdornment: <InputAdornment position={"start"}>
                       <Icon color={"action"}>rupee</Icon>
                     </InputAdornment>
                   }}
                   type={"number"}
                   value={amount}
                   margin={"dense"}
                   fullWidth={true}
                   variant={"outlined"}
                   onChange={event => this.onChange("amount", event.target.value)}
                   label={"Amount"}
                   required={true}
                   onBlur={event => this.onBlur("amount", event.target.value)}
                   error={Boolean(amountError)}
                   helperText={amountError}
        />
      </>
    );
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={this.handleClose.bind(this)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={this.handleClose.bind(this)} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Cash Payment
            </Typography>
            <Button href={"#"} onClick={this.handleClose.bind(this)} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Card>
            <CardContent>
              {loading ? <LoadingView/> : content}
            </CardContent>
          </Card>
        </DialogContent>
        <Divider component={"div"}/>
        <DialogActions>
          <Button href={"#"} variant={"outlined"} color={"primary"} onClick={this.handleClose.bind(this)}>Impose
            Fine</Button>
          <Button href={"#"} variant={"outlined"} color={"secondary"}
                  onClick={this.handleClose.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ImposedFineDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired
};


export default withStyles(styles)(ImposedFineDialog);