import React from "react";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import {withStyles} from "@material-ui/core/styles";
import {Icon, IconButton, Grid} from "@material-ui/core";
import moment from "moment";
import {ADVERTISER_NEW_LIST, FILE_TAKE, GET_STAFF} from '../../../../config/ApiRoutes';
import AdvertiserViewDialog from "./common/AdvertiserViewDialog";
import FileSendDialog from "../../../common/SendDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import {DESK, FILE_SEND} from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";

const styles = {
  button: {},
  actionIcon: {}
};

class AdvertiserNewList extends React.Component {
  state = {
    advertisers: [],
    staffs: null,
    advertiser: null,
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

  getData = () => axios.get(ADVERTISER_NEW_LIST).then(res => this.processResult(res));

  getStaffs = () => axios.get(GET_STAFF).then(res => this.setState({staffs: res.data.data.staffs}));

  processResult = (res) => {
    if (res.data.status) this.setState({loading: false, advertisers: res.data.data.advertiser_applications});
    this.props.doLoad(false);
  };

  closeViewDialog = () => this.setState({openViewDialog: false});

  viewDetails = (data) => this.setState({openViewDialog: true, advertiser: data});

  openAssignment = (data) => this.setState({file: data, openAssignment: true});

  closeAssignment = () => this.setState({file: null, openAssignment: false});

  takeFile = (data) => this.setState({advertiser: data, openTakeFile: true});

  confirmTakeFile = () => axios.post(FILE_TAKE(this.state.advertiser.id))
      .then(res => {
        this.setState({openTakeFile: false});
        window.location.replace(DESK);
      });

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), {recipient_id}).then(res => window.location.reload());

  render() {
    const {loading} = this.state;
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
        name: "type",
        label: "APPLICANT TYPE",
        options: {
          customBodyRender: (value) => value.toUpperCase(),
        }
      },
      {
        name: "address",
        label: "ADDRESS",
      },
      {
        name: "created_at",
        label: "DATE OF APPLICATION",
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
            let data = this.state.advertisers[rowIndex];
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
                title={"ADVERTISER: List of New Application"}
                data={this.state.advertisers}
                columns={tableColumns}
                options={tableOptions}
            />
          </Grid>}

          {this.state.openViewDialog &&
          <AdvertiserViewDialog open={this.state.openViewDialog} close={this.closeViewDialog}
                                data={this.state.advertiser}/>}

          {this.state.openAssignment && this.state.staffs &&
          <FileSendDialog onSend={this.sendFile} staffs={this.state.staffs} open={this.state.openAssignment}
                          onClose={this.closeAssignment} file={this.state.file}
                          props={this.props}/>}

          {this.state.openTakeFile &&
          <ConfirmDialog primaryButtonText={"Confirm"} title={"Confirmation"} message={"Do you want to call this file?"}
                         onCancel={() => this.setState({openTakeFile: false})} open={this.state.openTakeFile}
                         onConfirm={this.confirmTakeFile}/>}
        </>
    );
  }
}

export default withStyles(styles)(AdvertiserNewList);
