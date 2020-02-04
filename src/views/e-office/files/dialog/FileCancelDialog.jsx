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
import SelectCancelApplication from "./cancel-steps/SelectCancelApplication";
import SelectCancelDraft from "./cancel-steps/SelectCancelDraft";
import ConfirmCancel from "./cancel-steps/ConfirmCancel";
import axios from "axios";
import SubmitDialog from "../../../../components/SubmitDialog";
import { DESK } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { ArrayToString } from "../../../../utils/ErrorUtil";
import { FILE_NOTESHEET } from "../../../../config/ApiRoutes";
import ApplicationService from "../../../../services/ApplicationService";
import { FILEABLE_TYPE } from "../details/Views/FileApplicationDetails";

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
  return ["Select Application", "Select Cancel Draft", "Confirm Cancel"];
}

class FileCancelDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,

      selectedApplication: null,
      selectedDraft: null,
      submit: false
    };
    this.applicationService = new ApplicationService();
  }

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
  getPath = () => {
    const { file } = this.props;
    let path = "";
    switch (file.fileable_type) {
      case FILEABLE_TYPE.SHOP:
        return "shop";
      case FILEABLE_TYPE.HOTEL:
        return "hotel";
      case FILEABLE_TYPE.BANNER:
        return "banner";
      case FILEABLE_TYPE.HOARDING:
        return "hoarding";
      case FILEABLE_TYPE.KIOSK:
        return "kiosk";
      default:
        return "shop";
    }
  };

  confirmCancel = () => {
    this.setState({ submit: true });
    let path = this.getPath();
    let data = { content: this.state.selectedDraft.content };
    this.applicationService
      .cancel(
        path,
        this.state.selectedApplication.id,
        data,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => {
          this.props.closeActionDialog();
          this.props.history.push(FILE_NOTESHEET);
          this.setGlobal({ successMsg });
        }
      )
      .finally(() => this.setState({ submit: false }));
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <SelectCancelApplication
            file={this.props.file}
            onSelectApplication={this.selectApplication}
            onNext={this.handleNext}
          />
        );
      case 1:
        return (
          <SelectCancelDraft
            application={this.state.selectedApplication}
            createCancelDraft={this.props.createCancelDraft}
            file={this.props.file}
            onDraftSelect={this.selectDraft}
            onBack={this.handleBack}
          />
        );
      case 2:
        return (
          <ConfirmCancel
            application={this.state.selectedApplication}
            draft={this.state.selectedDraft}
            onBack={this.handleBack}
            confirmCancel={this.confirmCancel}
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
              Cancel Application
            </Typography>
            <Button href={"#"} onClick={this.props.onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

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
          title={"Cancel Application"}
          text={"Please wait ..."}
        />
      </Dialog>
    );
  }
}

export default withRouter(withStyles(styles)(FileCancelDialog));
