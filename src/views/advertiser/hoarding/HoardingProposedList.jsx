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

class HoardingProposedList extends Component {
  hoardingService = new HoardingService();
  state = {
    hoarding: null,
    hoardings: [],
    openDetail: false,
    openWithdraw: false,
    errorMessage: ""
  };


  withdraw=(e)=>{
    console.log(e)
  }
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
        label: "DETAILS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const file = this.state.hoardings[rowIndex];
            let view = (
              <>
                <ul>
                  <li><strong>LOCATION</strong> {hoarding.address}</li>
                  <li><strong>LENGTH</strong> {hoarding.length}</li>
                  <li><strong>HEIGHT</strong> {hoarding.height}</li>
                </ul>
              </>
            );

            return (view);
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
            const file = this.state.hoardings[rowIndex];

            let viewBtn = (
              <>
                <Tooltip title={"Click here to view details"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openDetail: true, hoarding: file });
                  }}>
                    <EyeIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to withdraw application"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openWithdraw: true, hoarding: file });
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
            title={"Hoarding: List of applications"}
            data={this.state.hoardings}
            columns={tableColumns}
            options={tableOptions}
          />
          <HoardingApplicationDialog open={Boolean(this.state.openDetail)} application={this.state.hoarding}
                                     onClose={e => this.setState({ openDetail: false })}/>

          <ConfirmDialog message={"Do you want to withdraw application?"} onCancel={() => this.setState({ openWithdraw: false })} open={this.state.openWithdraw}
                         onConfirm={this.withdraw.bind(this)}/>

          <OfficeSnackbar open={Boolean(this.state.errorMessage)} onClose={() => this.setState({ errorMessage: "" })}
                          variant={"error"} message={this.state.errorMessage}/>
        </Grid>

      </>
    );
  }
}

export default HoardingProposedList;
