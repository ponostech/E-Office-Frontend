import React, {Component} from "react";
import axios from 'axios';
import {Grid, Icon, IconButton} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {ApiRoutes} from "../../../config/ApiRoutes";
import {FILE_DETAIL_ROUTE} from "../../../config/routes-constant/OfficeRoutes";

class FileActiveList extends Component {
    state = {
        tableData: [],
        loading: false,
        error: false,
    };

    componentDidMount() {
        this.props.doLoad(true);
        this.setState({loading:true});
        this.getFiles();
    }

    getFiles() {
        let config = {
            params: {status: 'active'}
        };
        axios.get(ApiRoutes.FILE, config)
            .then(res => {
                this.setState({tableData: res.data.data.files, loading:false});
                this.props.doLoad(false);
            })
            .catch(error => {
                this.props.doLoad(false);
                this.setState({error: true, loading:false});
            });
    }

    viewDetail = (id) => {
        const {history} = this.props;
        history.push(FILE_DETAIL_ROUTE(id));
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
            },
            {
                name: "subject",
                label: "SUBJECT",
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
                            <IconButton color="primary" size="small"
                                        aria-label="View Details" onClick={this.viewDetail.bind(this, value)}>
                                <Icon fontSize="small">remove_red_eye</Icon>
                            </IconButton>
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
                files = <p style={{textAlign:'center', width: '100%', fontSize: 15}}>Something Went Wrong!</p>;
            }
        }

        return files;
    }
}

export default withRouter(FileActiveList);