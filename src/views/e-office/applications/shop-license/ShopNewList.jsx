import React, { Component } from "reactn";
import axios from "axios";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import moment from "moment";
import { FILE_CALL, GET_STAFF, SHOP_LIST } from "../../../../config/ApiRoutes";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { DESK, FILE_DETAIL_ROUTE, FILE_SEND } from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";
import ErrorHandler from "../../../common/StatusHandler";
import CardContent from "@material-ui/core/CardContent";
import { ArrayToString } from "../../../../utils/ErrorUtil";
import ApplicationDetailsDialog from "../../../common/ApplicationDetailsDialog";

const styles = {};

class ShopNewList extends Component {
  state = {
    shops: [],
    openMap: false,
    staffs: null,
    file: null,
    shop: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false,
    lat: 0,
    lng: 0
  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.getData();
    this.getStaffs().then(res => {
      if (res.data.status) this.setState({ staffs: res.data.data.staffs });
      else this.setGlobal({ errorMsg: res.status.messages });
    });
  }

  getData = () => {
    axios.get(SHOP_LIST, { params: { status: "new" } })
      .then(res => this.processResult(res))
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setGlobal({ loading: false }));
  };

  processResult = (res) => {
    if (res.data.status) this.setState({ loading: false, shops: res.data.data.shops });
  };

  getStaffs = () => axios.get(GET_STAFF);

  closeViewDialog = () => this.setState({ openViewDialog: false });

  viewDetails = (data) => this.setState({ openViewDialog: true, shop: data });

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));

  openAssignment = (data) => this.setState({ file: data.file, openAssignment: true });

  closeAssignment = () => this.setState({ file: null, openAssignment: false });

  takeFile = (data) => this.setState({ shop: data, openTakeFile: true });

  confirmTakeFile = () => {
    this.setState({ openTakeFile: false });
    this.setGlobal({ loading: true });
    axios.post(FILE_CALL(this.state.shop.file.id))
      .then((res) => {
        if (res.data.status) {
          this.setGlobal({ successMsg: "Application is called successfully" });
          this.props.history.push(DESK);
        } else
          this.setGlobal({ errorMsg: ArrayToString(res.data.messages) });
      })
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .finally(() => this.setGlobal({ loading: false }));
  };

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), { recipient_id })
    .then((res) => {
      if (res.data.status) {
        this.setState({ openAssignment: false });
        this.setGlobal({ successMsg: "Application is sent successfully" });
        this.componentDidMount();
      } else
        this.setGlobal({ errorMsg: ArrayToString(res.data.messages) });
    })
    .catch(err => this.setGlobal({ errorMsg: err.toString() })
      .finally(() => this.setGlobal({ loading: false })));

  render() {
    const { shop, shops, staffs, openTakeFile, openAssignment, openViewDialog, file, openMap } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 15,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "owner",
        label: "NAME OF APPLICANT"
      },
      {
        name: "name",
        label: "SHOP NAME"
      },
      {
        name: "address",
        label: "PROPOSED LOCATION",
      },
      {
        name: "application_date",
        label: "APPLICATION DATE",
        options: {
          filter: false,
          customBodyRender: (value) => moment(value).format("Do MMMM YYYY")
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
            let data = shops[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);
            return (
              <>
                <Tooltip title='View Location in Map'>
                  <IconButton size='medium' onClick={e => this.setState({ openMap: true, lat: lat, lng: lng })}>
                    <Icon fontSize="small">pin_drop</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title='View Details'>
                  <IconButton color="primary" size="medium"
                              aria-label="View Details" onClick={this.viewDetails.bind(this, data)}>
                    <Icon fontSize="small">remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="View File">
                  <IconButton color="primary" size="medium"
                              aria-label="View File" onClick={this.viewFile.bind(this, data)}>
                    <Icon fontSize="small">folder</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title='Assign to Officer/Staff'>
                  <IconButton variant="contained" color="secondary"
                              size="medium" onClick={this.openAssignment.bind(this, data)}>
                    <Icon fontSize="small">send</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title='Call File'>
                  <IconButton variant="contained" color="secondary"
                              size="medium" onClick={this.takeFile.bind(this, data)}>
                    <Icon fontSize="small">desktop_mac</Icon>
                  </IconButton>
                </Tooltip>
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
            title={"SHOP: List of New Application"}
            data={shops}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>}

        {openMap && <GMapDialog viewMode={true} open={openMap} lat={this.state.lat} lng={this.state.lng}
                                onClose={() => this.setState({ openMap: false })} isMarkerShown={true}/>}

        {openViewDialog &&
        <ApplicationDetailsDialog type={shop.file.fileable_type} open={openViewDialog} title='View Application Details'
                                  application={shop}
                                  file={shop.file}
                                  onClose={this.closeViewDialog}/>}

        {openAssignment && staffs &&
        <FileSendDialog onSend={this.sendFile} staffs={staffs} open={openAssignment}
                        onClose={this.closeAssignment} file={file} props={this.props}/>}

        {openTakeFile &&
        <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                       onCancel={() => this.setState({ openTakeFile: false })} open={openTakeFile}
                       onConfirm={this.confirmTakeFile}/>}

        {this.global.errorMsg && <ErrorHandler/>}
      </>
    );
  }
}

export default withRouter(withStyles(styles)(ShopNewList));
