import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import {Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ConfirmDialog from "../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import {StaffService} from "../../../services/StaffService";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LoadingView from "../../common/LoadingView";

const styles = {
    button: {},
    actionIcon: {}
};

class StaffList extends React.Component {
    staffService = new StaffService();
    state = {
        openDetail: false,
        staffs: [],
        staff: {},
        errorMessage: "",
        loading: true,
    };

    componentDidMount() {
        const {doLoad} = this.props;
        doLoad(true);

        this.staffService.fetch(errorMessage => this.setState({errorMessage}), staffs => this.setState({staffs}))
            .finally(() => {
                doLoad(false);
                this.setState({loading: false})
            });
    }

    openAssignment = (id) => {
        this.setState({openAssignment: true});
    };
    takeFile = (data) => {
        this.setState({openTakeFile: true, fileDetail: data.file});
    };
    confirmTake = (e) => {
        const {fileDetail} = this.state;
        this.setState({openTakeFile: false});
        this.setState({takeMessage: "You have taken the file"});
    };
    closeAssignment = () => {
        this.setState({openAssignment: false});
    };

    viewDetail = (id) => {
        this.setState({openDetail: true});
    };
    closeDetail = () => {
        this.setState({openDetail: false});
    };

    render() {
        const {staffs, loading} = this.state;
        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 15,
            serverSide: false,
        };

        const tableColumns = [
            {
                name: "staff",
                label: "NAME",
                options: {
                    customBodyRender: (staff, tableMeta, updateValue) => {
                        return (
                            staff.name
                        );
                    }
                }
            }, {
                name: "email",
                label: "EMAIL"
            }, {
                name: "phone_no",
                label: "PHONE"
            }, {
                name: "staff",
                label: "DESIGNATION",
                options: {
                    customBodyRender: (staff, tableMeta, updateValue) => {
                        return (
                            staff.designation
                        );
                    }
                }
            },
            {
                name: "staff",
                label: "BRANCH",
                options: {
                    customBodyRender: (staff, tableMeta, updateValue) => {
                        return (
                            staff.branch
                        );
                    }
                }
            },
            {
                name: "action",
                label: "ACTION",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const {rowIndex} = tableMeta;
                        const data = this.state.staffs[rowIndex];
                        return (
                            <div>
                                <Tooltip title={"Edit staff"}>
                                    <IconButton>
                                        <EditIcon color={"action"}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={"Delete User"}>
                                    <IconButton>
                                        <DeleteIcon color={"error"}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        );
                    }
                }
            },
        ];

        return (
            <>
                {loading ? <LoadingView/> : <Grid item xs={12}>
                    <MUIDataTable
                        title={"STAFF: List of Staff"}
                        data={staffs}
                        columns={tableColumns}
                        options={tableOptions}
                    />
                </Grid>}

                <ConfirmDialog primaryButtonText={"Take"} title={"Confirmation"}
                               message={"Do you want to take this file ?"}
                               onCancel={() => this.setState({openTakeFile: false})} open={this.state.openTakeFile}
                               onConfirm={this.confirmTake.bind(this)}/>
                <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                                onClose={e => this.setState({takeMessage: ""})} open={Boolean(this.state.takeMessage)}/>
                <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                                onClose={e => this.setState({errorMessage: ""})}
                                open={Boolean(this.state.errorMessage)}/>
            </>
        );
    }
}

export default withStyles(styles)(StaffList);
