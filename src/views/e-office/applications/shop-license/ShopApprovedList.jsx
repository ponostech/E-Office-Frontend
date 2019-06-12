import React, {Component} from "reactn";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/core/styles";
import {Icon, IconButton, Grid, Tooltip} from "@material-ui/core";
import moment from "moment";
import { SHOP_LIST, FILE_TAKE, GET_STAFF, FILE_CALL } from "../../../../config/ApiRoutes";
import ShopViewDialog from "./common/ShopViewDialog";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import {DESK, FILE_DETAIL_ROUTE, FILE_SEND} from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";
import ErrorHandler from "../../../common/StatusHandler";
import CardContent from "@material-ui/core/CardContent"

const styles = {};

class ShopInProcessList extends Component {
  state = {
    shops: [],
    openMap: false,
    staffs: null,
    file: null,
    shop: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false,
  };

  componentDidMount() {
    this.setState({loading: true});
    this.getData();
    this.getStaffs();
  }

  getData = () => axios.get(SHOP_LIST, {params: {status: 'approve'}})
      .then(res => this.processResult(res))
      .catch(err => this.setGlobal({errorMsg: err.toString()}))
      .then(() => this.setGlobal({loading: false}));

  getStaffs = () => axios.get(GET_STAFF).then(res => this.setState({staffs: res.data.data.staffs}));

  processResult = (res) => {
    if (res.data.status) this.setState({loading: false, shops: res.data.data.shops});
    else this.setGlobal({errorMsg: res.data.messages})
  };

  closeViewDialog = () => this.setState({openViewDialog: false});

  viewDetails = (data) => this.setState({openViewDialog: true, shop: data});

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));

  openAssignment = (data) => this.setState({file: data, openAssignment: true});

  closeAssignment = () => this.setState({file: null, openAssignment: false});

  takeFile = (data) => this.setState({shop: data, openTakeFile: true});

  confirmTakeFile = () => axios.post(FILE_CALL(this.state.shop.shop.file.id))
      .then(() => this.props.history.push(DESK));

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), {recipient_id}).then(() => window.location.reload());

  render() {
    const {shop, shops, staffs, openTakeFile, openAssignment, openViewDialog, file} = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8,
      serverSide: false,
    };

    const tableColumns = [
      {
        name: "owner",
        label: "APPLICANT",
      },
      {
        name: "owner_address",
        label: "OWNER ADDRESS",
      },
      {
        name: "name",
        label: "SHOP NAME",
      },
      {
        name: "address",
        label: "PROPOSED LOCATION",
      },
      {
        name: "created_at",
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
            const {rowIndex} = tableMeta;
            let data = shops[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);
            return (
                <>
                  <Tooltip title="View File">
                    <IconButton color="primary" size="small"
                                aria-label="View File" onClick={this.viewFile.bind(this, data)}>
                      <Icon fontSize="small">folder</Icon>
                    </IconButton>
                  </Tooltip>
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
                  <IconButton size='small' onClick={e => this.setState({openMap: true, lat: lat, lng: lng})}>
                    <Icon fontSize="small">pin_drop</Icon>
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
                title={"SHOP: List of Approved Applications"}
                data={shops}
                columns={tableColumns}
                options={tableOptions}
            />
          </CardContent>}

          <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                      onClose={() => this.setState({openMap: false})} isMarkerShown={true}/>

          {openViewDialog &&
          <ShopViewDialog open={openViewDialog} close={this.closeViewDialog} data={shop}/>}

          {openAssignment && staffs &&
          <FileSendDialog onSend={this.sendFile} staffs={staffs} open={openAssignment}
                          onClose={this.closeAssignment} file={file} props={this.props}/>}

          {openTakeFile &&
          <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                         onCancel={() => this.setState({openTakeFile: false})} open={openTakeFile}
                         onConfirm={this.confirmTakeFile}/>}

          {this.global.errorMsg && <ErrorHandler/>}
        </>
    );
  }
}

export default withRouter(withStyles(styles)(ShopInProcessList));
