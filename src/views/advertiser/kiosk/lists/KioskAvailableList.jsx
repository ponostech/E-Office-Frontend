import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import { KioskService } from "../../../../services/KioskService";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import KioskApplicationDialog from "../../../common/KioskApplicationDialog";
import CheckIcon from "@material-ui/icons/CheckBox";
import KioskApplyDialog from "../KioskApplyDialog";
import { DocumentService } from "../../../../services/DocumentService";
import LoadingView from "../../../common/LoadingView";

class KioskAvailableList extends Component {
  kioskService = new KioskService();
  documentService = new DocumentService();
  state = {
    kiosk: null,
    kiosks: [],
    openDetail: false,
    openApply: false,

    advertiserDocuments: [],

    errorMessage: "",
    successMessage: "",

    loading: true
  };

  componentDidMount() {
    document.title = "e-AMC | List of Kiosk application";
    const { doLoad, doLoadFinish } = this.props;
    doLoad();
    Promise.all([this.fetchKiosk(), this.fetchDocument()])
      .finally(() => {
        this.setState({ loading: false });
        doLoadFinish();
      });
  }

  fetchKiosk = async () => {
    await this.kioskService.fetchAdvertiserKiosk(
      errorMessage => this.setState({ errorMessage }),
      kiosks => this.setState({ kiosks }));
  };
  fetchDocument = async () => {
    await this.documentService.fetch("advertiser",
      errorMessage => this.setState({ errorMessage }),
      advertiserDocuments => this.setState({ advertiserDocuments }))
  };

  applyKiosk = (data) => {
    this.setState({ openApply: false });
    this.setState({ successMessage: "You have applied kiosk" });
  };

  render() {
    const tableColumns = [
      {
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
        label: "DATE",
        options: {
          customBodyRender: (date) => {
            const d = moment(date).format("DD/MMM/YYYY");
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
              <>
                <Tooltip title={"Click here to view details"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openDetail: true, kiosk: file });
                  }}>
                    <EyeIcon color={"primary"} fontSize={"small"}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to apply hoarding"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openApply: true, kiosk: file });
                  }}>
                    <CheckIcon fontSize={"small"} color={"primary"}/>
                  </IconButton>
                </Tooltip>
              </>
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
      selectableRows: false,
      responsive: "scroll",
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
                title={"KIOSK: List of Available Kiosks"}
                data={this.state.kiosks}
                columns={tableColumns}
                options={tableOptions}
              />
              <KioskApplyDialog documents={this.state.advertiserDocuments}
                                onClose={() => this.setState({ openApply: false })} open={this.state.openApply}
                                onConfirm={this.applyKiosk.bind(this)} application={this.state.kiosk}/>
              <KioskApplicationDialog open={Boolean(this.state.openDetail)} application={this.state.kiosk}
                                      onClose={e => this.setState({ openDetail: false, kiosk: null })}/>
              <OfficeSnackbar open={Boolean(this.state.errorMessage)}
                              onClose={() => this.setState({ errorMessage: "" })}
                              variant={"error"} message={this.state.errorMessage}/>
            </Grid>
        }
      </>
    );
  }
}

export default KioskAvailableList;
