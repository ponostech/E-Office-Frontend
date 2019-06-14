import React, { Component } from "reactn";
import { SiteVerificationService } from "../../../../../services/SiteVerificationService";
import { CardHeader, Divider, IconButton, List, Tooltip } from "@material-ui/core";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import SubmitDialog from "../../../../../components/SubmitDialog";
import SiteVerificationEditDialog from "../../site-verification/SiteVerificationEditDialog";
import { LoginService } from "../../../../../services/LoginService";
import LoadingView from "../../../../common/LoadingView";
import { SuccessHandler } from "../../../../common/StatusHandler";
import PropTypes from "prop-types";
import DetailViewRow from "../../../common/DetailViewRow";
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

    submitTitle: "",
    submitMessage: ""
  };

  componentDidMount() {
    const { type, file } = this.props;
    if (type) {
      let url = `files/${file.id}/site-verifications`;
      this.siteVerificationService.all(url,
        errorMsg => this.setGlobal({ errorMsg }),
        data => this.setState({ data }))
        .finally(() => this.setState({ loading: false }));
    }
  }

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
        errorMsg => this.setGlobal({ errorMsg }),
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
      errorMsg => this.setGlobal({ errorMsg }),
      successMsg => this.setGlobal({ successMsg }))
      .finally(() => this.setState({ submit: false }));
  };

  render() {
    const { loading } = this.state;
    const { file, type } = this.props;
    const self = this;
    let allowed = LoginService.getCurrentUser().id === file.current_user_id;

    return (
      <>
        <CardHeader title={file ? `FILE NO : ${file.number}` : ""}
                    subheader={file ? "Site verification of " + file.subject : ""}/>
        <Divider component={"div"}/>
        {
          loading ? <LoadingView/> : (<>

            <>
              <List component={"ul"}>
                {
                  Boolean(this.state.data) ?
                    this.state.data.map(function(item, index) {
                      return (
                        <>
                          <DetailViewRow primary={"Site verification created on"}
                                         secondary={moment(item.created_at).format("Do MMM YYYY")}>
                            <>
                              <Tooltip title={"View details"}>
                                <IconButton href={"#"} onClick={self.view.bind(this, item)}>
                                  <EyeIcon color={"primary"}/>
                                </IconButton>
                              </Tooltip>
                              {allowed &&
                              <Tooltip title={"edit"}>
                                <IconButton href={"#"} onClick={self.edit.bind(this, item)}>
                                  <EditIcon color={"primary"}/>
                                </IconButton>
                              </Tooltip>}
                              {/*{allowed && <Tooltip title={"Delete"}>*/}
                              {/*  <IconButton href={"#"} onClick={self.delete.bind(this, item)}>*/}
                              {/*    <DeleteIcon color={"secondary"}/>*/}
                              {/*  </IconButton>*/}
                              {/*</Tooltip>}*/}

                            </>
                          </DetailViewRow>

                        </>
                      );
                    })
                    : "No site verification is generated"
                }
              </List>

            </>
            <ConfirmDialog onCancel={e => this.setState({ openConfirm: false })} open={this.state.openConfirm}
                           onConfirm={this.deleteConfirm.bind(this)}/>

            <SiteVerificationDetailDialog open={this.state.view} onClose={e => this.setState({ view: false })}
                                          file={file} verification={this.state.selectedVerification}/>
            <SiteVerificationEditDialog type={type} verification={this.state.selectedVerification}
                                        open={this.state.edit} onClose={this.updateVerification}
                                        file={file}/>
            <SubmitDialog open={this.state.submit} text={this.state.submitMessage} title={this.state.submitTitle}/>

            {Boolean(this.global.successMsg) && <SuccessHandler/>}
          </>)

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
