import React, { Component } from "react";
import axios from "axios";
import { Grid, Icon, IconButton } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { FILE_TAKE } from "../../../config/ApiRoutes";
import { DESK, FILE_DETAIL_ROUTE } from "../../../config/routes-constant/OfficeRoutes";
import FileSendDialog from "../../common/SendDialog";
import moment from "moment";
import ConfirmDialog from "../../../components/ConfirmDialog";
import LoadingView from "../../common/LoadingView";
import { FileService } from "../../../services/FileService";
import { StaffService } from "../../../services/StaffService";
import { FILE_STATUS } from "../../../utils/Util";

class FileNewList extends Component {
  fileService = new FileService();
  staffService = new StaffService();
  state = {
    staffs: [],
    tableData: [],
    openAssignment: false,
    openTakeFile: false,
    loading: true,
    file: [],
    error: false
  };

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true);

    Promise.all([this.fetchFile(), this.fetchStaffs()])
      .then(function(val) {
        console.log(val);
      })
      .finally(() => {
        this.setState({loading:false})
        doLoad(false);
      });
  }

  fetchStaffs = () => {
    this.staffService.all(errorMessage => console.log(errorMessage),
      staffs => this.setState({ staffs }));
  };
  fetchFile = () => {
    this.fileService.fetch(FILE_STATUS.INACTIVE,
      errorMessage => {
        this.setState(errorMessage);
      },
      files => this.setState({ files })
    );
  };
  sendFile = (fileId, receipientId) => {
    this.setState({ openAssignment: true, submit: true });
    this.fileService.sendFile(fileId, receipientId, errorMessage => this.setState({ errorMessage }),
      takeMessage => {
        this.setState({ takeMessage });
        setTimeout(function(handler) {
          window.location.reload();
        }, 3000);
      }).finally(() => this.setState({ submit: false }));
  };

  viewDetail = (id) => {
    const { history } = this.props;
    history.push(FILE_DETAIL_ROUTE(id));
  };

  openAssignment = (data) => {
    this.setState({ file: data, openAssignment: true });
  };

  closeAssignment = () => {
    this.setState({ file: [], openAssignment: false });
  };

  takeFile = (data) => {
    this.setState({ file: data, openTakeFile: true });
  };

  confirmTakeFile = () => {
    axios.post(FILE_TAKE(this.state.file.id))
      .then(res => {
        this.setState({ openTakeFile: false });
        window.location.replace(DESK);
      });
  };

  render() {
    const { tableData } = this.state;

    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8,
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
        name: "created_at",
        label: "CREATED ON",
        options: {
          filter: false,
          customBodyRender: (value) => {
            return moment(value).format("Do MMMM YYYY");
          }
        }
      },
      {
        name: "branch",
        label: "BRANCH"
      },
      {
        name: "id",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            let { rowIndex } = tableMeta;
            let data = this.state.tableData[rowIndex];
            return (
              <>
                <IconButton color="primary" size="small"
                            aria-label="View Details" onClick={this.viewDetail.bind(this, value)}>
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
      }
    ];

    let files = <LoadingView/>;
    if (!this.state.loading) {
      if (!this.state.error) {
        files = (
          <>
            <Grid item xs={12}>
              <MUIDataTable title={"File: List of New Files"} data={tableData} columns={tableColumns}
                            options={tableOptions}
              />
            </Grid>
          </>
        );
      } else {
        files = <p style={{ textAlign: "center", width: "100%", fontSize: 15 }}>Something Went Wrong!</p>;
      }
    }

    return (
      <>
        {files}
        <FileSendDialog onSend={this.sendFile.bind(this)} staffs={this.state.staffs} open={this.state.openAssignment}
                        onClose={this.closeAssignment} file={this.state.file}
                        props={this.props}/>

        <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                       onCancel={() => this.setState({ openTakeFile: false })} open={this.state.openTakeFile}
                       onConfirm={this.confirmTakeFile.bind(this)}/>
      </>
    );
  }
}

export default withRouter(FileNewList);