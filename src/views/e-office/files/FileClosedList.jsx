import React, {Component} from "reactn";
import axios from "axios";
import {CardContent, Grid, Icon, IconButton} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {ApiRoutes, FILE_TAKE} from "../../../config/ApiRoutes";
import {DESK, FILE_DETAIL_ROUTE, FILE_SEND} from "../../../config/routes-constant/OfficeRoutes";
import FileSendDialog from "../../common/SendDialog";
import moment from "moment";
import ConfirmDialog from "../../../components/ConfirmDialog";
import LoadingView from "../../common/LoadingView";

class FileNewList extends Component {
    state = {
        staffs: [],
        tableData: [],
        singleData: [],
        openAssignment: false,
        openTakeFile: false,
        successMsg: '',
    };

    componentDidMount() {
        this.setGlobal({loading: true});
        this.getData();
    }

    getData = () => {
        axios.all([this.getTableData(), this.getStaffs()])
            .then(axios.spread((tableData, staffs) => this.processDataResponse(tableData, staffs)))
            .catch(err => this.setGlobal({errorMsg: err.toString()}))
            .then(res => this.setGlobal({loading: false}))
    };

    processDataResponse = (tableData, staffs) => {
        if (tableData.data.status && staffs.data.status)
            this.setState({tableData: tableData.data.data.files, staffs: staffs.data.data.staffs});
        else this.setGlobal({errorMsg: "Data Error"})
    };

    getTableData = () => axios.get(ApiRoutes.FILE, {params: {status: 'closed'}});

    getStaffs = () => axios.get(ApiRoutes.GET_STAFF);

    sendFile = (id, recipient_id) => {
        axios.post(FILE_SEND(id), {recipient_id})
            .then(res => this.processSendResponse(res))
            .catch(err => this.setGlobal({errorMsg: err.toString()}));
    };

    processSendResponse = (res) => {
        if (res.data.status) this.processSendResponseSuccess();
        else this.setGlobal({errorMsg: res.data.messages});
    };

    processSendResponseSuccess = () => {
        this.setState({successMsg: 'File sent successfully', openAssignment: false});
        this.getTableData().then(res => this.setState({tableData: res.data.data.files}));
    };

    viewDetail = (id) => this.props.history.push(FILE_DETAIL_ROUTE(id));

    openAssignment = (data) => this.setState({singleData: data, openAssignment: true});

    closeAssignment = () => this.setState({singleData: [], openAssignment: false});

    takeFile = (data) => this.setState({singleData: data, openTakeFile: true});

    confirmTakeFile = () => axios.post(FILE_TAKE(this.state.singleData.id))
        .then(res => this.confirmTakeFileResponse(res));

    confirmTakeFileResponse = (res) => {
        if (res.data.status) {
            this.setState({successMsg: "File called successfully", openTakeFile: false});
            setTimeout(() => this.props.history.push(DESK), 2000);
        }
    };

    onStatusClose = () => this.setState({successMsg: ''});

    render() {
        const {tableData, loading, openAssignment, successMsg, openTakeFile, singleData, staffs} = this.state;

        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 8,
            serverSide: false
        };

        const tableColumns = [
            {
                name: "number",
                label: "FILE NUMBER",
                options: {
                    filter: false
                }
            },
            {
                name: "subject",
                label: "SUBJECT",
                options: {
                    filter: false
                }
            },
            {
                name: "created_at",
                label: "CREATED ON",
                options: {
                    filter: false,
                    customBodyRender: (value) => {
                        return moment(value).format("Do MMMM YYYY");
                    }
                }
            },
            {
                name: "branch",
                label: "BRANCH"
            },
            {
                name: "id",
                label: "ACTION",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        let {rowIndex} = tableMeta;
                        let data = this.state.tableData[rowIndex];
                        return (
                            <>
                                <IconButton color="primary" size="small"
                                            aria-label="View Details" onClick={this.viewDetail.bind(this, value)}>
                                    <Icon fontSize="small">remove_red_eye</Icon>
                                </IconButton>
                                <IconButton variant="contained" color="secondary"
                                            size="small" onClick={this.openAssignment.bind(this, data)}>
                                    <Icon fontSize="small">send</Icon>
                                </IconButton>
                                <IconButton variant="contained" color="primary"
                                            size="small" onClick={this.takeFile.bind(this, data)}>
                                    <Icon fontSize="small">desktop_mac</Icon>
                                </IconButton>
                            </>
                        );
                    }
                }
            }
        ];

        const files =
            <CardContent>
                <MUIDataTable title={"File: List of New Files"} data={tableData} columns={tableColumns}
                              options={tableOptions}/>
            </CardContent>;

        return (
            <>
                {loading ? <LoadingView/> : files}

                {openAssignment &&
                <FileSendDialog onSend={this.sendFile.bind(this)} staffs={staffs} open={openAssignment}
                                onClose={this.closeAssignment} file={singleData}
                                props={this.props}/>}

                {openTakeFile &&
                <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                               onCancel={() => this.setState({openTakeFile: false})} open={openTakeFile}
                               onConfirm={this.confirmTakeFile.bind(this)}/>}

            </>
        );
    }
}

export default withRouter(FileNewList);