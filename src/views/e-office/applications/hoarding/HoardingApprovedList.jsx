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
import OfficeSnackbar from "../../../../components/OfficeSnackbar";

const styles = {
  button: {},
  actionIcon: {}
};

class HoardingApprovedList extends React.Component {
  hoardingService = new HoardingService();
  state = {
    openAssignment: false,
    openDetail: false,
    openMap: false,
    openTakeFile: false,
    detailData: [],
    hoardings: [],
    hoarding: {},
    errorMessage: ""
  };

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true)
    this.hoardingService.fetch()
      .then(hoardings => {
        this.setState({ hoardings: hoardings });
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
      })
      .then(()=>{
        doLoad(false)
      })
  }

  updateTable = (action, tableState) => {

  };
  openAssignment = (id) => {
    this.setState({ openAssignment: true });
  };

  closeAssignment = () => {
    this.setState({ openAssignment: false });
  };

  viewDetail = (id) => {
    this.setState({ openDetail: true });
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
              <div>
                <IconButton className={classes.button} color="primary" size="small"
                            aria-label="View Details"
                            onClick={e => this.setState({ hoarding: data.hoarding, openDetail: true })}>
                  <Icon fontSize="small" className={classes.actionIcon}>remove_red_eye</Icon>
                </IconButton>
                <IconButton variant="contained" className={classes.button} color="secondary"
                            size="small" onClick={this.openAssignment.bind(this, value)}>
                  <Icon fontSize="small" className={classes.actionIcon}>send</Icon>
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
        name: "hoarding",
        label: "LOCATION",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            let view = (
              <Tooltip title={"Click here to view location"}>
                <IconButton onClick={e => this.setState({ openMap: true })}>
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
            title={"Hoarding: List of Approved Application"}
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
        <GMapDialog open={this.state.openMap} onClose={() => this.setState({ openMap: false })}
                    isMarkerShown={true}
        />
        <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                        onClose={e => this.setState({ takeMessage: "" })} open={Boolean(this.state.takeMessage)}/>
        <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                        onClose={e => this.setState({ errorMessage: "" })} open={Boolean(this.state.errorMessage)}/>
      </>
    );
  }
}

export default withStyles(styles)(HoardingApprovedList);
