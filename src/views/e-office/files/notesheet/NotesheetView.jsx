import React, {Component} from "react";
import axios from 'axios';
import moment from 'moment';
import {EventNote} from "@material-ui/icons";
import {CardHeader, Divider} from "@material-ui/core";
import Timeline from "../../../../components/Timeline/Timeline.jsx";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import CreateNoteButton from "./NotesheetCreateButton";
import CreateNoteDialog from "./NoteCreateDialog";
import Loading from "../../../common/LoadingView"
import {FILE_NOTESHEET} from "../../../../config/ApiRoutes";
import {NotesheetService} from "../../../../services/NotesheetService";
import SubmitDialog from "../../../../components/SubmitDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import {LoginService} from "../../../../services/LoginService";
import NotesheetAttachmentDialog from "./NotesheetAttachmentDialog";

class NotesheetView extends Component {
  noteService = new NotesheetService();

  state = {
    note: [],
    openDialog: false,
    openAttachments: false,
    loading: true,
    attachments: [],


    errorMessage: "",
    successMessage: "",
    submit: false,
  };

  componentDidMount() {
    this.getData().then(res => this.processResponse(res)).then(res => this.setState({loading: false}));
  }

  getData = () => axios.get(FILE_NOTESHEET(this.props.file.id));

  processResponse = (res) => res.data.status && this.formatNote(res.data.data.notesheets);

  formatNote = (note) => {
    let formattedNote = note.map(data => {
      let temp = {};
      temp['id'] = data.id;
      temp['inverted'] = true;
      temp['badgeColor'] = data.type === 'event' ? 'warning' : 'success';
      temp['badgeIcon'] = EventNote;
      temp['title'] = data.action;
      temp['titleColor'] = 'success';
      temp['avatar'] = data.staff ? data.staff.photo : DefaultAvatar;
      temp['body'] = data.content;
      temp['footerName'] = data.staff ? data.staff.staff.name : '';
      temp['footerDesignation'] = data.staff ? data.staff.staff.designation : '';
      temp['footerTitle'] = "Dated: " + moment(data.created_at).format("Do MMMM YYYY \(dddd\)");
      temp['note'] = data;
      temp['type'] = data.type;
      return temp;
    });
    this.setState({note: formattedNote});
  };

  handleOpenCreateNote = () => this.setState({openDialog: true});
  openAttachments = (attachments) => this.setState({openAttachments: true, attachments});

  handleCloseCreateNote = (data) => {
    this.setState({openDialog: false});
    if (data) {
      this.setState({submit: true});
      this.noteService.create(data,
          errorMessage => this.setState({errorMessage}),
          successMessage => {
            this.setState({successMessage});
            window.location.reload();
          })
          .finally(() => {
            this.setState({submit: false})
          })
    }
  };

  loadingNoteDialog = (value) => this.setState({loadingNoteDialog: value});

  render() {
    const {loading} = this.state;
    let noteList = <Loading align="left"/>;

    if (!loading)
      if (this.state.note.length > 0) noteList =
          <Timeline openAttachment={this.openAttachments} simple stories={this.state.note}/>;
      else noteList = <div style={{padding: 20}}>New File. Note not available.</div>;

    let allowed = LoginService.getCurrentUser().id === this.props.file.current_user_id;
    return (
        <>
          <CardHeader title={"File No.: " + this.props.file.number}
                      subheader={"Subject: " + this.props.file.subject}/>
          <Divider/>
          <br/>
          {noteList}
          {loading ? "" : allowed ? <CreateNoteButton click={this.handleOpenCreateNote}/> : ""}

          <CreateNoteDialog file={this.props.file} open={this.state.openDialog} onClose={this.handleCloseCreateNote}/>

          <SubmitDialog open={this.state.submit} title={"Create Notesheet"} text={"Please wait ..."}/>

          <OfficeSnackbar variant={"success"} onClose={() => this.setState({successMessage: ""})}
                          open={Boolean(this.state.successMessage)} message={this.state.successMessage}/>
          <OfficeSnackbar variant={"error"} onClose={() => this.setState({errorMessage: ""})}
                          open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}/>
          <NotesheetAttachmentDialog attachments={this.state.attachments} open={this.state.openAttachments}
                                     onClose={e => this.setState({openAttachments: false})}/>

          {/*<CreateNoteDialog onSubmit={this.loadingNoteDialog.bind(this, true)} loading={this.state.loadingNoteDialog}*/}
          {/*                  file={this.props.file} open={this.state.openDialog}*/}
          {/*                  close={this.handleCloseCreateNote}/>*/}
        </>
    )
  };
}

export default NotesheetView;