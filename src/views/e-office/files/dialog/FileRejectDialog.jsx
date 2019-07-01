import React, { Component } from "react";
import SelectRejectedApplication from "./rejectSteps/SelectRejectedApplication";
import SelectRejectedDraft from "./rejectSteps/SelectRejectedDraft";
import ConfirmReject from "./rejectSteps/ConfirmReject";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Icon,
  IconButton,
  Slide, Step, StepContent, StepLabel, Stepper,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";

const styles = {
  appBar: {
    position: "relative"
  },
  actionsContainer: {
    marginBottom: 6,
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function getSteps() {
  return ["Select Application","Select Rejected Draft","Confirm Reject"]
}

class FileRejectDialog extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeStep: 0,

      selectedApplication: null,
      selectedDraft: null
    }
  }
  selectApplication=(selectedApplication)=>{
    this.setState({selectedApplication})
    this.handleNext()
  }
  selectDraft=(selectedDraft)=>{
    this.setState({selectedDraft})
    this.handleNext()
  }
  handleNext=()=>{
    const { activeStep } = this.state;
    this.setState({activeStep:activeStep+1})
  }
  handleBack=()=>{
    const { activeStep } = this.state;
    this.setState({activeStep:activeStep-1})
  }

  confirmReject=()=>{
    console.log("confirm reject")
  }

  getStepContent=(step)=>{
    switch (step) {
      case 0:
        return <SelectRejectedApplication file={this.props.file} onSelectApplication={this.selectApplication} onNext={this.handleNext}/>;
      case 1:
        return <SelectRejectedDraft file={this.props.file} onDraftSelect={this.selectDraft} onBack={this.handleBack}/>;
      case 2:
        return <ConfirmReject application={this.state.selectedApplication} draft={this.state.selectedDraft} onBack={this.handleBack} confirmReject={this.confirmReject}/>;
      default:
        return "unknown step"

    }
  }

  render() {
    const { activeStep } = this.state;
    const { classes,open,onClose } = this.props;
    const steps=getSteps();

    return (
      <Dialog fullScreen={true} open={open} TransitionComponent={Transition} onClose={onClose} fullWidth={true}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close" href={"#"}>
              <Icon>close</Icon>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Reject Application
            </Typography>
            <Button href={"#"} onClick={this.props.onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>;

        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div className={classes.actionsContainer}>
                    {this.getStepContent(index)}
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>

        </DialogContent>

      </Dialog>
    );
  }
}

export default withStyles(styles)(FileRejectDialog);