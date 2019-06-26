import React, { Component } from "reactn";
import axios from "axios";
import moment from "moment";
import { EventNote } from "@material-ui/icons";
import { CardHeader, Divider, List } from "@material-ui/core";
import Timeline from "../../../../components/Timeline/Timeline.jsx";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import Loading from "../../../common/LoadingView";
import { ApiRoutes, DELETE_NOTE_DRAFT, FILE_NOTESHEET } from "../../../../config/ApiRoutes";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { ArrayToString } from "../../../../utils/ErrorUtil";
import SubmitDialog from "../../../../components/SubmitDialog";
import NoteEditDialog from "./NoteEditDialog";
import { LoginService } from "../../../../services/LoginService";
import NotesheetAttachmentDialog from "./NotesheetAttachmentDialog";

class NotesheetDraftView extends Component {
  state = {
    currentFile: null,
    note: [],
    selectedNote: null,
    attachments: [],

    openAttachments:false,
    openConfirmDelete: false,
    editNote: false,
    loadingNoteDialog: true,
    currentNoteId: null,

    successMsg: "",
    errorMsg: "",

    submit: false
  };
  this;

  componentDidMount() {
    this.setGlobal({ loading: false });
    this.getNoteSheet(this.props.file);
  }

  getNoteSheet = (file) => {
    this.setState({ currentFile: file });
    this.getData(file.id)
      .then(res => this.processResponse(res))
      .then(() => this.setGlobal({ loading: false }));
  };

  getData = (id) => axios.get(FILE_NOTESHEET(id) + "/drafts");

  processResponse = (res) => {
    if (res.data.status) this.formatNote(res.data.data.notesheet_drafts);
  };


  handleUpdate = (data) => {
    this.setState({ openEdit: false });

    if (data) {
    this.setState({ submit: true });
      axios.post(ApiRoutes.UPDATE_NOTESHEET(data.id), data)
        .then(res => {
          if (res.data.status) {
            this.getNoteSheet(this.state.currentFile);
            this.setGlobal({ successMsg: res.data.messages.join(" ") });
            this.componentDidMount()
          } else {
            this.setGlobal({ errorMsg: ArrayToString(res.data.messages) });
          }
        })
        .catch(errorMsg => this.setGlobal({ errorMsg }))
        .finally(() => this.setState({ submit: false }));
    }
  };

  onCancelDelete = () => this.setState({ openConfirmDelete: false });

  formatNote = (notes) => {
    let formattedNote = notes.map(data => {
      let temp = {};
      temp["id"] = data.id;
      temp["inverted"] = true;
      temp["badgeColor"] = "success";
      temp["badgeIcon"] = EventNote;
      temp["title"] = data.action;
      temp["titleColor"] = "success";
      temp["avatar"] = data.staff.photo ? data.staff.photo : DefaultAvatar;
      temp["body"] = data.content;
      temp["footerName"] = data.staff.staff.name;
      temp["footerDesignation"] = data.staff.staff.designation;
      temp["footerTitle"] = "Dated: " + moment(data.created_at).format("Do MMMM YYYY \(dddd\)");
      temp["note"] = data;
      return temp;
    });
    this.setState({ note: formattedNote });
  };

  edit = (note) => {
    this.setState({ selectedNote: note, openEdit: true });
  };
  openAttachment = (attachments) => {
    this.setState({attachments,openAttachments:true})
  };

  deleteNote = (id) => this.setState({ openConfirmDelete: true, currentNoteId: id });

  onConfirmDelete = () => {
    axios.delete(DELETE_NOTE_DRAFT(this.state.currentNoteId))
      .then(res => this.confirmDeleteResponse(res))
      .then(res => this.setState({ openConfirmDelete: false, currentNoteId: null }))
      .catch(err => this.setGlobal({ errorMsg: err.toString() }));
  };

  confirmDeleteResponse = (res) => {
    if (res.data.status) {
      this.getNoteSheet(this.state.currentFile);
      this.setGlobal({ successMsg: res.data.messages, loading: true });
    } else {
      this.setGlobal({ errorMsg: res.data.message });
    }
  };


  render() {
    const { openEdit, openConfirmDelete, selectedNote } = this.state;
    const { file } = this.props;
    let noteList = <Loading align="left" color="secondary"/>;

    if (!this.global.loading)
      if (this.state.note.length)
        noteList = <Timeline allowed={LoginService.getCurrentUser().id === file.current_user_id} simple stories={this.state.note} onNoteDelete={this.deleteNote} onNoteEdit={this.edit} openAttachment={this.openAttachment}
                             draft/>;
      else
        noteList = <div style={{ padding: 20 }}>Draft Note not available.</div>;

    return (
      <>
        <CardHeader title={"Draft Note for File No.: " + file.number} subheader={"Subject: " + file.subject}/>
        <List>
          <Divider component={"li"}/>
          {noteList}
        </List>
        {openEdit && <NoteEditDialog file={file} note={selectedNote} open={openEdit}
                                     onClose={this.handleUpdate}/>}
        {openConfirmDelete &&
        <ConfirmDialog onCancel={this.onCancelDelete} open={openConfirmDelete} onConfirm={this.onConfirmDelete}/>}
        <SubmitDialog open={this.state.submit} title={"Draft Update"} text={"Please wait..."}/>
        <NotesheetAttachmentDialog attachments={this.state.attachments} open={this.state.openAttachments} onClose={e=>this.setState({openAttachments:false})}/>
      </>
    );
  };
}

export default NotesheetDraftView;
