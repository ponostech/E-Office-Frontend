import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { HoardingService } from "../../../services/HoardingService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import { Chip, IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import ApplicationState from "../../../utils/ApplicationState";
import HoardingApplicationDialog from "../../common/HoardingApplicationDialog";

class HoardingWithdrawnList extends Component {
  hoardingService = new HoardingService();
  state = {
    hoarding: null,
    hoardings: [],
    openDetail: false,
    errorMessage: ""
  };


  componentDidMount() {
    document.title = "e-AMC | List of hoarding application";
    const { doLoad, doLoadFinish } = this.props;
    doLoad();
    this.hoardingService.fetch(ApplicationState.APPROVED_APPLICATION,errorMessage => this.setState({ errorMessage }),
      hoardings => this.setState({ hoardings }))
      .finally(() => doLoadFinish());
  }


  render() {
    const tableColumns = [
       {
        name: "file",
        label: "FILE ID",
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
        name: "hoarding",
        label: "DETAILS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const file = this.state.hoardings[rowIndex];
            let view=(
              <>
                <ul>
                  <li><strong>LOCATION</strong> {hoarding.address}</li>
                </ul>
              </>
            );

            return (view);
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
        name: "hoarding",
        label: "ACTIONS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const file = this.state.hoardings[rowIndex];
            // switch (data.status) {
            //   case ApplicationState.NEW_APPLICATION:
            //     viewBtn=undefined
            //     break;
            //   case ApplicationState.UNDER_PROCESS_APPLICATION:
            //     break;
            //   case ApplicationState.REJECTED_APPLICATION:
            //     break;
            //   case ApplicationState.APPROVED_APPLICATION:
            //     break;
            //   default:
            //     break;
            // }
            let viewBtn = (
              <Tooltip title={"Click here to view details"}>
                <IconButton onClick={(e) => {
                  this.setState({ hoarding: file });
                  this.setState({ openDetail: true });
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
            title={"Hoarding: List of withdrawn Applications"}
            data={this.state.hoardings}
            columns={tableColumns}
            options={tableOptions}
          />
          <HoardingApplicationDialog open={Boolean(this.state.hoarding)} application={this.state.hoarding}
                                     onClose={e => this.setState({ hoarding: null })}/>
          <OfficeSnackbar open={Boolean(this.state.errorMessage)} onClose={() => this.setState({ errorMessage: "" })}
                          variant={"error"} message={this.state.errorMessage}/>
        </Grid>

      </>
    );
  }
}

export default HoardingWithdrawnList;
