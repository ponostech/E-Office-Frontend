import React, { Component } from "react";
import ReactTable from "react-table";
import { Button, IconButton, InputAdornment, Switch, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "react-table/react-table.css";
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer";
import { OfficeRoutes } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";

import ViewIcon from '@material-ui/icons/PanoramaFishEye'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
class AvailableKiosks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id:1,place:'place',length:12,height:20,bothSide:true,landlord:'Kimi',action:(<Button color={"primary"}>action</Button>)},
        { id:1,place:'place',length:12,height:20,bothSide:false,landlord:'Kimi',action:(<Button color={"primary"}>action</Button>)},
        { id:1,place:'place',length:12,height:20,bothSide:false,landlord:'Kimi',action:(<Button color={"primary"}>action</Button>)},
        { id:1,place:'place',length:12,height:20,bothSide:true,landlord:'Kimi',action:(<Button color={"primary"}>action</Button>)},
        { id:1,place:'place',length:12,height:20,bothSide:true,landlord:'Kimi',action:(<Button color={"primary"}>action</Button>)},
      ]

    };
  }

  render() {
    const columns = [{
      Header: "ID",
      accessor: "name" // String-based value accessors!
    }, {
      Header: "Place",
      accessor: "place",
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    } ,{
      Header: "Length",
      accessor: "length",
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: "Height",
      accessor: "height",
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    } ,{
      Header: "Bothside",
      accessor: "bothSide",
      Cell: props => <Switch  value={props.value}/> // Custom cell components!
    },{
      Header: "LandOwner",
      accessor: "landlord",
    },{
      Header: "Action",
      accessor: "action",
      Cell:props=> <div style={{background:'white',borderRadius:50}}>
        <IconButton><ViewIcon/></IconButton>
        <IconButton><EditIcon/></IconButton>
        <IconButton><DeleteIcon/></IconButton>
      </div>
    }];

    const { history } = this.props;
    return (
      <GridContainer >
         <GridItem>
           <TextField variant={"standard"}
                      label={"Search here"}
                      margin={"dense"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end">
                            <SearchIcon color={"action"}/>
                          </InputAdornment>
                        ),
                        placeholder: "Type here"
                      }}/>
         </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <ReactTable
            columns={columns}
            resizable={true}
            data={this.state.data}
            showPagination={true}
            showPaginationBottom={true}
            showPageSizeOptions={true}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={10}/>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withRouter(AvailableKiosks);