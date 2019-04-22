import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

import MUIDataTable from "mui-datatables";
import { Chip, IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEyeSharp";
import ActionIcon from "@material-ui/icons/CallToAction";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import HoardingDetailDialog from "./HoardingDetailDialog";
import ApplyHoardingDialog from "./form/ApplyHoardingDialog";
import { HoardingService } from "../../../services/HoardingService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";


class HoardingList extends Component {
  hoardingService = new HoardingService();

  state = {
    hoardings:[],
    openDetail: false,
    openApply: false,
    errorMessage:""
  };


  componentDidMount() {
    document.title = "e-AMC | List of hoarding application";

    const { doLoad, doLoadFinish } = this.props;

    doLoad();
    var self = this;
    //timeout = setTimeout(function(resolve, reject) {
    Promise.all([self.fetchHoarding()])
      .then(function([locs]) {
        // self.setState({ loading: false });
        doLoadFinish();
      });
    //}, 6000);
  }

  fetchHoarding = () => {
    try {
      console.log("they call me");
      let hoardings = this.hoardingService.fetch();
      console.log(hoardings);
      this.setState({ hoardings: hoardings });
    } catch (e) {
      this.setState({ errorMessage: e });
    }
  };


  render() {
    const { history } = this.props;
    const tableColumns = [
      {
        name: "id",
        label: "File ID",
        options: {
          filter: false,
          display: false
        }
      },
      {
        name: "application_no",
        label: "File Number",
        options: {
          filter: false
        }
      }, {
        name: "file_no",
        label: "File Number",
        options: {
          filter: false
        }
      },
      {
        name: "applicant_name",
        label: "Subject",
        options: {
          filter: false
        }
      },
      {
        name: "date",
        label: "Date"
      },
      {
        name: "status",
        label: "Status",
        options: {
          customBodyRender: (value, tableMeta, updateVal) => {
            let view = null;
            switch (value) {
              case "new":
                view = <Chip label={value} title={value} color={"primary"}/>;
                break;
              case "active":
                view = <Chip label={value} title={value} color={"primary"}/>;
                break;
              case "pending":
                view = <Chip label={value} title={value} color={"secondary"}/>;
                break;
              default:
                view = <Chip label={value} title={value} color={"inherit"}/>;
                break;
            }
            return <>
              {view}
            </>;
          }
        }
      },
      {
        name: "status",
        label: "Action",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log(value);
            let view = null;
            switch (value) {
              case "pending":
                view = <Tooltip title={"Click here to view detail"}>
                  <IconButton onClick={(e) => this.setState({ openDetail: true })}>
                    <EyeIcon color={"action"}/>
                  </IconButton>
                </Tooltip>;
                break;
              case "granted":
                view = <>
                  <Tooltip title={"Click here to download permission"}>
                    <IconButton>
                      <DownloadIcon color={"primary"}/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Click here to apply"}>
                    <IconButton onClick={(e) => this.setState({ openApply: true })}>
                      <ActionIcon color={"secondary"}/>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
              case "active":
                view = <>
                  <Tooltip title={"Click here to view details "}>
                    <IconButton onClick={e => this.setState({ openApply: true })}>
                      <EyeIcon color={"action"}/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Click here to download permission"}>
                    <IconButton>
                      <DownloadIcon color={"primary"}/>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
              default:
                break;
            }
            return (
              <>
                {view}
              </>
            );
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
          <HoardingDetailDialog open={this.state.openDetail} onClose={(e) => this.setState({ openDetail: false })}/>
          <OfficeSnackbar open={Boolean(this.state.errorMessage)} onClose={()=>this.setState({errorMessage: ""})} variant={"error"} message={this.state.errorMessage}/>
        </Grid>

      </>
    );
  }
}

export default withRouter(HoardingList);
