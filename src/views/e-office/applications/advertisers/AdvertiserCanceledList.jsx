import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import {ApiRoutes} from "../../../../config/ApiRoutes";
import {Icon, IconButton} from "@material-ui/core";
import { AdvertiserService } from "../../../../services/AdvertiserService";
import ApplicationState from "../../../../utils/ApplicationState";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";

const styles = {
    button: {},
    actionIcon: {}
};

class AdvertiserCanceledList extends React.Component {
    state = {
        advertisers: [],

        errorMessage: ""
    };
    advertiserService=new AdvertiserService();

    componentDidMount() {
        this.props.doLoad(true);
        this.getData();
    }

    getData() {
        this.advertiserService.fetch(ApplicationState.CANCELLED_APPLICATION,
          errorMessage=>this.setState({errorMessage}),
           advertisers=>this.setState({advertisers}))
          .finally(()=>this.props.doLoad(false));
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
                        title={"ADVERTISER: List of Cancelled License"}
                        data={this.state.advertisers}
                        columns={tableColumns}
                        options={tableOptions}
                    />
                    <OfficeSnackbar variant={"error"} message={this.state.errorMessage} open={Boolean(this.state.errorMessage)} onClose={e=>this.setState({errorMessage:""})}/>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(AdvertiserCanceledList);