import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import {Icon} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ButtonBase from "@material-ui/core/ButtonBase";

import HoardingDetail from "./HoardingDetailDialog";
import Assignment from "../ApplicationAssignmentDialog";

const styles = {
    button: {},
    actionIcon: {},
};

class HoardingApplications extends React.Component {
    state = {
        openAssignment: false,
        openDetail: false,
        detailData: [],
        tableData: [
            [1, "M.33023/5/2019-AMC", "Matter Relating to IT Cell", "IT Cell", "John Does", "2nd Feb, 2019"],
            [2, "Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
            [3, "Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
        ],
        staffs: [
            {value: "1", label: "Lala"},
            {value: "1", label: "Lala"},
            {value: "1", label: "Lala"},
            {value: "1", label: "Lala"},
            {value: "1", label: "Lala"},
            {value: "1", label: "Lala"},
            {value: "1", label: "Lala"},
        ],
    };
    updateTable = (action, tableState) => {
        console.log('Update table');
        console.log(action);
        console.log(tableState);
    };
    openAssignment = (id) => {
        this.setState({openAssignment: true});
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
        const {tableData} = this.state;
        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 8,
            serverSide: false,
            onTableChange: function (action, tableState) {
                this.updateTable(action, tableState);
            }.bind(this),
        };

        const tableColumns = [
            {
                name: "action",
                label: "Action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div>
                                <IconButton className={classes.button} color="primary" size="small"
                                            aria-label="View Details" onClick={this.viewDetail.bind(this, value)}>
                                    <Icon fontSize="small" className={classes.actionIcon}>remove_red_eye</Icon>
                                </IconButton>
                                <IconButton variant="contained" className={classes.button} color="secondary"
                                            size="small" onClick={this.openAssignment.bind(this, value)}>
                                    <Icon fontSize="small" className={classes.actionIcon}>send</Icon>
                                </IconButton>
                            </div>
                        );
                    }
                }
            },
            {
                name: "applicationNo",
                label: "Application No.",
            },
            {
                name: "fileNo",
                label: "File No.",
            },
            {
                name: "name",
                label: "Name of Applicant",
            },
            {
                name: 'location',
                label: "Location",
            },
            {
                name: "date",
                label: "Date of Application",
            },
        ];

        return (
            <>
                <Grid item xs={12}>
                    <MUIDataTable
                        title={"Hoarding: List of Pending Application"}
                        data={tableData}
                        columns={tableColumns}
                        options={tableOptions}
                    />
                </Grid>
                <HoardingDetail open={this.state.openDetail} close={this.closeDetail} data={this.state.detailData} props={this.props} staffs={this.state.staffs}/>
                <Assignment open={this.state.openAssignment} close={this.closeAssignment} data={this.state.detailData} props={this.props} staffs={this.state.staffs}/>
            </>
        );
    }
}

export default withStyles(styles)(HoardingApplications);
