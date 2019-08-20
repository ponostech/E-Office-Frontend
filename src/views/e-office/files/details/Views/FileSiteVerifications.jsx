import React, { Component } from "reactn";
import { SiteVerificationService } from "../../../../../services/SiteVerificationService";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  Tooltip,
  Typography
} from "@material-ui/core";
import moment from "moment";
import { LoginService } from "../../../../../services/LoginService";
import LoadingView from "../../../../common/LoadingView";
import PropTypes from "prop-types";
import DetailViewRow from "../../../common/DetailViewRow";
import ApplicationService from "../../../../../services/ApplicationService";
import { getApplicationTitle } from "../../dialog/common/ApplicationResolver";
import SiteVerificationDetailDialog from "../../site-verification/SiteVerificationDetailDialog";


const SiteVerificationList = ({ siteVerifications,onSiteVerificationClick }) => {

  return (
    <>
      {
        siteVerifications.length === 0 ?
          "No site verification is created" :
          siteVerifications.map((item, i) =>
            <>
              <Typography variant={"h6"} paragraph={true}>List of Site Verification</Typography>
              <List component={"div"}>
                <DetailViewRow key={i} primary={"Site Verification"}
                               secondary={moment(item.created_at).format("Do MMM YYYY")}>
                  <IconButton onClick={event => onSiteVerificationClick(item)} href={"#"}>
                    <Icon color={"action"}>keyboard_arrow_right</Icon>
                  </IconButton>
                </DetailViewRow>
              </List>
            </>
          )
      }
    </>
  );
};

class FileSiteVerifications extends Component {
  siteVerificationService = new SiteVerificationService();
  applicationService = new ApplicationService();
  state = {
    applications: [],
    selectedApplication: null,
    siteVerifications: [],
    selectedSiteVerification:null,

    edit: false,
    openSiteVerification: false,

    openConfirm: false,
    loading: true,

    submitTitle: "",
    submitMessage: ""
  };

  componentDidMount() {
    const { type, file } = this.props;
    if (file) {
      this.applicationService.getFileApplications(file.id,
        errorMsg => this.setGlobal({ errorMsg }),
        applications => this.setState({ applications }))
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

  getSiteVerification = (selectedApplication) => {
    let type = selectedApplication.file.fileable_type;
    this.setState({ selectedApplication });
    this.siteVerificationService.getSiteVerifications(selectedApplication.id, type,
      errorMsg => this.setGlobal({ errorMsg }),
      siteVerifications => this.setState({ siteVerifications }))
      .finally(() => console.log("site verification request complete"));
  };

  onSiteVerificationClick=(selectedSiteVerification)=>{
    this.setState({selectedSiteVerification,openSiteVerification:true})
  }
  render() {
    const { loading, selectedApplication,selectedSiteVerification,openSiteVerification, siteVerifications } = this.state;
    const { file, type } = this.props;
    const self = this;
    let allowed = LoginService.getCurrentUser().id === file.current_user_id;

    return (

      <>
      <Card>
        <CardHeader title={file ? `FILE NO : ${file.number}` : ""}
                    subheader={"List of Site Verifications"}/>
        <Divider component={"div"}/>
        <CardContent>
          <Grid container={true}>
            <Grid item={true} md={6} sm={6}>
              <Typography color={"textPrimary"} variant={"h6"} paragraph={true}>List of Application</Typography>
              {
                loading ? <LoadingView/> : (<>
                  <List component={"ul"}>
                    {this.state.applications.length > 0 ?
                      this.state.applications.map(function(item, index) {
                        return (
                          <>
                            <DetailViewRow primary={getApplicationTitle(item).title}
                                           secondary={getApplicationTitle(item).subtitle}>
                              <>
                                <Tooltip title={"View Site Verification"}>
                                  <IconButton href={"#"} onClick={event => self.getSiteVerification(item)}>
                                    <Icon color={"action"}>keyboard_arrow_right</Icon>
                                  </IconButton>
                                </Tooltip>

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
                      : "Application not available"
                    }
                  </List>
                </>)}
            </Grid>
            <Grid item={true} md={6} sm={6}>
              {selectedApplication && <SiteVerificationList
                onSiteVerificationClick={this.onSiteVerificationClick}
                siteVerifications={siteVerifications}/>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
        <SiteVerificationDetailDialog onClose={e=>this.setState({openSiteVerification:false})}
                                      open={openSiteVerification}
                                      file={Boolean(selectedApplication)?selectedApplication.file:null}
                                      verification={selectedSiteVerification}/>
        </>

    );
  }
}

FileSiteVerifications.propTypes = {
  type: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired
};

export default FileSiteVerifications;
