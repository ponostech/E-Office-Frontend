import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import { KioskService } from "../../../../services/KioskService";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import KioskApplicationDialog from "../../../common/KioskApplicationDialog";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import LoadingView from "../../../common/LoadingView";

class KioskProposedLists extends Component {
  kioskService = new KioskService();

  state = {
    kiosk: null,
    kiosks: [],

    openDetail: false,

    errorMessage: "",
    successMessage: "",

    openWithdraw: false,
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

  withdraw = (data) => {
    this.setState({ openWithdraw: false });
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
              <>
                <Tooltip title={"Click here to view details"}>
                  <IconButton onClick={(e) => {
                    this.setState({ kiosk: file, openDetail: true });
                  }}>
                    <EyeIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to withdraw application"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openWithdraw: true, kiosk: file });
                  }}>
                    <CloseIcon color={"secondary"}/>
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
                title={"KIOSK: List of Proposed"}
                data={this.state.kiosks}
                columns={tableColumns}
                options={tableOptions}
              />
              <KioskApplicationDialog open={Boolean(this.state.openDetail)} application={this.state.kiosk}
                                      onClose={e => this.setState({ kiosk: null, openDetail: false })}/>

              <ConfirmDialog onCancel={() => this.setState({ openWithdraw: false })} open={this.state.openWithdraw}
                             onConfirm={this.withdraw.bind(this)}
                             message={"Do you want to withdraw application?"}/>

              <OfficeSnackbar open={Boolean(this.state.errorMessage)}
                              onClose={() => this.setState({ errorMessage: "" })}
                              variant={"error"} message={this.state.errorMessage}/>
              <OfficeSnackbar open={Boolean(this.state.successMessage)}
                              onClose={() => this.setState({ successMessage: "" })}
                              variant={"error"} message={this.state.successMessage}/>
            </Grid>
        }


      </>
    );
  }
}

export default KioskProposedLists;
