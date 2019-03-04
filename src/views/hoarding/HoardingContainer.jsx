import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Step,
  StepLabel,
  Stepper,
  Typography
} from "@material-ui/core";
import HoardingInfo from "./HoardingInfo";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import DocumentsDropzoneFragment from "../../components/DocumentsDropzoneFragment";
import Constraint from "../../config/Constraint";
import CardFooter from "../../components/Card/CardFooter";
import SubmitDialog from "../../components/SubmitDialog";
import HoardingApplicationFormModel from "../model/HoardingApplicationFormModel";
import { LocalCouncilService } from "../../services/LocalCouncilService";
import OfficeSnackbar from "../../components/OfficeSnackbar";

class HoardingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      applicantData: {
        localCouncil: undefined,
        category: undefined,
        lat: 0,
        long: 0,
        location: "",
        areaCategory: "",
        length: 1,
        height: 1,
        bothSide: false,
        displayType:null,

        landLord:'',
        landlordType:0,

        localCouncils: [],
        categories: [],
        displayTypes: []
      },
      files: [],
      documents: [
        { name: "Signature of the applicant", fileName: "signature" },
        { name: "PDF", fileName: "test" }
      ],
      submit: false,
      complete: false,
      hasError: false,
      errorMessage: ""
    };
    this.hoardingRef = React.createRef("hoardingRef");
    this.docRef = React.createRef("docRef");
    this.localCouncilservice = new LocalCouncilService();
  }

  componentWillMount() {
    let newLocalCouncils=[]
    this.localCouncilservice.get()
      .then(data => {
        if (data.status) {
          data.data.local_councils.forEach(function(item) {
            let lc={
              value:item.id,
              label:item.name
            }
            newLocalCouncils.push(lc)
          })
          this.setState(state=>{state.applicantData.localCouncils=newLocalCouncils});
        } else {
          this.setState({ hasError: true });
        }
      }).then(() => {
      this.setState(state=>state.applicantData.localCouncil=state.applicantData.localCouncils[0]);
    });
  }

  updateDocuments = (documents) => {
    this.setState({ documents });
  };
  updateFiles = (files) => {
    this.setState(files);
  };
  getPrevBtn = () => {
    return (
      <Button disabled={this.state.activeStep === 0} variant={"contained"} color={"primary"}
              onClick={this.handlePrev.bind(this)}>Back</Button>
    );
  };

  getNextBtn = () => {
    return (
      <Button disabled={this.state.activeStep === 2} variant={"contained"} color={"primary"}
              onClick={this.handleNext.bind(this)}>Next</Button>
    );
  };

  handlePrev = (e) => {
    const { activeStep } = this.state;
    if (activeStep > 0) {
      this.setState({ activeStep: activeStep - 1 });
    }
  };

  handleSubmit = (e) => {

  };
  handleNext = (e) => {
    const { activeStep } = this.state;
    switch (activeStep) {
      case 0:
        if (this.hoardingRef.current.isValid()) {
          this.setState({ applicantData: this.hoardingRef.current.getData() });
          this.setState({ activeStep: activeStep + 1 });
        }
        break;
      case 1:
        if (this.docRef.current.isValid()) {
          this.setState({ activeStep: activeStep + 1 });
        }
        break;
      case 2:
        this.setState({ activeStep: 2 });
        break;
    }
  };

  getView = () => {

    switch (this.state.activeStep) {
      case 0:
        return (<HoardingInfo ref={this.hoardingRef} applicantData={this.state.applicantData}/>);
      case 1:
        return (
          <DocumentsDropzoneFragment
            updateDocuments={this.updateDocuments.bind(this)}
            updateFiles={this.updateFiles.bind(this)}
            ref={this.docRef}
            files={this.state.files}
            documents={this.state.documents}
            acceptedFiles={Constraint.ACCEPTED_IMAGES + " , " + Constraint.ACCEPTED_DOCUMENTS}
          />
        );
      case 2:
        return (
          <Card>
            <CardHeader title={"Confirm"}/>
            <CardContent>
              <Typography variant={"subheading"}>
                Do you really want to submit ?
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={this.handleSubmit.bind(this)} variant={"contained"} size={"large"}
                      color={"primary"}>Submit</Button>
            </CardActions>
          </Card>
        );
    }
  };

  render() {
    const { activeStep } = this.state;
    let view = this.getView();
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={8}>
          <OfficeSnackbar open={this.state.hasError} message={this.state.errorMessage} variant={"error"}/>
          <Card style={{ padding: 40 }}>
            <CardHeader title={HoardingApplicationFormModel.TITLE} subheader={HoardingApplicationFormModel.SUBHEADER}/>
            <Stepper activeStep={this.state.activeStep} alternativeLabel={true}>
              <Step key={1}>
                <StepLabel>{HoardingApplicationFormModel.APPLICATN_INFO}</StepLabel>
              </Step>
              <Step key={2}>
                <StepLabel>{HoardingApplicationFormModel.ATTACHMENT}</StepLabel>
              </Step>
            </Stepper>
            <div style={{ margin: 20 }}>
              {view}
            </div>
            <CardFooter>
              {this.getPrevBtn()}
              {this.getNextBtn()}
            </CardFooter>

            <SubmitDialog open={this.state.submit} text={"Submitting form ...."}/>
          </Card>
        </GridItem>
      </GridContainer>


    );
  }
}

export default HoardingContainer;