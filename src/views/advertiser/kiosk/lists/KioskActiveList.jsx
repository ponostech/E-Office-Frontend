import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import { KioskService } from "../../../../services/KioskService";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import KioskApplicationDialog from "../../../common/KioskApplicationDialog";
import LoadingView from "../../../common/LoadingView";

class KioskActiveList extends Component {
  kioskService = new KioskService();

  state = {
    kiosk: null,
    kiosks: [],
    openDetail: false,
    openApply: false,
    errorMessage: "",
    loading: true
  };

  componentDidMount() {
    document.title = "e-AMC | List of kiosk application";
    const { doLoad, doLoadFinish } = this.props;
    doLoad();
    this.kioskService.fetchAdvertiserKiosk(
      errorMessage => this.setState({ errorMessage }),
      kiosks => this.setState({ kiosks }))
      .finally(() => {
        this.setState({ loading: false });
        doLoadFinish();
      });
  }


  render() {
    const tableColumns = [
      {
        name: "created_at",
        label: "DATE",
        options: {
          customBodyRender: (date) => {
            const d = moment(date).format("Do MMM YYY");
            return d.toString();
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
      },  {
        name: "kiosk",
        label: "PURPOSED LOCATION",
        options: {
          customBodyRender: (kiosk, tableMeta, updateValue) => {
            return (kiosk.address);
          }
        }
      }, {
        name: "kiosk",
        label: "LOCAL COUNCIL",
        options: {
          customBodyRender: (kiosk, tableMeta, updateValue) => {
            return (kiosk.local_council.name);
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
                  <EyeIcon fontSize={"small"} color={"primary"}/>
                </IconButton>
              </Tooltip>
            );

            return (viewBtn);
          }
        }
      }
    ];

    const tableOptions = {
      filterType: "dropdown",
      responsive: "scroll",
      rowsPerPage: 15,
      serverSide: false,
      selectableRows: false,
      customToolbarSelect: function(selectedRows, displayData, setSelectedRows) {
        return false;
      },
      onRowClick: function(rowData, rowMeta) {
      }
    };

    return (
      <>
        {
          this.state.loading ? <LoadingView/> :
            <Grid item sm={12} xs={12} md={12}>
              <MUIDataTable
                title={"KIOSK: List of Active Kiosk"}
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
        }
      </>
    );
  }
}

export default KioskActiveList;
