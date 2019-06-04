import React, { Component } from "reactn";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import { KioskService } from "../../../../services/KioskService";
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
    this.setGlobal({ loading: true });
    this.kioskService.fetchAdvertiserKiosk(
      errorMsg => this.setState({ errorMsg }),
      kiosks => this.setState({ kiosks }))
      .finally(() => {
        this.setGlobal({ loading: false });
      });
  }

  withdraw = (data) => {
    this.setState({ openWithdraw: false });
  };

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
            const file = this.state.kiosks[rowIndex];

            let viewBtn = (
              <>
                <Tooltip title={"Click here to view details"}>
                  <IconButton onClick={(e) => {
                    this.setState({ kiosk: file, openDetail: true });
                  }}>
                    <EyeIcon color={"primary"} fontSize={"small"}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to withdraw application"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openWithdraw: true, kiosk: file });
                  }}>
                    <CloseIcon fontSize={"small"} color={"secondary"}/>
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
            </Grid>
        }


      </>
    );
  }
}

export default KioskProposedLists;
