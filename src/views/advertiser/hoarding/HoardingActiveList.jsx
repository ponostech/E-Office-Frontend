import React, { Component } from "reactn";

import MUIDataTable from "mui-datatables";
import { HoardingService } from "../../../services/HoardingService";
import { Icon, IconButton, Tooltip,CardContent } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";
import ApplicationState from "../../../utils/ApplicationState";
import { FILE_DETAIL_ROUTE } from "../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../common/LoadingView";
import HoardingViewDialog from "../../e-office/applications/hoarding/common/HoardingViewDialog";

class HoardingActiveList extends Component {
  hoardingService = new HoardingService();
  state = {
    hoarding: null,
    hoardings: [],
    openDetail: false,
  };

  componentDidMount() {
    document.title = "e-AMC | List of Active Hoarding";
    this.setGlobal({loading: true});
    this.hoardingService.fetch(ApplicationState.APPROVED_APPLICATION, errorMsg => this.setGlobal({ errorMsg }),
      hoardings => this.setState({ hoardings }))
      .finally(() => this.setGlobal({ loading: false }));
  }

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));

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
      },{
        name: "hoarding",
        label: "FILE NUMBER",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (value.file.number);
          }
        }
      }, {
        name: "hoarding",
        label: "SUBJECT",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (value.file.subject);
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
                <Tooltip title="View File">
                  <IconButton color="primary" size="small"
                              aria-label="View File" onClick={this.viewFile.bind(this, hoarding)}>
                    <Icon fontSize="small" color={"primary"}>folder</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to view details"}>
                  <IconButton size='small ' onClick={(e) => {
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
          this.global.loading ? <LoadingView/> :
            <CardContent>
              <MUIDataTable
                title={"Hoarding: List of Active Hoardings"}
                data={this.state.hoardings}
                columns={tableColumns}
                options={tableOptions}
              />


            </CardContent>
        }

        <HoardingViewDialog open={Boolean(this.state.hoarding)} data={this.state.hoarding}
                            close={e => this.setState({ hoarding: null })}/>
      </>
    );
  }
}

export default HoardingActiveList;
