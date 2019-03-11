import React, { Component } from "react";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import { Card, CardActions, CardContent, CardHeader, Paper, TextField } from "@material-ui/core";
import FormControlUtils from "../../../../utils/FormControlUtils";
import ReactTable from "react-table";
import ActiveHoarding from "../hoarding/ActiveHoarding";

class AdvertiserDetails extends Component {
  render() {
    return (
      <Paper style={{padding:10}}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader title={"Advertiser details"}/>
              <CardContent>
                {FormControlUtils.Input("name","value","Name",false,false,"","dense",null,true)}
                {FormControlUtils.Input("name","value","Name",false,false,"","dense",null,true)}
                {FormControlUtils.Input("name","value","Name",false,false,"","dense",null,true)}
                {FormControlUtils.Input("name","value","Name",false,false,"","dense",null,true)}
                {FormControlUtils.Input("name","value","Name",false,false,"","dense",null,true,)}

              </CardContent>
              <CardActions>

              </CardActions>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            <Card>
              <CardHeader title={"List of advertisements"}/>
              <CardContent>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField label={"Search"} variant={"standard"} margin={"dense"}/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    {<ActiveHoarding/>}
                  </GridItem>
                </GridContainer>
              </CardContent>
            </Card>
          </GridItem>
        </GridContainer>
      </Paper>
    );
  }
}

export default AdvertiserDetails;