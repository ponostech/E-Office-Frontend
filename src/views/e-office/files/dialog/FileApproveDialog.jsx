import React, { Component } from "reactn";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Icon,
  IconButton,
  Slide,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import SelectApprovedApplication from "./approve-steps/SelectApprovedApplication";
import SelectApprovedDraft from "./approve-steps/SelectApprovedDraft";
import ConfirmApproved from "./approve-steps/ConfirmApproved";
import SubmitDialog from "../../../../components/SubmitDialog";
import { DESK } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import moment from "moment";
import ApplicationService from "../../../../services/ApplicationService";

const styles = {
  appBar: {
    position: "relative"
  },
  actionsContainer: {
    marginBottom: 6
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function getSteps() {
  return ["Select Application", "Select Draft", " Approved"];
}

class FileApproveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,

      selectedApplication: null,
      selectedDraft: null,
      validUpto: null,
      submit: false
    };
    this.applicationService = new ApplicationService();
  }

  setValidity = validUpto => {
    this.setState({ validUpto });
  };
  selectApplication = selectedApplication => {
    this.setState({ selectedApplication });
    this.handleNext();
  };
  selectDraft = selectedDraft => {
    this.setState({ selectedDraft });
    this.handleNext();
  };
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
  };
  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 });
  };

  confirmApproved = () => {
    let data = {
      content: this.state.selectedDraft.content,
      valid_upto: moment(this.state.validUpto).format("Y/M/D")
    };
    this.setState({ submit: true });
    this.applicationService
      .approve(
        this.state.selectedApplication.id,
        data,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => {
          this.setGlobal({ successMsg });
          window.history.push(DESK);
        }
      )
      .finally(() => this.setState({ submit: false }));
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <SelectApprovedApplication
            file={this.props.file}
            onSelectApplication={this.selectApplication}
            onNext={this.handleNext}
          />
        );
      case 1:
        return (
          <SelectApprovedDraft
            application={this.state.selectedApplication}
            createDraft={this.props.createDraft}
            file={this.props.file}
            onSetValidity={this.setValidity}
            onDraftSelect={this.selectDraft}
            onBack={this.handleBack}
          />
        );
      // case 2:
      //   return <SendMessage application={this.state.selectedApplication} onBack={this.handleBack}
      //                       onMessageSend={this.sendMessage}/>;
      case 2:
        return (
          <ConfirmApproved
            confirmApproved={this.confirmApproved}
            application={this.state.selectedApplication}
            draft={this.state.selectedDraft}
            onBack={this.handleBack}
          />
        );
      default:
        return "unknown step";
    }
  };

  render() {
    const { activeStep } = this.state;
    const { classes, open, onClose } = this.props;
    const steps = getSteps();

    return (
      <Dialog
        fullScreen={true}
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        fullWidth={true}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
              href={"#"}
            >
              <Icon>close</Icon>
            </IconButton>
            <Typography
              variant="subtitle2"
              color="inherit"
              className={classes.flex}
            >
              Approve Application
            </Typography>
            <Button href={"#"} onClick={this.props.onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        ;
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
        <SubmitDialog
          open={this.state.submit}
          text={"Please wait ..."}
          title={"Approved Application"}
        />
      </Dialog>
    );
  }
}

export default withRouter(withStyles(styles)(FileApproveDialog));
