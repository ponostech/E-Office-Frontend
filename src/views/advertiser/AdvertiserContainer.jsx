import React, { Component } from "react";
import { Button, Card, CardHeader, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import DocumentsDropzoneFragment from "../../components/DocumentsDropzoneFragment";
import Constraint from "../../config/Constraint";
import CardFooter from "../../components/Card/CardFooter";
import AdvertiserViewModel from "../model/AdvertiserViewModel";
import AdvertiserInfo from "./AdvertiserInfo";

class AdvertiserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      data:[]
    };
    this.infoRef=React.createRef();
    this.docRef=React.createRef();
  }

  validateInfo = () => {

  };
  validateDoc = () => {

  };

  submit = (allData) => {
    console.log(allData);
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
        console.log(this.infoRef)
        if (this.infoRef.current.isValid()) {
          this.setState({ data:this.infoRef.current.getData()});
          this.setState({ activeStep: activeStep + 1 });
        }
        break;
      case 1:
        if (this.docRef.current.isValid()) {
          this.setState({data: this.docRef.current.getData() });
          this.setState({ activeStep: activeStep + 1 });
        }
        break;
      case 2:
        break;
    }
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
        return (<AdvertiserInfo ref={this.infoRef} validateInfo={this.validateInfo}/>);
      case 1:
        return (
          <DocumentsDropzoneFragment
            ref={this.docRef}
            documents={[
              { name: "Signature of the applicant", fileName: "signature" },
              { name: "PDF", fileName: "test" }
            ]}
            acceptedFiles={Constraint.ACCEPTED_IMAGES + " , " + Constraint.ACCEPTED_DOCUMENTS}
            validateDoc={this.validateDoc}/>
        );
      case 2:
        return (
          <div>
            <Typography variant={"subheading"}>
              Do you really want to submit ?
            </Typography>
            <Button variant={"contained"} size={"large"} color={"primary"}>Submit</Button>
          </div>
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
          </Card>
        </GridItem>
      </GridContainer>


    );
  }
}

export default AdvertiserContainer;