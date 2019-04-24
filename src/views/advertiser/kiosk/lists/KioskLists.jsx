import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

import MUIDataTable from "mui-datatables";
import KioskDetailDialog from "../KioskDetailDialog";
import { ApiRoutes } from "../../../../config/ApiRoutes";
import axios from "axios";

class KioskLists extends Component {
  state = {
    openDetail: false,
    data:[]
  };

  componentDidMount() {
    const token = localStorage.getItem("access_token");
    const config={ headers: {"Authorization" : `Bearer ${token}`} }
    axios.get(ApiRoutes.GET_ADVERTISER_KIOSKS, config)
      .then(res => {
        console.log(res);
      })
      .catch(err => {

      });
  }

  render() {
    const tableColumns = [
      {
        name: "id",
        label: "File ID",
        options: {
          filter: false,
          display: false
        }
      },
      {
        name: "application_no",
        label: "File Number",
        options: {
          filter: false
        }
      }

    ];

    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 8,
      serverSide: false,
      customToolbarSelect: function(selectedRows, displayData, setSelectedRows) {
        return false;
      },
      onRowClick: function(rowData, rowMeta) {
        console.log(rowData);
      }
    };

    return (
      <>
        <Grid item sm={12} xs={12} md={12}>
          <MUIDataTable
            title={"Kiosk: List of applications"}
            data={this.state.data}
            columns={tableColumns}
            options={tableOptions}
          />
          <KioskDetailDialog open={this.state.openDetail} onClose={(e) => this.setState({ openDetail: false })}/>
        </Grid>
      </>
    );
  }
}

export default withRouter(KioskLists);
