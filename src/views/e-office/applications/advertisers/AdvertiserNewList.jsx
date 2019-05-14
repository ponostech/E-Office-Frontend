import React from "react";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import {Icon, IconButton} from "@material-ui/core";
import moment from "moment";
import {ADVERTISER_NEW_LIST} from '../../../../config/ApiRoutes';

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

    getData() {
        axios.get(ADVERTISER_NEW_LIST)
            .then(res => {
                if (res.data.status)
                    this.setState({advertisers: res.data.data.advertiser_applications});
                this.props.doLoad(false);
            })
    }

    viewDetails = (id) => {
        alert('View details: ID = '+ id)
    };

    render() {
        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 8,
            serverSide: false,
        };

        const tableColumns = [
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
                options: {
                    filter: false,
                    customBodyRender: (value) => {
                        return moment(value).format("Do MMMM YYYY");
                    }
                }
            },
            {
                name: "id",
                label: "ACTION",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value) => {
                        return (
                            <div>
                                <IconButton color="primary" size="small"
                                            aria-label="View Details" onClick={this.viewDetails.bind(this, value)}>
                                    <Icon fontSize="small">remove_red_eye</Icon>
                                </IconButton>
                            </div>
                        );
                    }
                }
            },
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
