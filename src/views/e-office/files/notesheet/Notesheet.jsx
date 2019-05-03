import React, {Component} from "react";
import axios from 'axios';
import moment from 'moment';
import {EventNote} from "@material-ui/icons";
import Timeline from "../../../../components/Timeline/Timeline.jsx";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import CreateNoteButton from "./NotesheetCreateButton";
import CreateNoteDialog from "./NoteCreateDialog";
import {CardHeader} from "@material-ui/core";
import {FILE_NOTESHEET} from "../../../../config/ApiRoutes";

const widgetStories = [
    {
        inverted: true,
        badgeColor: "success",
        badgeIcon: EventNote,
        title: "",
        titleColor: "info",
        avatar: DefaultAvatar,
        body: (
            <>
                <p>
                    Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!
                </p>
                <p>
                    Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!
                </p>
            </>
        ),
        footerName: "Alec Thompson",
        footerDesignation: "Town Planner",
        footerTitle: (
            <div>
                Dated: 3rd February, 2019 (Tuesday)
            </div>
        )
    },
];

class Notesheets extends Component {
    state = {
        note: [],
        openDialog: false
    };

    componentDidMount() {
        axios.get(FILE_NOTESHEET(this.props.file.id))
            .then(res => {
                console.log('Note:', res.data);
                let noteSheet = res.data;
                if(noteSheet.status) {
                    this.formatNote(noteSheet.data.notesheets);
                } else {
                    console.log("Fail: ", noteSheet)
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
        console.log('format:', formattedNote);
    };

    handleOpenCreateNote = () => {
        this.setState({openDialog: true});
    };

    handleCloseCreateNote = () => {
        this.setState({openDialog: false});
    };

    render() {
        return (
                <>
                    <CardHeader title={"File No.: " + this.props.file.number} subheader={"Subject: " + this.props.file.subject}/>
                    <CreateNoteButton click={this.handleOpenCreateNote} />
                    <Timeline simple stories={this.state.note} />
                    <CreateNoteButton click={this.handleOpenCreateNote} />
                    <CreateNoteDialog {...this.props} open={this.state.openDialog} close={this.handleCloseCreateNote}/>
                </>
        )
    };
};

export default Notesheets;