import React, { Component } from "reactn";
import axios from "axios";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import moment from "moment";
import { FILE_CALL, GET_STAFF, HOTEL_LIST } from "../../../../config/ApiRoutes";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { DESK, FILE_DETAIL_ROUTE, FILE_SEND } from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";
import ErrorHandler from "../../../common/StatusHandler";
import CardContent from "@material-ui/core/CardContent";
import ApplicationDetailsDialog from "../../../common/ApplicationDetailsDialog";

const styles = {};

class HotelResubmitList extends Component {
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
    this.getStaffs();
  }

  getData = () => axios.get(HOTEL_LIST, { params: { status: "resubmit" } })
    .then(res => this.processResult(res))
    .catch(err => this.setGlobal({ errorMsg: err.toString() }))
    .then(() => this.setGlobal({ loading: false }));

  getStaffs = () => axios.get(GET_STAFF).then(res => this.setState({ staffs: res.data.data.staffs }));

  processResult = (res) => {
    if (res.data.status) this.setState({ loading: false, hotels: res.data.data.hotels });
    else this.setGlobal({ errorMsg: res.data.messages });
  };

  closeViewDialog = () => this.setState({ openViewDialog: false });

  viewDetails = (data) => this.setState({ openViewDialog: true, hotel: data });

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));

  openAssignment = (data) => this.setState({ file: data, openAssignment: true });

  closeAssignment = () => this.setState({ file: null, openAssignment: false });

  takeFile = (data) => this.setState({ hotel: data, openTakeFile: true });

  confirmTakeFile = () => axios.post(FILE_CALL(this.state.hotel.file.id))
    .then(() => this.props.history.push(DESK));

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), { recipient_id }).then(() => window.location.reload());

  render() {
    const { hotel, hotels, staffs, openTakeFile, openAssignment, openViewDialog, file } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "owner",
        label: "APPLICANT"
      },
      {
        name: "phone",
        label: "CONTACT"
      },
      {
        name: "name",
        label: "HOTEL NAME"
      },
      {
        name: "address",
        label: "PROPOSED LOCATION"
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
            const { rowIndex } = tableMeta;
            let data = hotels[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);
            return (
              <>
                <Tooltip title="View File">
                  <IconButton color="primary" size="medium"
                              aria-label="View File" onClick={this.viewFile.bind(this, data)}>
                    <Icon fontSize="small">folder</Icon>
                  </IconButton>
                </Tooltip>
                <IconButton size='medium' onClick={e => this.setState({ openMap: true, lat: lat, lng: lng })}>
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
      }
    ];

    return (
      <>
        {this.global.loading ? <LoadingView/> : <CardContent>
          <MUIDataTable
            title={"HOTEL/LODGING: List of Resubmitted Application"}
            data={hotels}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>}

        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({ openMap: false })} isMarkerShown={true}/>

        {openViewDialog &&
        <ApplicationDetailsDialog type={hotel.file.fileable_type} open={openViewDialog} title='View Application Details'
                                  application={hotel}
                                  file={hotel.file}
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

export default withRouter(withStyles(styles)(HotelResubmitList));
