import React, { Component } from "reactn";
import SelectRejectedApplication from "./reject-steps/SelectRejectedApplication";
import SelectRejectedDraft from "./reject-steps/SelectRejectedDraft";
import ConfirmReject from "./reject-steps/ConfirmReject";
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
import axios from "axios";
import SubmitDialog from "../../../../components/SubmitDialog";
import { DESK } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { ArrayToString } from "../../../../utils/ErrorUtil";

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
      selectedDraft: null,
      submit:false
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
    this.setState({ submit: true})
    axios.post("/files/" + this.props.file.id + "/application/" + this.state.selectedApplication.id + "/cancel",
      { permit: this.state.selectedDraft.content })
      .then(res=>{
        if (res.data.status) {
          this.setGlobal({successMsg:ArrayToString(res.data.messages)})
          this.props.history.push(DESK)
        }else{
          this.setGlobal({errorMsg:ArrayToString(res.data.messages)})
        }
      })
      .catch(err=>this.setGlobal({errorMsg:err.toString()}))
      .finally(()=>this.setState({submit:false}));
  }

  getStepContent=(step)=>{
    switch (step) {
      case 0:
        return <SelectRejectedApplication file={this.props.file} onSelectApplication={this.selectApplication} onNext={this.handleNext}/>;
      case 1:
        return <SelectRejectedDraft file={this.props.file} onDraftSelect={this.selectDraft.bind(this)} onBack={this.handleBack}/>;
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

        <SubmitDialog open={this.state.submit} title={"Reject Application"} text={"Please wait ..."}/>
      </Dialog>
    );
  }
}

export default withRouter(withStyles(styles)(FileRejectDialog));