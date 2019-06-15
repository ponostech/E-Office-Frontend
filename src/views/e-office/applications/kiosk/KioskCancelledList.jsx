import React, {Component} from "reactn";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/core/styles";
import {Icon, IconButton, Grid} from "@material-ui/core";
import moment from "moment";
import {KIOSK_LIST, FILE_TAKE, GET_STAFF} from '../../../../config/ApiRoutes';
import KioskViewDialog from "./common/KioskViewDialog";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import {DESK, FILE_SEND} from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import ErrorHandler from "../../../common/StatusHandler";
import CardContent from "@material-ui/core/CardContent"

const styles = {};

class KioskCancelledList extends Component {
  state = {
    tableData: [],
    staffs: null,
    file: null,
    singleData: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false,
  };

  componentDidMount() {
    this.setGlobal({loading: true});
    this.getData();
    this.getStaffs();
  }

  getData = () => {
    axios.get(KIOSK_LIST, {params: {status: 'cancelled'}})
        .then(res => this.processResult(res))
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setGlobal({loading: false}));
  };

  processResult = (res) => {
    if (res.data.status) this.setState({tableData: res.data.data.kiosk_applications});
  };

  getStaffs = () => {
    axios.get(GET_STAFF).then(res => this.setState({staffs: res.data.data.staffs}));
  };

  closeViewDialog = () => this.setState({openViewDialog: false});

  viewDetails = (data) => this.setState({openViewDialog: true, singleData: data});

  openAssignment = (data) => this.setState({file: data, openAssignment: true});

  closeAssignment = () => this.setState({file: null, openAssignment: false});

  takeFile = (data) => this.setState({singleData: data, openTakeFile: true});

  confirmTakeFile = () => axios.post(FILE_TAKE(this.state.singleData.file.id))
      .then(res => {
        this.setState({openTakeFile: false});
        this.props.history.push(DESK);
      });

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), {recipient_id}).then(() => window.location.reload());

  render() {
    const {singleData, tableData, staffs, openTakeFile, openAssignment, openViewDialog, file} = this.state;
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
            return (
                <>
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
                </>
            );
          }
        }
      },
    ];

    return (
        <>
          {this.global.loading ? <LoadingView/> :
              <CardContent>
                <MUIDataTable
                    title={"Kiosk: List of Cancelled Application"}
                    data={tableData}
                    columns={tableColumns}
                    options={tableOptions}
                />
              </CardContent>}

          {openViewDialog &&
          <KioskViewDialog open={openViewDialog} close={this.closeViewDialog}
                           data={singleData}/>}

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

export default withRouter(withStyles(styles)(KioskCancelledList));
