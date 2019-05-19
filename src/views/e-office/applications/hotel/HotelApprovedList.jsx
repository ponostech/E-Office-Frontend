import React from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/core/styles";
import {Icon, IconButton, Grid} from "@material-ui/core";
import moment from "moment";
import { HOTEL_LIST, FILE_TAKE, GET_STAFF, ADVERTISER_LIST } from "../../../../config/ApiRoutes";
import HotelViewDialog from "./common/HotelViewDialog";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import {DESK, FILE_SEND} from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";

const styles = {
  button: {},
  actionIcon: {}
};

class HotelApprovedList extends React.Component {
  state = {
    hotels: [],
    openMap: false,
    staffs: null,
    file: null,
    hotel: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false,
    loading: true,
  };

  componentDidMount() {
    this.props.doLoad(true);
    this.getData();
    this.getStaffs().then(res => this.setState({staffs: res.data.data.staffs}));
  }

  getData = () => axios.get(HOTEL_LIST, {params: {status: 'approve'}})
    .then(res => this.processResult(res))
    .catch(err => this.setState({errorMsg: err.toString()}))
    .then(() => this.doLoad(false));

  getStaffs = () => axios.get(GET_STAFF);

  processResult = (res) => {
    if (res.data.status) this.setState({loading: false, hotels: res.data.data.hotels});
    this.props.doLoad(false);
  };

  closeViewDialog = () => this.setState({openViewDialog: false});

  viewDetails = (data) => this.setState({openViewDialog: true, hotel: data});

  openAssignment = (data) => this.setState({file: data, openAssignment: true});

  closeAssignment = () => this.setState({file: null, openAssignment: false});

  takeFile = (data) => this.setState({hotel: data, openTakeFile: true});

  confirmTakeFile = () => axios.post(FILE_TAKE(this.state.hotel.file.id))
    .then(res => this.props.history.push(DESK));

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), {recipient_id}).then(res => window.location.reload());

  render() {
    const {classes} = this.props;
    const {loading, hotel, hotels, staffs, openTakeFile, openAssignment, openViewDialog, file} = this.state;
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
            let data = hotels[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);
            return (
              <div>
                <IconButton onClick={e => this.setState({openMap: true, lat: lat, lng: lng})}>
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
                <IconButton variant="contained" color="primary"
                            size="small" onClick={this.takeFile.bind(this, data)}>
                  <Icon fontSize="small">desktop_mac</Icon>
                </IconButton>
              </div>
            );
          }
        }
      },
    ];

    return (
      <>
        {loading ? <LoadingView/> : <Grid item xs={12}>
          <MUIDataTable
            title={"HOTEL/LODGING: List of Approved Applications"}
            data={hotels}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>}
        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({openMap: false})}
                    isMarkerShown={true}
        />
        {openViewDialog &&
        <HotelViewDialog open={openViewDialog} close={this.closeViewDialog}
                         data={hotel}/>}

        {openAssignment && staffs &&
        <FileSendDialog onSend={this.sendFile} staffs={staffs} open={openAssignment}
                        onClose={this.closeAssignment} file={file}
                        props={this.props}/>}

        {openTakeFile &&
        <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                       onCancel={() => this.setState({openTakeFile: false})} open={openTakeFile}
                       onConfirm={this.confirmTakeFile}/>}
      </>
    );
  }
}

export default withRouter(withStyles(styles)(HotelApprovedList));
