import React, { Component } from "reactn";
import axios from "axios";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import moment from "moment";
import { ADVERTISER_LIST, FILE_TAKE, GET_STAFF } from "../../../../config/ApiRoutes";
import { DESK, FILE_DETAIL_ROUTE, FILE_SEND } from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import AdvertiserViewDialog from "../../applications/advertisers/common/AdvertiserViewDialog";

const styles = {
  button: {},
  actionIcon: {}
};

class AdvertiserList extends Component {
  state = {
    advertisers: [],
    advertiser: null,
    openViewDialog: false
  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.getData();
  }

  getData = () => {
    axios.get(ADVERTISER_LIST).then(res => this.processResult(res))
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setGlobal({ loading: false }));
  };

  processResult = (res) => {
    if (res.data.status) this.setState({ advertisers: res.data.data.advertiser_applications });
  };

  closeViewDialog = () => this.setState({ openViewDialog: false });

  viewDetails = (data) => this.setState({ openViewDialog: true, advertiser: data });

  viewFile = (data) => this.props.history.push(FILE_DETAIL_ROUTE(data.file.id));

  openAssignment = (data) => this.setState({ file: data, openAssignment: true });

  closeAssignment = () => this.setState({ file: null, openAssignment: false });

  takeFile = (data) => this.setState({ advertiser: data, openTakeFile: true });

  confirmTakeFile = () => axios.post(FILE_TAKE(this.state.advertiser.file.id))
    .then(() => this.props.history.push(DESK));

  sendFile = (id, recipient_id) => axios.post(FILE_SEND(id), { recipient_id }).then(() => window.location.reload());

  render() {
    const { advertiser, advertisers, staffs, openTakeFile, openAssignment, openViewDialog, file } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "name",
        label: "APPLICANT"
      },
      {
        name: "type",
        label: "APPLICANT TYPE",
        options: {
          customBodyRender: (value) => value.toUpperCase()
        }
      },
      {
        name: "address",
        label: "ADDRESS"
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
            const { rowIndex } = tableMeta;
            let data = advertisers[rowIndex];
            return (
              <div>
                {data.file ? <>
                  <Tooltip title="View Details">
                    <IconButton color="primary" size="medium"
                                aria-label="View Details" onClick={this.viewDetails.bind(this, data)}>
                      <Icon fontSize="small">remove_red_eye</Icon>
                    </IconButton>
                  </Tooltip>
                </> : null}
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
            title={"ADVERTISER: List of Registered Advertiser"}
            data={advertisers}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>}

        {openViewDialog &&
        <AdvertiserViewDialog open={openViewDialog} close={e=>this.setState({openViewDialog: false})}
                              data={advertiser}/>}

      </>
    );
  }
}

export default withRouter(withStyles(styles)(AdvertiserList));
