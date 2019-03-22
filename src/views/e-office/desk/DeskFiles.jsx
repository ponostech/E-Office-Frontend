import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

import ReceiptListDialog from "../receipt/ReceiptListDialog";
import DraftDialog from "../files/draft/DraftDialog";
import NotesheetDialog from "../files/notesheet/NotesheetDialog";
import MovementDialog from "../files/movements/MovementDialog";
import {withRouter} from "react-router-dom";

import MUIDataTable from "mui-datatables";

const data = [
    [1, "M.33023/5/2019-AMC", "Matter Relating to IT Cell", "IT Cell", "John Doe", "2nd Feb, 2019", "3rd Feb, 2019"],
    [2, "Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000", "3rd Feb, 2019"],
    [3, "Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000", "3rd Feb, 2019"  ],
];


class DeskFiles extends Component {
    state = {
        file: undefined,
        openReceipts: false,
        openNote: false,
        openDraft: false,
        openFileMovement: false
    };

    handleReceiptSelect = (receipt) => {
        this.setState({openReceipts: false})
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
        const tableColumns = [
            {
                name: "id",
                label: "File ID",
                options: {
                    filter: false,
                    display: false
                }
            },
            {
                name: "fileName",
                label: "File Number",
                options: {
                    filter: false
                }
            },
            {
                name: "subject",
                label: "Subject",
                options: {
                    filter: false
                }
            },
            {
                name: 'branch',
                label: "Branch",
            },
            {
                name: "sentBy",
                label: "Sent By",
            },
            {
                name: "sentOn",
                label: "Sent On",
            },
            {
                name: "fixedDate",
                label: "Fixed Date",
            }
        ];

        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 8,
            serverSide: false,
            customToolbarSelect: function (selectedRows, displayData, setSelectedRows) {
                return false;
            },
            onRowClick: function(rowData, rowMeta) {
                console.log(rowData);
            },
        };

        return (
            <>
                <Grid item xs={12}>
                    <MUIDataTable
                        title={"Files on my Desk"}
                        data={data}
                        columns={tableColumns}
                        options={tableOptions}
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
</Grid>*/
}