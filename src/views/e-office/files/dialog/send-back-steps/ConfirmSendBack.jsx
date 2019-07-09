import { Button, Card, CardContent, CardHeader, Grid, InputAdornment, List } from "@material-ui/core";
import PropTypes from "prop-types";
import ApplicationResolver, { getApplicantDetail, getApplicationTitle } from "../common/ApplicationResolver";
import DetailViewRow from "../../../common/DetailViewRow";
import TextEditor from "../../../common/Editor";
import React, { Component } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import Divider from "@material-ui/core/Divider";

class ConfirmSendBack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { application,reason, confirmSendBack, onBack } = this.props;

    const detail = getApplicationTitle(application);
    return (
      <>

        <List component={"div"}>
          <DetailViewRow primary={"TO"} secondary={detail.title}/>
          <DetailViewRow primary={"Reason"} secondary={reason}/>

        </List>
        <br/>
        <br/>
        <br/>
          <Button href={"#"} variant={"contained"} onClick={onBack} color={"inherit"}>Back</Button>
          {"\u00A0 "}
          {"\u00A0 "}
          {"\u00A0 "}
          <Button href={"#"} variant={"contained"} onClick={confirmSendBack} color={"primary"}>Send Back Application</Button>
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