import React from "react";

import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";

class HoardingApplications extends React.Component {
    state = {
        open: false,
        tableData: [
            [1, "M.33023/5/2019-AMC", "Matter Relating to IT Cell", "IT Cell", "John Doe", "2nd Feb, 2019", "3rd Feb, 2019"],
            [2, "Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000", "3rd Feb, 2019"],
            [3, "Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000", "3rd Feb, 2019"],
        ]
    };
    updateTable = (action, tableState) => {
        console.log('Update table');
        console.log(action);
        console.log(tableState);
        //return this.setState({tableData: tableData2})
    };
    showDetails = (rowData, rowMeta) => {
        this.setState({open:true});
    };

    render() {
        const {tableData} = this.state;

        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 8,
            serverSide: false,
            onTableChange: function(action, tableState) {
                this.updateTable(action, tableState);
            }.bind(this),
            onRowClick: function (rowData, rowMeta) {
                this.showDetails(rowData, rowMeta);
            }.bind(this),
            customSearch: function (searchQuery, currentRow, columns){
                console.log("search start");
                console.log(currentRow);
                console.log(columns);
                console.log("search end");
            },
        };

        const tableColumns = [
            {
                name: "id",
                label: "Application ID",
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
                name: "localCouncil",
                label: "Local Council",
            },
            {
                name: "date",
                label: "Date of Application",
            }
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
            </>
        );
    }
}

export default HoardingApplications;
