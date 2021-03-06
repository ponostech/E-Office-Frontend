import React, { Component } from "reactn";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import LoadingView from "../../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import ApplicationState from "../../../../utils/ApplicationState";
import Chip from "@material-ui/core/Chip";
import { APPLY_SHOP_LICENSE } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import moment from "moment";
import SubmitDialog from "../../../../components/SubmitDialog";
import ResubmitShopApplicationDialog from "../../../shop/ResubmitShopApplicationDialog";
import { ShopService } from "../../../../services/ShopService";
import ApplicationDetailsDialog from "../../../common/ApplicationDetailsDialog";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import RenewShopLicenseDialog from "../../../shop/RenewShopLicenseDialog";
import PropTypes from "prop-types";
import { MuiThemeProvider } from "@material-ui/core/styles";
import FieldChangeDialog from "../../../shop/ShopFieldChangeDialog";

class ShopApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application: null,
      openConfirm: false,
      openResubmit: false,
      openRenew: false,
      openChangeDialog: false,
      openDetail: false,
      submit: false,
      submitTitle: "Submit"
    };
    this.shopService = new ShopService();
  }

  withDraw = data => {
    this.setState({ openConfirm: true, application: data });
  };

  downloadLicense = data => {
    console.log(data);
  };

  printLicense = data => {
    console.log(data);
  };

  renewLicense = data => {
    console.log(data);
  };

  submitNewApplication = data => {
    const { history } = this.props;
    history.push(APPLY_SHOP_LICENSE);
  };

  changeField = application =>
    this.setState({ application, openChangeDialog: true });

  reSubmitApplication = application => {
    this.setState({
      submitTitle: "Resubmit Application",
      submit: true,
      openResubmit: false
    });
    this.shopService
      .resubmit(
        application,
        errorMsg => this.setGlobal({ errorMsg }),
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
            }).then(result => {
              if (result.value) {
                Swal.fire("Pay!", "Your application is paid.", "success");
              }
            });
          } else {
            this.setGlobal({ successMsg });
          }
          // this.props.refresh();
        }
      )
      .finally(() => this.setState({ submit: false }));
  };

  render() {
    const {
      application,
      openChangeDialog,
      openResubmit,
      openRenew,
      openDetail
    } = this.state;
    const { applications } = this.props;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scrollFullHeight",
      rowsPerPage: 10,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "created_at",
        label: "APPLICATION DATE",
        options: {
          filter: false,
          customBodyRender: value => moment(value).format("Do MMMM YYYY")
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
        name: "address",
        label: "PROPOSED LOCATION"
      },
      {
        name: "status",
        label: "STATUS",
        options: {
          customBodyRender: status => {
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
            return (
              <Chip
                component={"span"}
                variant={"outlined"}
                label={name}
                color={color}
              />
            );
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

            let view = (
              <>
                <Tooltip title={"View Application details"}>
                  <IconButton
                    href={"#"}
                    onClick={e =>
                      this.setState({ application: data, openDetail: true })
                    }
                  >
                    <Icon fontSize={"small"}>remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );
            switch (status) {
              case ApplicationState.NEW_APPLICATION:
                controls = (
                  <>
                    {view}
                    <Tooltip title={"Withdraw Application"}>
                      <IconButton
                        href={"#"}
                        onClick={this.withDraw.bind(this, data)}
                      >
                        <Icon fontSize={"small"}>close</Icon>
                      </IconButton>
                    </Tooltip>
                  </>
                );
                break;
              case ApplicationState.RENEW_APPLICATION:
                controls = (
                  <>
                    {view}
                    <Tooltip title={"Renew  Application"}>
                      <IconButton
                        href={"#"}
                        onClick={event =>
                          this.setState({
                            openRenew: true,
                            data
                          })
                        }
                      >
                        <Icon fontSize={"small"}>refresh</Icon>
                      </IconButton>
                    </Tooltip>
                  </>
                );
                break;
              case ApplicationState.APPROVED_APPLICATION:
                controls = (
                  <>
                    {view}
                    <Tooltip title={"Download License"}>
                      <IconButton
                        href={"#"}
                        onClick={this.downloadLicense.bind(this, data)}
                      >
                        <Icon fontSize={"small"} color={"primary"}>
                          cloud_download
                        </Icon>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Print License"}>
                      <IconButton
                        href={"#"}
                        onClick={this.printLicense.bind(this, data)}
                      >
                        <Icon fontSize={"small"} color={"primary"}>
                          print
                        </Icon>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Change Info"}>
                      <IconButton
                        href={"#"}
                        onClick={this.changeField.bind(this, data)}
                      >
                        <Icon fontSize={"small"} color={"primary"}>
                          edit
                        </Icon>
                      </IconButton>
                    </Tooltip>
                  </>
                );
                break;
              case ApplicationState.EXPIRED_LICENSE:
                controls = (
                  <>
                    {view}
                    <Tooltip title={"Renew License"}>
                      <IconButton
                        href={"#"}
                        onClick={this.renewLicense.bind(this, data)}
                      >
                        <Icon fontSize={"small"} color={"primary"}>
                          refresh
                        </Icon>
                      </IconButton>
                    </Tooltip>
                  </>
                );
                break;
              case ApplicationState.REJECTED_APPLICATION:
                controls = (
                  <>
                    {view}
                    <Tooltip title={"Submit New Applications"}>
                      <IconButton
                        href={"#"}
                        onClick={this.submitNewApplication.bind(this, data)}
                      >
                        <Icon fontSize={"small"} color={"primary"}>
                          save
                        </Icon>
                      </IconButton>
                    </Tooltip>
                  </>
                );
                break;
              case ApplicationState.SEND_BACK:
                controls = (
                  <>
                    {view}
                    <Tooltip title={"Re Submit Application"}>
                      <IconButton
                        href={"#"}
                        onClick={e =>
                          this.setState({
                            application: data,
                            openResubmit: true
                          })
                        }
                      >
                        <Icon fontSize={"small"} color={"primary"}>
                          send
                        </Icon>
                      </IconButton>
                    </Tooltip>
                  </>
                );
                break;
              default:
                break;
            }
            return controls;
          }
        }
      }
    ];

    // let notFound = (
    //   <GridContainer justify={"center"}>
    //     <Typography component={"div"} color={"inherit"} variant={"h6"}>
    //       {" "}
    //       No Result Found
    //     </Typography>
    //     <Button
    //       href={"#"}
    //       variant={"outlined"}
    //       onClick={e => history.push(HOME)}
    //       color={"primary"}
    //     >
    //       Back to Home
    //     </Button>
    //   </GridContainer>
    // );

    let found = (
      <>
        <MuiThemeProvider theme={this.props.theme}>
          <MUIDataTable
            title={"SHOP LICENSING: List of Application"}
            data={applications}
            columns={tableColumns}
            options={tableOptions}
          />
        </MuiThemeProvider>
      </>
    );

    return (
      <>
        {this.global.loading ? (
          <LoadingView />
        ) : (
          <CardContent>{found}</CardContent>
        )}

        <ApplicationDetailsDialog
          open={openDetail}
          title="View Application Details"
          application={application}
          file={application ? application.file : null}
          onClose={e => this.setState({ openDetail: false })}
        />

        <SubmitDialog
          open={this.state.submit}
          title={this.state.submitTitle}
          text={"Please wait ..."}
        />

        <ResubmitShopApplicationDialog
          open={openResubmit}
          onClose={e => this.setState({ openResubmit: false })}
          application={application}
          onResubmit={this.reSubmitApplication}
        />

        <RenewShopLicenseDialog
          open={openRenew}
          onClose={e => this.setState({ openRenew: false })}
          application={application}
          onResubmit={this.reSubmitApplication}
        />

        <FieldChangeDialog
          open={openChangeDialog}
          onClose={event => this.setState({ openChangeDialog: false })}
          application={application}
        />
      </>
    );
  }
}

ShopApplicationList.propTypes = {
  applications: PropTypes.array.isRequired,
  theme: PropTypes.any.isRequired
};

export default withRouter(ShopApplicationList);
