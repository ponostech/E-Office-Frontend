import React, {Component} from "reactn";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/core/styles";
import {Icon, IconButton, Grid, Tooltip} from "@material-ui/core";
import moment from "moment";
import {KIOSK_LIST, FILE_TAKE, GET_STAFF} from "../../../../config/ApiRoutes";
import KioskViewDialog from "./common/KioskViewDialog";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import {DESK, FILE_DETAIL_ROUTE, FILE_SEND} from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";
import ErrorHandler from "../../../common/StatusHandler";
import CardContent from "@material-ui/core/CardContent"

const styles = {};

class KioskNewList extends Component {
  state = {
    tableData: [],
    staffs: null,
    file: null,
    singleData: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false,
    openMap: false,
  };

  componentDidMount() {
    this.setGlobal({loading: true});
    this.getData();
    this.getStaffs();
  }

  getData = () => {
    axios.get(KIOSK_LIST, {params: {status: 'new'}})
        .then(res => this.processResult(res))
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setGlobal({loading: false}))
  };

  processResult = (res) => {
    if (res.data.status) this.setState({tableData: res.data.data.kiosk_applications});
    else this.setGlobal({errorMsg: res.data.messages});
  };

  getStaffs = () => {
    axios.get(GET_STAFF).then(res => this.setState({staffs: res.data.data.staffs}));
  };
  closeViewDialog = () => this.setState({openViewDialog: false});

  viewDetails = (data) => this.setState({openViewDialog: true, singleData: data});

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.kiosk.file.id));

  openAssignment = (data) => this.setState({file: data.kiosk.file, openAssignment: true});

  closeAssignment = () => this.setState({file: null, openAssignment: false});

  takeFile = (data) => this.setState({singleData: data, openTakeFile: true});

  confirmTakeFile = () => axios.post(FILE_TAKE(this.state.singleData.kiosk.file.id))
      .then(() => {
        this.setState({openTakeFile: false});
        this.props.history.push(DESK);
      });

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), {recipient_id}).then(() => window.location.reload());

  render() {
    const {singleData, tableData, staffs, openTakeFile, openAssignment, openViewDialog, file, openMap} = this.state;
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
            return value ? value.advertiser.name:"NA";
          }
        }
      },
      {
        name: "applicant",
        label: "APPLICANT TYPE",
        options: {
          customBodyRender: value => value ? value.advertiser.type.toUpperCase():"NA"
        }
      },
      {
        name: 'created_at',
        label: 'APPLICATION DATE',
        options: {
          customBodyRender: value => value ? moment(value).format("Do MMMM YYYY"):"NA"
        }
      },
      {
        name: 'kiosk',
        label: "FILE LOCATION",
        options: {
          customBodyRender: (kiosk) => kiosk.file.desk ? kiosk.file.desk.staff.name + " (" + kiosk.file.desk.staff.designation + ")" : 'Not on any desk'
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
                <>
                  <Tooltip title="View File">
                    <IconButton color="primary" size="medium"
                                aria-label="View File" onClick={this.viewFile.bind(this, data)}>
                      <Icon fontSize="small">folder</Icon>
                    </IconButton>
                  </Tooltip>
                  <IconButton size='medium' onClick={e => this.setState({openMap: true, lat: lat, lng: lng})}>
                    <Icon fontSize="small">pin_drop</Icon>
                  </IconButton>
                  <IconButton color="primary" size="medium"
                              aria-label="View Details" onClick={this.viewDetails.bind(this, data)}>
                    <Icon fontSize="small">remove_red_eye</Icon>
                  </IconButton>
                  <IconButton variant="contained" color="secondary"
                              size="medium" onClick={this.openAssignment.bind(this, data)}>
                    <Icon fontSize="small">send</Icon>
                  </IconButton>
                  <IconButton variant="contained" color="primary"
                              size="medium" onClick={this.takeFile.bind(this, data)}>
                    <Icon fontSize="small">desktop_mac</Icon>
                  </IconButton>
                </>
            );
          }
        }
      },
    ];

    return (
        <>
          {this.global.loading ? <LoadingView/> : <CardContent>
            <MUIDataTable
                title={"Kiosk: List of New Application"}
                data={tableData}
                columns={tableColumns}
                options={tableOptions}
            />
          </CardContent>}

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

          {this.global.errorMsg && <ErrorHandler/>}
        </>
    );
  }
}

export default withRouter(withStyles(styles)(KioskNewList));
