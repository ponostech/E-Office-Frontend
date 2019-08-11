import React, {Component} from "reactn";
import {Button, Icon, IconButton, Tooltip, Typography} from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import ApplicationState from "../../../utils/ApplicationState";
import Chip from "@material-ui/core/Chip";
import {APPLY_SHOP_LICENSE, HOME} from "../../../config/routes-constant/OfficeRoutes";
import {withRouter} from "react-router-dom";
import {LicenseService} from "../../../services/LicenseService";
import GridContainer from "../../../components/Grid/GridContainer";
import moment from "moment";
import SubmitDialog from "../../../components/SubmitDialog";
import ResubmitShopApplicationDialog from "../../shop/ResubmitShopApplicationDialog";
<<<<<<< HEAD
import { ShopService } from "../../../services/ShopService";
=======
import {ShopService} from "../../../services/ShopService";
import ShopApplicationDialog from "../../common/ShopApplicationDialog";
>>>>>>> e7ac09cb8b851ceea9128261dd33c2eb01617cc6
import ApplicationDetailsDialog from "../../common/ApplicationDetailsDialog";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import RenewShopLicenseDialog from "../../shop/RenewShopLicenseDialog";

class ShopLicenseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application: null,
      openConfirm: false,
      openResubmit: false,
<<<<<<< HEAD
      openRenew:false,
      openDetail: false,

=======
      openDetail: false,
>>>>>>> e7ac09cb8b851ceea9128261dd33c2eb01617cc6
      submit: false,
      submitTitle: "Submit"
    };
    this.licenseService = new LicenseService();
    this.shopService = new ShopService();
  }

  withDraw = (data) => {
    this.setState({openConfirm: true, application: data});
  };

  downloadLicense = (data) => {
    console.log(data);
  };

  printLicense = (data) => {
    console.log(data);
  };

  renewLicense = (data) => {
    console.log(data);
  };

  submitNewApplication = (data) => {
    const {history} = this.props;
    history.push(APPLY_SHOP_LICENSE);
  };
<<<<<<< HEAD
  reSubmitApplication = application => {
    this.setState({ submitTitle: "Resubmit Application", submit: true, openResubmit: false });
    this.shopService.resubmit(application, errorMsg => this.setGlobal({ errorMsg }),
      (challan, successMsg) => {

        const MySwal = withReactContent(Swal);

        if (challan) {
          MySwal.fire({
            title: `Challan No:${challan.number}`,
            text: successMsg,
            type: "success",
            showCancelButton: true,
            cancelButtonText: "Close",
            confirmButtonColor: "#26B99A",
            confirmButtonText: "Pay Now (ONLINE)"
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                "Pay!",
                "Your application is paid.",
                "success"
              );
            }
          });
        } else {
          this.setGlobal({ successMsg });
        }

        // this.props.refresh();
      })
      .finally(() => this.setState({ submit: false }));
  };

  render() {
    const { application, openResubmit, openRenew,openDetail } = this.state;
    const { history, shops, shop } = this.props;
=======

  reSubmitApplication = application => {
    this.setState({submitTitle: "Resubmit Application", submit: true, openResubmit: false});
    this.shopService.resubmit(application, errorMsg => this.setGlobal({errorMsg}),
        (challan, successMsg) => {
          const MySwal = withReactContent(Swal)
          if (challan) {
            MySwal.fire({
              title: `Challan No:${challan.number}`,
              text: successMsg,
              type: 'success',
              showCancelButton: true,
              cancelButtonText: "Close",
              confirmButtonColor: '#26B99A',
              confirmButtonText: "Pay Now (ONLINE)"
            }).then((result) => {
              if (result.value) {
                Swal.fire(
                    'Pay!',
                    'Your application is paid.',
                    'success'
                )
              }
            })
          } else {
            this.setGlobal({successMsg});
          }
        })
        .finally(() => this.setState({submit: false}));
  };

  render() {
    const {application, openResubmit, openDetail} = this.state;
    const {history, shops, shop} = this.props;
>>>>>>> e7ac09cb8b851ceea9128261dd33c2eb01617cc6
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
<<<<<<< HEAD
        label: "SHOP NAME"
      }, {
        name: "validity",
        label: "Validity",
        options: {
          customBodyRender: (value) => "date"
        }
=======
        label: "NAME OF SHOP"
>>>>>>> e7ac09cb8b851ceea9128261dd33c2eb01617cc6
      },
      {
        name: "local_council",
        label: "PROPOSED SHOP LOCATION",
        options: {
          customBodyRender: (value) => value.name
        }
      },
      {
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
              case ApplicationState.SEND_BACK:
                color = "#4966a0";
                name = "Sent Back";
                break;
              case ApplicationState.REJECTED_APPLICATION:
                color = "#a03937";
                name = "Rejected";
                break;
              default:
                color = "#f8f8f8";
                name = status;
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
            const {rowIndex} = tableMeta;
            let data = shops[rowIndex];
            let controls = undefined;
            let view = <>
              <Tooltip title={"View Application details"}>
<<<<<<< HEAD
                <IconButton href={"#"} onClick={e => this.setState({ application: data, openDetail: true })}>
=======
                <IconButton href={"#"} onClick={e => this.setState({application: data, openDetail: true})}>
>>>>>>> e7ac09cb8b851ceea9128261dd33c2eb01617cc6
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
              case ApplicationState.NEW_APPLICATION:
                controls = <>
                  {view}
                  <Tooltip title={"Renew  Application"}>
                    <IconButton href={"#"} onClick={event => this.setState({
                      openRenew: true, data
                    })}>
                      <Icon fontSize={"small"}>refresh</Icon>
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
                      <Icon fontSize={"small"} color={"primary"}>refresh</Icon>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
              case ApplicationState.REJECTED_APPLICATION:
                controls = <>
                  {view}
                  <Tooltip title={"Submit New Applications"}>
                    <IconButton href={"#"} onClick={this.submitNewApplication.bind(this, data)}>
                      <Icon fontSize={"small"} color={"primary"}>save</Icon>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
              case ApplicationState.SEND_BACK:
                controls = <>
                  {view}
                  <Tooltip title={"Re Submit Application"}>
                    <IconButton href={"#"} onClick={e => this.setState({application: data, openResubmit: true})}>
                      <Icon fontSize={"small"} color={"primary"}>send</Icon>
                    </IconButton>
                  </Tooltip>
                </>;
                break;
            }
            return (controls);
          }
        }
      }
    ];
    let notFound = (<GridContainer justify={"center"}>
      <Typography component={"div"} color={"inherit"} variant={"h6"}> No Result Found</Typography>
      <Button href={"#"} variant={"outlined"} onClick={e => history.push(HOME)} color={"primary"}>Back to Home</Button>
    </GridContainer>);

    let found = <MUIDataTable
        title={"SHOP LICENSING: List of Application"}
        data={shops}
        columns={tableColumns}
        options={tableOptions}/>;

    return (
<<<<<<< HEAD
      <>
        {this.global.loading ? <LoadingView/> :
          <CardContent>
            {/*{applications.length === 0 && notFound}/*/}
            {found}
          </CardContent>
        }
        <ApplicationDetailsDialog type={application ? application.file.fileable_type : "App//Shop"} open={openDetail}
                                  title='View Application Details'
                                  application={application}
                                  file={application ? application.file : null}
                                  onClose={e => this.setState({ openDetail: false })}/>
        <SubmitDialog open={this.state.submit} title={this.state.submitTitle} text={"Please wait ..."}/>

        <ResubmitShopApplicationDialog open={openResubmit} onClose={e => this.setState({ openResubmit: false })}
                                       application={application} onResubmit={this.reSubmitApplication}/>

        <RenewShopLicenseDialog open={openRenew} onClose={e => this.setState({ openRenew: false })}
                                       application={application} onResubmit={this.reSubmitApplication}/>
      </>
=======
        <>
          {this.global.loading ? <LoadingView/> :
              <CardContent>
                {/*{applications.length === 0 && notFound}/*/}
                {found}
              </CardContent>
          }
          <ApplicationDetailsDialog type={application ? application.file.fileable_type : "App//Shop"} open={openDetail}
                                    title='View Application Details'
                                    application={application}
                                    file={application ? application.file : null}
                                    onClose={e => this.setState({openDetail: false})}/>

          <SubmitDialog open={this.state.submit} title={this.state.submitTitle} text={"Please wait ..."}/>

          <ResubmitShopApplicationDialog open={openResubmit} onClose={e => this.setState({openResubmit: false})}
                                         application={application} onResubmit={this.reSubmitApplication}/>
        </>
>>>>>>> e7ac09cb8b851ceea9128261dd33c2eb01617cc6
    );
  }
}

export default withRouter(ShopLicenseList);