import React, {Component} from "react";
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
  doLoad = this.props.doLoad;
  state = {
    tableData: [],
    loading: true,
    errorMsg: "",
  };

  componentDidMount() {
    this.doLoad(true);
    this.getFiles();
  }

  processResult = (res) => {
    if (res.data.status) this.setState({tableData: res.data.data.files, loading: false});
    else this.setState({errorMsg: res.data.messages, loading: false});
  };

  getFiles = () => {
    axios.get(ApiRoutes.DESK)
        .then(res => this.processResult(res))
        .catch(err => this.setState({errorMsg: err.toString(), loading: false}))
        .then(() => this.doLoad(false));
  };

  viewDetail = (id) => this.props.history.push(FILE_DETAIL_ROUTE(id));

  render() {
    const {tableData, loading, errorMsg} = this.state;

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
          customBodyRender: (value, meta, updateValue) => {
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
          customBodyRender: (value, tableMeta, updateValue) => {
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
          {loading ? <LoadingView/> : files}
          {errorMsg && <ErrorHandler messages={errorMsg}/>}
        </>
    )
  }
}

export default withRouter(DeskFiles);