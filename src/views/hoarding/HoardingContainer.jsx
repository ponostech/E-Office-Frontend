import React, { Component } from "react";
import { Button, Card, CardActions, CardHeader, Step, StepLabel, Stepper } from "@material-ui/core";
import HoardingInfo from "./HoardingInfo";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import DocumentsDropzoneFragment from "../../components/DocumentsDropzoneFragment";
import Constraint from "../../config/Constraint";
import CardFooter from "../../components/Card/CardFooter";

class HoardingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      validDocument:false
    };
  }

  validateHoardingInfo = (data, isValid) => {

  };
  validateAddress = (data) => {

  };
  validateDocument = (data) => {

  };

  submit = (allData) => {
    console.log(allData);
  };

  getView() {

    switch (this.state.activeStep) {
      case 0:
        return (<HoardingInfo validate={this.validateHoardingInfo()}/>);
      // case 1:
      //   return (
      //
      //   );
      // case 2:
      //   return (
      //
      //   );

      case 3:
        return (<DocumentsDropzoneFragment documents={[
          { name: "Signature of the applicant", fileName: "signature" },
          { name: "PDF", fileName: "test" }
        ]} acceptedFiles={Constraint.ACCEPTED_DOCUMENTS+" , "+Constraint.ACCEPTED_IMAGES} validateDoc={this.state.validDocument}/>);
    }
  }

  render() {
    let view = this.getView();
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={6}>
          <Card style={{ background: "white", marginTop: 40, padding: 20 }}>
            <CardHeader title={"Stepper form"} subheader={"hello world"}/>
            <Stepper activeStep={this.state.activeStep} alternativeLabel={true}>
              <Step key={1}>
                <StepLabel>Basic Info</StepLabel>
              </Step>
              <Step key={2}>
                <StepLabel>Location detail</StepLabel>
              </Step>
              <Step key={3}>
                <StepLabel>Document attachment</StepLabel>
              </Step>

            </Stepper>
            <div style={{ margin: 20 }}>
              {view}
            </div>
            <CardFooter>
                  <Button style={{ width: 120 }} color={"primary"} variant={"contained"}
                          onClick={() => this.setState({ activeStep: 1 })}>Previous</Button>
                  <Button style={{ width: 120 }} color={"primary"} variant={"contained"}
                          onClick={() => this.setState({ activeStep: 3 })}>Next</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>


    );
  }
}

export default HoardingContainer;