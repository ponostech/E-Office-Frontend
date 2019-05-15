import React, {Component} from "react";
import axios from 'axios';
import moment from 'moment';
import {EventNote} from "@material-ui/icons";
import {CardHeader, Divider, Icon, Tooltip, Fab} from "@material-ui/core";
import Timeline from "../../../../components/Timeline/Timeline.jsx";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import CreateNoteButton from "./NotesheetCreateButton";
import CreateNoteDialog from "./NoteCreateDialog";
import Loading from "../../../common/LoadingView"
import {FILE_NOTESHEET} from "../../../../config/ApiRoutes";
import { NotesheetService } from "../../../../services/NotesheetService";
import SubmitDialog from "../../../../components/SubmitDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";

class NotesheetView extends Component {
  noteService = new NotesheetService();

  state = {
    note: [],
    openDialog: false,
    loading: true,

    errorMessage:"",
    successMessage: "",
    submit:false,
  };

  componentDidMount() {
    axios.get(FILE_NOTESHEET(this.props.file.id))
        .then(res => {
          // console.log("note", res);
          let noteSheet = res.data;
          if (noteSheet.status) {
            this.formatNote(noteSheet.data.notesheets);
            this.setState({loading: false});
          } else {
            // console.log("Fail Notesheet: ", noteSheet);
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
  };

  handleCloseCreateNote = (data) => {
    this.setState({openDialog: false});
    if (data) {
      this.setState({ submit: true})
      this.noteService.create(data,
        errorMessage=>this.setState({errorMessage}),
        successMessage=>{
        this.setState({successMessage});
        window.location.reload();
        })
        .finally(()=>{
          this.setState({submit:false})
        })
    }else{
      //cancel or close button pressed

    }
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
          <CardHeader title={"File No.: " + this.props.file.number}
                      subheader={"Subject: " + this.props.file.subject}/>
          <Divider/>
          <br/>
          {noteList}
          {loading ? "" : <CreateNoteButton click={this.handleOpenCreateNote}/>}

          <CreateNoteDialog  file={this.props.file} open={this.state.openDialog} onClose={this.handleCloseCreateNote}/>

          <SubmitDialog open={this.state.submit} title={"Create Notesheet"} text={"Notesheet is creating ..."}/>

          <OfficeSnackbar variant={"success"} onClose={()=>this.setState({successMessage:""})} open={Boolean(this.state.successMessage)} message={this.state.successMessage}/>
          <OfficeSnackbar variant={"error"} onClose={()=>this.setState({errorMessage:""})} open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}/>
          {/*<CreateNoteDialog onSubmit={this.loadingNoteDialog.bind(this, true)} loading={this.state.loadingNoteDialog}*/}
          {/*                  file={this.props.file} open={this.state.openDialog}*/}
          {/*                  close={this.handleCloseCreateNote}/>*/}
        </>
    )
  };
}

export default NotesheetView;