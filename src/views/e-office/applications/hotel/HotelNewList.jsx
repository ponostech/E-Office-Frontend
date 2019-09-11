import React, { Component } from "reactn";
import axios from "axios";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import moment from "moment";
import { FILE_CALL, GET_STAFF, HOTEL_LIST } from "../../../../config/ApiRoutes";
import HotelViewDialog from "./common/HotelViewDialog";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { DESK, FILE_DETAIL_ROUTE, FILE_SEND } from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";
import ErrorHandler from "../../../common/StatusHandler";
import CardContent from "@material-ui/core/CardContent";
import { ArrayToString } from "../../../../utils/ErrorUtil";

const styles = {};

class HotelNewList extends Component {
  state = {
    hotels: [],
    openMap: false,
    staffs: null,
    file: null,
    hotel: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false
  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.getData();
    this.getStaffs().then(res => this.setState({ staffs: res.data.data.staffs }));
  }

  getData = () => {
    axios.get(HOTEL_LIST,{ params: { status: "new" } })
      .then(res => this.processResult(res))
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setGlobal({ loading: false }));
  };

  processResult = (res) => {
    if (res.data.status) this.setState({ hotels: res.data.data.hotels });
    else this.setGlobal({ errorMsg: res.data.messages });
  };

  getStaffs = () => axios.get(GET_STAFF);

  closeViewDialog = () => this.setState({ openViewDialog: false });

  viewDetails = (data) => this.setState({ openViewDialog: true, hotel: data });

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));

  openAssignment = (data) => this.setState({ file: data.file, openAssignment: true });

  closeAssignment = () => this.setState({ file: null, openAssignment: false });

  takeFile = (data) => this.setState({ hotel: data, openTakeFile: true });

  confirmTakeFile = () => {
    console.log("hotel", this.state.hotel)
    this.setState({ openTakeFile: false });
    this.setGlobal({ loading: true });
    axios.post(FILE_CALL(this.state.hotel.file.id))
      .then((res) => {
        if (res.data.status) {
          this.setGlobal({ successMsg: ArrayToString(res.data.messages) });
          this.props.history.push(DESK);
        } else {
          this.setGlobal({ errorMsg: ArrayToString(res.data.messages) });
        }
      })
      .catch(err => this.setGlobal({ errorMsg:err.toString() }))
      .finally(() => this.setGlobal({ loading: false }));
  };

  sendFile = (id, recipient_id) => {
    this.setState({ openAssignment: false });
    this.setGlobal({ laoding: true });
    axios.post(FILE_SEND(id), { recipient_id })
      .then(res=>{
        if (res.data.status) {
           window.location.reload();
           this.setGlobal({successMsg:ArrayToString(res.data.messages)})
        }else{
           this.setGlobal({errorMsg:ArrayToString(res.data.messages)})
        }
      })
      .catch(err=>this.setGlobal({errorMsg:err.toString()}))
      .then(() => window.location.reload());
  };

  render() {
    const { hotel, hotels, staffs, openTakeFile, openAssignment, openViewDialog, file, openMap } = this.state;
    const tableOptions = {
      filterType: "checkbox",
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
        label: "HOTEL NAME"
      },
      {
        name: "local_council",
        label: "PROPOSED LOCATION",
        options: {
          customBodyRender: (value) => value.name
        }
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
            let data = hotels[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);
            return (
              <div>
                <Tooltip title={"View File"}>
                  <IconButton href={"#"} color="primary" size="medium"
                              aria-label="View File" onClick={this.viewFile.bind(this, data)}>
                    <Icon fontSize="small">folder</Icon>
                  </IconButton>
                </Tooltip>

                <Tooltip title={"View Location"}>
                  <IconButton size="medium" href={"#"} onClick={e => this.setState({ openMap: true, lat: lat, lng: lng })}>
                    <Icon fontSize="small">pin_drop</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"View Details"}>
                  <IconButton href={"#"} color="primary" size="medium"
                              aria-label="View Details" onClick={this.viewDetails.bind(this, data)}>
                    <Icon fontSize="small">remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Assign to Officer/Staff"}>
                  <IconButton href={"#"} variant="contained" color="secondary"
                              size="medium" onClick={this.openAssignment.bind(this, data)}>
                    <Icon fontSize="small">send</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Call file">
                  <IconButton href={"#"} variant="contained" color="secondary"
                              size="medium" onClick={this.takeFile.bind(this, data)}>
                    <Icon fontSize="small">desktop_mac</Icon>
                  </IconButton>
                </Tooltip>
              </div>
            );
          }
        }
      }
    ];

    return (
      <>
        {this.global.loading ? <LoadingView/> : <CardContent>
          <MUIDataTable
            title={"HOTEL/LODGING: List of New Application"}
            data={hotels}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>}

        {openMap && <GMapDialog viewMode={true} open={openMap} lat={this.state.lat} lng={this.state.lng}
                                onClose={() => this.setState({ openMap: false })} isMarkerShown={true}/>}

        {openViewDialog &&
        <HotelViewDialog open={openViewDialog} close={this.closeViewDialog} data={hotel}/>}

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

export default withRouter(withStyles(styles)(HotelNewList));
