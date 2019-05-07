import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import {Icon, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PinDrop from "@material-ui/icons/PinDrop";
import GMapDialog from "../../../../components/GmapDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import {ShopService} from "../../../../services/ShopService";
import {FileService} from "../../../../services/FileService";
import SendDialog from "../../../common/SendDialog";

const styles = {
    button: {},
    actionIcon: {}
};
var timeout = null;

class ShopNewList extends React.Component {
    shopService = new ShopService();
    fileService = new FileService();
    state = {
        openAssignment: false,
        openDetail: false,
        openMap: false,
        openTakeFile: false,
        shops: [],
        file: null,
        takeMessage: "",
        errorMessage: "",
        lat: 93,
        lng: 98
    };

    componentWillUnmount() {
        clearTimeout(timeout)
    }

    componentDidMount() {
        const {doLoad} = this.props;
        doLoad(true);
        this.shopService.fetch()
            .then(shops => {
                this.setState({shops: shops});
            })
            .catch(err => {
                this.setState({errorMessage: err.toString()});
            })
            .finally(() => {
                doLoad(false);
            });
    }

    openAssignment = (file, event) => {
        this.setState({openAssignment: true, file});
    };

    takeFile = (file, event) => {
        this.setState({openTakeFile: true, file});
    };

    confirmTake = (e) => {
        const {file} = this.state;
        const self = this;
        this.setState({openTakeFile: false, submit: true});
        this.fileService.takeFile(file.id, errorMessage => this.setState({errorMessage}),
            takeMessage => {
                timeout = setTimeout(function (handler) {
                    self.setState({takeMessage});
                }, 2000);
            })
            .finally(() => {
                this.setState({submit: false});
            });
        this.setState({takeMessage: "You have taken the file"});
    };

    closeAssignment = () => {
        this.setState({openAssignment: false});
    };

    viewDetail = (id) => {
        this.setState({openDetail: true});
    };
    closeDetail = () => {
        this.setState({openDetail: false});
    };

    render() {
        const {classes} = this.props;
        const {shops} = this.state;
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
                        const {rowIndex} = tableMeta;
                        const data = this.state.shops[rowIndex];
                        return (
                            <div>
                                <IconButton className={classes.button} color="primary" size="small"
                                            aria-label="View Details"
                                            onClick={e => this.setState({shop: data, openDetail: true})}>
                                    <Icon fontSize="small" className={classes.actionIcon}>remove_red_eye</Icon>
                                </IconButton>
                                <IconButton variant="contained" className={classes.button} color="secondary"
                                            size="small" onClick={this.openAssignment.bind(this, data.file)}>
                                    <Icon fontSize="small" className={classes.actionIcon}>send</Icon>
                                </IconButton>
                                <IconButton variant="contained" className={classes.button} color="primary"
                                            size="small" onClick={this.takeFile.bind(this, data.file)}>
                                    <Icon fontSize="small" className={classes.actionIcon}>drag_indicator</Icon>
                                </IconButton>
                            </div>
                        );
                    }
                }
            },
            {
                name: "file",
                label: "FILE NO.",
                options: {
                    customBodyRender: (file, tableMeta, updateValue) => {
                        return (
                            file.number
                        );
                    }
                }
            }, {
                name: "file",
                label: "SUBJECT",
                options: {
                    customBodyRender: (file, tableMeta, updateValue) => {
                        return (
                            file.subject
                        );
                    }
                }
            }, {
                name: "created_at",
                label: "DATE"
            }, {
                name: "name",
                label: "SHOP NAME"
            }, {
                name: "owner",
                label: "OWNER"
            },
            {
                name: "shop",
                label: "LOCATION",
                options: {
                    customBodyRender: (shop, tableMeta, updateValue) => {
                        const {rowIndex} = tableMeta;
                        const data = this.state.shops[rowIndex];
                        const lat = Number(data.latitude);
                        const lng = Number(data.longitude);

                        let view = (
                            <Tooltip title={"Click here to view location"}>
                                <IconButton onClick={e => this.setState({openMap: true, lat: lat, lng: lng})}>
                                    <PinDrop/>
                                </IconButton>
                            </Tooltip>
                        );
                        return (
                            view
                        );
                    }
                }
            }

        ];

        return (
            <>
                <Grid item xs={12}>
                    <MUIDataTable
                        title={"SHOP LICENSE: List of New Application"}
                        data={shops}
                        columns={tableColumns}
                        options={tableOptions}
                    />
                </Grid>

                <SendDialog file={this.state.file} open={this.state.openAssignment}
                            close={e => this.setState({openAssignment: false})}/>
                <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                            onClose={() => this.setState({openMap: false})}
                            isMarkerShown={true}
                />
                <ConfirmDialog primaryButtonText={"Take"} title={"Confirmation"}
                               message={"Do you want to take this file ?"}
                               onCancel={() => this.setState({openTakeFile: false})} open={this.state.openTakeFile}
                               onConfirm={this.confirmTake.bind(this)}/>
                <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                                onClose={e => this.setState({takeMessage: ""})} open={Boolean(this.state.takeMessage)}/>
                <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                                onClose={e => this.setState({errorMessage: ""})}
                                open={Boolean(this.state.errorMessage)}/>
            </>
        );
    }
}

export default withStyles(styles)(ShopNewList);
