import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List
} from "@material-ui/core";
import PropTypes from "prop-types";
import ApplicationResolver from "../common/ApplicationResolver";
import DetailViewRow from "../../../common/DetailViewRow";
import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";

class ConfirmApproved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validity: null,
      validityError: ""
    };
  }

  handleValidity = val => {
    this.setState({ validity: val });
  };

  handleBlur = e => {
    this.state.validity === null
      ? this.setState({ validityError: "Validity is required" })
      : this.setState({ validityError: "" });
  };

  render() {
    const { application, draft, confirmApproved, onBack } = this.props;

    const rows = ApplicationResolver(application);
    return (
      <Grid container={true} spacing={3}>
        <Grid item={true} md={4}>
          <Card>
            <CardHeader title={"Application Details"} />
            <Divider component={"div"} />
            <CardContent>
              <List>
                {rows.map((row, index) => (
                  <DetailViewRow
                    key={index}
                    primary={row.name}
                    secondary={row.value}
                  />
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} md={8}>
          <Card>
            <CardHeader title={"License/Permit Template"} />
            <Divider component={"div"} />
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: draft.content }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} md={12}>
          <Divider />
        </Grid>

        <Grid item={true} md={12}>
          <Button
            href={"#"}
            variant={"contained"}
            onClick={onBack}
            color={"inherit"}
          >
            Back
          </Button>
          {"\u00A0 "}
          {"\u00A0 "}
          {"\u00A0 "}
          <Button
            href={"#"}
            variant={"contained"}
            onClick={confirmApproved}
            color={"primary"}
          >
            Approved Application
          </Button>
        </Grid>
      </Grid>
    );
  }
}

ConfirmApproved.propTypes = {
  application: PropTypes.object.isRequired,
  draft: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  confirmApproved: PropTypes.func.isRequired
};

export default ConfirmApproved;
