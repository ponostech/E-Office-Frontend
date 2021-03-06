import React, { Component } from "reactn";
import axios from "axios";
import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import FileMenuLeft from "./Menu/FileMenuLeft";
import FileMenuRight from "./Menu/FileMenuRight";
import { Route, withRouter } from "react-router-dom";
import * as OfficeRoutes from "../../../../config/routes-constant/OfficeRoutes";
import {
  DESK,
  FILE_SEND
} from "../../../../config/routes-constant/OfficeRoutes";
import NoteSheetView from "../notesheet/NotesheetView";
// import DraftPermit from "../draft/DraftPermit";
// import DraftLetter from "../draft/DraftLetter";
import FileSend from "../FileSend";
import LoadingView from "../../../common/LoadingView";
import FileDetails from "./Views/FileDetails";
import FileMovements from "./Views/FileMovements";
import FileDrafts from "./Views/FileDrafts";
import FileApplicationDetails from "./Views/FileApplicationDetails";
import FileApplications from "./Views/FileApplications";
import FileSiteVerifications from "./Views/FileSiteVerifications";
import FileDraftPermits from "./Views/FileDraftPermits";
import FileDraftLicenses from "./Views/FileDraftLicenses";
import FileDraftRejects from "./Views/FileDraftRejects";
import FileDraftCancels from "./Views/FileDraftCancels";
import NoteSheetDraftView from "../notesheet/NotesheetDraftView";
import { CREATE_NAME } from "../../../../utils/FileDetailConstant";
import CreateNoteDialog from "../notesheet/NoteCreateDialog";
import SubmitDialog from "../../../../components/SubmitDialog";
import { NotesheetService } from "../../../../services/NotesheetService";
import FileDraftDialog from "../dialog/FileDraftDialog";
import FileDraftPermitDialog from "../dialog/FileDraftPermitDialog";
import FileDraftLicenseDialog from "../dialog/FileDraftLicenseDialog";
import FileDraftRejectDialog from "../dialog/FileDraftRejectDialog";
import FileDraftCancelDialog from "../dialog/FileDraftCancelDialog";
import FileSendDialog from "../../../common/SendDialog";
import {
  ApiRoutes,
  FILE_CALL,
  FILE_STATUS_UPDATE
} from "../../../../config/ApiRoutes";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { LoginService } from "../../../../services/LoginService";
import FileApproveDialog from "../dialog/FileApproveDialog";
import FileEnClosures from "./Views/FileEnclosures";
import FileRejectDialog from "../dialog/FileRejectDialog";
import FileCancelDialog from "../dialog/FileCancelDialog";
import SendBackApplicationDialog from "../dialog/SendBackApplicationDialog";
import SiteVerificationDialog from "../site-verification/SiteVerificationDialog";
import { ArrayToString } from "../../../../utils/ErrorUtil";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    zIndex: 1000
  },
  content: {
    flexGrow: 1,
    padding: "0 20px 10px",
    marginRight: "220px"
  },
  container: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  "@media print": {
    hide: {
      display: "none"
    },
    content: {
      margin: 0
    }
  }
});

class FileView extends Component {
  noteService = new NotesheetService();
  state = {
    file: [],
    menus: [],
    staffs: [],
    moduleName: null,
    openNote: false,
    openDraft: false,
    openDraftPermit: false,
    openDraftLicense: false,
    openDraftReject: false,
    openDraftCancel: false,
    openAssignment: false,
    openFileCloseDialog: false,
    openFileArchiveDialog: false,
    openFileReOpenDialog: false,
    //site verification vars
    openSiteVerification: false,
    openHoardingVerification: false,
    openKioskVerification: false,
    openShopVerification: false,
    openHotelVerification: false,
    submitNote: false,

    openTakeFile: false,
    openRejectDialog: false,
    openApproveDialog: false,
    openCancelDialog: false,
    openMessageDialog: false
  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.getData(this.props.match.params.id);
  }

  getData(id) {
    axios
      .all([this.getFileData(id), this.getStaffs()])
      .then(
        axios.spread((file, staffs) => this.processDataResponse(file, staffs))
      )
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(res => this.setGlobal({ loading: false }));
  }

  getFileData = id => axios.get(ApiRoutes.FILE_DETAIL + "/" + id);

  getStaffs = () => axios.get(ApiRoutes.GET_STAFF);

  processDataResponse = (file, staffs) => {
    if (file.data.status && staffs.data.status)
      this.setState({
        file: file.data.data.file,
        menus: file.data.data.menus,
        staffs: staffs.data.data.staffs
      });
    else this.setGlobal({ errorMsg: file.data.messages });
  };

  handleItemClick = (url, mode = null, name = null, moduleName = null) => {
    this.setState({ moduleName: moduleName });
    if (mode === "modal") this.openDialog(name, moduleName);
    else
      this.props.history.push(
        "/e-office/file/" + this.state.file.id + "/" + url
      );
  };

  openDialog = (name, moduleName) => {
    switch (name) {
      case CREATE_NAME.CREATE_NOTE:
        this.setState({ openNote: true });
        break;
      case CREATE_NAME.CREATE_DRAFT:
        this.setState({ openDraft: true });
        break;
      case CREATE_NAME.CREATE_VERIFICATION:
        this.setState({ openSiteVerification: true });
        // switch (moduleName) {
        //   case "hoarding":
        //     this.setState({ openHoardingVerification: true });
        //     break;
        //   case "kiosk":
        //     this.setState({ openKioskVerification: true });
        //     break;
        //   case "shop":
        //     this.setState({ openShopVerification: true });
        //     break;
        //   case "hotel":
        //     this.setState({ openHotelVerification: true });
        //     break;
        // }
        break;

      case "Draft Permit/License":
        this.setState({ openDraftPermit: true });
        break;
      case "Draft Reject":
        this.setState({ openDraftReject: true });
        break;
      case "Draft Cancel":
        this.setState({ openDraftCancel: true });
        break;
      case "Send":
        this.setState({ openAssignment: true });
        break;
      case "Close":
        this.setState({ openFileCloseDialog: true });
        break;
      case "Archive":
        this.setState({ openFileArchiveDialog: true });
        break;
      case "Re-Open":
        this.setState({ openFileReOpenDialog: true });
        break;
      case "Approve":
        this.setState({ openApproveDialog: true });
        break;
      case "Reject":
        this.setState({ openRejectDialog: true });
        break;
      case "Cancel":
        this.setState({ openCancelDialog: true });
        break;
      case "Send back Applicant":
        this.setState({ openMessageDialog: true });
        break;
      default:
        alert(name);
        break;
    }
    this.setState({ moduleName: moduleName });
  };

  handleCloseCreateNote = data => {
    this.setState({ openNote: false });
    if (data) {
      this.setState({ submitNote: true });
      this.noteService
        .create(
          data,
          errorMsg => this.setGlobal({ errorMsg }),
          successMsg => this.setGlobal({ successMsg })
        )
        .finally(() => {
          this.setState({ submitNote: false });
        });
    }
  };

  closeDialog = key => this.setState({ [key]: false });

  sendFile = (id, recipient_id) => {
    axios
      .post(FILE_SEND(id), { recipient_id })
      .then(res => this.processSendResponse(res))
      .catch(err => this.setGlobal({ errorMsg: err.toString() }));
  };

  processSendResponse = res => {
    if (res.data.status) this.processSendResponseSuccess();
    else this.setGlobal({ errorMsg: res.data.messages });
  };

  processSendResponseSuccess = () => {
    this.setState({ openAssignment: false });
    this.setGlobal({ successMsg: "File sent successfully" }).then(() =>
      this.props.history.push(DESK)
    );
  };

  confirmStatusChange = status => {
    switch (status) {
      case "close":
        this.confirmStatusUpdate("closed");
        break;
      case "archive":
        this.confirmStatusUpdate("archived");
        break;
      case "re-open":
        this.confirmStatusUpdate("re-open");
        break;
      default:
        alert("not match");
        break;
    }
  };

  updateStatus = status =>
    axios.post(FILE_STATUS_UPDATE(this.state.file.id), { status: status });

  confirmStatusUpdate = status => {
    this.updateStatus(status)
      .then(res => this.processStatusResponse(res, status))
      .catch(err => this.setGlobal({ errorMsg: err.toString() }));
  };

  processStatusResponse = (res, status) => {
    if (res.data.status) {
      if (status === "closed") {
        this.setState({ openFileCloseDialog: false });
        this.setGlobal({ successMsg: "File closed successfully" });
      } else if (status === "archived") {
        this.setState({ openFileArchiveDialog: false });
        this.setGlobal({ successMsg: "File archive successfully" });
      } else if (status === "re-open") {
        this.setState({ openFileReOpenDialog: false });
        this.setGlobal({ successMsg: "File re-opened successfully" });
      }
      setTimeout(() => this.props.history.push(DESK), 100);
    } else {
      this.setGlobal({ errorMsg: res.data.messages });
    }
  };

  confirmTakeFile = fileId => {
    this.setState({ openTakeFile: false });
    this.setGlobal({ loading: true });
    axios
      .post(FILE_CALL(fileId))
      .then(res => {
        if (res.data.status) {
          this.setGlobal({ successMsg: "Application is called successfully" });
          this.componentDidMount();
        } else this.setGlobal({ errorMsg: ArrayToString(res.data.messages) });
      })
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .finally(() => this.setGlobal({ loading: false }));
  };

  closeActionDialog = () => {
    this.setState({
      openSiteVerification: false,
      openApproveDialog: false,
      openCancelDialog: false,
      openRejectDialog: false
    });
  };

  render() {
    const { classes } = this.props;
    const {
      openDraft,
      openDraftPermit,
      openNote,
      file,
      submitNote,
      menus
    } = this.state;
    const {
      openAssignment,
      staffs,
      openTakeFile,
      openFileCloseDialog,
      openFileArchiveDialog,
      openFileReOpenDialog,
      openDraftLicense
    } = this.state;
    const {
      moduleName,
      openDraftReject,
      openDraftCancel,
      openSiteVerification
    } = this.state;
    const {
      openApproveDialog,
      openMessageDialog,
      openRejectDialog,
      openCancelDialog
    } = this.state;
    let contentStyle = {
      flexGrow: 1,
      padding: "0 20px 10px",
      marginRight: "220px"
    };

    let allowed = LoginService.getCurrentUser().id === file.current_user_id;
    let touch = !!file.current_user_id;
    const untouchView = (
      <Grid
        direction={"column"}
        style={{ paddingTop: 30 }}
        container={true}
        alignItems={"center"}
        justify={"center"}
        spacing={4}
      >
        <Typography variant={"h6"} paragraph={true}>
          The File is not on any Desk
        </Typography>
        <Divider />
        <Typography paragraph={true}>Choose an action?</Typography>
        <Grid item={true}>
          <Button
            onClick={event => this.setState({ openAssignment: true })}
            color={"primary"}
            size={"large"}
            variant={"outlined"}
          >
            Send File
          </Button>
        </Grid>
        <Grid item={true}>
          <Button
            onClick={event => this.setState({ openTakeFile: true })}
            color={"secondary"}
            size={"large"}
            variant={"outlined"}
          >
            Take File
          </Button>
        </Grid>
      </Grid>
    );
    const staffName = file.desk ? file.desk.staff.name : "";
    const staffDesignation = file.desk ? file.desk.staff.designation : "";
    const restrictedView = (
      <>
        <Grid
          style={{ alignSelf: "stretch" }}
          container={true}
          justify={"center"}
          alignItems={"stretch"}
        >
          <Grid item={true} alignItems={"center"}>
            <Typography
              style={{ marginTop: 30 }}
              variant={"h6"}
              paragraph={true}
              color={"textPrimary"}
            >
              File is on the desk of {staffName}({staffDesignation}){" "}
            </Typography>
          </Grid>
        </Grid>
      </>
    );
    let view = (
      <>
        <div className={classes.hide}>
          <FileMenuLeft click={this.handleItemClick} menus={menus} />
          <FileMenuRight click={this.handleItemClick} menus={menus} />
        </div>
        <main style={contentStyle}>
          <Grid item xs={12} md={12} lg={12}>
            <Route
              exact
              path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/details"}
              render={props => <FileDetails {...props} file={file} />}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/notesheets"
              }
              render={props => <NoteSheetView {...props} file={file} />}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) +
                "/view/notesheets/drafts"
              }
              render={props => <NoteSheetDraftView {...props} file={file} />}
            />
            <Route
              exact
              path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/movements"}
              render={props => <FileMovements {...props} file={file} />}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/enclosures"
              }
              render={props => <FileEnClosures {...props} file={file} />}
            />
            <Route
              exact
              path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/drafts"}
              render={props => <FileDrafts {...props} file={file} />}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) +
                "/view/application-details"
              }
              render={props => (
                <FileApplicationDetails {...props} file={file} />
              )}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/applications"
              }
              render={props => (
                <FileApplications
                  {...props}
                  file={file}
                  menus={menus}
                  url="view/applications"
                />
              )}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) +
                "/view/site-verifications"
              }
              render={props => (
                <FileSiteVerifications
                  type={moduleName}
                  {...props}
                  file={file}
                />
              )}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/draft-licenses"
              }
              render={props => <FileDraftLicenses {...props} file={file} />}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/draft-permits"
              }
              render={props => <FileDraftPermits {...props} file={file} />}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/draft-rejects"
              }
              render={props => <FileDraftRejects {...props} file={file} />}
            />
            <Route
              exact
              path={
                OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/draft-cancels"
              }
              render={props => <FileDraftCancels {...props} file={file} />}
            />
            <Route
              path={OfficeRoutes.FILE_DETAIL + "/send"}
              render={props => (
                <FileSend {...props} doLoad={this.props.doLoad} file={file} />
              )}
            />
            <Route
              path={OfficeRoutes.FILE_DETAIL}
              exact
              render={props => <NoteSheetView {...props} file={file} />}
            />
          </Grid>
        </main>
      </>
    );
    if (!touch) {
      view = untouchView;
    } else {
      if (!allowed) {
        view = restrictedView;
      }
    }
    return (
      <Grid container className={classes.container}>
        <div className={classes.root}>
          {this.global.loading ? <LoadingView /> : view}
        </div>

        {openFileCloseDialog && (
          <ConfirmDialog
            onCancel={this.closeDialog.bind(this, "openFileCloseDialog")}
            open={openFileCloseDialog}
            onConfirm={this.confirmStatusChange.bind(this, "close")}
            message="Are you sure you want to close this file?"
          />
        )}
        {openFileArchiveDialog && (
          <ConfirmDialog
            onCancel={this.closeDialog.bind(this, "openFileArchiveDialog")}
            open={openFileArchiveDialog}
            onConfirm={this.confirmStatusChange.bind(this, "archive")}
            message="Are you sure you want to archive this file?"
          />
        )}
        {openFileReOpenDialog && (
          <ConfirmDialog
            onCancel={this.closeDialog.bind(this, "openFileReOpenDialog")}
            open={openFileReOpenDialog}
            onConfirm={this.confirmStatusChange.bind(this, "re-open")}
            message="Are you sure you want to Re-Open this file?"
          />
        )}
        {openAssignment && (
          <FileSendDialog
            onSend={this.sendFile.bind(this)}
            staffs={staffs}
            open={openAssignment}
            onClose={this.closeDialog.bind(this, "openAssignment")}
            file={file}
            props={this.props}
            actionText="Send File"
          />
        )}

        {openNote && (
          <CreateNoteDialog
            file={file}
            open={openNote}
            onClose={this.handleCloseCreateNote}
          />
        )}

        {openSiteVerification && (
          <SiteVerificationDialog
            closeActionDialog={this.closeActionDialog}
            module={moduleName}
            file={file}
            open={openSiteVerification}
            onClose={this.closeDialog.bind(this, "openSiteVerification")}
          />
        )}

        {openDraft && (
          <FileDraftDialog
            module={moduleName}
            file={file}
            open={openDraft}
            onClose={this.closeDialog.bind(this, "openDraft")}
          />
        )}

        {openDraftPermit && (
          <FileDraftPermitDialog
            module={moduleName}
            file={file}
            open={openDraftPermit}
            onClose={this.closeDialog.bind(this, "openDraftPermit")}
          />
        )}
        {openDraftLicense && (
          <FileDraftLicenseDialog
            module={moduleName}
            file={file}
            open={openDraftLicense}
            onClose={this.closeDialog.bind(this, "openDraftLicense")}
          />
        )}
        {openDraftReject && (
          <FileDraftRejectDialog
            module={moduleName}
            file={file}
            open={openDraftReject}
            onClose={this.closeDialog.bind(this, "openDraftReject")}
          />
        )}
        {openRejectDialog && (
          <FileRejectDialog
            closeActionDialog={this.closeActionDialog}
            module={moduleName}
            file={file}
            open={openRejectDialog}
            createRejectDraft={() =>
              this.setState({ openRejectDialog: false, openDraftReject: true })
            }
            onClose={this.closeDialog.bind(this, "openRejectDialog")}
          />
        )}

        {openDraftCancel && (
          <FileDraftCancelDialog
            module={moduleName}
            file={file}
            open={openDraftCancel}
            onClose={this.closeDialog.bind(this, "openDraftCancel")}
          />
        )}
        {openApproveDialog && (
          <FileApproveDialog
            closeActionDialog={this.closeActionDialog}
            createDraft={() =>
              this.setState({
                openDraftPermit: true,
                openApproveDialog: false
              })
            }
            module={moduleName}
            file={file}
            open={openApproveDialog}
            onClose={this.closeDialog.bind(this, "openApproveDialog")}
          />
        )}

        {openTakeFile && (
          <ConfirmDialog
            primaryButtonText={"Confirm"}
            title={"Confirmation"}
            message={"Do you want to take this file?"}
            onCancel={() => this.setState({ openTakeFile: false })}
            open={openTakeFile}
            onConfirm={() => this.confirmTakeFile(file.id)}
          />
        )}
        {openCancelDialog && (
          <FileCancelDialog
            closeActionDialog={this.closeActionDialog}
            module={moduleName}
            file={file}
            open={openCancelDialog}
            createCancelDraft={() =>
              this.setState({ openCancelDialog: false, openDraftCancel: true })
            }
            onClose={this.closeDialog.bind(this, "openCancelDialog")}
          />
        )}
        {submitNote && (
          <SubmitDialog
            open={submitNote}
            title="Create Notesheet"
            text="Note is Creating ... Please wait"
          />
        )}

        {openMessageDialog && (
          <SendBackApplicationDialog
            module={moduleName}
            file={file}
            open={openMessageDialog}
            onClose={this.closeDialog.bind(this, "openMessageDialog")}
          />
        )}
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(FileView));
