import React, { Component } from "reactn";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, CardHeader, Icon, List } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ApplicationResolver, { getApplicationTitle } from "../common/ApplicationResolver";
import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";

class SelectCancelApplication extends Component {
  constructor(props) {
    super(props);
    this.state={
      applications:[]
    }
  }

  componentDidMount() {
    axios.get("/files/" + this.props.file.id + "/applications", { params: { status: "active" } })
      .then(res=>{
        if (res.data.status)
          this.setState({applications:res.data.data.applications})
        else
          this.setGlobal({errorMsg:res.data.messages})
      })
      .catch(err=>{
        this.setGlobal({errorMsg:err.toString()})
      })
  }

  selectApplication = (selectedApplication)=>this.setState({selectedApplication});

  render() {
    const { applications,selectedApplication } = this.state;
    const { onSelectApplication } = this.props;

    return (
      <GridContainer>
        <GridItem md={6}>
          <CardHeader title={"Please Select Application to Cancel"}/>
          <Divider component={"div"}/>
          <List>
            {applications.map((application,index)=>
              <DetailViewRow key={index} click={e=>this.selectApplication(application)} primary={getApplicationTitle(application).title} secondary={getApplicationTitle(application).subtitle}>
                <IconButton href={"#"} onClick={e=>this.selectApplication(application)}>
                  <Icon color={"action"}>keyboard_arrow_right</Icon>
                </IconButton>
              </DetailViewRow>
            )};
          </List>
          <Button disabled={!Boolean(selectedApplication)} href={"#"} onClick={event => onSelectApplication(selectedApplication)} variant={"contained"} color={"primary"} >Next</Button>
        </GridItem>
        <GridItem md={6}>
          <List>
          {selectedApplication && ApplicationResolver(selectedApplication).map(value =><DetailViewRow primary={value.name} secondary={value.value} />)}
          </List>
        </GridItem>

        </GridContainer>
    );
  }
}
SelectCancelApplication.propTypes={
  file:PropTypes.object.isRequired,
  onSelectApplication:PropTypes.func.isRequired,
  // onNext:PropTypes.func.isRequired
}
export default SelectCancelApplication;