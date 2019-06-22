import React, {Component} from "reactn";
import axios from "axios";
import {CardContent, Grid, Icon, IconButton} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {ApiRoutes, FILE_CALL, FILE_STATUS_UPDATE} from "../../../config/ApiRoutes";
import {DESK, FILE_DETAIL_ROUTE, FILE_SEND} from "../../../config/routes-constant/OfficeRoutes";
import FileSendDialog from "../../common/SendDialog";
import moment from "moment";
import ConfirmDialog from "../../../components/ConfirmDialog";
import LoadingView from "../../common/LoadingView";
import Tooltip from "@material-ui/core/Tooltip"

class FileNewList extends Component {
  state = {
    staffs: [],
    tableData: [],
    singleData: [],
    openAssignment: false,
    openTakeFile: false,
    openFileCloseDialog: false,
    openFileArchiveDialog: false,
    successMsg: '',
  };

  componentDidMount() {
    this.setGlobal({loading: true});
    this.getData();
  }

  getData = () => {
    axios.all([this.getTableData(), this.getStaffs()])
        .then(axios.spread((tableData, staffs) => this.processDataResponse(tableData, staffs)))
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(res => this.setGlobal({loading: false}))
  };

  getTableData = () => axios.get(ApiRoutes.FILE, {params: {status: 'active'}});

  processDataResponse = (tableData, staffs) => {
    if (tableData.data.status && staffs.data.status)
      this.setState({tableData: tableData.data.data.files, staffs: staffs.data.data.staffs});
    else this.setGlobal({errorMsg: "Data Error"})
  };

  getStaffs = () => axios.get(ApiRoutes.GET_STAFF);

  sendFile = (id, recipient_id) => {
    axios.post(FILE_SEND(id), {recipient_id})
        .then(res => this.processSendResponse(res))
        .catch(err => this.setGlobal({errorMsg: err.toString()}));
  };

  processSendResponse = (res) => {
    if (res.data.status) this.processSendResponseSuccess();
    else this.setGlobal({errorMsg: res.data.messages});
  };

  processSendResponseSuccess = () => {
    this.setState({successMsg: 'File sent successfully', openAssignment: false});
    this.getTableData().then(res => this.setState({tableData: res.data.data.files}));
  };

  viewDetail = (id) => this.props.history.push(FILE_DETAIL_ROUTE(id));

  openAssignment = (data) => this.setState({singleData: data, openAssignment: true});

  closeAssignment = () => this.setState({singleData: [], openAssignment: false});

  takeFile = (data) => this.setState({singleData: data, openTakeFile: true});

  confirmTakeFile = () => axios.post(FILE_CALL(this.state.singleData.id))
      .then(res => this.confirmTakeFileResponse(res))
      .catch(err => this.setGlobal({errorMsg: err.toString()}))
      .then(() => this.setState({openTakeFile: false}))

  confirmTakeFileResponse = (res) => {
    if (res.data.status) {
      this.setGlobal({successMsg: "File called successfully"})
      this.props.history.push(DESK)
    } else {
      this.setGlobal({errorMsg: res.data.messages});
    }
  };

  archiveFile = (data) => this.setState({singleData: data, openFileArchiveDialog: true})

  confirmedArchiveFile = () => {
    this.updateStatus('archived')
        .then(res => {
          if (res.data.status) {
            this.setGlobal({successMsg: "File archived successfully"})
            this.getData();
          } else {
            this.setGlobal({errorMsg: res.data.messages})
          }
        })
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setState({openFileArchiveDialog: false}))
  }

  closeFile = (data) => this.setState({singleData: data, openFileCloseDialog: true})

  confirmedCloseFile = () => {
    this.updateStatus('closed')
        .then(res => {
          if (res.data.status) {
            this.setGlobal({successMsg: "File closed successfully"})
            this.getData();
          } else {
            this.setGlobal({errorMsg: res.data.messages})
          }
        })
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setState({openFileCloseDialog: false}))
  }

  updateStatus = (status) => axios.post(FILE_STATUS_UPDATE(this.state.singleData.id), {status: status});

  closeDialog = (key) => this.setState({[key]: false});

  render() {
    console.log('data', this.state.tableData)
    const {tableData, openAssignment, openTakeFile, singleData, staffs, openFileArchiveDialog, openFileCloseDialog} = this.state;

    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 10,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "number",
        label: "FILE NUMBER",
        options: {
          filter: false
        }
      },
      {
        name: "subject",
        label: "SUBJECT",
        options: {
          filter: false
        }
      },
      {
        name: 'desk',
        label: 'FILE LOCATION',
        options: {
          customBodyRender: (data) => {
            return data ? data.staff.name : <span style={{color: 'red'}}>New File</span>
          }
        }
      },
      {
        name: "created_at",
        label: "CREATED ON",
        options: {
          filter: false,
          customBodyRender: (value) => {
            return moment(value).format("Do MMMM YYYY");
          }
        }
      },
      /*{
        name: "branch",
        label: "BRANCH"
      },*/
      {
        name: "id",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            let {rowIndex} = tableMeta;
            let data = this.state.tableData[rowIndex];
            return (
                <>
                  <Tooltip title='View File Details'>
                    <IconButton color="primary" size="medium"
                                aria-label="View File Details" onClick={this.viewDetail.bind(this, value)}>
                      <Icon fontSize="small">remove_red_eye</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Call file'>
                    <IconButton variant="contained" color="primary"
                                size="medium" onClick={this.takeFile.bind(this, data)}>
                      <Icon fontSize="small">desktop_mac</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Archive File'>
                    <IconButton variant="contained" color="secondary"
                                size="medium" onClick={this.archiveFile.bind(this, data)}>
                      <Icon fontSize="small">archive</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Close File'>
                    <IconButton variant="contained" color="secondary"
                                size="medium" onClick={this.closeFile.bind(this, data)}>
                      <Icon fontSize="small">close</Icon>
                    </IconButton>
                  </Tooltip>
                </>
            );
          }
        }
      }
    ];

    const files =
        <CardContent>
          <MUIDataTable title={"File: List of Active Files"} data={tableData} columns={tableColumns}
                        options={tableOptions}/>
        </CardContent>;

    return (
        <>
          {this.global.loading ? <LoadingView/> : files}

          {openAssignment &&
          <FileSendDialog onSend={this.sendFile.bind(this)} staffs={staffs} open={openAssignment}
                          onClose={this.closeAssignment} file={singleData}
                          props={this.props}/>}

          {openTakeFile &&
          <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                         onCancel={() => this.setState({openTakeFile: false})} open={openTakeFile}
                         onConfirm={this.confirmTakeFile.bind(this)}/>}

          {openFileCloseDialog &&
          <ConfirmDialog onCancel={this.closeDialog.bind(this, "openFileCloseDialog")}
                         open={openFileCloseDialog} onConfirm={this.confirmedCloseFile}
                         message="Are you sure you want to close this file?"/>}

          {openFileArchiveDialog &&
          <ConfirmDialog onCancel={this.closeDialog.bind(this, "openFileArchiveDialog")}
                         open={openFileArchiveDialog} onConfirm={this.confirmedArchiveFile}
                         message="Are you sure you want to archive this file?"/>}
        </>
    );
  }
}

export default withRouter(FileNewList);