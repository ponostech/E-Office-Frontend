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
        name: "id",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            const {rowIndex} = tableMeta;
            let application = applications[rowIndex];
            let controls = undefined;
            switch (application.status) {
              case ApplicationState.NEW_APPLICATION:
                controls=(
                  <>
                    <IconButton href={"#"} color="primary" size="small"
                                aria-label="View Details" onClick={event => this.setState({view:true,application})}>
                      <Icon fontSize="small">remove_red_eye</Icon>
                    </IconButton>
                    </>
                );
                break;
              case ApplicationState.APPROVED_APPLICATION:
                controls=(
                  <>
                    <IconButton href={"#"} color="primary" size="small"
                                aria-label="Renew" onClick={event => this.setState({renew:true,application})}>
                      <Icon fontSize="small">remove_red_eye</Icon>
                    </IconButton>
                  </>
                );
                  break;
              case ApplicationState.UNDER_PROCESS_APPLICATION:
                controls=undefined;
                break;
            }
            return controls;
          }
        }
      },
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
        </CardContent>}

        <BannerViewDialog data={application} close={()=>this.setState({view:false})} open={this.state.view} />
      </>
    );
  }
}

export default withRouter(BannerList);