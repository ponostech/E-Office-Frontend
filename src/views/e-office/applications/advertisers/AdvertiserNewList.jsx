import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import {ApiRoutes} from "../../../../config/ApiRoutes";
import {Icon, IconButton} from "@material-ui/core";

const styles = {
    button: {},
    actionIcon: {}
};

class AdvertiserNewList extends React.Component {
    state = {
        advertisers: [],
    };

    componentDidMount() {
        this.props.doLoad(true);
        this.getData();
    }

    getData () {
        const token = localStorage.getItem("access_token");
        const config = {headers: {"Authorization": `Bearer ${token}`}};
        axios.get(ApiRoutes.ADVERTISER_LIST, config)
            .then(res => {
                this.setState({advertisers: res.data.data.advertiser_applications});
                this.props.doLoad(false);
            })
            .catch(error => {
                this.setState({error: true});
                this.props.doLoad(false);
            });
    }

    render() {
        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 15,
            serverSide: false,
        };

        const tableColumns = [
            {
                name: "action",
                label: "ACTION",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div>
                                <IconButton color="primary" size="small"
                                            aria-label="View Details">
                                    <Icon fontSize="small">remove_red_eye</Icon>
                                </IconButton>
                            </div>
                        );
                    }
                }
            },
            {
                name: "name",
                label: "APPLICANT",
            },
            {
                name: "type",
                label: "APPLICANT TYPE",
            },
            {
                name: "address",
                label: "ADDRESS",
            },
            {
                name: "created_at",
                label: "DATE OF APPLICATION",
            }
        ];

        return (
            <>
                <Grid item xs={12}>
                    <MUIDataTable
                        title={"ADVERTISER: List of New Application"}
                        data={this.state.advertisers}
                        columns={tableColumns}
                        options={tableOptions}
                    />
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(AdvertiserNewList);
