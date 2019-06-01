import React, {Component} from "reactn";
import {withRouter} from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import MUIDataTable from "mui-datatables";
import {Grid, Icon, IconButton, Tooltip} from "@material-ui/core";
import {ApiRoutes} from "../../../config/ApiRoutes";
import {FILE_DETAIL_ROUTE} from "../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../common/LoadingView";
import ErrorHandler from "../../common/StatusHandler";

class DeskFiles extends Component {
  state = {
    tableData: [],
  };

  componentDidMount() {
    this.getFiles();
  }

  getFiles = () => {
    axios.get(ApiRoutes.DESK)
        .then(res => this.processResult(res))
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setGlobal({loading: false}));
  };

  processResult = (res) => {
    if (res.data.status) this.setState({tableData: res.data.data.files});
    else this.setGlobal({errorMsg: res.data.messages});
  };

  viewDetail = (id) => this.props.history.push(FILE_DETAIL_ROUTE(id));

  render() {
    const {tableData, loading} = this.state;

    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 10,
      serverSide: false,
    };

    const tableColumns = [
      {
        name: "number",
        label: "FILE NUMBER",
      },
      {
        name: "subject",
        label: "SUBJECT",
      },
      {
        name: "updated_at",
        label: "RECEIVED ON",
        options: {
          filter: false,
          customBodyRender: (value) => {
            return moment(value).format("Do MMMM YYYY");
          }
        }
      },
      {
        name: "branch",
        label: "BRANCH",
      },
      {
        name: "id",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value) => {
            return (
                <Tooltip title="View Details">
                  <IconButton color="primary" size="small"
                              aria-label="View Details" onClick={this.viewDetail.bind(this, value)}>
                    <Icon fontSize="small">remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
            );
          }
        }
      },
    ];

    const files =
        <Grid item xs={12}>
          <MUIDataTable title={"Desk: List of Files"} data={tableData} columns={tableColumns} options={tableOptions}/>
        </Grid>;

    return (
        <>
          {this.global.loading ? <LoadingView/> : files}
          {this.global.errorMsg && <ErrorHandler/>}
        </>
    )
  }
}

export default withRouter(DeskFiles);