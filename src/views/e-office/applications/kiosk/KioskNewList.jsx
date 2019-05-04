import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Icon, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PinDrop from "@material-ui/icons/PinDrop";
import GMapDialog from "../../../../components/GmapDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import { KioskService } from "../../../../services/KioskService";
import SendDialog from "../../../common/SendDialog";
import { DESK } from "../../../../config/routes-constant/OfficeRoutes";
import { FileService } from "../../../../services/FileService";
import { withRouter } from "react-router-dom";

const styles = {
  button: {},
  actionIcon: {}
};
var timeout = null;

class KioskNewList extends React.Component {
  kioskService = new KioskService();
  fileService=new FileService();
  state = {

    kiosks: [],
    file: null,
    takeMessage: "",
    errorMessage: "",
    lat: 93,
    lng: 98,

    openMap: false,
    openTakeFile: false,
    openSendFile: false,
  };

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true);

    this.kioskService.fetch()
      .then(kiosks => {
        this.setState({ kiosks: kiosks });
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
      })
      .finally(() => {
        doLoad(false);
      });
  }

  componentWillUnmount() {
    clearTimeout(timeout)
  }

  updateTable = (action, tableState) => {

  };
  openAssignment = (id) => {
    this.setState({ openAssignment: true });
  };
  takeFile = (data) => {
    this.setState({ openTakeFile: true, file: data.file });
  };
  confirmTake = (e) => {
    const { history } = this.props;
    const { file } = this.state;

    this.setState({ submit: true, openTakeFile: false });
    this.fileService.takeFile(file.id, errorMessage => this.setState({ errorMessage }),
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

  viewDetail = (id) => {
    this.setState({ openDetail: true });
  };
  closeDetail = () => {
    this.setState({ openDetail: false });
  };

  render() {
    const { classes } = this.props;
    const { kiosks } = this.state;
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
            const data = this.state.kiosks[rowIndex];
            return (
              <div>
                <IconButton className={classes.button} color="primary" size="small"
                            aria-label="View Details"
                            onClick={e => this.setState({ kiosk: data.kiosk, openDetail: true })}>
                  <Icon fontSize="small" className={classes.actionIcon}>remove_red_eye</Icon>
                </IconButton>
                <IconButton variant="contained" className={classes.button} color="secondary"
                            size="small" onClick={e => this.setState({ file: data.file,openSendFile:true })}>
                  <Icon fontSize="small" className={classes.actionIcon}>send</Icon>
                </IconButton>
                <IconButton variant="contained" className={classes.button} color="primary"
                            size="small" onClick={this.takeFile.bind(this, data)}>
                  <Icon fontSize="small" className={classes.actionIcon}>drag_indicator</Icon>
                </IconButton>
              </div>
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
        name: "kiosk",
        label: "LOCATION",
        options: {
          customBodyRender: (kiosk, tableMeta, updateValue) => {
            const lat = Number(kiosk.latitude);
            const lng = Number(kiosk.longitude);

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
            title={"KIOSK: List of New Application"}
            data={kiosks}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>

        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({ openMap: false })}
                    isMarkerShown={true}
        />
        <SendDialog open={this.state.openSendFile} file={this.state.file} close={e => this.setState({ file: null,openSendFile:false })}/>
        <ConfirmDialog primaryButtonText={"Take"} title={"Confirmation"}
                       message={"Do you want to call this file ?"}
                       onCancel={() => this.setState({ openTakeFile: false })} open={this.state.openTakeFile}
                       onConfirm={this.confirmTake.bind(this)}/>

        <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                        onClose={e => this.setState({ takeMessage: "" })} open={Boolean(this.state.takeMessage)}/>
        <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                        onClose={e => this.setState({ errorMessage: "" })}
                        open={Boolean(this.state.errorMessage)}/>
      </>
    );
  }
}

export default withRouter(withStyles(styles)(KioskNewList));
