import React from "react";
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
import Divider from "@material-ui/core/Divider";

function ConfirmCancel(props) {
  const { application, draft, confirmCancel, onBack } = props;

  const rows = ApplicationResolver(application);
  return (
    <Grid container={true} spacing={3}>
      <Grid item={true} md={4}>
        <Card>
          <CardHeader title={"Application Details"} />
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
          <CardHeader title={"Cancel Application Template"} />
          <CardContent>
            <div
              dangerouslySetInnerHTML={{ __html: draft ? draft.content : "" }}
            />
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
          onClick={confirmCancel}
          color={"primary"}
        >
          Cancel Application
        </Button>
      </Grid>
    </Grid>
  );
}

ConfirmCancel.propTypes = {
  application: PropTypes.object.isRequired,
  draft: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  confirmCancel: PropTypes.func.isRequired
};
export default ConfirmCancel;
