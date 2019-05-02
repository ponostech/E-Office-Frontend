import React, {Component} from "react";
import axios from 'axios';
import {Grid, Icon, IconButton} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {ApiRoutes} from "../../../config/ApiRoutes";
import {FILE_DETAIL_ROUTE} from "../../../config/routes-constant/OfficeRoutes";
import FileSendDialog from '../../common/SendDialog';

class FileInActiveList extends Component {
    state = {
        tableData: [],
        openAssignment: false,
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

    openAssignment = (id) => {
        this.getFile(id);
        console.log(this.state);
    };

    closeAssignment = () => {
        this.setState({currentFile: null, openAssignment: false});
    };

    takeFile = () => {

    };

    getFile = (id) => {
        axios.get(ApiRoutes.FILE + "/" + id)
            .then(res => {
                this.setState({file: res.data.data.files, openAssignment: true});
            })
            .catch(err => {})
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
                        return (
                            <>
                                <IconButton color="primary" size="small"
                                            aria-label="View Details" onClick={this.viewDetail.bind(this, value)}>
                                    <Icon fontSize="small">remove_red_eye</Icon>
                                </IconButton>

                                <IconButton variant="contained" color="secondary"
                                            size="small" onClick={this.openAssignment.bind(this, value)}>
                                    <Icon fontSize="small">send</Icon>
                                </IconButton>
                                <IconButton variant="contained" color="primary"
                                            size="small" onClick={this.takeFile.bind(this, 1)}>
                                    <Icon fontSize="small">drag_indicator</Icon>
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
            </>
        )
    }
}

export default withRouter(FileInActiveList);