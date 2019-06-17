import React, { Component } from "reactn";
import moment from "../../e-office/applications/shop-license/ShopNewList";
import { Button, Icon, IconButton, Tooltip, Typography } from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import ApplicationState from "../../../utils/ApplicationState";
import Chip from "@material-ui/core/Chip";
import { HOME } from "../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { LicenseService } from "../../../services/LicenseService";
import GridContainer from "../../../components/Grid/GridContainer";


class ShopLicenseList extends Component {
  constructor(props) {
    super(props);
    this.state={
      applications: [],
      application: null,
    }

    this.licenseService = new LicenseService();
  }

  componentDidMount() {
    const {mobile_no} = this.props.match.params;
    this.setGlobal({ loading: true});
    this.licenseService.checkShopLicense(mobile_no,
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
        name: "created_at",
        label: "APPLICATION DATE",
        options: {
          filter: false,
          customBodyRender: (value) => moment(value).format("Do MMMM YYYY")
        }
      },
      {
        name: "owner",
        label: "NAME OF APPLICANT",
      },
      {
        name: "name",
        label: "SHOP NAME",
      },
      {
        name: "local_council",
        label: "PROPOSED LOCATION",
        options: {
          customBodyRender: (value) => value.name
        }
      },{
        name: "status",
        label:"STATUS",
        options:{
          customBodyRender:(status)=>{
            let color="grey";
            let name="New";
            switch (status) {
              case ApplicationState.NEW_APPLICATION:
                color="#727272";
                name="New"
                break;
              case ApplicationState.UNDER_PROCESS_APPLICATION:
                color="#f8504b";
                name="In Process"
                break;
              case ApplicationState.APPROVED_APPLICATION:
                color="#27f88c";
                name = "Approved";
                break;
              case ApplicationState.CANCELLED_APPLICATION:
                color="#4966a0";
                name="Cancelled";
                break;
            }
            return <Chip component={"span"} variant={"outlined"} label={name} color={color}/>
          }
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
            let data = applications[rowIndex];
            return (
              <>
                <Tooltip title='View Details'>
                  <IconButton href={"#"} color="primary" size="medium"
                              aria-label="View Details" onClick={event => this.setState({application:data,view:true})}>
                    <Icon fontSize="small">remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );
          }
        }
      },
    ];
    let notFound= (<GridContainer  justify={"center"}>
        <Typography component={"div"} color={"inherit"} variant={"h6"}> No Result Found</Typography>
        <Button href={"#"} variant={"outlined"} onClick={e=>history.push(HOME)} color={"primary"}>Back to Home</Button>
    </GridContainer>);
      let found= <>
        <MUIDataTable
        title={"HOTEL/LODGING: List of Application"}
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

      </>
    );
  }
}

export default withRouter(ShopLicenseList);