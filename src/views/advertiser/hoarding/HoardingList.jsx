import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import HoardingDetailDialog from "./HoardingDetailDialog";
import ApplyHoardingDialog from "./form/ApplyHoardingDialog";
import { HoardingService } from "../../../services/HoardingService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import axios from "axios";
import { ApiRoutes } from "../../../config/ApiRoutes";
import { Chip, IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import moment from "moment";

class HoardingList extends Component {
  hoardingService = new HoardingService();

  state = {
    hoarding:{},
    hoardings: [],
    openDetail: false,
    openApply: false,
    errorMessage: ""
  };


  componentDidMount() {
    document.title = "e-AMC | List of hoarding application";

    const { doLoad, doLoadFinish } = this.props;

    doLoad();
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    axios.get(ApiRoutes.GET_ADVERTISER_HOARDING, config)
      .then(res => {
        console.log(res.data.data.hoarding_applications)
        this.setState({
          hoardings: res.data.data.hoarding_applications
        });
      })
      .catch(err => {
        console.error(err);
      })
      .finally(()=>{
        doLoadFinish()
      })
  }


  render() {
    const { history } = this.props;
    const tableColumns = [
       {
        name: "applicant",
        label: "APPLICANT",
        options:{
          customBodyRender: (applicant, tableMeta, updateValue) => {
            return (applicant.advertiser.name);
          }
        }
      }, {
        name: "file",
        label: "FILE ID",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (value.number);
          }
        }
      } ,{
        name: "file",
        label: "SUBJECT",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (value.subject);
          }
        }
      },{
        name: "status",
        label: "STATUS",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            let color = "default";
            switch (value) {
              case "new":
                color = "default";
                break
              case "rejected":
                color = "secondary";
                break;
              case "granted":
                color="primary"

            }
            let chip=(
              <Chip label={value} title={value} color={color}/>
            )
            return chip
          }
        }
      },{
        name: "created_at",
        label: "Date",
        options: {
          customBodyRender:(date)=>{
            const d=moment(date).format("DD/MM/YYYY")
            return d.toString()
          }
        }
      },{
        name: "hoarding",
        label: "ACTIONS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            let viewBtn = (
              <Tooltip title={"Click here to view details"}>
                <IconButton onClick={(e)=>{
                  this.setState({hoarding,openDetail:true})
                }}>
                  <EyeIcon/>
                </IconButton>
              </Tooltip>
            );

            return (viewBtn);
          }
        }
      }
    ];

    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 15,
      serverSide: false,
      customToolbarSelect: function(selectedRows, displayData, setSelectedRows) {
        return false;
      },
      onRowClick: function(rowData, rowMeta) {
      }
    };

    return (
      <>
        <Grid item sm={12} xs={12} md={12}>
          <MUIDataTable
            title={"Hoarding: List of applications"}
            data={this.state.hoardings}
            columns={tableColumns}
            options={tableOptions}
          />
          <ApplyHoardingDialog open={this.state.openApply} onClose={(e) => this.setState({ openApply: false })}/>
          <HoardingDetailDialog
            hoarding={this.state.hoarding}
            open={this.state.openDetail} onClose={(e) => this.setState({ openDetail: false })}/>
          <OfficeSnackbar open={Boolean(this.state.errorMessage)} onClose={() => this.setState({ errorMessage: "" })}
                          variant={"error"} message={this.state.errorMessage}/>
        </Grid>

      </>
    );
  }
}

export default HoardingList;
