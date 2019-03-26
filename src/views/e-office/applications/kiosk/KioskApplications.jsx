import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

import MUIDataTable from "mui-datatables";
import { Chip, IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEyeSharp";
import ActionIcon from "@material-ui/icons/CallToAction";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import KioskDetailDialog from "./KioskDetailDialog";
import ApplyKioskDialog from "../../form/ApplyKioskDialog";

const data = [
  {
    id: 1,
    application_no: "123",
    file_no: "File-123",
    subject: "Matter relating to",
    applicant_name: "Kimi",
    date: "12-12-2019",
    status: "active"
  },
  {
    id: 1,
    application_no: "123",
    file_no: "File-123",
    subject: "Matter relating to",
    applicant_name: "Kimi",
    date: "12-12-2019",
    status: "granted"
  },
  {
    id: 1,
    application_no: "123",
    file_no: "File-123",
    subject: "Matter relating to",
    applicant_name: "Kimi",
    date: "12-12-2019",
    status: "pending"
  }
];


class KioskApplications extends Component {
  state = {
    openDetail: false,
    openApply: false
  };


  render() {
    const { history } = this.props;
    const tableColumns = [
      {
        name: "id",
        label: "File ID",
        options: {
          filter: false,
          display: false
        }
      },
      {
        name: "application_no",
        label: "File Number",
        options: {
          filter: false
        }
      }, {
        name: "file_no",
        label: "File Number",
        options: {
          filter: false
        }
      },
      {
        name: "applicant_name",
        label: "Subject",
        options: {
          filter: false
        }
      },
      {
        name: "date",
        label: "Date"
      },
      {
        name: "status",
        label: "Status",
        options: {
          customBodyRender: (value, tableMeta, updateVal) => {
            let view = null;
            switch (value) {
              case "new":
                view = <Chip label={value} title={value} color={"primary"}/>;
                break;
              case "active":
                view = <Chip label={value} title={value} color={"primary"}/>;
                break;
              case "pending":
                view = <Chip label={value} title={value} color={"secondary"}/>;
                break;
              default:
                view = <Chip label={value} title={value} color={"inherit"}/>;
                break;
            }
            return <>
              {view}
            </>;
          }
        }
      },
      {
        name: "status",
        label: "Action",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log(value)
            let view = null;
            switch (value) {
              case "pending":
                view = <Tooltip title={"Click here to view detail"}>
                  <IconButton onClick={(e) => this.setState({ openDetail: true })}>
                    <EyeIcon color={"action"}/>
                  </IconButton>
                </Tooltip>;
                break;
              case "granted":
                view = <>
                  <Tooltip title={"Click here to download permission"}>
                    <IconButton>
                      <DownloadIcon color={"primary"}/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Click here to apply"}>
                    <IconButton onClick={(e)=>this.setState({openApply:true})}>
                      <ActionIcon color={"secondary"}/>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
              case "active":
                view=<>
                  <Tooltip title={"Click here to view details "}>
                    <IconButton onClick={e=>this.setState({openApply:true})}>
                      <EyeIcon color={"action"}/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Click here to download permission"}>
                    <IconButton>
                      <DownloadIcon color={"primary"}/>
                    </IconButton>
                  </Tooltip>
                </>
                break;
              default:
                break;
            }
            return (
              <>
                {view}
              </>
            );
          }
        }

      }
    ];

    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 8,
      serverSide: false,
      customToolbarSelect: function(selectedRows, displayData, setSelectedRows) {
        return false;
      },
      onRowClick: function(rowData, rowMeta) {
      }
    };

    return (
      <>
        <Grid item sm={12} xs={12} md={12}>
          <MUIDataTable
            title={"Kiosk : List of applications"}
            data={data}
            columns={tableColumns}
            options={tableOptions}
          />
          <ApplyKioskDialog open={this.state.openApply} onClose={(e) => this.setState({ openApply: false })}/>
          <KioskDetailDialog open={this.state.openDetail} onClose={(e) => this.setState({ openDetail: false })}/>
        </Grid>

      </>
    );
  }
}

export default withRouter(KioskApplications);
