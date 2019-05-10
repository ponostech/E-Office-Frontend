import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import { KioskService } from "../../../../services/KioskService";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import KioskApplicationDialog from "../../../common/KioskApplicationDialog";

class KioskWithdrawnList extends Component {
  kioskService = new KioskService();

  state = {
    kiosk: null,
    kiosks: [],
    openDetail: false,
    openApply: false,
    errorMessage: ""
  };

  componentDidMount() {
    document.title = "e-AMC | List of kiosk application";
    const { doLoad, doLoadFinish } = this.props;
    doLoad();
    this.kioskService.fetchAdvertiserKiosk(
      errorMessage => this.setState({ errorMessage }),
      kiosks => this.setState({ kiosks }))
      .finally(() => doLoadFinish());
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
        label: "FILE NUMBER",
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
        name: "kiosk",
        label: "DETAILS",
        options: {
          customBodyRender: (kiosk, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            let view = (
              <>
                <ul>
                  <li><strong>LOCATION</strong> {kiosk.address}</li>
                  <li><strong>LENGTH</strong> {kiosk.length}</li>
                  <li><strong>HEIGHT</strong> {kiosk.height}</li>
                  <li><strong>TYPE</strong> {kiosk.type}</li>
                </ul>
              </>
            );

            return (view);
          }
        }
      }, {
        name: "kiosk",
        label: "COLLAPSIBLE",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value ? "Yes" : "No";
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
            const { rowIndex } = tableMeta;
            const file = this.state.kiosks[rowIndex];

            let viewBtn = (
              <Tooltip title={"Click here to view details"}>
                <IconButton onClick={(e) => {
                  this.setState({ kiosk: file });
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
      responsive: "scroll",
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
            title={"KIOSK: List of Withdrawn Application"}
            data={this.state.kiosks}
            columns={tableColumns}
            options={tableOptions}
          />
          <KioskApplicationDialog open={Boolean(this.state.kiosk)} application={this.state.kiosk}
                                  onClose={e => this.setState({ kiosk: null })}/>
          <OfficeSnackbar open={Boolean(this.state.errorMessage)}
                          onClose={() => this.setState({ errorMessage: "" })}
                          variant={"error"} message={this.state.errorMessage}/>
        </Grid>

      </>
    );
  }
}

export default KioskWithdrawnList;
