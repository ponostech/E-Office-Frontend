import React, {Component} from "react";
import axios from 'axios';
import {Grid, Icon, IconButton} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {ApiRoutes, FILE_CALL, FILE_TAKE} from "../../../config/ApiRoutes";
import {DESK, FILE_DETAIL_ROUTE} from "../../../config/routes-constant/OfficeRoutes";
import moment from "moment";
import FileSendDialog from "../../common/SendDialog";
import ConfirmDialog from "../../../components/ConfirmDialog";

const currentUser = JSON.parse(localStorage.getItem('current_user'));

class FileActiveList extends Component {
    state = {
        tableData: [],
        openAssignment: false,
        openCallFile: false,
        openTakeFile: false,
        id: '',
        loading: true,
        file: [],
        error: false,
    };

    componentDidMount() {
        this.props.doLoad(true);
        this.getFiles();
    }

    getFiles() {
        let config = {
            params: {status: 'active'}
        };
        axios.get(ApiRoutes.FILE, config)
            .then(res => {
                console.log(res.data);
                if (res.data.status)
                    this.setState({tableData: res.data.data.files, loading: false});
                this.props.doLoad(false);
            })
            .catch(error => {
                this.props.doLoad(false);
                this.setState({error: true, loading: false});
            });
    }

    viewDetail = (id) => {
        const {history} = this.props;
        history.push(FILE_DETAIL_ROUTE(id));
    };

    openAssignment = (data) => {
        this.setState({file: data, openAssignment: true})
    };

    takeFile = (data) => {
        this.setState({file: data, openTakeFile: true})
    };

    confirmTakeFile = () => {
        axios.post(FILE_TAKE(this.state.file.id))
            .then(res => {
                this.setState({openTakeFile: false});
                window.location.replace(DESK);
            })
    };

    callFile = (id) => {
        axios.post(FILE_CALL(id))
            .then(res => {
                if (res.data.status)
                    window.location.replace(DESK);
            })
            .catch(err => {
            })
    };

    render() {
        const {tableData} = this.state;

        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 8,
            serverSide: false,
        };

        const tableColumns = [
            {
                name: "current_user_id",
                options: {
                    display: false,
                    filter: false
                },
            },
            {
                name: "number",
                label: "FILE NUMBER",
                options: {
                    filter: false
                },
            },
            {
                name: "subject",
                label: "SUBJECT",
                options: {
                    filter: false
                },
            },
            {
                name: "desk",
                label: "FILE LOCATION",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let data = "";
                        if (value.staff)
                            data = value.staff.name + "\n(" + value.staff.designation + ")";
                        return data
                    }
                },
            },
            {
                name: "created_at",
                label: "CREATED ON",
                options: {
                    filter: false,
                    customBodyRender: (value, meta, updateValue) => {
                        return moment(value).format("Do MMMM YYYY");
                    }
                }
            },
            {
                name: "branch",
                label: "BRANCH",
                options: {
                    filter: true,
                    display: false
                }
            },
            {
                name: "id",
                label: "ACTION",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let file_user_id = tableMeta.rowData[0];
                        let {rowIndex} = tableMeta;
                        let data = this.state.tableData[rowIndex];
                        let button = '';

                        if (file_user_id === null) {
                            // In theory: he hi hman a ngai lo
                            button = <>
                                <IconButton variant="contained" color="primary" size="small"
                                            onClick={this.takeFile.bind(this, value)}>
                                    <Icon fontSize="small">desktop_mac</Icon>
                                </IconButton>
                                <IconButton variant="contained" color="secondary" size="small"
                                            onClick={this.openAssignment.bind(this, data)}>
                                    <Icon fontSize="small">send</Icon>
                                </IconButton>
                            </>;
                        } else {
                            if (file_user_id !== currentUser.id) {
                                button = <IconButton variant="contained" color="primary" size="small"
                                                     onClick={this.callFile.bind(this, data)}><Icon
                                    fontSize="small">desktop_windows</Icon></IconButton>;
                            }
                        }

                        return (
                            <>
                                <IconButton color="primary" size="small"
                                            aria-label="View Details" onClick={this.viewDetail.bind(this, value)}>
                                    <Icon fontSize="small">remove_red_eye</Icon>
                                </IconButton>
                                {button}
                            </>
                        );
                    }
                }
            },
        ];

        let files = '';

        if (!this.state.loading) {
            if (!this.state.error) {
                files = (
                    <>
                        <Grid item xs={12}>
                            <MUIDataTable title={"File: List of Active"} data={tableData} columns={tableColumns}
                                          options={tableOptions}
                            />
                        </Grid>
                    </>
                );
            } else {
                files = <p style={{textAlign: 'center', width: '100%', fontSize: 15}}>Something Went Wrong!</p>;
            }
        }

        return (
            <>
                {files}
                <FileSendDialog open={this.state.openAssignment} close={this.closeAssignment} file={this.state.file}
                                props={this.props}/>
                <ConfirmDialog primaryButtonText={"Take"} title={"Confirmation"}
                               message={"Do you want to call this file?"}
                               onCancel={() => this.setState({openTakeFile: false})} open={this.state.openTakeFile}
                               onConfirm={this.confirmTakeFile.bind(this)}/>
                <ConfirmDialog primaryButtonText={"Call File"} title={"Confirmation"}
                               message={"Do you want to call this file?"}
                               onCancel={() => this.setState({openCallFile: false})} open={this.state.openCallFile}
                               onConfirm={this.confirmCallFile.bind(this)}/>
            </>
        );
    }
}

export default withRouter(FileActiveList);