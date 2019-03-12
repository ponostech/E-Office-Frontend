import React, { Component } from "react";
import ReactTable from "react-table";
import { Checkbox, Chip, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "react-table/react-table.css";
import GridItem from "../../../../components/Grid/GridItem";

import MoreIcon from "@material-ui/icons/MoreVert";
import CustomDropdown from "../../../../components/CustomDropdown/CustomDropdown";
import { OfficeRoutes } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";

class NewHoardingApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  handleMoreMenu=(menu)=>{
    const { history } = this.props;
    switch (menu) {
      case "View details":
        history.push(OfficeRoutes.HOARDING_DETAILS);
        break;
      default:
        break;
    }
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
          <Chip label={"ACTIVE"} color={"primary"}/>
        );
      }
    }, {
      Header: "Action",
      accessor: "application_no",
      maxWidth: 60,
      Cell: props => {
        return (
          <CustomDropdown
            onClick={this.handleMoreMenu.bind(this)}
            buttonProps={{
              simple: true
            }}
            caret={false}
            buttonIcon={() => <MoreIcon color={"action"}/>}
            dropdownList={["View details", "detail"]}
          />
        );
      }
    }];


    return (
      <div>
        <GridItem xs={12} sm={12} md={12}>
          <TextField variant={"standard"}
                     margin={"dense"}
                     InputProps={{
                       startAdornment: (
                         <InputAdornment
                           position="start">
                           <SearchIcon/>
                         </InputAdornment>
                       ),
                       placeholder: "Search"
                     }}/>

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
      </div>
    );
  }
}

export default withRouter(NewHoardingApplications);