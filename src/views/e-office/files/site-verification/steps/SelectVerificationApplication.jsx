import React, { Component } from "reactn";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, CardHeader, Icon, List } from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";
import LoadingView from "../../../../common/LoadingView";
import { ApplicationResolver, getApplicationTitle } from "../../dialog/common/ApplicationResolver";

class SelectVerificationApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      selectedApplication: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get("/files/" + this.props.file.id + "/applications", { params: { status: "all" } })
      .then(res => {
        if (res.data.status)
          this.setState({ applications: res.data.data.applications });
        else
          this.setGlobal({ errorMsg: res.data.messages });
      })
      .catch(err => {
        this.setGlobal({ errorMsg: err.toString() });
      })
      .finally(() => this.setState({ loading: false }));
  }


  selectApplication = (selectedApplication) => {
    this.setState({ selectedApplication });
  };

  render() {
    const { applications, selectedApplication, loading } = this.state;
    const { onSelectApplication } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CardHeader title={"Please Select Application"}/>
          <Divider component={"div"}/>
          {loading && <LoadingView/>}
          <List>
            {applications.map((application, index) =>
              <DetailViewRow key={index} click={e => this.selectApplication(application)}
                             primary={getApplicationTitle(application).title}
                             secondary={getApplicationTitle(application).subtitle}>
                <IconButton href={"#"} onClick={e => this.selectApplication(application)}>
                  <Icon color={"action"}>keyboard_arrow_right</Icon>
                </IconButton>
              </DetailViewRow>
            )}
          </List>
          <Button disabled={!Boolean(selectedApplication)} href={"#"} variant={"contained"} color={"primary"}
                  onClick={e => onSelectApplication(selectedApplication)}>Next</Button>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {selectedApplication &&
          <List>{ApplicationResolver(selectedApplication).map(value => <DetailViewRow primary={value.name}
                                                                                      secondary={value.value}/>)}</List>}
        </GridItem>

      </GridContainer>
    );
  }
}

SelectVerificationApplication.propTypes = {
  file: PropTypes.object.isRequired,
  onSelectApplication: PropTypes.func.isRequired
  // onNext:PropTypes.func.isRequired
};
export default SelectVerificationApplication;