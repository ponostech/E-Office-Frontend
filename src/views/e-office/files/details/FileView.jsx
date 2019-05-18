import React, {Component} from "react";
import axios from 'axios';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FileMenuLeft from "./Menu/FileMenuLeft";
import FileMenuRight from "./Menu/FileMenuRight";
import {Route, withRouter} from "react-router-dom";
import * as OfficeRoutes from "../../../../config/routes-constant/OfficeRoutes";
import NoteSheetView from "../notesheet/NotesheetView";
import DraftPermit from "../draft/DraftPermit";
import DraftLetter from "../draft/DraftLetter";
import FileSend from "../FileSend";
import {ApiRoutes} from '../../../../config/ApiRoutes';
import LoadingView from "../../../common/LoadingView";
import FileDetails from "./Views/FileDetails";
import FileMovements from "./Views/FileMovements";
import FileEnclosures from "./Views/FileEnclosures";
import FileDrafts from "./Views/FileDrafts";
import FileApplicationDetails from "./Views/FileApplicationDetails";
import FileSiteVerifications from "./Views/FileSiteVerifications";
import FileDraftPermits from "./Views/FileDraftPermits";
import FileDraftRejects from "./Views/FileDraftRejects";
import FileDraftCancels from "./Views/FileDraftCancels";
import NoteSheetDraftView from "../notesheet/NotesheetDraftView";
import {CREATE_NAME} from "../../../../utils/FileDetailConstant";
import CreateNoteDialog from "../notesheet/NoteCreateDialog";
import SubmitDialog from "../../../../components/SubmitDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import {NotesheetService} from "../../../../services/NotesheetService";
import FileDraftDialog from "../dialog/FileDraftDialog";
import FileDraftPermitDialog from "../dialog/FileDraftPermitDialog";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    zIndex: 1000,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginRight: '220px',
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
      display: "none",
    },
    content: {
      margin: 0,
    }
  },
});

class FileView extends Component {
  doLoad = this.props.doLoad;
  noteService = new NotesheetService();
  state = {
    file: [],
    menus: [],
    loading: true,
    openNote: false,
    openDraft: false,
    openDraftPermit: false,
    errorMessage: "",
    successMessage: "",
    submit: false
  };

  componentDidMount() {
    this.doLoad(true);
    this.getData(this.props.match.params.id);
  }

  getData(id) {
    axios.get(ApiRoutes.FILE_DETAIL + "/" + id)
        .then(res => res.data.status ? this.processResponse(res) : this.setState({errorMessage: res.data.messages}))
        .catch(err => this.setState({errorMessage: "Network Error!", loading: false}))
        .then(() => this.doLoad(false));
  }

  processResponse = (res) => this.setState({file: res.data.data.file, menus: res.data.data.menus, loading: false});

  handleItemClick = (url, mode = null, name = null) => {
    const {history} = this.props;
    if (!this.state.file.id)
      return true;
    if (mode === 'modal')
      this.openDialog(name);
    else
      history.push("/e-office/file/" + this.state.file.id + "/" + url);
  };

  openDialog = (name) => {
    switch (name) {
      case CREATE_NAME.CREATE_NOTE:
        this.setState({openNote: true});
        break;
      case CREATE_NAME.CREATE_DRAFT:
        this.setState({openDraft: true});
        break;
      case 'Draft Permit':
        this.setState({openDraftPermit: true});
        break;
      default:
        console.log(name);
        break
    }
  };

  handleCloseCreateNote = (data) => {
    this.setState({openNote: false});
    if (data) {
      this.setState({submit: true});
      this.noteService.create(data,
          errorMessage => this.setState({errorMessage}),
          successMessage => this.setState({successMessage}))
          .finally(() => {
            this.setState({submit: false})
          })
    }
  };

  closeDialog = (key) => this.setState({[key]: false});

  render() {
    const {classes} = this.props;
    const {loading, openDraft, openDraftPermit, openNote, file, submit, successMessage, errorMessage, menus} = this.state;

    const view = (
        <>
          <div className={classes.hide}>
            <FileMenuLeft click={this.handleItemClick} menus={menus}/>
            <FileMenuRight click={this.handleItemClick} menus={menus}/>
          </div>
          <main className={classes.content}>
            <Grid item xs={12} md={12} lg={12}>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/details"}
                     render={(props) => <FileDetails {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/notesheets"}
                     render={(props) => <NoteSheetView {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/notesheets/drafts"}
                     render={(props) => <NoteSheetDraftView {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/movements"}
                     render={(props) => <FileMovements {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/enclosures"}
                     render={(props) => <FileEnclosures {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/drafts"}
                     render={(props) => <FileDrafts {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/application-details"}
                     render={(props) => <FileApplicationDetails {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/site-verifications"}
                     render={(props) => <FileSiteVerifications {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/draft-licenses"}
                     render={(props) => <FileDraftPermits {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/draft-rejects"}
                     render={(props) => <FileDraftRejects {...props} file={file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(file.id) + "/view/draft-cancels"}
                     render={(props) => <FileDraftCancels {...props} file={file}/>}/>
              <Route path={OfficeRoutes.FILE_DETAIL + "/draft"}
                     render={(props) => <DraftPermit {...props} file={file}/>}/>
              <Route path={OfficeRoutes.FILE_DETAIL + "/reject"}
                     render={(props) => <DraftLetter {...props} file={file}/>}/>
              <Route path={OfficeRoutes.FILE_DETAIL + "/send"}
                     render={(props) => <FileSend {...props} doLoad={this.props.doLoad} file={file}/>}/>
              <Route path={OfficeRoutes.FILE_DETAIL} exact
                     render={(props) => <NoteSheetView {...props} file={file}/>}/>
            </Grid>
          </main>
        </>
    );
    return (
        <Grid container className={classes.container}>
          <div className={classes.root}>
            {loading ? <LoadingView/> : view}
          </div>
          <CreateNoteDialog file={file} open={openNote} onClose={this.handleCloseCreateNote}/>

          {openDraft && <FileDraftDialog file={file} open={openDraft}
                                         onClose={this.closeDialog.bind(this, 'openDraft')}/>}

          {openDraftPermit && <FileDraftPermitDialog file={file} open={openDraftPermit}
                                                     onClose={this.closeDialog.bind(this, 'openDraftPermit')}/>}

          <SubmitDialog open={submit} title="Create Notesheet" text="Notesheet is Creating ..."/>

          <OfficeSnackbar variant={"success"} onClose={() => this.setState({successMessage: ""})}
                          open={Boolean(successMessage)} message={successMessage}/>

          <OfficeSnackbar variant={"error"} onClose={() => this.setState({errorMessage: ""})}
                          open={Boolean(errorMessage)} message={errorMessage}/>
        </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(FileView));