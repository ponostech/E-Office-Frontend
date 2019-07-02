import React, { Component } from "reactn";
import axios from "axios";
import PropTypes from "prop-types";
import { CardHeader, Icon } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { getApplicationTitle } from "../common/ApplicationResolver";

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


  render() {
    const { applications } = this.state;
    const { onSelectApplication } = this.props;

    return (
      <>
      <CardHeader title={"Please Select Application to Cancel"}/>
      <Divider component={"div"}/>
    {applications.map((application,index)=>
        <DetailViewRow key={index} click={e=>onSelectApplication(application)} primary={getApplicationTitle(application).title} secondary={getApplicationTitle(application).subtitle}>
          <IconButton href={"#"} onClick={e=>onSelectApplication(application)}>
            <Icon color={"action"}>keyboard_arrow_right</Icon>
          </IconButton>
        </DetailViewRow>
    )};
        </>
    );
  }
}
SelectCancelApplication.propTypes={
  file:PropTypes.object.isRequired,
  onSelectApplication:PropTypes.func.isRequired,
  // onNext:PropTypes.func.isRequired
}
export default SelectCancelApplication;