import React, {Component} from "react";
import axios from 'axios';
import {Grid, Icon, IconButton} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {ApiRoutes, FILE_TAKE, FILE_CALL} from "../../../config/ApiRoutes";
import {DESK, FILE_DETAIL_ROUTE} from "../../../config/routes-constant/OfficeRoutes";

const currentUser = JSON.parse(localStorage.getItem('current_user'));

class FileActiveList extends Component {
    state = {
        tableData: [],
        loading: true,
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

    openAssignment = (id) => {
        this.getFile(id);
    };

    closeAssignment = () => {
        this.setState({currentFile: null, openAssignment: false});
    };

    takeFile = (id) => {
        axios.post(FILE_TAKE(id))
            .then(res => {
                window.location.replace(DESK);
            })
            .catch(err => {
            })
    };

    getFile = (id) => {
        axios.get(ApiRoutes.FILE + "/" + id)
            .then(res => {
                this.setState({file: res.data.data.files, openAssignment: true});
            })
            .catch(err => {
            })
    };

    callFile = (id) => {
        axios.post(FILE_CALL(id))
            .then(res => {
                // console.log(res.data);
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
                name: "created_at",
                label: "CREATED ON",
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
                        // console.log('Table Meta', tableMeta);

                        let file_user_id = tableMeta.rowData[0];
                        let button = '';

                        if (file_user_id === null) {
                            // In theory: he hi hman a ngai lo
                            button = <>
                                <IconButton variant="contained" color="primary" size="small"
                                            onClick={this.takeFile.bind(this, value)}>
                                    <Icon fontSize="small">desktop_mac</Icon>
                                </IconButton>
                                <IconButton variant="contained" color="secondary" size="small"
                                            onClick={this.openAssignment.bind(this, value)}>
                                    <Icon fontSize="small">send</Icon>
                                </IconButton>
                            </>;
                        } else {
                            if (file_user_id !== currentUser.id) {
                                button = <IconButton variant="contained" color="primary" size="small"
                                                     onClick={this.callFile.bind(this, value)}><Icon
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

        return files;
    }
}

export default withRouter(FileActiveList);