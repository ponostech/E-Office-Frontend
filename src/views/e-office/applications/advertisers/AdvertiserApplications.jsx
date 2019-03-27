import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import { withRouter } from "react-router-dom";

import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import { Button, Icon, Tooltip } from "@material-ui/core";
import GetIcon from "@material-ui/icons/Work";
import SentIcon from "@material-ui/icons/SendRounded";
import Assignment from "../ApplicationAssignmentDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { OfficeRoutes } from "../../../../config/routes-constant/OfficeRoutes";

const staffs = [
  { value: "1", label: "Lala" },
  { value: "1", label: "Lala" },
  { value: "1", label: "Lala" },
  { value: "1", label: "Lala" },
  { value: "1", label: "Lala" },
  { value: "1", label: "Lala" },
  { value: "1", label: "Lala" }
];

class AdvertiserApplications extends Component {
  state = {
    openAssignment: false,
    openConfirm: false,
    selectedFiles: [],
    tableData: [
      {
        id: 1,
        fileNo: "FILE 123",
        subject: "Matter relating to ... ",
        applicationNo: "App-123",
        applicant: "Kimi",
        date: "12/12/2019"
      },
      {
        id: 2,
        fileNo: "FILE 34",
        subject: "Matter relating to ... ",
        applicationNo: "App-234",
        applicant: "Kimi",
        date: "12/12/2019"
      },
      {
        id: 3,
        fileNo: "FILE 545",
        subject: "Matter relating to ... ",
        applicationNo: "App-333",
        applicant: "Kimi",
        date: "12/12/2019"
      },
      {
        id: 4,
        fileNo: "FILE 24",
        subject: "Matter relating to ... ",
        applicationNo: "App-444",
        applicant: "Kimi",
        date: "12/12/2019"
      }
    ]
  };
  updateTable = (action, tableState) => {
    /*console.log('Update table');
    console.log(action);
    console.log(tableState);*/
  };
  viewDetail = (id) => {
    const { history } = this.props;
    history.push(OfficeRoutes.ADVERTISER_DETAIL);
  };

  render() {
    const { tableData } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 8,
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
        console.log(selectedRows)
        let view = (
          <div>
            <Tooltip title={"Click here to get this file's"}>
              <Button variant={"contained"} color={"primary"} onClick={(e) => this.setState({ openConfirm: true })}>
                <GetIcon fontSize={"small"}/> Get file
              </Button>
            </Tooltip>
            {" "}
            <Tooltip title={"Click here to endorse the files"}>
              <Button variant={"contained"} color={"secondary"} onClick={(e) => this.setState({ openAssignment: true })}>
                <SentIcon fontSize={"small"}/> Sent file
              </Button>
            </Tooltip>
          </div>
        );
        return view;
      }
    };

    const tableColumns = [
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <IconButton color="primary" size="small"
                            aria-label="View Details" onClick={this.viewDetail.bind(this, value)}>
                  <Icon fontSize="small">remove_red_eye</Icon>
                </IconButton>
              </>
            );
          }
        }
      },
      {
        name: "fileNo",
        label: "File No."
      },
      {
        name: "subject",
        label: "Subject"
      },
      {
        name: "applicationNo",
        label: "Application No"
      },
      {
        name: "applicant",
        label: "Applicant"
      },
      {
        name: "date",
        label: "Date"
      }

    ];

    return (
      <>
        <Grid item xs={12}>
          <MUIDataTable
            title={"Under Process: List of Advertiser Applications"}
            data={tableData}
            columns={tableColumns}
            options={tableOptions}
          />
          <Assignment open={this.state.openAssignment} close={(e) => this.setState({ openAssignment: false })}
                      data={this.state.selectedFiles} staffs={staffs}/>
          <ConfirmDialog onCancel={() => this.setState({ openConfirm: false })}
                         message={"Are you sure to get this file's"}
                         open={this.state.openConfirm}
                         onConfirm={(dat) => {
                           console.log(dat);
                           this.setState({openConfirm:false})
                         }}/>
        </Grid>
      </>
    );
  }
}

export default withRouter(AdvertiserApplications);