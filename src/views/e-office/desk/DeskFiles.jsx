import React, {Component} from "react";
import axios from 'axios';
import {Grid, Icon, IconButton} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {ApiRoutes} from "../../../config/ApiRoutes";

const tableOptions = {
    filterType: "checkbox",
    responsive: "scroll",
    rowsPerPage: 8,
    serverSide: false,
    onTableChange: function (action, tableState) {
        this.updateTable(action, tableState);
    }.bind(this),
};

class DeskFiles extends Component {
    state = {
        tableData: [],
        error: false,
    };

    componentDidMount() {
        this.props.doLoad();
        this.getFiles();
    }

    getFiles() {
        const token = localStorage.getItem("access_token");
        const config = {headers: {"Authorization": `Bearer ${token}`}};
        let files = null;
        axios.get(ApiRoutes.DESK, config)
            .then(res => {
                files = res.data.data;
                this.setState({tableData: files.files})
            });
    }

    updateTable = (action, tableState) => {};

    viewDetail = (id) => {
        const {history} = this.props;
        let link = "/e-office/file/" + id + "/detail";
        history.push(link);
    };

    render() {
        const {tableData} = this.state;
        const tableColumns = [
            {
                name: "id",
                label: "Action",
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
            {
                name: "number",
                label: "File No.",
            },
            {
                name: "subject",
                label: "Subject",
            },
            {
                name: "branch",
                label: "Branch",
            }
        ];

        let files = <p style={{textAlign:'center', width: '100%', fontSize: 15}}>Something Went Wrong!</p>;

        if (!this.state.error) {
            files = (
                <>
                    <Grid item xs={12}>
                        <MUIDataTable title={"Desk: List of Files"} data={tableData} columns={tableColumns}
                                      options={tableOptions}
                        />
                    </Grid>
                </>
            );
        }

        return files;
    }
}

export default withRouter(DeskFiles);