import React from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/core/styles";
import {Icon, IconButton, Grid, Tooltip} from "@material-ui/core";
import moment from "moment";
import { KIOSK_LIST, FILE_TAKE, GET_STAFF, HOARDING_LIST } from "../../../../config/ApiRoutes";
import KioskViewDialog from "./common/KioskViewDialog";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import {DESK, FILE_DETAIL_ROUTE, FILE_SEND} from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";
import ErrorHandler from "../../../common/StatusHandler";

const styles = {
  button: {},
  actionIcon: {}
};

class KioskNewList extends React.Component {
  doLoad = this.props.doLoad;
  state = {
    tableData: [],
    staffs: null,
    file: null,
    singleData: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false,
    loading: true,
    errorMsg: '',
    openMap: false,
  };

  componentDidMount() {
    this.doLoad(true);
    this.getData();
    this.getStaffs();
  }

  getData = () => {
    axios.get(KIOSK_LIST, {params: {status: 'new'}})
      .then(res => this.processResult(res))
      .catch(err => this.setState({errorMsg: err.toString()}))
      .then(res => {
        this.setState({loading: false});
        this.doLoad(false)
      })
  };

  processResult = (res) => {
    if (res.data.status) this.setState({loading: false, tableData: res.data.data.kiosk_applications});
    else this.setState({errorMsg: res.data.messages});
  };

  getStaffs = () => {
    axios.get(GET_STAFF).then(res => this.setState({staffs: res.data.data.staffs}));
  };
  closeViewDialog = () => this.setState({openViewDialog: false});

  viewDetails = (data) => this.setState({openViewDialog: true, singleData: data});
  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));

  openAssignment = (data) => this.setState({file: data, openAssignment: true});

  closeAssignment = () => this.setState({file: null, openAssignment: false});

  takeFile = (data) => this.setState({singleData: data, openTakeFile: true});

  confirmTakeFile = () => axios.post(FILE_TAKE(this.state.singleData.file.id))
    .then(res => {
      this.setState({openTakeFile: false});
      this.props.history.push(DESK);
    });

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), {recipient_id}).then(res => window.location.reload());

  render() {
    const {classes} = this.props;
    const {errorMsg} = this.state;
    const {loading, singleData, tableData, staffs, openTakeFile, openAssignment, openViewDialog, file, openMap} = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8,
      serverSide: false,
    };

    const tableColumns = [
      {
        name: "applicant",
        label: "APPLICANT",
        options: {
          customBodyRender: function (value) {
            return value.advertiser.name;
          }
        }
      },
      {
        name: "applicant",
        label: "APPLICANT TYPE",
        options: {
          customBodyRender: value => value.advertiser.type.toUpperCase()
        }
      },
      {
        name: 'created_at',
        label: 'APPLICATION DATE',
        options: {
          customBodyRender: value => moment(value).format("Do MMMM YYYY")
        }
      },
      {
        name: 'file',
        label: "FILE LOCATION",
        options: {
          customBodyRender: value => value.desk.staff.name + " (" + value.desk.staff.designation + ")"
        }
      },
      {
        name: "id",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            const {rowIndex} = tableMeta;
            let data = tableData[rowIndex];
            const lat = Number(data.kiosk.latitude);
            const lng = Number(data.kiosk.longitude);
            return (
              <div>
                <Tooltip title="View File">
                  <IconButton color="primary" size="small"
                              aria-label="View File" onClick={this.viewFile.bind(this, data)}>
                    <Icon fontSize="small">folder</Icon>
                  </IconButton>
                </Tooltip>
                <IconButton onClick={e => this.setState({openMap: true, lat: lat, lng: lng})}>
                  <Icon fontSize="small" className={classes.actionIcon}>pin_drop</Icon>
                </IconButton>
                <IconButton color="primary" size="small"
                            aria-label="View Details" onClick={this.viewDetails.bind(this, data)}>
                  <Icon fontSize="small">remove_red_eye</Icon>
                </IconButton>
                <IconButton variant="contained" color="secondary"
                            size="small" onClick={this.openAssignment.bind(this, data)}>
                  <Icon fontSize="small">send</Icon>
                </IconButton>
                <IconButton variant="contained" color="primary"
                            size="small" onClick={this.takeFile.bind(this, data)}>
                  <Icon fontSize="small">desktop_mac</Icon>
                </IconButton>
              </div>
            );
          }
        }
      },
    ];

    return (
      <>
        {loading ? <LoadingView/> : <Grid item xs={12}>
          <MUIDataTable
            title={"Kiosk: List of New Application"}
            data={tableData}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>}

        {openViewDialog &&
        <KioskViewDialog open={openViewDialog} close={this.closeViewDialog}
                         data={singleData}/>}

        {openMap && <GMapDialog viewMode={true} open={openMap} lat={this.state.lat} lng={this.state.lng}
                                onClose={() => this.setState({openMap: false})}
                                isMarkerShown={true}
        />}
        {openAssignment && staffs &&
        <FileSendDialog onSend={this.sendFile} staffs={staffs} open={openAssignment}
                        onClose={this.closeAssignment} file={file}
                        props={this.props}/>}

        {openTakeFile &&
        <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                       onCancel={() => this.setState({openTakeFile: false})} open={openTakeFile}
                       onConfirm={this.confirmTakeFile}/>}
        {errorMsg && <ErrorHandler messages={errorMsg} onClose={this.closeStatus}/>}
      </>
    );
  }
}

export default withRouter(withStyles(styles)(KioskNewList));
