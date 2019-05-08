import React from "react";
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import {Icon} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import PinDrop from "@material-ui/icons/PinDrop";
import GMapDialog from "../../../../components/GmapDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import { HotelService } from "../../../../services/HotelService";
import HotelApplicationDialog from "../../../common/HotelApplicationDialog";
import SendDialog from "../../../common/SendDialog";
import { FileService } from "../../../../services/FileService";
import SubmitDialog from "../../../../components/SubmitDialog";
import { DESK } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";


const styles = {
  button: {},
  actionIcon: {},
};

class HotelNewList extends React.Component {
  hotelService = new HotelService();

  state = {
    openAssignment: false,
    openDetail: false,
    openMap: false,
    openTakeFile: false,

    hotels: [],
    application: null,
    file: null,

    submit: false,
    takeMessage: "",
    errorMessage: "",
    lat: 93,
    lng: 98
  };

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true);
    this.hotelService.fetch()

      .then(hotels => {
        this.setState({hotels: hotels});
      })
      .catch(err => {
        this.setState({errorMessage: err.toString()});
      })
      .finally(() => {
        doLoad(false);
      });
  }

  updateTable = (action, tableState) => {

  };
  openAssignment = (application, event) => {
    this.setState({ file: application.file, openAssignment: true });
  };

  takeFile = (data, event) => {
    this.setState({ openTakeFile: true, file: data.file });

  };
  confirmTake = (e) => {
    const { file } = this.state;
    const { history } = this.props;
    this.setState({ openTakeFile: false });
    this.setState({ submit: true });

    let self = this;
    self.fileService.takeFile(file.id,
      errorMessage => self.setState({ errorMessage }),
      takeMessage => {
        self.setState({ takeMessage });
        timeout = setTimeout(function(handler) {
          history.push(DESK);

        }, 3000);

      })
      .finally(() => {
        self.setState({ submit: false });
      });
  };
  closeAssignment = () => {
    this.setState({openAssignment: false});
  };
  render() {
    const {classes} = this.props;
    const {hotels} = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 10,
      serverSide: false,
    };

    const tableColumns = [
      {
        name: "file",
        label: "FILE NUMBER",
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
        label: "SHOP NAME"
      }, {
        name: "owner",
        label: "OWNER"
      },
      {
        name: "name",
        label: "Name of Shop",
        address:"address",
        options: {
          display: 'excluded',
          searchable: true,
        }
      },
      /*{
        name: "shop",
        label: "LOCATION",
        options: {
          customBodyRender: (shop, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.shops[rowIndex];
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
      },*/
      {
        name: "action",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const {rowIndex} = tableMeta;
            const data = this.state.hotels[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);

            return (
       <>
                <Tooltip title={"Click here to view details of application"}>
                  <IconButton className={classes.button} color="primary" size="small"
                              aria-label="View Details"
                              onClick={e => this.setState({ application: data })}>
                    <Icon fontSize="small" className={classes.actionIcon}>remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to send this file"}>
                  <IconButton variant="contained" className={classes.button} color="secondary"
                              size="small" onClick={this.openAssignment.bind(this, data)}>
                    <Icon fontSize="small" className={classes.actionIcon}>send</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to call this file"}>
                  <IconButton variant="contained" className={classes.button} color="primary"
                              size="small" onClick={this.takeFile.bind(this, data)}>
                    <Icon fontSize="small" className={classes.actionIcon}>drag_indicator</Icon>
                  </IconButton>
                </Tooltip>
              </>

            );
          }
        }
      },

    ];

    let table = <LoadingView/>;
    if (!this.state.loading)
      table = <MUIDataTable
        title={"Hotel/Lodging LICENSE: List of New Application"}
        data={hotels}
        columns={tableColumns}
        options={tableOptions}
      />;

    return (
      <>
        <Grid item xs={12}>
          {table}
        </Grid>
        <HotelApplicationDialog application={this.state.application} open={Boolean(this.state.application)}
                                onClose={e => this.setState({ application: null })}/>
        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({ openMap: false })}
                    isMarkerShown={true}
        />
        <SendDialog open={this.state.openAssignment} close={e => this.setState({ openAssignment: false })}
                    file={this.state.file}/>

        <ConfirmDialog primaryButtonText={"Call"} title={"Confirmation"} message={"Do you want to call this file ?"}
                       onCancel={() => this.setState({ openTakeFile: false })} open={this.state.openTakeFile}
                       onConfirm={this.confirmTake.bind(this)}/>

        <SubmitDialog open={this.state.submit} title={"CALL FILE"} text={"Calling File ..."}/>

        <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                        onClose={e => this.setState({takeMessage: ""})} open={Boolean(this.state.takeMessage)}/>

        <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                        onClose={e => this.setState({errorMessage: ""})}
                        open={Boolean(this.state.errorMessage)}/>
      </>
    );
  }
}

export default withStyles(styles)(HotelNewList);
