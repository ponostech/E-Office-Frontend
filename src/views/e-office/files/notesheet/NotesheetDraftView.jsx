import React, {Component} from "react";
import axios from 'axios';
import moment from 'moment';
import {EventNote} from "@material-ui/icons";
import {CardHeader, Divider, Icon, Tooltip, Fab} from "@material-ui/core";
import Timeline from "../../../../components/Timeline/Timeline.jsx";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import Loading from "../../../common/LoadingView"
import {FILE_NOTESHEET} from "../../../../config/ApiRoutes";
import CreateNoteDialog from "./NoteCreateDialog";

class NotesheetDraftView extends Component {
  state = {
    note: [],
    singleNote: null,
    openDialog: false,
    loading: true,
    loadingNoteDialog: true,
  };

  componentDidMount() {
    this.getData().then(res => this.processResponse(res)).then(res => this.setState({loading: false}));
  }

  getData = () => axios.get(FILE_NOTESHEET(this.props.file.id) + "/drafts");

  processResponse = (res) => {
    if (res.data.status && res.data.data.notesheet_drafts.length > 0) this.formatNote(res.data.data.notesheet_drafts);
  };


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

  deleteNote = (id) => {
    alert("Delete " + id)
  };

  editNote = (id) => {
    alert("Edit " + id)
  };

  render() {
    const {loading} = this.state;
    const {file} = this.props;
    let noteList = <Loading align="left" color="secondary"/>;

    if (!loading)
      if (this.state.note.length)
        noteList = <Timeline simple stories={this.state.note} onNoteDelete={this.deleteNote} onNoteEdit={this.editNote} draft/>;
      else
        noteList = <div style={{padding: 20}}>Draft Note not available.</div>;

    return (
        <>
          <CardHeader title={"Draft Note for File No.: " + file.number} subheader={"Subject: " + file.subject}/>
          <Divider/>
          <br/>
          {noteList}
          <CreateNoteDialog file={this.props.file} open={this.state.openDialog} onClose={this.handleCloseCreateNote}/>
        </>
    )
  };
}

export default NotesheetDraftView;