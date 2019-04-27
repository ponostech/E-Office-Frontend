import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import {Chip, IconButton, Tooltip} from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import {KioskService} from "../../../../services/KioskService";
import ApplyHoardingDialog from "../../hoarding/form/ApplyHoardingDialog";
import KioskDetailDialog from "../KioskDetailDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";

class KioskLists extends Component {
    kioskService = new KioskService();

    state = {
        kiosk: {},
        kiosks: [],
        openDetail: false,
        openApply: false,
        errorMessage: ""
    };

    componentDidMount() {
        document.title = "e-AMC | List of kiosk application";
        const {doLoad, doLoadFinish} = this.props;

        doLoad();
        // const token = localStorage.getItem("access_token");
        // const config = {headers: {"Authorization": `Bearer ${token}`}};
        this.kioskService.get()
            .then(kiosks => {
                this.setState({kiosks});
            })
            .catch(err => {
                this.setState({errorMessage: err.toString()});
            })
            .finally(() => {
                doLoadFinish()
            })

        // axios.get(ApiRoutes.GET_ADVERTISER_HOARDING, config)
        //   .then(res => {
        //     console.log(res.data.data.hoarding_applications)
        //     this.setState({
        //       hoardings: res.data.data.hoarding_applications
        //     });
        //   })
        //   .catch(err => {
        //     console.error(err);
        //   })
        //   .then(()=>{
        //     doLoadFinish()
        //   })
    }


    render() {
        const tableColumns = [
            {
                name: "applicant",
                label: "APPLICANT",
                options: {
                    customBodyRender: (applicant, tableMeta, updateValue) => {
                        return (applicant.advertiser.name);
                    }
                }
            }, {
                name: "file",
                label: "FILE ID",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (value.number);
                    }
                }
            }, {
                name: "file",
                label: "SUBJECT",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (value.subject);
                    }
                }
            }, {
                name: "status",
                label: "STATUS",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let color = "default";
                        switch (value) {
                            case "new":
                                color = "default";
                                break;
                            case "rejected":
                                color = "secondary";
                                break;
                            case "granted":
                                color = "primary";

                        }
                        let chip = (
                            <Chip label={value} title={value} color={color}/>
                        );
                        return chip;
                    }
                }
            }, {
                name: "created_at",
                label: "Date",
                options: {
                    customBodyRender: (date) => {
                        const d = moment(date).format("DD/MM/YYYY");
                        return d.toString();
                    }
                }
            }, {
                name: "kiosk",
                label: "ACTIONS",
                options: {
                    customBodyRender: (kiosk, tableMeta, updateValue) => {
                        let viewBtn = (
                            <Tooltip title={"Click here to view details"}>
                                <IconButton onClick={(e) => {
                                    this.setState({kiosk, openDetail: true});
                                }}>
                                    <EyeIcon/>
                                </IconButton>
                            </Tooltip>
                        );

                        return (viewBtn);
                    }
                }
            }
        ];

        const tableOptions = {
            filterType: "checkbox",
            rowsPerPage: 15,
            serverSide: false,
            customToolbarSelect: function (selectedRows, displayData, setSelectedRows) {
                return false;
            },
            onRowClick: function (rowData, rowMeta) {
            }
        };

        return (
            <>
                <Grid item sm={12} xs={12} md={12}>
                    <MUIDataTable
                        title={"KIOSK: List of applications"}
                        data={this.state.kiosks}
                        columns={tableColumns}
                        options={tableOptions}
                    />
                    <ApplyHoardingDialog open={this.state.openApply}
                                         onClose={(e) => this.setState({openApply: false})}/>
                    <KioskDetailDialog
                        hoarding={this.state.hoarding}
                        open={this.state.openDetail} onClose={(e) => this.setState({openDetail: false})}/>
                    <OfficeSnackbar open={Boolean(this.state.errorMessage)}
                                    onClose={() => this.setState({errorMessage: ""})}
                                    variant={"error"} message={this.state.errorMessage}/>
                </Grid>

            </>
        );
    }
}

export default KioskLists;
