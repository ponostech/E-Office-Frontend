import React, { Component } from "react";
import OfficeSelect from "../../../components/OfficeSelect";
import { DESK } from "../../../config/routes-constant/OfficeRoutes";
import Grid from "@material-ui/core/Grid";
import { Button, CardHeader, DialogActions } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { StaffService } from "../../../services/StaffService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import SubmitDialog from "../../../components/SubmitDialog";
import { FileService } from "../../../services/FileService";

class FileSend extends Component {
  state = {
    staffs: [],
    recipient_id: null,
    errorMessage: "",
    successMessage: "",
    submit: false
  };

  staffService = new StaffService();
  fileService = new FileService();

  componentDidMount() {
    this.props.doLoad(true);
    this.getStaffs();
  }

  getStaffs = () => {
    this.staffService.all(errorMessage => this.setState({ errorMessage }), staffList => {
      let staffs = this.formatStaff(staffList);
      this.setState({ staffs });
    })
      .finally(() => this.props.doLoad(false));

  };

  formatStaff = (staffs) => {
    const user_id = JSON.parse(localStorage.getItem("current_user")).id;
    return staffs.filter(function(obj) {
      return obj.id !== user_id;
    })
      .map(obj => {
        let temp = {};
        temp["value"] = obj.id;
        temp["label"] = obj.staff.name + " (" + obj.staff.designation + ")";
        return temp;
      });
  };

  handleOfficeSelect = (identifier, value) => {
    this.setState({
      [identifier]: value
    });
  };


  handleSubmit = () => {
    const { history } = this.props;
    if (!this.state.recipient_id) {
      this.setState({ errorMessage: "Please select recipient" });
      return;
    }
    this.setState({ submit: true });
    this.fileService.sendFile(this.props.file.id, this.state.recipient_id.value,
      errorMessage => this.setState({ errorMessage }),
      successMessage => {
        this.setState({ successMessage });
        history.push(DESK);
      })
      .finally(() => this.setState({ submit: false }));

  };

  render() {
    return (
      <>
        <CardHeader title={"File No.: " + this.props.file.number}
                    subheader={"Subject: " + this.props.file.subject}/>
        <CardContent>
          <Grid item xs={6}>
            <OfficeSelect
              value={this.state.recipient_id}
              options={this.state.staffs}
              name={"recipient_id"}
              label={"Send File To"}
              variant={"outlined"}
              margin={"dense"}
              required={true}
              fullWidth={true}
              onChange={this.handleOfficeSelect.bind(this, "recipient_id")}
            />
          </Grid>
        </CardContent>
        <Divider/>
        <DialogActions>
          <Button color="primary" onClick={this.handleSubmit.bind(this)}>Send File</Button>
        </DialogActions>
        <SubmitDialog open={this.state.submit} title={"File Movement"} text={"File is moving..."}/>
        <OfficeSnackbar variant={"error"} open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}
                        onClose={() => this.setState({ errorMessage: "" })}/>
        <OfficeSnackbar variant={"success"} open={Boolean(this.state.successMessage)}
                        message={this.state.successMessage}
                        onClose={() => this.setState({ successMessage: "" })}/>
      </>
    );
  }
}

export default FileSend;