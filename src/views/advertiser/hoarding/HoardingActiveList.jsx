import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { HoardingService } from "../../../services/HoardingService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import ApplicationState from "../../../utils/ApplicationState";
import HoardingApplicationDialog from "../../common/HoardingApplicationDialog";
import { FILE_DETAIL_ROUTE } from "../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../common/LoadingView";

class HoardingActiveList extends Component {
  hoardingService = new HoardingService();
  state = {
    hoarding: null,
    hoardings: [],
    openDetail: false,
    errorMessage: "",

    loading: true
  };


  componentDidMount() {
    document.title = "e-AMC | List of Active Hoarding";
    const { doLoad, doLoadFinish } = this.props;
    const self = this;
    doLoad();
    this.hoardingService.fetch(ApplicationState.APPROVED_APPLICATION, errorMessage => this.setState({ errorMessage }),
      hoardings => this.setState({ hoardings }))
      .finally(() => {
        self.setState({ loading: false });
        doLoadFinish();
      });
  }

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));


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
            let view = (
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

            let viewBtn = (
              <>
                <Tooltip title="View File">
                  <IconButton color="primary" size="small"
                              aria-label="View File" onClick={this.viewFile.bind(this, hoarding)}>
                    <Icon fontSize="small" color={"primary"}>folder</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to view details"}>
                  <IconButton onClick={(e) => {
                    this.setState({ hoarding: file });
                    this.setState({ openDetail: true });
                  }}>
                    <EyeIcon fontSize={"small"} color={"primary"}/>
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
                title={"Hoarding: List of Active Hoardings"}
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

export default HoardingActiveList;
