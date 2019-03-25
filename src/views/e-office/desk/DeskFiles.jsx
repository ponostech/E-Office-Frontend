import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

import {withRouter} from "react-router-dom";

import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Icon} from "@material-ui/core";

class DeskFiles extends Component {
    state = {
        openAssignment: false,
        detailData: [],
        tableData: [
            [1, "M.33023/5/2019-AMC", "Matter Relating to IT Cell Matter Relating to IT Cell ", "IT Cell", "John Doe", "2nd Feb, 2019","2nd Feb, 2019"],
            [2, "Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
            [3, "Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
            [4, "Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
            [5, "Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
            [6, "Aiden", "Consultant", "Dallas", 55, "$200,000"],
            [7, "M.33023/5/2019-AMC", "Matter Relating to IT Cell", "IT Cell", "John Doe", "2nd Feb, 2019"],
            [8, "M.33023/5/2019-AMC", "Matter Relating to IT Cell", "IT Cell", "John Doe", "2nd Feb, 2019"],
            [9, "M.33023/5/2019-AMC", "Matter Relating to IT Cell", "IT Cell", "John Doe", "2nd Feb, 2019"],
            [10, "M.33023/5/2019-AMC", "Matter Relating to IT Cell", "IT Cell", "John Doe", "2nd Feb, 2019"],
        ],
    };
    updateTable = (action, tableState) => {
        /*console.log('Update table');
        console.log(action);
        console.log(tableState);*/
    };
    viewDetail = (id) => {
        const {history} = this.props;
        let link = "/e-office/file/"+id+"/detail";
        history.push(link);
    };

    render() {
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
                            <ButtonBase>
                                <IconButton color="primary" size="small"
                                            aria-label="View Details" onClick={this.viewDetail.bind(this, value)}>
                                    <Icon fontSize="small">remove_red_eye</Icon>
                                </IconButton>
                            </ButtonBase>
                        );
                    }
                }
            },
            {
                name: "fileNo",
                label: "File No.",
            },
            {
                name: "subject",
                label: "Subject",
            },
            {
                name: "branch",
                label: "Branch",
            },
            {
                name: 'sentBy',
                label: "Sent By",
            },
            {
                name: "sentOn",
                label: "Sent On",
            },
            {
                name: "fixedDate",
                label: "Fixed Date",
            },
        ];

        return (
            <>
                <Grid item xs={12}>
                    <MUIDataTable
                        title={"Desk: List of Files"}
                        data={tableData}
                        columns={tableColumns}
                        options={tableOptions}
                    />
                </Grid>
            </>
        );
    }
}

export default withRouter(DeskFiles);