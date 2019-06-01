import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { HoardingService } from "../../../services/HoardingService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import HoardingApplicationDialog from "../../common/HoardingApplicationDialog";
import ConfirmDialog from "../../../components/ConfirmDialog";
import LoadingView from "../../common/LoadingView";

class HoardingProposedList extends Component {
  hoardingService = new HoardingService();
  state = {
    hoarding: null,
    hoardings: [],

    openDetail: false,
    openWithdraw: false,
    errorMessage: "",

    loading: true
  };


  withdraw = (e) => {
    console.log(e);
  };

  componentDidMount() {
    document.title = "e-AMC | List of hoarding application";
    const { doLoad, doLoadFinish } = this.props;
    const self = this;
    doLoad();
    this.hoardingService.fetchAdvertiserHoarding(errorMessage => this.setState({ errorMessage }),
      hoardings => this.setState({ hoardings }))
      .finally(() => {
        self.setState({ loading: false });
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
      }, {
        name: "hoarding",
        label: "PURPOSED LOCATION",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            return (hoarding.address);
          }
        }
      },{
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

            let viewBtn = (
              <>
                <Tooltip title={"Click here to view details"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openDetail: true, hoarding: file });
                  }}>
                    <EyeIcon fontSize={"small"} color={"primary"}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to withdraw application"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openWithdraw: true, hoarding: file });
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
        {
          this.state.loading ? <LoadingView/> :
            <Grid item sm={12} xs={12} md={12}>
              <MUIDataTable
                title={"Hoarding: List of applications"}
                data={this.state.hoardings}
                columns={tableColumns}
                options={tableOptions}
              />
              <HoardingApplicationDialog open={Boolean(this.state.openDetail)} application={this.state.hoarding}
                                         onClose={e => this.setState({ openDetail: false })}/>

              <ConfirmDialog message={"Do you want to withdraw application?"}
                             onCancel={() => this.setState({ openWithdraw: false })} open={this.state.openWithdraw}
                             onConfirm={this.withdraw.bind(this)}/>

              <OfficeSnackbar open={Boolean(this.state.errorMessage)}
                              onClose={() => this.setState({ errorMessage: "" })}
                              variant={"error"} message={this.state.errorMessage}/>
            </Grid>
        }


      </>
    );
  }
}

export default HoardingProposedList;
