import React, {Component} from "reactn";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/core/styles";
import {Icon, IconButton, Grid, Tooltip} from "@material-ui/core";
import moment from "moment";
import {ADVERTISER_LIST, FILE_CALL, GET_STAFF} from '../../../../config/ApiRoutes';
import AdvertiserViewDialog from "./common/AdvertiserViewDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import {DESK, FILE_DETAIL_ROUTE} from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import {withRouter} from "react-router-dom";
import ErrorHandler from "../../../common/StatusHandler";
import CardContent from "@material-ui/core/CardContent"

const styles = {
    button: {},
    actionIcon: {}
};

class AdvertiserRejectedList extends Component {
    doLoad = this.props.doLoad;
    state = {
        advertisers: [],
        staffs: null,
        advertiser: null,
        openTakeFile: false,
        openViewDialog: false,
    };

    componentDidMount() {
        this.setGlobal({loading: true});
        this.getData();
        this.getStaffs();
    }

    getData = () => axios.get(ADVERTISER_LIST, {params: {status: 'reject'}})
        .then(res => this.processResult(res))
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setGlobal({loading: false}));

    getStaffs = () => axios.get(GET_STAFF).then(res => this.setState({staffs: res.data.data.staffs}));

    processResult = (res) => {
        if (res.data.status) this.setState({advertisers: res.data.data.advertiser_applications});
        else this.setGlobal({errorMsg: res.data.messages})
    };

    closeViewDialog = () => this.setState({openViewDialog: false});

    viewDetails = (data) => this.setState({openViewDialog: true, advertiser: data});
    viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));

    takeFile = (data) => this.setState({advertiser: data, openTakeFile: true});

    processConfirmTakeResponse = (res) => {
        if (res.data.status) this.props.history.push(DESK);
        else this.setGlobal({errorMsg: res.data.messages});
    };

    confirmTakeFile = () => axios.post(FILE_CALL(this.state.advertiser.file.id))
        .then(res => this.processConfirmTakeResponse(res))
        .catch(err => this.setGlobal({errorMsg: err.toString()}));

    render() {
        const {loading, advertiser, advertisers, openTakeFile, openViewDialog} = this.state;
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
                options: {
                    customBodyRender: (value) => value.toUpperCase(),
                }
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
                    customBodyRender: (value) => moment(value).format("Do MMMM YYYY")
                }
            },
            {
                name: "id",
                label: "ACTION",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        const {rowIndex} = tableMeta;
                        let data = advertisers[rowIndex];
                        return (
                            <div>
                                <Tooltip title="View File">
                                    <IconButton color="primary" size="medium"
                                                aria-label="View Details" onClick={this.viewFile.bind(this, data)}>
                                        <Icon fontSize="small">folder</Icon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="View Details">
                                    <IconButton color="primary" size="medium"
                                                aria-label="View Details" onClick={this.viewDetails.bind(this, data)}>
                                        <Icon fontSize="small">remove_red_eye</Icon>
                                    </IconButton>
                                </Tooltip>
                                <IconButton variant="contained" color="primary"
                                            size="medium" onClick={this.takeFile.bind(this, data)}>
                                    <Icon fontSize="small">desktop_mac</Icon>
                                </IconButton>
                            </div>
                        );
                    }
                }
            },
        ];

        return (
            <>
                {loading ?
                    <LoadingView/> : <CardContent>
                        <MUIDataTable
                            title={"ADVERTISER: List of Under Process Application"}
                            data={advertisers}
                            columns={tableColumns}
                            options={tableOptions}
                        />
                    </CardContent>}

                {openViewDialog &&
                <AdvertiserViewDialog open={openViewDialog} close={this.closeViewDialog}
                                      data={advertiser}/>}

                {openTakeFile &&
                <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                               onCancel={() => this.setState({openTakeFile: false})} open={openTakeFile}
                               onConfirm={this.confirmTakeFile}/>}

                {this.global.errorMsg && <ErrorHandler/>}
            </>
        );
    }
}

export default withRouter(withStyles(styles)(AdvertiserRejectedList));
