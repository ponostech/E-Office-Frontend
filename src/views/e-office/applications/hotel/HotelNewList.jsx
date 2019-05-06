import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Icon, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PinDrop from "@material-ui/icons/PinDrop";
import Assignment from "../ApplicationAssignmentDialog";
import GMapDialog from "../../../../components/GmapDialog";
import HoardingDetailDialog from "../../../advertiser/hoarding/HoardingDetailDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import { HotelService } from "../../../../services/HotelService";

const styles = {
  button: {},
  actionIcon: {}
};

class HotelNewList extends React.Component {
  hotelService=new HotelService();
  state = {
    openAssignment: false,
    openDetail: false,
    openMap: false,
    openTakeFile: false,
    detailData: [],
    hotels: [],
    hotel: {},
    takeMessage: "",
    errorMessage: "",
    lat: 93,
    lng:98
  };

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true)
    this.hotelService.fetch()
      .then(hotels => {
        this.setState({ hotels });
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
      })
      .finally(()=>{
        doLoad(false)
      });
  }

  updateTable = (action, tableState) => {

  };
  openAssignment = (id) => {
    this.setState({ openAssignment: true });
  };
  takeFile = (data) => {
    this.setState({ openTakeFile: true, fileDetail: data.file });
  };
  confirmTake = (e) => {
    const { fileDetail } = this.state;
    console.log(fileDetail)
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
    const { hotels } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 15,
      serverSide: false,
      onTableChange: function(action, tableState) {
      }.bind(this)
    };

    const tableColumns = [
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
        name: "name",
        label: "SHOP NAME",
      }, {
        name: "owner",
        label: "OWNER",
      },
      {
        name: "hotel",
        label: "LOCATION",
        options: {
          customBodyRender: (hotel, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.hotels[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);

            let view = (
              <Tooltip title={"Click here to view location"}>
                <IconButton onClick={e => this.setState({ openMap: true,lat:lat ,lng:lng})}>
                  <PinDrop/>
                </IconButton>
              </Tooltip>
            );
            return (
              view
            );
          }
        }
      },
      {
        name: "action",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.hotels[rowIndex];
            return (
                <div>
                  <IconButton className={classes.button} color="primary" size="small"
                              aria-label="View Details"
                              onClick={e => this.setState({ shop: data, openDetail: true })}>
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


    ];

    return (
      <>
        <Grid item xs={12}>
          <MUIDataTable
            title={"HOTEL & LODGING LICENSE: List of New Application"}
            data={hotels}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>
        <HoardingDetailDialog
          hoarding={this.state.hotel}
          open={this.state.openDetail} onClose={(e) => this.setState({ openDetail: false })}/>
        <Assignment open={this.state.openAssignment} close={this.closeAssignment} data={this.state.detailData}
                    props={this.props} staffs={this.state.staffs}/>
        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng} onClose={() => this.setState({ openMap: false })}
                    isMarkerShown={true}
        />
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

export default withStyles(styles)(HotelNewList);
