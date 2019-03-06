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
import { LocalCouncilService } from "../../../../services/LocalCouncilService";
import { HoardingService } from "../../../../services/HoardingService";
import SingletonAuth from "../../../../utils/SingletonAuth";
import DocumentsDropzoneFragment from "../../../../components/DocumentsDropzoneFragment";
import KioskInfo from "./KioskInfo";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import CardFooter from "../../../../components/Card/CardFooter";
import SubmitDialog from "../../../../components/SubmitDialog";
import KioskViewModel from "../../../model/KioskViewModel";
import Constraint from "../../../../config/Constraint";


class KioskFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      kioskData: {
        localCouncil: undefined,
        category: undefined,
        lat: 0,
        long: 0,
        location: "",
        areaCategory: "",
        length: 1,
        height: 1,
        bothSide: false,
        displayType: {value:"ILLUMINATED", label:'ILLUMINATED'},

        landLord: "",
        landlordType: "0",

        localCouncils: [],
        categories: [],
        displayTypes: [
          { value: "ILLUMINATED", label: "ILLUMINATED" },
          { value: "NON-ILLUMINATED", label: "NON ILLUMINATED" },
          { value: "FLICKERING_LIGHT", label: "FLICKERING LIGHT" }
        ]
      },
      files: [],
      documents: [
        { name: "Signature of the applicant", fileName: "signature" },
        { name: "PDF", fileName: "test" }
      ],
      submit: false,
      complete: false,
      hasError: false,
      errorMessage: "",

      localCouncilError: "",
      addressError: "",
      lengthError: "",
      heightError: "",
      categoryError: "",
      displayTypeError: ""
    };
    this.kioskRef = React.createRef("kioskRef");
    this.docRef = React.createRef("docRef");
    this.localCouncilservice = new LocalCouncilService();
    this.hoardingService = new HoardingService();
  }

  componentWillMount() {
    let currentUser = new SingletonAuth().getCurrentUser();

    let newLocalCouncils = [];
    this.localCouncilservice.get()
      .then(data => {
        if (data.status) {
          data.data.local_councils.forEach(function(item) {
            let lc = {
              value: item.id,
              label: item.name
            };
            newLocalCouncils.push(lc);
          });
          this.setState(state => {
            state.hoardingData.localCouncils = newLocalCouncils;
          });
        } else {
          this.setState({ hasError: true });
        }
      }).then(() => {
      this.setState(state => state.hoardingData.localCouncil = state.hoardingData.localCouncils[0]);
    });
  }

  updateDocuments = (documents) => {
    this.setState({ documents });
  };
  updateFiles = (files) => {
    this.setState({ files });
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

    this.setState({ submit: true });
    this.hoardingService.create(this.state)
      .then(data => {
        console.log(data);
        // if (data.status) {
        this.setState({ submit: false, complete: true });
        // }
      })
      .then(() => {
        this.setState({ submit: false });
      });

  };
  handleNext = (e) => {
    const { activeStep } = this.state;
    switch (activeStep) {
      case 0:
        if (this.hoardingRef.current.isValid()) {
          this.setState({ hoardingData: this.hoardingRef.current.getData() });
          this.setState({ activeStep: activeStep + 1 });
        }
        break;
      case 1:
        console.log(this.docRef.current.isValid());
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
        return (<KioskInfo ref={this.hoardingRef} kioskData={this.state.kioskData}/>);
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
            <CardHeader title={KioskViewModel.TITLE} subheader={KioskViewModel.SUBHEADER}/>
            <Stepper activeStep={this.state.activeStep} alternativeLabel={true}>
              <Step key={1}>
                <StepLabel>{KioskViewModel.KIOSK_INFO}</StepLabel>
              </Step>
              <Step key={2}>
                <StepLabel>{KioskViewModel.ATTACHMENT}</StepLabel>
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

        <SubmitDialog open={this.state.submit} text={"Submitting form ...."}/>
        <OfficeSnackbar variant={"success"} message={"Your application is submitted successfully"}
                        open={this.state.complete} onClose={(e) => this.setState({ complete: false })}/>
      </GridContainer>


    );
  }
}

export default KioskFormContainer;