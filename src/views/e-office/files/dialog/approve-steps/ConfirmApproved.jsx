import React from "react";
import { Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import ApplicationResolver from "../common/ApplicationResolver";
import DetailViewRow from "../../../common/DetailViewRow";
import Divider from "@material-ui/core/Divider";

function ConfirmApproved(props) {
  const { application, draft, confirmApproved, onBack } = props;

  const rows = ApplicationResolver(application);
  console.log("rows",rows)
  return (
    <Grid container={true} spacing={3}>
      <Grid item={true} md={6}>
        <Card>
          <CardHeader title={"Application Details"}/>
          <CardContent>
            {rows.map((row,index)=>
              <DetailViewRow key={index} primary={row.name} secondary={row.value}/>
            )}
          </CardContent>
        </Card>

      </Grid>
      <Grid item={true} md={6}>
        <Card>
          <CardHeader title={"Rejected Application Template"}/>
          <CardContent>
            <div dangerouslySetInnerHTML={{__html: draft.content}}/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item={true} md={12}>
      <Divider/>
      </Grid>
      <Grid item={true} md={12}>
        <Button href={"#"} variant={"contained"} onClick={onBack} color={"inherit"}>Back</Button>
        {"\u00A0 "}
        {"\u00A0 "}
        {"\u00A0 "}
        <Button href={"#"} variant={"contained"} onClick={confirmApproved} color={"primary"}>Approved Application</Button>
      </Grid>
    </Grid>
  );
}

ConfirmApproved.propTypes = {
  application: PropTypes.object.isRequired,
  draft: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  confirmApproved: PropTypes.func.isRequired
};
export default ConfirmApproved;