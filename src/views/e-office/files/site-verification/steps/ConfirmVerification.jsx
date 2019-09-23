import { Button, Card, CardContent, CardHeader, Grid, List } from "@material-ui/core";
import PropTypes from "prop-types";
import DetailViewRow from "../../../common/DetailViewRow";
import React, { Component } from "reactn";
import Divider from "@material-ui/core/Divider";
import { ApplicationResolver } from "../../dialog/common/ApplicationResolver";

class ConfirmVerification extends Component {

  handleConfirm = () => {
    const { application, siteVerification ,confirmVerification} = this.props;
    const { formElements, formData } = siteVerification;
      let url = "site-verifications/" + application.id;
      let type = application.file.fileable_type;
      confirmVerification(url, type, formData, formElements);
  };

  render() {
    const { application, siteVerification, onBack } = this.props;

    const rows = ApplicationResolver(application);
    const verificationData = Object.entries(siteVerification.formData).map(([key,val]) => <DetailViewRow primary={key.toUpperCase()} secondary={typeof val==="object"?"Obj":val}/>);
    return (
      <Grid container={true} spacing={3}>
        <Grid item={true} md={4}>
          <Card>
            <CardHeader title={"Application Details"}/>
            <Divider component={"div"}/>
            <CardContent>
              <List>
                {rows.map((row, index) =>
                  <DetailViewRow key={index} primary={row.name}
                                 secondary={typeof row.value === "object" ? "object" : row.value}/>
                )}
              </List>
            </CardContent>
          </Card>

        </Grid>
        <Grid item={true} md={8}>
          <Card>
            <CardHeader title={"Site Verification"}/>
            <Divider component={"div"}/>
            <CardContent>
              <List>
                {verificationData}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} md={12}>
          <Divider component={"div"}/>
        </Grid>

        <Grid item={true} md={12}>
          <Button href={"#"} variant={"contained"} onClick={e => this.handleConfirm()}
                  color={"primary"}>Confirm</Button>
          {"\u00A0 "}
          {"\u00A0 "}
          {"\u00A0 "}
          <Button href={"#"} variant={"contained"} onClick={onBack} color={"inherit"}>Back</Button>
        </Grid>
      </Grid>
    );
  }
}

ConfirmVerification.propTypes = {
  application: PropTypes.object.isRequired,
  siteVerification: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  confirmVerification: PropTypes.func.isRequired
};
export default ConfirmVerification;