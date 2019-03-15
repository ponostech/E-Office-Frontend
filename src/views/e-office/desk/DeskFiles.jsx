import React, {Component} from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {Chip, IconButton, InputAdornment, TextField, Tooltip} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import SentIcon from "@material-ui/icons/Send";
import NoteIcon from "@material-ui/icons/Note";
import DraftIcon from "@material-ui/icons/Drafts";
import FileIcon from "@material-ui/icons/AttachFile";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from "@material-ui/icons/Search";
import EyeIcon from "@material-ui/icons/RemoveRedEyeSharp";
import ReactTable from "react-table";
import ReceiptListDialog from "../receipt/ReceiptListDialog";
import DraftDialog from "../files/draft/DraftDialog";
import NotesheetDialog from "../files/notesheet/NotesheetDialog";
import MovementDialog from "../files/movements/MovementDialog";
import {OfficeRoutes} from "../../../config/routes-constant/OfficeRoutes";
import {withRouter} from "react-router-dom";

const columns = [
    {
        Header: "File No",
        accessor: "id"
    },
    {
        Header: "Description",
        accessor: "date"
    },
    {
        Header: "Attachment",
        accessor: "attachment"
    },
    {
        Header: "Created By",
        accessor: "user"
    },
    {
        Header: "Action",
        accessor: "action",
        sortable: false,
        filterable: false
    }
];

class DeskFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            openReceipts: false,
            openNote: false,
            openDraft: false,
            openFileMovement: false
        }
    }

    handleReceiptSelect = (receipt) => {
        this.setState({
            openReceipts: false
        })
    };

    render() {
        const {history} = this.props;
        return (
            <>
                <GridItem style={{marginBottom:20}}>
                    <TextField variant={"standard"} label={"Search"} InputProps={{
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                <SearchIcon color={"action"}/>
                            </InputAdornment>
                        )
                    }}/>
                </GridItem>
                <GridItem>
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
                </GridItem>
                <GridItem xs={12}>
                    <ReactTable
                        data={[]}
                        columns={columns}
                        defaultPageSize={10}
                        pageSizeOptions={[1, 1, 1, 1, 1]}
                        className="-striped -highlight"
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                    <br/>
                    <Chip label={"Important"}/>
                </GridItem>

                <MovementDialog open={this.state.openFileMovement} onClose={this.handleFileMovement.bind(this)}/>
                <NotesheetDialog open={this.state.openNote} onClose={this.handleNotesheetCreation.bind(this)}/>
                <DraftDialog open={this.state.openDraft} onClose={this.handleDraftCreation.bind(this)}/>
                <ReceiptListDialog open={this.state.openReceipts} onClose={this.handleReceiptSelect.bind(this)}/>
            </>
        );
    }

    handleDraftCreation(draft) {
        this.setState({openDraft: false})
    }

    handleNotesheetCreation() {
        this.setState({openNote: false})
    }

    handleFileMovement(data) {
        this.setState({openFileMovement: false})
    }
}

export default withRouter(DeskFiles);