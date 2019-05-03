import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import HoardingDetailDialog from "./HoardingDetailDialog";
import ApplyHoardingDialog from "./form/ApplyHoardingDialog";
import { HoardingService } from "../../../services/HoardingService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import { Chip, IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import ApplicationState from "../../../utils/ApplicationState";
import { LoginService } from "../../../services/LoginService";

class HoardingList extends Component {
  hoardingService = new HoardingService();
  loginService = new LoginService();
  state = {
    hoarding: {},
    hoardings: [],
    openDetail: false,
    openApply: false,
    errorMessage: ""
  };


  componentDidMount() {
    document.title = "e-AMC | List of hoarding application";
    const { doLoad, doLoadFinish } = this.props;
    doLoad();
    this.hoardingService.fetchAdvertiserHoarding(errorMessage => this.setState({ errorMessage }),
      hoardings => this.setState({ hoardings }))
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
        name: "status",
        label: "STATUS",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            let color = "default";
            switch (value) {
              case ApplicationState.NEW_APPLICATION:
                color = "default";
                break;
              case ApplicationState.UNDER_PROCESS_APPLICATION:
                color = "primary";
                break;
              case ApplicationState.REJECTED_APPLICATION:
                color = "secondary";
                break;
              case ApplicationState.APPROVED_APPLICATION:
                color = "primary";
                break;
              default:
                break;
            }
            let chip = (
              <Chip label={value} title={value} color={color}/>
            );
            return chip;
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
        name: "hoarding",
        label: "ACTIONS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.hoardings[rowIndex];
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
                  this.setState({ hoarding, openDetail: true });
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
            title={"Hoarding: List of applications"}
            data={this.state.hoardings}
            columns={tableColumns}
            options={tableOptions}
          />
          <ApplyHoardingDialog open={this.state.openApply} onClose={(e) => this.setState({ openApply: false })}/>
          <HoardingDetailDialog
            hoarding={this.state.hoarding}
            open={this.state.openDetail} onClose={(e) => this.setState({ openDetail: false })}/>
          <OfficeSnackbar open={Boolean(this.state.errorMessage)} onClose={() => this.setState({ errorMessage: "" })}
                          variant={"error"} message={this.state.errorMessage}/>
        </Grid>

      </>
    );
  }
}

export default HoardingList;
