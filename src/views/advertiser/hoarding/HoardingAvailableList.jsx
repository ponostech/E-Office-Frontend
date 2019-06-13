import React, { Component } from "reactn";
import Grid from "@material-ui/core/Grid";

import MUIDataTable from "mui-datatables";
import { HoardingService } from "../../../services/HoardingService";
import { IconButton, Tooltip } from "@material-ui/core";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import CheckIcon from "@material-ui/icons/CheckBox";
import moment from "moment";
import HoardingApplicationDialog from "../../common/HoardingApplicationDialog";
import HoardingApplyDialog from "./form/HoardingApplyDialog";
import { DocumentService } from "../../../services/DocumentService";
import LoadingView from "../../common/LoadingView";
import HoardingDetailDialog from "../../e-office/applications/hoarding/HoardingDetailDialog";
import HoardingViewDialog from "../../e-office/applications/hoarding/common/HoardingViewDialog";

class HoardingAvailableList extends Component {
  hoardingService = new HoardingService();
  documentService = new DocumentService();
  state = {
    hoarding: null,
    hoardings: [],
    openDetail: false,
    openApply: false,
    advertiserDocuments: [],
  };


  componentDidMount() {
    document.title = "e-AMC | List of hoarding application";
    const self = this;
    Promise.all([this.fetchHoardings(), this.fetchDocument()])
      .finally(() => {
        self.setGlobal({ loading: false });
      });
  }

  fetchHoardings = async () => {
    await this.hoardingService.fetchAdvertiserHoarding(errorMsg => this.setGlobal({ errorMsg }),
      hoardings => this.setState({ hoardings }));
  };
  fetchDocument = async () => {
    await this.documentService.fetch("advertiser",
      errorMsg => this.setGlobal({ errorMsg }),
      advertiserDocuments => this.setState({ advertiserDocuments }))
      .finally(() => console.info("Document attachment fetch successfully"));
  };
  applyHoarding = (data) => {
    this.setState({ openApply: false });
    //TODO:: business logic to apply hoarding
    this.setGlobal({ successMsg: "You have applied hoarding successfully" });

  };

  render() {
    const tableColumns = [
      {
        name: "created_at",
        label: "DATE",
        options: {
          customBodyRender: (date) => {
            return moment(date).format("Do MMM YYYY");
          }
        }
      }, {
        name: "hoarding",
        label: "FILE NUMBER",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (value.file.number);
          }
        }
      }, {
        name: "hoarding",
        label: "SUBJECT",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (value.file.subject);
          }
        }
      }, {
        name: "hoarding",
        label: "PURPOSED LOCATION",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            return (hoarding.address);
          }
        }
      }, {
        name: "hoarding",
        label: "LOCAL COUNCIL",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            return (hoarding.local_council.name);
          }
        }
      }, {
        name: "hoarding",
        label: "ACTIONS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const file = this.state.hoardings[rowIndex];
            let viewBtn = (
              <>
                <Tooltip title={"Click here to view details"}>
                  <IconButton onClick={(e) => {
                    this.setState({ hoarding: file });
                    this.setState({ openDetail: true });
                  }}>
                    <EyeIcon color={"primary"} fontSize={"small"}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to apply hoarding"}>
                  <IconButton onClick={(e) => {
                    this.setState({ openApply: true, hoarding: file });
                  }}>

                    <CheckIcon fontSize={"small"} color={"primary"}/>
                  </IconButton>
                </Tooltip>
              </>
            );

            return (viewBtn);
          }
        }
      }
    ];

    const tableOptions = {
      filterType: "dropdown",
      rowsPerPage: 15,
      serverSide: false,
      resposive: "scroll",
      selectableRows: false,
      customToolbarSelect: function(selectedRows, displayData, setSelectedRows) {
        return false;
      },
      onRowClick: function(rowData, rowMeta) {
      }
    };

    return (
      <>
        {
          this.global.loading ? <LoadingView/> :
            <Grid item sm={12} xs={12} md={12}>
              <MUIDataTable
                title={"Hoarding: List of Available Hoardings"}
                data={this.state.hoardings}
                columns={tableColumns}
                options={tableOptions}
              />
              <HoardingApplyDialog documents={this.state.advertiserDocuments} open={this.state.openApply}
                                   onClose={() => this.setState({ openApply: false })}
                                   onConfirm={this.applyHoarding.bind(this)} application={this.state.hoarding}/>
              {/*<HoardingApplicationDialog open={this.state.openDetail} application={this.state.hoarding}*/}
              {/*                           onClose={e => this.setState({ hoarding: null, openDetail: false })}/>*/}
              <HoardingViewDialog open={this.state.openDetail} data={this.state.hoarding} close={e=>this.setState({openDetail:false})}/>

            </Grid>
        }


      </>
    );
  }
}

export default HoardingAvailableList;
