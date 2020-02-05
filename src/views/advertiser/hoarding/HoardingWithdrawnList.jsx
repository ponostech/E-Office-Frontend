import React, { Component } from "reactn";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { HoardingService } from "../../../services/HoardingService";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import ApplicationState from "../../../utils/ApplicationState";
import LoadingView from "../../common/LoadingView";
import HoardingViewDialog from "../../e-office/applications/hoarding/common/HoardingViewDialog";

class HoardingWithdrawnList extends Component {
  hoardingService = new HoardingService();
  state = {
    hoarding: null,
    hoardings: [],
    openDetail: false
  };

  componentDidMount() {
    document.title = "e-AMC | List of hoarding application";
    const self = this;
    self.setGlobal({ loading: true });
    this.hoardingService
      .fetch(
        ApplicationState.APPROVED_APPLICATION,
        errorMsg => this.setGlobal({ errorMsg }),
        hoardings => this.setState({ hoardings })
      )
      .finally(() => {
        self.setGlobal({ loading: false });
      });
  }

  render() {
    const tableColumns = [
      {
        name: "created_at",
        label: "DATE",
        options: {
          customBodyRender: date => {
            const d = moment(date).format("Do MMM YYYY");
            return d.toString();
          }
        }
      },
      {
        name: "hoarding",
        label: "FILE NUMBER",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value.file.number;
          }
        }
      },
      {
        name: "hoarding",
        label: "SUBJECT",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value.file.subject;
          }
        }
      },
      {
        name: "hoarding",
        label: "PURPOSED LOCATION",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            return hoarding.address;
          }
        }
      },
      {
        name: "hoarding",
        label: "LOCAL COUNCIL",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            return hoarding.local_council.name;
          }
        }
      },
      {
        name: "hoarding",
        label: "ACTIONS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const file = this.state.hoardings[rowIndex];

            let viewBtn = (
              <Tooltip title={"Click here to view details"}>
                <IconButton
                  onClick={e => {
                    this.setState({ hoarding: file });
                    this.setState({ openDetail: true });
                  }}
                >
                  <EyeIcon fontSize={"small"} color={"primary"} />
                </IconButton>
              </Tooltip>
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
              title={"Hoarding: List of withdrawn Applications"}
              data={this.state.hoardings}
              columns={tableColumns}
              options={tableOptions}
            />
            <HoardingViewDialog
              open={Boolean(this.state.hoarding)}
              data={this.state.hoarding}
              close={e => this.setState({ hoarding: null })}
            />
          </Grid>
        )}
      </>
    );
  }
}

export default HoardingWithdrawnList;
