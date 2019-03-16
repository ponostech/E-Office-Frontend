import React, { Component } from "react";
import ReactTable from "react-table";
import { Button, Checkbox, Chip, IconButton, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "react-table/react-table.css";
import GridItem from "../../../../components/Grid/GridItem";
import GetIcon from "@material-ui/icons/DragHandle";
import EyeIcon from "@material-ui/icons/RemoveRedEyeSharp";
import { OfficeRoutes } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import GridContainer from "../../../../components/Grid/GridContainer";
import ApplicationAssignmentDialog from "../ApplicationAssignmentDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import HoardingDetailDialog from "./HoardingDetailDialog";

class NewHoardingApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      openConfirm: false,
      viewDetail: false,
      selectedFiles: [],
      hoarding: {},
      data: [
        {
          application_no: "12",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "23",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "123",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "434",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "55",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "66",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "878",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "77",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "34",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "90",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        },
        {
          application_no: "6565",
          address: "fake address",
          length: 12,
          height: 290,
          type: "ILLUMINATE",
          localCouncil: "Chhinga veng",
          landOwner: "Kima",
          expired: "12/12/2019"
        }
      ]

    };
  }

  takeFiles = (e) => {
    this.setState({ openConfirm: false });
  };
  handleMoreMenu = (menu) => {
    const { history } = this.props;
    switch (menu) {
      case "View details":
        history.push(OfficeRoutes.HOARDING_DETAILS);
        break;
      default:
        break;
    }
  };
  onUserAssign = (user) => {
    this.setState({
      openDialog: false
    });
  };
  showDetails = (id) => {
    let hoarding = this.state.data.filter(function(item) {
      return item.application_no === id;
    });
    this.setState({
      viewDetail: true
    });
  };
  closeDetail=(e)=>{
    this.setState({
      viewDetail:false
    })
  }

  render() {
    const columns = [{
      Header: "",
      accessor: "application_no",
      Cell: props => <Checkbox name={"check"}/>,
      maxWidth: 40
    }, {
      Header: "Applciation No",
      accessor: "application_no" // String-based value accessors!
    }, {
      Header: "length",
      accessor: "length",
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: "Height",
      accessor: "height" // String-based value accessors!
    }, {
      Header: "Type of Ads",
      accessor: "type" // String-based value accessors!
    }, {
      Header: "Local Council",
      accessor: "localCouncil" // String-based value accessors!
    }, {
      Header: "Land Owner",
      accessor: "landOwner"
    }, {
      Header: "Expiry Date",
      accessor: "expired"
    }, {
      Header: "Status",
      accessor: "application_no",
      Cell: props => {
        return (
          <Chip variant={"outlined"} label={"ACTIVE"} color={"primary"}/>
        );
      }
    }, {
      Header: "Action",
      accessor: "application_no",
      maxWidth: 60,
      Cell: props => {
        return (
          <Tooltip title={"Click here to view details"}>
            <IconButton onClick={(e) => this.showDetails(props.value)}>
              <EyeIcon/>
            </IconButton>
          </Tooltip>
        );
      }
    }];


    return (
      <div>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer justify={"space-between"}>
            <GridItem>
              <TextField variant={"outlined"}
                         margin={"dense"}
                         InputProps={{
                           startAdornment: (
                             <InputAdornment
                               position="end">
                               <SearchIcon/>
                             </InputAdornment>
                           ),
                           placeholder: "Search"
                         }}/>
            </GridItem>
            <GridItem>
              <div>
                <Tooltip title={"Click here to get this file"}>
                  <IconButton onClick={(e) => this.setState({ openConfirm: true })}>
                    <GetIcon/>
                  </IconButton>
                </Tooltip>
                <Button color={"primary"} variant={"outlined"} onClick={(e) => this.setState({ openDialog: true })}>
                  Assign User
                </Button>
              </div>
            </GridItem>
          </GridContainer>

        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <ReactTable
            columns={columns}
            data={this.state.data}
            showPagination={true}
            showPaginationBottom={true}
            showPageSizeOptions={true}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={10}
          />
        </GridItem>
        <ApplicationAssignmentDialog open={this.state.openDialog} onClose={this.onUserAssign.bind(this)}
                                     files={this.state.selectedFiles}/>
        <ConfirmDialog message={"Click confirm button to take these files"}
                       open={this.state.openConfirm}
                       onConfirm={this.takeFiles}
                       onCancel={(e) => this.setState({ openConfirm: false })}/>
                       <HoardingDetailDialog open={this.state.viewDetail} haording={this.state.hoarding} onClose={this.closeDetail.bind(this)}/>
      </div>
    );
  }
}

export default withRouter(NewHoardingApplications);