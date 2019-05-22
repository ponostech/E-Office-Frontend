import React, {Component} from "react";
import axios from 'axios';
import moment from 'moment';
import {EventNote} from "@material-ui/icons";
import {CardHeader, Divider, Icon, Tooltip, Fab} from "@material-ui/core";
import Timeline from "../../../../components/Timeline/Timeline.jsx";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import Loading from "../../../common/LoadingView"
import {GET_NOTE, FILE_NOTESHEET, DELETE_NOTE_DRAFT} from "../../../../config/ApiRoutes";
import CreateNoteDialog from "./NoteCreateDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import ErrorHandler, {SuccessHandler} from "../../../common/StatusHandler";

class NotesheetDraftView extends Component {
  state = {
    currentFile: null,
    note: [],
    singleNote: [],
    openDialog: false,
    openConfirmDelete: false,
    editNote: false,
    loading: true,
    loadingNoteDialog: true,
    currentNoteId: null,
    successMsg: '',
    errorMsg: '',
  };
  this;

  componentDidMount() {
    this.getNoteSheet(this.props.file.id);
  }

  getNoteSheet = (id) => {
    this.setState({currentFile: id});
    this.getData(id).then(res => this.processResponse(res)).then(res => this.setState({loading: false}));
  };

  getData = (id) => axios.get(FILE_NOTESHEET(id) + "/drafts");

  processResponse = (res) => {
    if (res.data.status) this.formatNote(res.data.data.notesheet_drafts);
  };

  handleCloseCreateNote = (data) => this.setState({openDialog: false});

  onCancelDelete = () => this.setState({openConfirmDelete: false});

  formatNote = (note) => {
    let formattedNote = note.map(data => {
      let temp = {};
      temp['id'] = data.id;
      temp['inverted'] = true;
      temp['badgeColor'] = 'success';
      temp['badgeIcon'] = EventNote;
      temp['title'] = data.action;
      temp['titleColor'] = 'success';
      temp['avatar'] = data.staff.photo ? data.staff.photo : DefaultAvatar;
      temp['body'] = data.content;
      temp['footerName'] = data.staff.staff.name;
      temp['footerDesignation'] = data.staff.staff.designation;
      temp['footerTitle'] = "Dated: " + moment(data.created_at).format("Do MMMM YYYY \(dddd\)");
      return temp;
    });
    this.setState({note: formattedNote});
  };

  deleteNote = (id) => this.setState({openConfirmDelete: true, currentNoteId: id});

  onConfirmDelete = () => {
    axios.delete(DELETE_NOTE_DRAFT(this.state.currentNoteId))
        .then(res => this.confirmDeleteResponse(res))
        .then(res => this.setState({openConfirmDelete: false, currentNoteId: null}))
        .catch(err => this.setState({errorMsg: err.toString()}))
  };

  confirmDeleteResponse = (res) => {
    if (res.data.status) {
      this.getNoteSheet(this.state.currentFile);
      this.setState({successMsg: res.data.messages, loading: true});
    } else {
      this.setState({errorMsg: res.data.message})
    }
  };

  editNote = (id) => {
    this.getSingleNote(id)
        .then(res => this.getSingleNoteResponse(res))
        .then(res => this.setState({loading: false}))
        .catch(err => this.setState({errorMsg: err.toString()}));
  };

  getSingleNote = (id) => axios.get(GET_NOTE(id));

  getSingleNoteResponse = (res) => {
    if (res.data.status) this.setState({singleNote: res.data.data.notesheet, openDialog: true, editNote: true});
    else this.setState({errorMsg: res.data.messages});
  };

  closeStatusDialog = () => this.setState({errorMsg: '', successMsg: ''});

  render() {
    const {loading, openDialog, openConfirmDelete, singleNote, editNote, successMsg, errorMsg} = this.state;
    const {file} = this.props;
    let noteList = <Loading align="left" color="secondary"/>;

    if (!loading)
      if (this.state.note.length)
        noteList = <Timeline simple stories={this.state.note} onNoteDelete={this.deleteNote} onNoteEdit={this.editNote}
                             draft/>;
      else
        noteList = <div style={{padding: 20}}>Draft Note not available.</div>;

    return (
        <>
          <CardHeader title={"Draft Note for File No.: " + file.number} subheader={"Subject: " + file.subject}/>
          <Divider/>
          <br/>
          {noteList}
          {openDialog &&
          <CreateNoteDialog file={file} note={singleNote} open={openDialog}
                            edit={editNote} onClose={this.handleCloseCreateNote}/>}
          {openConfirmDelete &&
          <ConfirmDialog onCancel={this.onCancelDelete} open={openConfirmDelete} onConfirm={this.onConfirmDelete}/>}

          {errorMsg && <ErrorHandler messages={errorMsg} open={errorMsg} onClose={this.closeStatusDialog}/>}
          {successMsg && <SuccessHandler messages={successMsg} open={successMsg} onClose={this.closeStatusDialog}/>}
        </>
    )
  };
}

export default NotesheetDraftView;
