import React, { Component } from "react";
import ReactTable from "react-table";
import { Button, IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DetailIcon from "@material-ui/icons/RemoveRedEye";
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer";
import { OfficeRoutes } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";

class PendingKiosks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          application_no: "123",
          length: 12,
          height: 123,
          coordinate: { lat: 122, lng: 343 },
          localCouncil: "Chhinga veng",
          landOwner: "Kimi"
        },
        {
          application_no: "33",
          length: 12,
          height: 123,
          coordinate: { lat: 122, lng: 343 },
          localCouncil: "Chhinga veng",
          landOwner: "Kimi"
        },
        {
          application_no: "3",
          length: 12,
          height: 123,
          coordinate: { lat: 122, lng: 343 },
          localCouncil: "Chhinga veng",
          landOwner: "Kimi"
        },
        {
          application_no: "54",
          length: 12,
          height: 123,
          coordinate: { lat: 122, lng: 343 },
          localCouncil: "Chhinga veng",
          landOwner: "Kimi"
        },
        {
          application_no: "565",
          length: 12,
          height: 123,
          coordinate: { lat: 122, lng: 343 },
          localCouncil: "Chhinga veng",
          landOwner: "Kimi"
        },
        {
          application_no: "77",
          length: 12,
          height: 123,
          coordinate: { lat: 122, lng: 343 },
          localCouncil: "Chhinga veng",
          landOwner: "Kimi"
        },
        {
          application_no: "88",
          length: 12,
          height: 123,
          coordinate: { lat: 122, lng: 343 },
          localCouncil: "Chhinga veng",
          landOwner: "Kimi"
        },
        {
          application_no: "99",
          length: 12,
          height: 123,
          coordinate: { lat: 122, lng: 343 },
          localCouncil: "Chhinga veng",
          landOwner: "Kimi"
        },
        {
          application_no: "12",
          length: 12,
          height: 123,
          coordinate: { lat: 122, lng: 343 },
          localCouncil: "Chhinga veng",
          landOwner: "Kimi"
        }
      ]

    };
  }

  render() {
    const { history } = this.props;

    const columns = [{
      Header: "Application No",
      accessor: "application_no" // String-based value accessors!
    }, {
      Header: "length",
      accessor: "length"
    }, {
      Header: "Height",
      accessor: "height"
    }, {
      Header: "coordinate",
      accessor: "coordinate",
      Cell: props => {
        return (
          <Button variant={"extendedFab"} color={"secondary"}>
            coordinate
          </Button>
        );
      }
    }, {
      Header: "Local Council",
      accessor: "localCouncil"
    }, {
      Header: "Land Owner",
      accessor: "landOwner"
    },
      {
        Header: "action",
        accessor: "application_no",
        Cell:props=>{
          return(
            <IconButton onClick={(e)=>{
              history.push(OfficeRoutes.KIOSK_DETAIL)
            }}>
              <DetailIcon/>
            </IconButton>
          )
        }
      },
    ];

    return (
      <div>
        <GridContainer justify={"space-between"}>
          <GridItem>
            <TextField variant={"standard"}
                       margin={"dense"}
                       InputProps={{
                         endAdornment: (
                           <InputAdornment
                             position="end">
                             <SearchIcon/>
                           </InputAdornment>
                         ),
                         placeholder: "Search"
                       }}/>

          </GridItem>
          <Button onClick={(e) => history.push(OfficeRoutes.PROPOSED_KIOSK)} color={"primary"} style={{ margin: 20 }}
                  variant={"contained"}> New Kiosk</Button>
        </GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <ReactTable
            columns={columns}
            data={this.state.data}
            showPagination={true}
            showPaginationTop={false}
            showPaginationBottom={true}
            showPageSizeOptions={true}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={10}/>
        </GridItem>
      </div>
    );
  }
}

export default withRouter(PendingKiosks);