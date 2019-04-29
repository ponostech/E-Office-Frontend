import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import {Icon} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const styles = {
    button: {},
    actionIcon: {}
};

class AdvertiserNewList extends React.Component {
    state = {
        advertisers: [],
    };

    render() {
        const {classes} = this.props;
        const {advertisers} = this.state;
        const tableOptions = {
            filterType: "checkbox",
            responsive: "scroll",
            rowsPerPage: 15,
            serverSide: false,
            onTableChange: function (action, tableState) {
                this.updateTable(action, tableState);
            }.bind(this)
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
                        const data = this.state.banners[rowIndex];
                        return (
                            <div>
                            </div>
                        );
                    }
                }
            },
            {
                name: "created_at",
                label: "DATE"
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
            },
            {
                name: "file",
                label: "SUBJECT",
                options: {
                    customBodyRender: (file, tableMeta, updateValue) => {
                        return (
                            file.subject
                        );
                    }
                }
            },
            {
                name: "name",
                label: "APPLICANT",
            },
            {
                name: "advertisement_type",
                label: "ADVERTISEMENT TYPE"
            }
        ];

        return (
            <>
                <Grid item xs={12}>
                    <MUIDataTable
                        title={"BANNER: List of New Application"}
                        data={advertisers}
                        columns={tableColumns}
                        options={tableOptions}
                    />
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(AdvertiserNewList);
