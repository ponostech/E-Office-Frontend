import React, { Component } from "reactn";
import moment from "../../e-office/applications/shop-license/ShopNewList";
import { Button, Icon, IconButton, Tooltip, Typography } from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import ApplicationState from "../../../utils/ApplicationState";
import Chip from "@material-ui/core/Chip";
import { LicenseService } from "../../../services/LicenseService";
import { HOME } from "../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import BannerViewDialog from "../../e-office/applications/banners/common/BannerViewDialog";


class BannerList extends Component {
  constructor(props) {
    super(props);
    this.state={
      applications: [],
      application: null,

      view:false,
      renew:false
    }
    this.licenseService=new LicenseService();
  }

  componentDidMount() {
    const {mobile_no} = this.props.match.params;
    this.setGlobal({ loading: true});
    this.licenseService.checkBanner(mobile_no,
      errorMsg=>this.setGlobal({errorMsg}),
      applications=>this.setState({applications}))
      .finally(()=>this.setGlobal({loading:false}))

  }

  render() {
    const {application, applications} = this.state;
    const {history} = this.props;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 10,
      serverSide: false,
    };

    const tableColumns = [
      {
        name: "name",
        label: "APPLICANT",
      },
      {
        name: "owner_address",
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
        name: "status",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (status, tableMeta) => {
            const { rowIndex } = tableMeta;
            let data = applications[rowIndex];
            let controls = undefined;
            let view = <>
              <Tooltip title={"View Application details"}>
                <IconButton href={"#"} onClick={e => this.setState({ view: true })}>
                  <Icon fontSize={"small"}>remove_red_eye</Icon>
                </IconButton>
              </Tooltip>
            </>;
            switch (status) {
              case ApplicationState.NEW_APPLICATION:
                controls = <>
                  {view}
                  <Tooltip title={"Withdraw Application"}>
                    <IconButton href={"#"} onClick={this.withDraw.bind(this, data)}>
                      <Icon fontSize={"small"}>close</Icon>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
              case ApplicationState.APPROVED_APPLICATION:
                controls = <>
                  {view}
                  <Tooltip title={"Download License"}>
                    <IconButton href={"#"} onClick={this.downloadLicense.bind(this, data)}>
                      <Icon fontSize={"small"} color={"primary"}>cloud_download</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Print License"}>
                    <IconButton href={"#"} onClick={this.printLicense.bind(this, data)}>
                      <Icon fontSize={"small"} color={"primary"}>print</Icon>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
              case ApplicationState.EXPIRED_LICENSE:
                controls = <>
                  {view}
                  <Tooltip title={"Renew License"}>
                    <IconButton href={"#"} onClick={this.renewLicense.bind(this, data)}>
                      <Icon fontSize={"small"}color={"primary"}>refresh</Icon>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
              case ApplicationState.REJECTED_APPLICATION:
                controls = <>
                  {view}
                  <Tooltip title={"Submit New Applications"}>
                    <IconButton href={"#"} onClick={this.submitNewApplication.bind(this, data)}>
                      <Icon fontSize={"small"}color={"primary"}>save</Icon>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
              case ApplicationState.SEND_BACK:
                controls = <>
                  {view}
                  <Tooltip title={"Re Submit Application"}>
                    <IconButton href={"#"} onClick={this.resubmit.bind(this, data)}>
                      <Icon fontSize={"small"} color={"primary"}>send</Icon>
                    </IconButton>
                  </Tooltip>
                </>;
                break;

            }
            return (
              controls
            );
          }
        }
      }
    ];

    let notFound= (<div style={{display:"flex",alignItems:"center",justifyContent:"center",direction:"row"}}>
      <Typography component={"div"} color={"inherit"} variant={"h6"}> No Result Found</Typography>
      <Button href={"#"} variant={"outlined"} onClick={e=>history.push(HOME)} color={"primary"}>Back to Home</Button>
    </div>);

    let found= <>
      <MUIDataTable
        title={"BANNER: List of Application"}
        data={applications}
        columns={tableColumns}
        options={tableOptions}/>
    </>;

    return (
      <>
        {this.global.loading && <LoadingView/>}
        <CardContent>
          {applications.length===0 && notFound}
          {applications.length!==0 && found}
        </CardContent>

        <BannerViewDialog data={application} close={()=>this.setState({view:false})} open={this.state.view} />
      </>
    );
  }
}

export default withRouter(BannerList);