import React, { Component } from "reactn";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import { KioskService } from "../../../../services/KioskService";
import CheckIcon from "@material-ui/icons/CheckBox";
import KioskApplyDialog from "../KioskApplyDialog";
import { DocumentService } from "../../../../services/DocumentService";
import LoadingView from "../../../common/LoadingView";
import KioskViewDialog from "../../../e-office/applications/kiosk/common/KioskViewDialog";

class KioskAvailableList extends Component {
  kioskService = new KioskService();
  documentService = new DocumentService();
  state = {
    kiosk: null,
    kiosks: [],
    openDetail: false,
    openApply: false,

    advertiserDocuments: []
  };

  componentDidMount() {
    document.title = "e-AMC | List of Kiosk application";
    this.setGlobal({ loading: true });
    Promise.all([this.fetchKiosk(), this.fetchDocument()]).finally(() => {
      this.setGlobal({ loading: false });
    });
  }

  fetchKiosk = async () => {
    await this.kioskService.fetchAdvertiserKiosk(
      errorMsg => this.setGlobal({ errorMsg }),
      kiosks => this.setState({ kiosks })
    );
  };
  fetchDocument = async () => {
    await this.documentService.fetch(
      "advertiser",
      errorMsg => this.setGlobal({ errorMsg }),
      advertiserDocuments => this.setState({ advertiserDocuments })
    );
  };

  applyKiosk = data => {
    this.setState({ openApply: false });
    this.setState({ successMessage: "You have applied kiosk" });
  };

  render() {
    const tableColumns = [
      {
        name: "created_at",
        label: "DATE",
        options: {
          customBodyRender: date => {
            const d = moment(date).format("Do MMM YYY");
            return d.toString();
          }
        }
      },
      {
        name: "kiosk",
        label: "FILE NUMBER",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value ? value.file.number : "NA";
          }
        }
      },
      {
        name: "kiosk",
        label: "SUBJECT",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value ? value.file.subject : "NA";
          }
        }
      },
      {
        name: "kiosk",
        label: "PURPOSED LOCATION",
        options: {
          customBodyRender: (kiosk, tableMeta, updateValue) => {
            return kiosk.address;
          }
        }
      },
      {
        name: "kiosk",
        label: "LOCAL COUNCIL",
        options: {
          customBodyRender: (kiosk, tableMeta, updateValue) => {
            return kiosk.local_council.name;
          }
        }
      },
      {
        name: "kiosk",
        label: "ACTIONS",
        options: {
          customBodyRender: (kiosk, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const file = this.state.kiosks[rowIndex];

            let viewBtn = (
              <>
                <Tooltip title={"Click here to view details"}>
                  <IconButton
                    onClick={e => {
                      this.setState({ openDetail: true, kiosk: file });
                    }}
                  >
                    <EyeIcon color={"primary"} fontSize={"small"} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to apply hoarding"}>
                  <IconButton
                    onClick={e => {
                      this.setState({ openApply: true, kiosk: file });
                    }}
                  >
                    <CheckIcon fontSize={"small"} color={"primary"} />
                  </IconButton>
                </Tooltip>
              </>
            );

            return viewBtn;
          }
        }
      }
    ];

    const tableOptions = {
      filterType: "dropdown",
      rowsPerPage: 15,
      serverSide: false,
      selectableRows: false,
      responsive: "scroll",
      customToolbarSelect: function(
        selectedRows,
        displayData,
        setSelectedRows
      ) {
        return false;
      },
      onRowClick: function(rowData, rowMeta) {}
    };

    return (
      <>
        {this.global.loading ? (
          <LoadingView />
        ) : (
          <Grid item sm={12} xs={12} md={12}>
            <MUIDataTable
              title={"KIOSK: List of Available Kiosks"}
              data={this.state.kiosks}
              columns={tableColumns}
              options={tableOptions}
            />
            <KioskApplyDialog
              documents={this.state.advertiserDocuments}
              onClose={() => this.setState({ openApply: false })}
              open={this.state.openApply}
              onConfirm={this.applyKiosk.bind(this)}
              application={this.state.kiosk}
            />
            <KioskViewDialog
              open={Boolean(this.state.openDetail)}
              data={this.state.kiosk}
              close={e => this.setState({ openDetail: false, kiosk: null })}
            />
          </Grid>
        )}
      </>
    );
  }
}

export default KioskAvailableList;
