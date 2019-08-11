import React, { Component } from "reactn";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import { KioskService } from "../../../../services/KioskService";
import KioskApplicationDialog from "../../../common/KioskApplicationDialog";
import LoadingView from "../../../common/LoadingView";
import KioskViewDialog from "../../../e-office/applications/kiosk/common/KioskViewDialog";

class KioskWithdrawnList extends Component {
  kioskService = new KioskService();

  state = {
    kiosk: null,
    kiosks: [],
    openDetail: false,
    openApply: false
  };

  componentDidMount() {
    document.title = "e-AMC | List of kiosk application";
    this.setGlobal({ loading: true });
    this.kioskService.fetchAdvertiserKiosk(
      errorMsg => this.setGlobal({ errorMsg }),
      kiosks => this.setState({ kiosks }))
      .finally(() => {
        this.setGlobal({ loading: false });
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
        name: "kiosk",
        label: "FILE NUMBER",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (value.file.number);
          }
        }
      }, {
        name: "kiosk",
        label: "SUBJECT",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (value.file.subject);
          }
        }
      }, {
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
            const data = this.state.kiosks[rowIndex];

            let viewBtn = (
              <Tooltip title={"Click here to view details"}>
                <IconButton onClick={(e) => {
                  this.setState({ kiosk: data });
                }}>
                  <EyeIcon color={"primary"} fontSize={"small"}/>
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
          this.global.loading ? <LoadingView/> :
            <Grid item sm={12} xs={12} md={12}>
              <MUIDataTable
                title={"KIOSK: List of Withdrawn Application"}
                data={this.state.kiosks}
                columns={tableColumns}
                options={tableOptions}
              />
              <KioskViewDialog open={Boolean(this.state.kiosk)} data={this.state.kiosk}
                                      close={e => this.setState({ kiosk: null })}/>
            </Grid>
        }
      </>
    );
  }
}

export default KioskWithdrawnList;
