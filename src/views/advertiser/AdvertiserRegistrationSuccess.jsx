import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Button, Divider, Typography } from "@material-ui/core";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import { OfficeRoutes } from "../../config/routes-constant/OfficeRoutes";

class AdvertiserRegistrationSuccess extends Component {
  render() {
    const { history } = this.props;
    return (
      <GridContainer justify={"center"} alignItems={"center"}>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardBody style={{textAlign:"center"}}>
              <Typography variant={"headline"} color={"textPrimary"}>
                Your Application is summitted successfully
              </Typography>
              <Typography variant={"subheading"} color={"textSecondary"}>
                Your Application ID is 123123
              </Typography>
              <Divider style={{margin:10}}/>
              <Button variant={"contained"} color={"primary"} size={"large"}
              onClick={(e)=>history.push(OfficeRoutes.HOME)}
              >Continue</Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default AdvertiserRegistrationSuccess;