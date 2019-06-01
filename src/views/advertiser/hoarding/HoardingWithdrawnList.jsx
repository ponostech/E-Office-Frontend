import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { HoardingService } from "../../../services/HoardingService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import ApplicationState from "../../../utils/ApplicationState";
import HoardingApplicationDialog from "../../common/HoardingApplicationDialog";
import LoadingView from "../../common/LoadingView";

class HoardingWithdrawnList extends Component {
  hoardingService = new HoardingService();
  state = {
    hoarding: null,
    hoardings: [],
    openDetail: false,
    errorMessage: "",
    loading: true
  };


  componentDidMount() {
    document.title = "e-AMC | List of hoarding application";
    const { doLoad, doLoadFinish } = this.props;
    const self = this;
    doLoad();
    this.hoardingService.fetch(ApplicationState.APPROVED_APPLICATION, errorMessage => this.setState({ errorMessage }),
      hoardings => this.setState({ hoardings }))
      .finally(() => {
        doLoadFinish();
        self.setState({ loading: false });
      });
  }


  render() {
    const tableColumns = [
      {
        name: "created_at",
        label: "DATE",
        options: {
          customBodyRender: (date) => {
            const d = moment(date).format("Do MMM YYYY");
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
        name: "hoarding",
        label: "PURPOSED LOCATION",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            return (hoarding.address);
          }
        }
      }, {
        name: "hoarding",
        label: "LOCAL COUNCIL",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            return (hoarding.local_council.name);
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
        {
          this.state.loading ? <LoadingView/> :
            <Grid item sm={12} xs={12} md={12}>
              <MUIDataTable
                title={"Hoarding: List of withdrawn Applications"}
                data={this.state.hoardings}
                columns={tableColumns}
                options={tableOptions}
              />
              <HoardingApplicationDialog open={Boolean(this.state.hoarding)} application={this.state.hoarding}
                                         onClose={e => this.setState({ hoarding: null })}/>
              <OfficeSnackbar open={Boolean(this.state.errorMessage)}
                              onClose={() => this.setState({ errorMessage: "" })}
                              variant={"error"} message={this.state.errorMessage}/>
            </Grid>
        }


      </>
    );
  }
}

export default HoardingWithdrawnList;
