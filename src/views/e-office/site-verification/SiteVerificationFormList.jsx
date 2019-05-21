import React, { Component } from "react";
import moment from "../applications/hoarding/HoardingNewList";
import { Fab, Grid, Icon, IconButton } from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import MUIDataTable from "mui-datatables";
import { SITE_VERIFICATION, SITE_VERIFICATION_LIST } from "../../../config/routes-constant/OfficeRoutes";
import AddIcon from '@material-ui/icons/Add'
class SiteVerificationFormList extends Component {

  constructor(props) {
    super(props);

    this.state={
      tableData: [],
      selectedData:null,

      openDelete:false,
      loading:false
    }
  }

  render() {
    const { tableData, loading } = this.state;

    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8,
      serverSide: false,
    };

    const tableColumns = [
      {
        name: "applicant",
        label: "APPLICANT",
        options: {
          customBodyRender: function (value) {
            return value.advertiser.name;
          }
        }
      },
      {
        name: "applicant",
        label: "APPLICANT TYPE",
        options: {
          customBodyRender: value => value.advertiser.type.toUpperCase()
        }
      },
      {
        name: 'created_at',
        label: 'APPLICATION DATE',
        options: {
          customBodyRender: value => moment(value).format("Do MMMM YYYY")
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
            let data = tableData[rowIndex];
            return (
              <div>
                <IconButton color="action" size="small"
                            aria-label="View Details" onClick={this.viewDetails.bind(this, data)}>
                  <Icon fontSize="small">remove_red_eye</Icon>
                </IconButton>
                <IconButton variant="contained" color="primary"
                            size="small" onClick={this.edit.bind(this, data)}>
                  <Icon fontSize="small">edit</Icon>
                </IconButton>
                <IconButton variant="contained" color="secondary"
                            size="small" onClick={e=>this.setState({openDelete:true})}>
                  <Icon fontSize="small">delete_forever</Icon>
                </IconButton>
              </div>
            );
          }
        }
      },
    ];
    return (
      <>
      {
        loading ? <LoadingView/> :
          <div>

          <MUIDataTable
            title={"SITE VERIFICATION: List of site verification form"}
            data={tableData}
            columns={tableColumns}
            options={tableOptions}
          />
            <Fab style={{position:"absolute",bottom:50,right:50}} href={SITE_VERIFICATION} color={"primary"}><AddIcon/></Fab>
          </div>
      }
      </>
    );
  }
}

export default SiteVerificationFormList;