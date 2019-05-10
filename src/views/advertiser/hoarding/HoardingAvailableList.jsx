import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { HoardingService } from "../../../services/HoardingService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import CheckIcon from "@material-ui/icons/CheckBox";
import moment from "moment";
import HoardingApplicationDialog from "../../common/HoardingApplicationDialog";
import HoardingApplyDialog from "./form/HoardingApplyDialog";

class HoardingAvailableList extends Component {
  hoardingService = new HoardingService();
  state = {
    hoarding: null,
    hoardings: [],
    openDetail: false,

    errorMessage: "",
    successMessage: "",

    openApply: false
  };


  componentDidMount() {
    document.title = "e-AMC | List of hoarding application";
    const { doLoad, doLoadFinish } = this.props;
    doLoad();
    this.hoardingService.fetchAdvertiserHoarding(errorMessage => this.setState({ errorMessage }),
      hoardings => this.setState({ hoardings }))
      .finally(() => doLoadFinish());
  }

  applyHoarding = (data) => {
    this.setState({ openApply: false });
    //TODO:: business logic to apply hoarding
    this.setState({ successMessage: "You have applied hoarding successfully" });

  };

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
        label: "DETAILS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const file = this.state.hoardings[rowIndex];
            let view=(
              <>
                <ul>
                  <li><strong>LOCATION</strong> {hoarding.address}</li>
                  <li><strong>LENGTH</strong> {hoarding.length}</li>
                  <li><strong>HEIGHT</strong> {hoarding.height}</li>
                  <li><strong>TYPE</strong> {hoarding.type}</li>
                </ul>
                </>
            );

            return (view);
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
                    this.setState({ hoarding: file });
                    this.setState({ openDetail: true });
                  }}>
                    <EyeIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to apply hoarding"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openApply: true, haording: file });
                  }}>
                    <CheckIcon color={"primary"}/>
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
            title={"Hoarding: List of Available Hoardings"}
            data={this.state.hoardings}
            columns={tableColumns}
            options={tableOptions}
          />
          <HoardingApplyDialog open={this.state.openApply} onClose={() => this.setState({ openApply: false })}
                               onConfirm={this.applyHoarding.bind(this)} application={this.state.hoarding}/>
          <HoardingApplicationDialog open={Boolean(this.state.hoarding)} application={this.state.hoarding}
                                     onClose={e => this.setState({ hoarding: null })}/>

          <OfficeSnackbar open={Boolean(this.state.errorMessage)} onClose={() => this.setState({ errorMessage: "" })}
                          variant={"error"} message={this.state.errorMessage}/>
          <OfficeSnackbar open={Boolean(this.state.successMessage)} onClose={() => this.setState({ succesMessage: "" })}
                          variant={"success"} message={this.state.successMessage}/>
        </Grid>

      </>
    );
  }
}

export default HoardingAvailableList;
