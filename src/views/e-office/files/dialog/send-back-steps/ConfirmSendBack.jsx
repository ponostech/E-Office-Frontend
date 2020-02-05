import { Button, List } from "@material-ui/core";
import PropTypes from "prop-types";
import DetailViewRow from "../../../common/DetailViewRow";
import React, { Component } from "react";

class ConfirmSendBack extends Component {
  render() {
    let { reason, confirmSendBack, onBack } = this.props;

    return (
      <>
        <List component={"div"}>
          <DetailViewRow primary={"Reason"} secondary={reason} />
        </List>
        <br />
        <br />
        <br />
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
          onClick={confirmSendBack}
          color={"primary"}
        >
          Send Back Application
        </Button>
      </>
    );
  }
}

ConfirmSendBack.propTypes = {
  application: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  confirmSendBack: PropTypes.func.isRequired
};

export default ConfirmSendBack;
