import React, { Component } from "react";
import PropTypes from "prop-types";
import { SiteVerificationService } from "../../../../../services/SiteVerificationService";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography
} from "@material-ui/core";
import moment from "moment";
import OfficeSnackbar from "../../../../../components/OfficeSnackbar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import SubmitDialog from "../../../../../components/SubmitDialog";
import SiteVerificationEditDialog from "../../site-verification/SiteVerificationEditDialog";
import SiteVerificationDetailDialog from "../../site-verification/SiteVerificationDetailDialog";

class FileSiteVerifications extends Component {
  siteVerificationService = new SiteVerificationService();
  state = {
    data: [],
    selectedVerification: null,

    edit: false,
    view: false,

    openConfirm: false,
    loading: true,

    errorMessage: "",
    successMessage: "",

    submitTitle: "",
    submitMessage: ""
  };

  edit = (selectedVerification) => {
    const { type } = this.props;
    this.setState({ selectedVerification, edit: true });
  };
  view = (selectedVerification) => {
    const { type } = this.props;
    this.setState({ selectedVerification, view: true });
  };
  updateVerification = (url, data, template) => {
    this.setState({ edit: false });
    if (url && data && template) {
      this.setState({ submit: true, submitTitle: "Update Site Verification", submitMessage: "Please wait..." });
      this.siteVerificationService.updateSiteVerification(url, data, template,
        errorMessage => this.setState({ errorMessage }),
        successMessage => this.setState({ successMessage }))
        .finally(() => this.setState({ submit: false }));
    }
  };
  delete = (selectedVerification) => {
    this.setState({ selectedVerification, openConfirm: true });
  };
  deleteConfirm = () => {
    this.setState({
      submit: true,
      openConfirm: false,
      submitTitle: "Delete verification",
      submitMessage: "Please wait..."
    });
    this.siteVerificationService.delete(this.state.selectedVerification.id,
      errorMessage => this.setState({ errorMessage }),
      successMessage => this.setState({ successMessage }))
      .finally(() => this.setState({ submit: false }));
  };

  componentDidMount() {
    const { type, file } = this.props;
    if (type) {
      let url = `/site-verifications/${type}/${file.fileable_id}`;
      this.siteVerificationService.all(url,
        errorMessage => this.setState({ errorMessage }),
        data => this.setState({ data }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { loading } = this.state;
    const { file, type } = this.props;
    const self = this;
    return (
      <>
        {
          type ? (<Card>
            <CardHeader title={file ? file.number : ""} subheader={file ? "Site verification of " + file.subject : ""}/>
            <Divider/>
            <CardContent>
              <List>
                {
                  this.state.data.map(function(item, index) {
                    return (
                      <>
                        <ListItem button={true} title={"Click here to view details"}
                                  onClick={self.view.bind(this, item)} key={index}>

                          <ListItemText primary={`Created on:${moment(item.created_at).format("Do-MMMM-YYYY")}`}
                                        secondary={"Created by :"}/>
                          <ListItemSecondaryAction>
                            <Tooltip title={"edit"}>
                              <IconButton onClick={self.edit.bind(this, item)}>
                                <EditIcon color={"primary"}/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={"Delete"}>
                              <IconButton onClick={self.delete.bind(this, item)}>
                                <DeleteIcon color={"secondary"}/>
                              </IconButton>
                            </Tooltip>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
                      </>
                    );
                  })
                }
              </List>

            </CardContent>
            <ConfirmDialog onCancel={e => this.setState({ openConfirm: false })} open={this.state.openConfirm}
                           onConfirm={this.deleteConfirm.bind(this)}/>

            <SiteVerificationDetailDialog open={this.state.view} onClose={e => this.setState({ view: false })}
                                          file={file} verification={this.state.selectedVerification}/>
            <SiteVerificationEditDialog type={type} verification={this.state.selectedVerification}
                                        open={this.state.edit} onClose={this.updateVerification}
                                        file={file}/>
            <SubmitDialog open={this.state.submit} text={this.state.submitMessage} title={this.state.submitTitle}/>
            <OfficeSnackbar variant={"error"} open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}
                            onClose={e => this.setState({ errorMessage: "" })}/>
            <OfficeSnackbar variant={"success"} open={Boolean(this.state.successMessage)}
                            message={this.state.successMessage}
                            onClose={e => this.setState({ successMessage: "" })}/>
          </Card>) : <Typography variant={"h6"}>No site verification is needed</Typography>
        }
      </>
    );

  }
}

FileSiteVerifications.propTypes = {
  type: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired
};

export default FileSiteVerifications;