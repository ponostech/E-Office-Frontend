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
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import DocumentsDropzoneFragment from "../../components/DocumentsDropzoneFragment";
import Constraint from "../../config/Constraint";
import CardFooter from "../../components/Card/CardFooter";
import AdvertiserViewModel from "../model/AdvertiserViewModel";
import AdvertiserInfo from "./AdvertiserInfo";
import { AdvertiserService } from "../../services/AdvertiserService";
import { OfficeRoutes } from "../../config/routes-constant/OfficeRoutes";
import SubmitDialog from "../../components/SubmitDialog";

class AdvertiserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      applicantData: undefined,
      files: [],
      documents: [
        { name: "Signature of the applicant (Image)", fileName: "signature", found: false },
        { name: "PDF (Pdf)", fileName: "test", found: false }
      ]
    };
    this.advertiserService = new AdvertiserService();
    this.infoRef = React.createRef();
    this.docRef = React.createRef();
  }

  updateFiles = (newFiles) => {
    this.setState({ files: newFiles });
  };

  updateDocuments = (newDocs) => {
    this.setState({ documents: newDocs });
  };
  handlePrev = (e) => {
    const { activeStep } = this.state;
    if (activeStep > 0) {
      this.setState({ activeStep: activeStep - 1 });
    }
  };

  handleNext = (e) => {
    const { activeStep } = this.state;
    switch (activeStep) {
      case 0:
        if (this.infoRef.current.isValid()) {
          this.setState({ applicantData: this.infoRef.current.getData() });
          this.setState({ activeStep: activeStep + 1 });
        }
        break;
      case 1:
        if (this.docRef.current.isValid()) {
          this.setState({ documentData: this.docRef.current.getData() });
          this.setState({ activeStep: activeStep + 1 });
        }
        break;
      case 2:
        break;
    }
  };

  handleSubmit = (e) => {
    const { history } = this.props;
    this.setState({ submit: true });
    this.advertiserService.create(this.state)
      .then(res => {
        console.log(res);
        if (!res.status) {
          this.setState({

          });
        } else {
          const{access_token}=res;
          localStorage.setItem("token", access_token);
          history.push(OfficeRoutes.APPLY_ADVERTISER)

        }
      })
      .then(() => {
        console.log("im fucking fullfillled");
        this.setState({ submit: false });
      });
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

  getView() {

    switch (this.state.activeStep) {
      case 0:
        return (<AdvertiserInfo ref={this.infoRef} applicantData={this.state.applicantData}/>);
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
  }

  render() {
    const { activeStep } = this.state;
    let view = this.getView();
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={4}>
          <Card style={{ padding: 40 }}>
            <CardHeader title={AdvertiserViewModel.TITLE} subheader={AdvertiserViewModel.SUBHEADER}/>
            <Stepper activeStep={this.state.activeStep} alternativeLabel={true}>
              <Step key={1}>
                <StepLabel>{AdvertiserViewModel.APPLICANT_DETAIL}</StepLabel>
              </Step>
              <Step key={2}>
                <StepLabel>{AdvertiserViewModel.DOC_ATTACHMENT}</StepLabel>
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

export default AdvertiserContainer;