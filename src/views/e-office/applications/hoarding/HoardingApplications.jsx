import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Icon, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PinDrop from "@material-ui/icons/PinDrop";
import Assignment from "../ApplicationAssignmentDialog";
import { HoardingService } from "../../../../services/HoardingService";
import GMapDialog from "../../../../components/GmapDialog";
import HoardingDetailDialog from "../../../advertiser/hoarding/HoardingDetailDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import { FileService } from "../../../../services/FileService";
import SubmitDialog from "../../../../components/SubmitDialog";
import { withRouter } from "react-router-dom";
import ApplicationState from "../../../../utils/ApplicationState";
import { StaffService } from "../../../../services/StaffService";
import { DESK } from "../../../../config/routes-constant/OfficeRoutes";

const styles = {
  button: {},
  actionIcon: {}
};

var timeout = null;

class HoardingApplications extends React.Component {
  hoardingService = new HoardingService();
  fileService = new FileService();
  staffService = new StaffService();

  state = {
    openAssignment: false,
    openDetail: false,
    openMap: false,
    openTakeFile: false,
    fileDetail: null,
    hoardings: [],
    hoarding: {},
    takeMessage: "",
    errorMessage: "",
    lat: 93,
    lng: 98,

    staffs: []
  };

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true);

    this.staffService.fetch(errorMessage => this.setState({ errorMessage }),
      staffs => this.setState({ staffs }))
      .finally(() => console.log("staff request has been made"));

    this.hoardingService.fetch(ApplicationState.NEW_APPLICATION)
      .then(hoardings => {
        this.setState({ hoardings: hoardings });
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
      })
      .finally(() => {
        doLoad(false);
      });
  }

  updateTable = (action, tableState) => {

  };
  openAssignment = (data, event) => {
    this.setState({ openAssignment: true });
  };
  takeFile = (data) => {
    this.setState({ openTakeFile: true, fileDetail: data.file });
  };
  confirmTake = (e) => {
    const { history } = this.props;
    const { fileDetail } = this.state;

    this.setState({ submit: true ,openTakeFile:false});
    this.fileService.takeFile(fileDetail.id, errorMessage => this.setState({ errorMessage }),
      takeMessage => {
        this.setState({ takeMessage, submit: false });
        timeout = setTimeout(function(handler) {
          history.push(DESK);
        }, 2000);
      })
      .finally(() => this.setState({ submit: false }));

  };
  closeAssignment = () => {
    this.setState({ openAssignment: false });
  };

  viewDetail = (data, event) => {
    console.log(data);
    this.setState({ openDetail: true });
  };
  closeDetail = () => {
    this.setState({ openDetail: false });
  };

  render() {
    const { classes } = this.props;
    const { hoardings } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 15,
      serverSide: false,
      onTableChange: function(action, tableState) {
        this.updateTable(action, tableState);
      }.bind(this)
    };

    const tableColumns = [
      {
        name: "action",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.hoardings[rowIndex];
            return (

              <>
                <Tooltip title={"Click her to view detail of file"}>
                  <IconButton color="primary" size="small"
                              aria-label="View Details" onClick={this.viewDetail.bind(this, data)}>
                    <Icon fontSize="small">remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to assign this file to staff"}>
                  <IconButton variant="contained" color="secondary"
                              size="small" onClick={this.openAssignment.bind(this, data)}>
                    <Icon fontSize="small">send</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to take this file"}>
                  <IconButton variant="contained" color="primary"
                              size="small" onClick={this.takeFile.bind(this, data)}>
                    <Icon fontSize="small">desktop_mac</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );
          }
        }
      },
      {
        name: "file",
        label: "FILE NO.",
        options: {
          customBodyRender: (file, tableMeta, updateValue) => {
            return (
              file.number
            );
          }
        }
      }, {
        name: "file",
        label: "SUBJECT",
        options: {
          customBodyRender: (file, tableMeta, updateValue) => {
            return (
              file.subject
            );
          }
        }
      }, {
        name: "created_at",
        label: "DATE"
      }, {
        name: "applicant",
        label: "APPLICANT",
        options: {
          customBodyRender: (applicant, tableMeta, updateValue) => {
            return (
              applicant.advertiser.name
            );
          }
        }
      },
      {
        name: "hoarding",
        label: "LOCATION",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const lat = Number(hoarding.latitude);
            const lng = Number(hoarding.longitude);

            let view = (
              <Tooltip title={"Click here to view location"}>
                <IconButton onClick={e => this.setState({ openMap: true, lat: lat, lng: lng })}>
                  <PinDrop/>
                </IconButton>
              </Tooltip>
            );
            return (
              view
            );
          }
        }
      }

    ];

    return (
      <>
        <Grid item xs={12}>
          <MUIDataTable
            title={"Hoarding: List of New Application"}
            data={hoardings}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>
        <HoardingDetailDialog
          hoarding={this.state.hoarding}
          open={this.state.openDetail} onClose={(e) => this.setState({ openDetail: false })}/>
        <Assignment open={this.state.openAssignment} close={this.closeAssignment} data={this.state.detailData}
                    props={this.props} staffs={this.state.staffs}/>
        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({ openMap: false })}
                    isMarkerShown={true}
        />
        <SubmitDialog open={this.state.submit} text={"File is taking ..."} title={"File Endorsement"}/>

        <ConfirmDialog primaryButtonText={"Take"} title={"Confirmation"} message={"Do you want to take this file ?"}
                       onCancel={() => this.setState({ openTakeFile: false })} open={this.state.openTakeFile}
                       onConfirm={this.confirmTake.bind(this)}/>

        <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                        onClose={e => this.setState({ takeMessage: "" })} open={Boolean(this.state.takeMessage)}/>
        <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                        onClose={e => this.setState({ errorMessage: "" })} open={Boolean(this.state.errorMessage)}/>
      </>
    );
  }
}

export default withRouter(withStyles(styles)(HoardingApplications));
