import React, { Component } from "react";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  Typography
} from "@material-ui/core";
import FilterIcon from "@material-ui/icons/FilterList";
import GrantedAdvertiserApplication from "./GrantedAdvertiserApplication";
import AdvertiserApplications from "./AdvertiserApplications";

class AdvertiserDetails extends Component {
  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
          <Card>
            <CardHeader title={"Advertiser details"}/>
            <CardContent>
              <Typography variant={"headline"}>Advertiser id:123123</Typography>
              <Typography variant={"subheading"}>Name: Kimi</Typography>
              <Typography variant={"subheading"}>Address: chhinga veng</Typography>
              <Typography variant={"subheading"}>Type: private</Typography>
              <Typography variant={"subheading"}>Email: email#mail.com</Typography>
              <Typography variant={"subheading"}>Phone: 123131233</Typography>
              <Chip style={{ margin: 10 }} label={"NEW"}/>
            </CardContent>
            <CardActions>
              <Button variant={"contained"} color={"primary"}> Download</Button>
              <Button variant={"contained"} color={"default"}>Print </Button>
            </CardActions>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={9}>
          {<AdvertiserApplications/>}
        </GridItem>
      </GridContainer>
    );
  }
}

export default AdvertiserDetails;