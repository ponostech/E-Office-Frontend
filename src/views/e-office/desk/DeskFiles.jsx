import React, {Component} from "react";
import {Chip, IconButton, InputAdornment, TextField, Tooltip} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

// import 'react-table/react-table.css'
/*Icons*/
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import SentIcon from "@material-ui/icons/Send";
import NoteIcon from "@material-ui/icons/Note";
import DraftIcon from "@material-ui/icons/Drafts";
import FileIcon from "@material-ui/icons/AttachFile";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from "@material-ui/icons/Search";
import EyeIcon from "@material-ui/icons/RemoveRedEyeSharp";

import {OfficeRoutes} from "../../../config/routes-constant/OfficeRoutes";

import ReceiptListDialog from "../receipt/ReceiptListDialog";
import DraftDialog from "../files/draft/DraftDialog";
import NotesheetDialog from "../files/notesheet/NotesheetDialog";
import MovementDialog from "../files/movements/MovementDialog";
import {withRouter} from "react-router-dom";


import MUIDataTable from "mui-datatables";
const columns = ["Name", "Title", "Location", "Age", "Salary"];

const data = [
    ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
    ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
    ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
    ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
    ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
    [
        "Blake Duncan",
        "Business Management Analyst",
        "San Diego",
        65,
        "$94,000"
    ],
    ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
    ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
    ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
    ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
    ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
    ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
    ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
    ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
    ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
    [
        "Addison Navarro",
        "Business Management Analyst",
        "New York",
        50,
        "$295,000"
    ],
    ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
    ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
    ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
    ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
    ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
    ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
    ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
    ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
    ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
    ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
    ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
    ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
    [
        "Gabby Strickland",
        "Business Process Consultant",
        "Scottsdale",
        26,
        "$45,000"
    ],
    ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]
];

const options = {
    filterType: "dropdown",
    responsive: "scroll",
    rowsPerPage: 8,
};

class DeskFiles extends Component {
    state = {
        file: undefined,
        openReceipts: false,
        openNote: false,
        openDraft: false,
        openFileMovement: false
    };

    handleReceiptSelect = (receipt) => {
        this.setState({
            openReceipts: false
        })
    };

    handleDraftCreation(draft) {
        this.setState({openDraft: false})
    }

    handleNotesheetCreation() {
        this.setState({openNote: false})
    }

    handleFileMovement(data) {
        this.setState({openFileMovement: false})
    }

    render() {
        const {history} = this.props;
        return (
            <>
                {/*<Grid item style={{marginBottom: 20}}>
                    <TextField variant={"standard"} label={"Search"} InputProps={{
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                <SearchIcon color={"action"}/>
                            </InputAdornment>
                        )
                    }}/>
                </Grid>
                <Grid item>
                    <Tooltip title={"View"}>
                        <IconButton disabled={Boolean(this.state.file)}
                                    onClick={(e) => history.push(OfficeRoutes.FILE_DETAIL)}>
                            <EyeIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Edit"}>
                        <IconButton disabled={Boolean(this.state.file)} onClick={(e) => console.log("edit file")}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                        <IconButton disabled={Boolean(this.state.file)} onClick={e => console.log("delete file")}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Forward"}>
                        <IconButton disabled={Boolean(this.state.file)}
                                    onClick={(e) => this.setState({openFileMovement: true})}>
                            <SentIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Create Notesheet"}>
                        <IconButton disabled={Boolean(this.state.file)}
                                    onClick={(e) => this.setState({openNote: true})}>
                            <NoteIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Create Draft"}>
                        <IconButton disabled={Boolean(this.state.file)}
                                    onClick={(e) => this.setState({openDraft: true})}>
                            <DraftIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Attach Receipt"}>
                        <IconButton disabled={Boolean(this.state.file)}
                                    onClick={(e) => this.setState({openReceipts: true})}>
                            <ListIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Attach Applications"}>
                        <IconButton>
                            <FileIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>*/}
                <Grid item xs={12}>
                    <MUIDataTable
                        title={"Files on my Desk"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </Grid>

                <MovementDialog open={this.state.openFileMovement} onClose={this.handleFileMovement.bind(this)}/>
                <NotesheetDialog open={this.state.openNote} onClose={this.handleNotesheetCreation.bind(this)}/>
                <DraftDialog open={this.state.openDraft} onClose={this.handleDraftCreation.bind(this)}/>
                <ReceiptListDialog open={this.state.openReceipts} onClose={this.handleReceiptSelect.bind(this)}/>
            </>
        );
    }
}

export default withRouter(DeskFiles);