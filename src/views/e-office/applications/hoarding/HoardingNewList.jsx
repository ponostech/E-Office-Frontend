import React, { Component } from "reactn";
import axios from "axios";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Icon, IconButton, Tooltip } from "@material-ui/core";
import moment from "moment";
import { FILE_CALL, GET_STAFF, HOARDING_LIST } from "../../../../config/ApiRoutes";
import HoardingViewDialog from "./common/HoardingViewDialog";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { DESK, FILE_DETAIL_ROUTE, FILE_SEND } from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";
import CardContent from "@material-ui/core/CardContent"

const styles = {
  button: {},
  actionIcon: {}
};

class HoardingNewList extends Component {
  source = axios.CancelToken.source();

  state = {
    tableData: [],
    staffs: null,
    file: null,
    singleData: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false,
    openMap: false
  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.getData();
    this.getStaffs();
  }

  componentWillUnmount() {
    this.source.cancel("Api is being canceled");
  }

  getData = () => {
    axios.get(HOARDING_LIST, { params: { status: "new" }, cancelToken: this.source.token })
      .then(res => this.processResult(res))
      .catch(err => {
        if (axios.isCancel(err)) console.error("Request cancelled");
        else this.setGlobal({ errorMsg: err.toString() });
      })
      .then(() => this.setGlobal({ loading: false }));
  };

  processResult = (res) => {
    if (res.data.status) this.setState({ tableData: res.data.data.hoarding_applications });
    else this.setGlobal({ errorMsg: res.data.messages });
  };

  getStaffs = () => axios.get(GET_STAFF, { cancelToken: this.source.token })
    .then(res => this.setState({ staffs: res.data.data.staffs }));

  closeViewDialog = () => this.setState({ openViewDialog: false });

  viewDetails = (data) => this.setState({ openViewDialog: true, singleData: data });

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.hoarding.file.id));

  openAssignment = (data) => this.setState({ file: data.hoarding.file, openAssignment: true });

  closeAssignment = () => this.setState({ file: null, openAssignment: false });

  takeFile = (data) => this.setState({ singleData: data, openTakeFile: true });

  confirmTakeFile = () => {
    this.setState({ openTakeFile: false });
    this.confirmTakeCall();
  };

  confirmTakeCall = () => {
    axios.post(FILE_CALL(this.state.singleData.hoarding.file.id), {}, { cancelToken: this.source.token })
      .then(() => {
        this.setGlobal({ successMsg: `File No. ${this.state.singleData.hoarding.file.number} called successfully` })
          .then(() => this.props.history.push(DESK));
      })
      .catch(err => {
        if (!axios.isCancel(err)) this.setGlobal({ errorMsg: err.toString() });
      });
  };

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), { recipient_id }).then(res => window.location.reload());

  render() {
    const { classes } = this.props;
    const { singleData, tableData, staffs, openTakeFile, openAssignment, openViewDialog, file, openMap } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8
    };

    const tableColumns = [
      {

        name: "applicant",
        label: "APPLICANT",
        options: {
          customBodyRender: function(value) {
            return value.advertiser.name;
          },
          filter: true,
          sort: true
        }
      },
      {
        name: "applicant",
        label: "SUBJECT",
        options: {
          customBodyRender: (value, tableMeta) => {
            const { rowIndex } = tableMeta;
            let data = tableData[rowIndex];
            return data.hoarding.file.subject;
          }
        },
        filter: true,
        sort: true
      },
      {
        name: "applicant",
        label: "CONTACT",
        options: {
          customBodyRender: value => value.phone_no,
          filter: true,
          sort: true
        }
      },
      {
        name: "created_at",
        label: "APPLICATION DATE",
        options: {
          customBodyRender: value => moment(value).format("Do MMMM YYYY"),
          filter: true,
          sort: true
        }
      },
      {
        name: "id",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            const { rowIndex } = tableMeta;
            let data = tableData[rowIndex];
            const lat = Number(data.hoarding.latitude);
            const lng = Number(data.hoarding.longitude);
            return (
              <>
                <Tooltip title="View File">
                  <IconButton color="primary" size="small"
                              aria-label="View File" onClick={this.viewFile.bind(this, data)}>
                    <Icon fontSize="small">folder</Icon>
                  </IconButton>
                </Tooltip>
                <IconButton onClick={e => this.setState({ openMap: true, lat: lat, lng: lng })}>
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
                < IconButton variant="contained" color="primary"
                             size="small" onClick={this.takeFile.bind(this, data)}>
                  <Icon fontSize="small">desktop_mac</Icon>
                </IconButton>
              </>
            );
          }
        }
      }
    ];

    return (
      <>
        {this.global.loading ? <LoadingView/> : <CardContent>
          <MUIDataTable
            title={"Hoarding: List of New Application"}
            data={tableData}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>}

        {openViewDialog &&
        <HoardingViewDialog open={openViewDialog} close={this.closeViewDialog}
                            data={singleData}/>}
        {openMap && <GMapDialog viewMode={true} open={openMap} lat={this.state.lat} lng={this.state.lng}
                                onClose={() => this.setState({ openMap: false })}
                                isMarkerShown={true}
        />}

        {openAssignment && staffs &&
        <FileSendDialog onSend={this.sendFile} staffs={staffs} open={openAssignment}
                        onClose={this.closeAssignment} file={file}
                        props={this.props}/>}

        {openTakeFile &&
        <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                       onCancel={() => this.setState({ openTakeFile: false })} open={openTakeFile}
                       onConfirm={this.confirmTakeFile}/>}
      </>
    );
  }
}

export default withRouter(withStyles(styles)(HoardingNewList));
