import React, {Component} from "react";
import axios from 'axios';
import {Grid, Icon, IconButton} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {ApiRoutes} from "../../../config/ApiRoutes";
import {FILE_DETAIL_ROUTE} from "../../../config/routes-constant/OfficeRoutes";

class FileInActiveList extends Component {
    state = {
        tableData: [],
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
                this.setState({tableData: res.data.data.files});
                this.props.doLoad(false);
            })
            .catch(error => {
                this.setState({error: true});
                this.props.doLoad(false);
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

        let files = <p style={{textAlign:'center', width: '100%', fontSize: 15}}>Something Went Wrong!</p>;

        if (!this.state.error) {
            files = (
                <>
                    <Grid item xs={12}>
                        <MUIDataTable title={"Desk: List of In-Active Files"} data={tableData} columns={tableColumns}
                                      options={tableOptions}
                        />
                    </Grid>
                </>
            );
        }

        return files;
    }
}

export default withRouter(FileInActiveList);