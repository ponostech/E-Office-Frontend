import React, { Component } from "reactn";
import axios from "axios";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import moment from "moment";
import { FILE_TAKE, GET_STAFF, SHOP_LIST } from "../../../../config/ApiRoutes";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { DESK, FILE_DETAIL_ROUTE, FILE_SEND } from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";
import ErrorHandler from "../../../common/StatusHandler";
import CardContent from "@material-ui/core/CardContent";
import ApplicationDetailsDialog from "../../../common/ApplicationDetailsDialog";

const styles = {};

class ShopCancelledList extends Component {
  state = {
    shops: [],
    openMap: false,
    staffs: null,
    file: null,
    shop: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false
  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.getData();
    this.getStaffs();
  }

  getData = () => axios.get(SHOP_LIST, { params: { status: "cancelled" } })
    .then(res => this.processResult(res))
    .catch(err => this.setGlobal({ errorMsg: err.toString() }))
    .then(() => this.setGlobal({ loading: false }));

  getStaffs = () => axios.get(GET_STAFF).then(res => this.setState({ staffs: res.data.data.staffs }));

  processResult = (res) => {
    if (res.data.status) this.setState({ loading: false, shops: res.data.data.shops });
    else this.setGlobal({ errorMsg: res.data.messages });
  };

  closeViewDialog = () => this.setState({ openViewDialog: false });

  viewDetails = (data) => this.setState({ openViewDialog: true, shop: data });

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));

  openAssignment = (data) => this.setState({ file: data, openAssignment: true });

  closeAssignment = () => this.setState({ file: null, openAssignment: false });

  takeFile = (data) => this.setState({ shop: data, openTakeFile: true });

  confirmTakeFile = () => axios.post(FILE_TAKE(this.state.shop.file.id))
    .then(() => this.props.history.push(DESK));

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), { recipient_id }).then(() => window.location.reload());

  render() {
    const { shop, shops, staffs, openTakeFile, openAssignment, openViewDialog, file } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8,
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
        name: "file",
        label: "CURRENT FILE LOCATION",
        options: {
          filter: false,
          customBodyRender: ({ desk }) => {
            return desk.staff ? desk.staff.name + " (" + desk.staff.designation + ")" : "Not Found";
          }
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
                <Tooltip title='Location of Shop'>
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
            title="SHOP: List of Cancelled Application"
            data={shops}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>}

        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({ openMap: false })} isMarkerShown={true}/>

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

export default withRouter(withStyles(styles)(ShopCancelledList));
