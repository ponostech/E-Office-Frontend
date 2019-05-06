import React, {Component} from "react";
import axios from 'axios';
import {Grid, Icon, IconButton} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {ApiRoutes, FILE_TAKE} from "../../../config/ApiRoutes";
import {FILE_DETAIL_ROUTE, DESK} from "../../../config/routes-constant/OfficeRoutes";
import FileSendDialog from '../../common/SendDialog';
import moment from "moment";
import ConfirmDialog from "../../../components/ConfirmDialog";

class FileInActiveList extends Component {
    state = {
        tableData: [],
        openAssignment: false,
        openTakeFile: false,
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
            params: {status: 'in-active'}
        };
        axios.get(ApiRoutes.FILE, config)
            .then(res => {
                this.setState({tableData: res.data.data.files, loading: false});
                this.props.doLoad(false);
            })
            .catch(error => {
                this.setState({error: true, loading: false});
                this.props.doLoad(false);
            });
    }

    viewDetail = (id) => {
        const {history} = this.props;
        history.push(FILE_DETAIL_ROUTE(id));
    };

    openAssignment = (data) => {
        this.setState({file: data, openAssignment: true})
    };

    closeAssignment = () => {
        this.setState({file: [], openAssignment: false});
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
            },
            {
                name: "id",
                label: "ACTION",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
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
            },
        ];


        let files = '';

        if (!this.state.loading) {
            if (!this.state.error) {
                files = (
                    <>
                        <Grid item xs={12}>
                            <MUIDataTable title={"File: List of New Files"} data={tableData} columns={tableColumns}
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

                <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                               onCancel={() => this.setState({ openTakeFile: false })} open={this.state.openTakeFile}
                               onConfirm={this.confirmTakeFile.bind(this)}/>
            </>
        )
    }
}

export default withRouter(FileInActiveList);