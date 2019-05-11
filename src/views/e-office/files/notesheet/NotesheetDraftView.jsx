import React, {Component} from "react";
import axios from 'axios';
import moment from 'moment';
import {EventNote} from "@material-ui/icons";
import {CardHeader, Divider, Icon, Tooltip, Fab} from "@material-ui/core";
import Timeline from "../../../../components/Timeline/Timeline.jsx";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import Loading from "../../../common/LoadingView"
import {FILE_NOTESHEET} from "../../../../config/ApiRoutes";

class NotesheetDraftView extends Component {
  state = {
    note: [],
    openDialog: false,
    loading: true,
    loadingNoteDialog: true,
  };

  componentDidMount() {
    axios.get(FILE_NOTESHEET(this.props.file.id) + "/drafts")
        .then(res => {
          console.log("note", res);
          let noteSheet = res.data;
          if (noteSheet.status && noteSheet.data.notesheet_drafts.length > 0) {
            this.formatNote(noteSheet.data.notesheet_drafts);
            this.setState({loading: false});
          } else {
            console.log("Fail Notesheet: ", noteSheet);
            this.setState({loading: false});
          }
        });
  }

  formatNote = (note) => {
    let formattedNote = note.map(data => {
      let temp = {};
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

  handleOpenCreateNote = () => {
    let self = this;
    this.setState({openDialog: true});
    setTimeout(function () {
      self.loadingNoteDialog(false);
    }, 2000)
  };

  handleCloseCreateNote = () => {
    this.setState({openDialog: false, loadingNoteDialog: true});
  };

  loadingNoteDialog = (value) => {
    this.setState({loadingNoteDialog: value});
  };

  render() {
    const {loading} = this.state;
    let noteList = <Loading align="left" color="secondary"/>;

    if (!loading)
      if (this.state.note.length)
        noteList = <Timeline simple stories={this.state.note}/>;
      else
        noteList = <div style={{padding: 20}}>New File. Note not available.</div>;

    return (
        <>
          <CardHeader title={"Draft Note for File No.: " + this.props.file.number}
                      subheader={"Subject: " + this.props.file.subject}/>
          <Divider/>
          <br/>
          {noteList}
        </>
    )
  };
}

export default NotesheetDraftView;