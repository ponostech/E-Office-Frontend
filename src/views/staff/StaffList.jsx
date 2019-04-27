import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Icon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { StaffService } from "../../services/StaffService";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import ConfirmDialog from "../../components/ConfirmDialog";

const styles = {
  button: {},
  actionIcon: {}
};

class StaffList extends React.Component {
  staffService = new StaffService();
  state = {
    openDetail: false,
    staffs: [],
    staff: {},
    errorMessage: ""
  };

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true);

    this.staffService.fetch()
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

  openAssignment = (id) => {
    this.setState({ openAssignment: true });
  };
  takeFile = (data) => {
    this.setState({ openTakeFile: true, fileDetail: data.file });
  };
  confirmTake = (e) => {
    const { fileDetail } = this.state;
    console.log(fileDetail);
    this.setState({ openTakeFile: false });
    this.setState({ takeMessage: "You have taken the file" });
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
                            onClick={e => this.setState({ hoarding: data.staff, openDetail: true })}>
                  <Icon fontSize="small" className={classes.actionIcon}>remove_red_eye</Icon>
                </IconButton>
                <IconButton variant="contained" className={classes.button} color="secondary"
                            size="small" onClick={this.openAssignment.bind(this, value)}>
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
        name: "name",
        label: "NAME",
        options: {
          customBodyRender: (file, tableMeta, updateValue) => {
            return (
              file.number
            );
          }
        }
      }, {
        name: "address",
        label: "ADDRESS",
        options: {
          customBodyRender: (file, tableMeta, updateValue) => {
            return (
              file.subject
            );
          }
        }
      }, {
        name: "designation",
        label: "DESIGNATION"
      }

    ];

    return (
      <>
        <Grid item xs={12}>
          <MUIDataTable
            title={"STAFF: List of Staff"}
            data={hoardings}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>

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

export default withStyles(styles)(StaffList);
