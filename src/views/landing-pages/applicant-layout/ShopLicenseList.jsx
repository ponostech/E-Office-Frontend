import React, { Component } from "reactn";
import { Button, Icon, IconButton, Tooltip, Typography } from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import ApplicationState from "../../../utils/ApplicationState";
import Chip from "@material-ui/core/Chip";
import { APPLY_SHOP_LICENSE, HOME } from "../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { LicenseService } from "../../../services/LicenseService";
import GridContainer from "../../../components/Grid/GridContainer";
import moment from "moment";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SubmitDialog from "../../../components/SubmitDialog";


class ShopLicenseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      application: null,

      openConfirm:false,

      submit:false
    };

    this.licenseService = new LicenseService();
  }

  componentDidMount() {
    this.setState({applications:this.props.shops})
    this.setGlobal({loading:false})
  }

  withDraw=(data)=>{
    this.setState({openConfirm:true, application: data})
  }
  confirmWithdraw=(event)=>{
    const { application } = this.state;

    this.setState({openConfirm:false,submit:true});
    this.licenseService.cancelShopLicense(application.id,
      errorMsg=>this.setGlobal({errorMsg}),
      successMsg=>this.setGlobal({successMsg}))
      .final(()=>this.setState({submit:false}))
  }
  resubmit=(data)=>{
    console.log(data)
  }
  downloadLicense=(data)=>{
    console.log(data)
  }
  printLicense=(data)=>{
    console.log(data)
  }
  renewLicense=(data)=>{
    console.log(data)
  }
  submitNewApplication=(data)=>{
    const { history } = this.props;
    history.push(APPLY_SHOP_LICENSE)
  }
  render() {
    const { application, applications } = this.state;
    const { history,shops } = this.props;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 10,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "created_at",
        label: "APPLICATION DATE",
        options: {
          filter: false,
          customBodyRender: (value) => moment(value).format("Do MMMM YYYY")
        }
      },
      {
        name: "owner",
        label: "NAME OF APPLICANT"
      },
      {
        name: "name",
        label: "SHOP NAME"
      },
      {
        name: "local_council",
        label: "PROPOSED LOCATION",
        options: {
          customBodyRender: (value) => value.name
        }
      }, {
        name: "status",
        label: "STATUS",
        options: {
          customBodyRender: (status) => {
            let color;
            let name;
            switch (status) {
              case ApplicationState.NEW_APPLICATION:
                color = "#727272";
                name = "New";
                break;
              case ApplicationState.UNDER_PROCESS_APPLICATION:
                color = "#f8504b";
                name = "In Process";
                break;
              case ApplicationState.APPROVED_APPLICATION:
                color = "#27f88c";
                name = "Approved";
                break;
              case ApplicationState.CANCELLED_APPLICATION:
                color = "#4966a0";
                name = "Cancelled";
                break;
                case ApplicationState.REJECTED_APPLICATION:
                color = "#a03937";
                name = "Rejected";
                break;
              default:
                color="#f8f8f8";
                name = "Cancelled";
                break;
            }
            return <Chip component={"span"} variant={"outlined"} label={name} color={color}/>;
          }
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
    let notFound = (<GridContainer justify={"center"}>
      <Typography component={"div"} color={"inherit"} variant={"h6"}> No Result Found</Typography>
      <Button href={"#"} variant={"outlined"} onClick={e => history.push(HOME)} color={"primary"}>Back to Home</Button>
    </GridContainer>);
    let found = <>
      <MUIDataTable
        title={"SHOP LICENSING: List of Application"}
        data={shops}
        columns={tableColumns}
        options={tableOptions}/>
    </>;

    return (
      <>
        {this.global.loading ? <LoadingView/> :
          <CardContent>
            {/*{applications.length === 0 && notFound}/*/}
            {found}
          </CardContent>
        }
        <SubmitDialog open={this.state.submit} title={"Withdraw Application"} text={"Please wait ..."}/>
        <ConfirmDialog onCancel={e=>this.setState({openConfirm:false})} open={this.state.openConfirm} onConfirm={this.confirmWithdraw.bind(this)}/>
      </>
    );
  }
}

export default withRouter(ShopLicenseList);