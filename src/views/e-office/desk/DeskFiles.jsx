import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import MUIDataTable from "mui-datatables";
import {Grid, Icon, IconButton} from "@material-ui/core";
import {ApiRoutes} from "../../../config/ApiRoutes";
import {FILE_DETAIL_ROUTE} from "../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../common/LoadingView";

class DeskFiles extends Component {
    doLoad = this.props.doLoad;

    state = {
        tableData: [],
        loading: true,
        error: false,
        errorMsg: '',
    };

    componentDidMount() {
        this.doLoad(true);
        this.getFiles();
    }

    getFiles = () => {
        axios.get(ApiRoutes.DESK)
            .then(res => {
                this.setState({tableData: res.data.data.files, loading: false});
                this.doLoad(false);
            })
            .catch(err => {
                this.setState({error: true, errorMsg: err, loading: false});
                this.doLoad(false);
            });
    };

    viewDetail = (id) => {
        const {history} = this.props;
        history.push(FILE_DETAIL_ROUTE(id));
    };

    render() {
        const {tableData} = this.state;

        const tableOptions = {
            filterType: "checkbox",
            rowsPerPage: 10,
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
                name: "updated_at",
                label: "RECEIVED ON",
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

        let files = <LoadingView/>;
        if (!this.state.loading) {
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
            } else {
                files = <p style={{textAlign: 'center', width: '100%', fontSize: 15}}>Something Went Wrong!</p>;
            }
        }

        return files;
    }
}

export default withRouter(DeskFiles);