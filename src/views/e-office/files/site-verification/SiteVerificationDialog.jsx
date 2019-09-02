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
import SubmitDialog from "../../../../components/SubmitDialog";
import { withRouter } from "react-router-dom";
import ApplicationService from "../../../../services/ApplicationService";
import { FILEABLE_TYPE } from "../details/Views/FileApplicationDetails";
import SelectVerificationApplication from "./steps/SelectVerificationApplication";
import CreateVerification from "./steps/CreateVerification";
import ConfirmVerification from "./steps/ConfirmVerification";
import PropTypes from "prop-types";
import { SiteVerificationService } from "../../../../services/SiteVerificationService";
import CreateSiteVerification from "./steps/CreateSiteVerification";

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
  return ["Select Application", "Create Site Verification", " Confirm"];
}

class SiteVerificationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,

      selectedApplication: null,
      siteVerification: null,
      submit: false
    };
    this.applicationService = new ApplicationService();
    this.siteVerificationService=new SiteVerificationService()
  }

  createVerification = (siteVerification) => {
    this.setState({ siteVerification });
    this.handleNext()
  };
  selectApplication = selectedApplication => {
    this.setState({ selectedApplication });
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

  submitVerification = (url,type, data, template) => {

    if (url && data && template) {
      this.setState({ submit: true });
      this.siteVerificationService.createSiteVerification(url,type, data, template,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => {
          this.setGlobal({ successMsg });
          this.props.closeActionDialog();
        })
        .finally(() => this.setState({ submit: false }));
    }
    // let data = {
    //   content: this.state.selectedDraft.content,
    //   valid_upto: moment(this.state.validUpto).format("Y/M/D")
    // };
    // let path=this.getPath();
    // this.setState({ submit: true });
    // this.applicationService
    //   .approve(
    //     path,
    //     this.state.selectedApplication.id,
    //     data,
    //     errorMsg => this.setGlobal({ errorMsg }),
    //     successMsg => {
    //       this.props.closeActionDialog()
    //       this.setGlobal({ successMsg });
    //       this.props.history.push(DESK);
    //     }
    //   )
    //   .finally(() => this.setState({ submit: false }));
  };
// <CreateVerification
// onCreateSiteVerification={this.createVerification}
// application={this.state.selectedApplication}
// file={this.props.file}
// onNext={this.handleNext}
// onBack={this.handleBack}
// />
  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <SelectVerificationApplication
            file={this.props.file}
            onSelectApplication={this.selectApplication}
            onNext={this.handleNext}
          />
        );
      case 1:
        return (
          <CreateSiteVerification
            onCreateSiteVerification={this.createVerification}
            application={this.state.selectedApplication}
            file={this.props.file}
            onNext={this.handleNext}
            onBack={this.handleBack}
          />
        );
      // case 2:
      //   return <SendMessage application={this.state.selectedApplication} onBack={this.handleBack}
      //                       onMessageSend={this.sendMessage}/>;
      case 2:
        return (
          <ConfirmVerification
            siteVerification={this.state.siteVerification}
            confirmVerification={this.submitVerification}
            application={this.state.selectedApplication}
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
              Create Site Verification
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
          title={"Creating Site Verification"}
        />
      </Dialog>
    );
  }
}
SiteVerificationDialog.propTypes={
  closeActionDialog:PropTypes.func.isRequired
}
export default withRouter(withStyles(styles)(SiteVerificationDialog));
