import React, { Component } from "react";
import { Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";
import OfficeSelect from "../../../components/OfficeSelect";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

class ApplicationAssignmentView extends Component {
  constructor(props) {
    super(props);
    this.state={
      users:[],
      user:null
    }
  }
  handleClick=(e)=>{

  }
  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader title={"User Assignment"} subheader={}/>
            <CardContent>

              <OfficeSelect options={this.state.users} label={"Select user"} variant={"outlined"} fullWidth={true}/>

            </CardContent>
            <CardActions>
              <Button variant={"outlined"} color={"primary"} onClick={this.handleClick.bind(this)}>Assign</Button>
              <Button variant={"outlined"} color={"secondary"} onClick={this.handleClick.bind(this)}>Cancel</Button>
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default ApplicationAssignmentView;