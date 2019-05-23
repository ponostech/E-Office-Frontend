import React from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/core/styles";
import {Icon, IconButton, Grid} from "@material-ui/core";
import moment from "moment";
import { BANNER_LIST, FILE_TAKE, GET_STAFF } from "../../../../config/ApiRoutes";
import BannerViewDialog from "./common/BannerViewDialog";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import {DESK, FILE_SEND} from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";

const styles = {
  button: {},
  actionIcon: {}
};

class BannerUnderProcessList extends React.Component {
  state = {
    banners: [],
    openMap: false,
    staffs: null,
    file: null,
    banner: null,
    openAssignment: false,
    openTakeFile: false,
    openViewDialog: false,
    loading: true,
  };

  componentDidMount() {
    this.props.doLoad(true);
    this.getData();
    this.getStaffs();
  }
  getData = () => axios.get(BANNER_LIST, {params: {status: 'in-process'}})
    .then(res => this.processResult(res))
    .catch(err => this.setState({errorMsg: err.toString()}))
    .then(() => this.doLoad(false));

  getStaffs = () => axios.get(GET_STAFF).then(res => this.setState({staffs: res.data.data.staffs}));

  processResult = (res) => {
    if (res.data.status) this.setState({loading: false, banners: res.data.data.banners});
    this.props.doLoad(false);
  };

  closeViewDialog = () => this.setState({openViewDialog: false});

  viewDetails = (data) => this.setState({openViewDialog: true, banner: data});

  openAssignment = (data) => this.setState({file: data, openAssignment: true});

  closeAssignment = () => this.setState({file: null, openAssignment: false});

  takeFile = (data) => this.setState({banner: data, openTakeFile: true});

  confirmTakeFile = () => axios.post(FILE_TAKE(this.state.banner.file.id))
    .then(res => this.props.history.push(DESK));

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), {recipient_id}).then(res => window.location.reload());

  render() {
    const {classes} = this.props;
    const {loading, banner, banners, staffs, openTakeFile, openAssignment, openViewDialog, file} = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8,
      serverSide: false,
    };

    const tableColumns = [
      {
        name: "name",
        label: "APPLICANT",
      },
      {
        name: "address",
        label: "OWNER ADDRESS",
      },
      {
        name: "applicant_type",
        label: "APPLICANT TYPE",
      },
      {
        name: "advertisement_type",
        label: "TYPE OF ADVERTISEMENTS",
      },
      {
        name: "advertisement_count",
        label: "NO OF ADVERTISEMENTS",
      },
      {
        name: "local_council",
        label: "LOCAL COUNCIL.",
        options: {
          customBodyRender: (local_council, tableMeta, updateValue) => {
            return (
              local_council.name
            );
          }
        }
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
            let data = banners[rowIndex];
            return (
              <div>
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
            title={"Banner: List of Under Process Application"}
            data={banners}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>}
        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({openMap: false})}
                    isMarkerShown={true}
        />
        {openViewDialog &&
        <BannerViewDialog open={openViewDialog} close={this.closeViewDialog}
                        data={banner}/>}

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

export default withRouter(withStyles(styles)(BannerUnderProcessList));
