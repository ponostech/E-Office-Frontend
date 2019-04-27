import React, { Component } from "react";
import ReactTable from "react-table";
import { Button, Checkbox, IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import 'react-table/react-table.css'
import GridItem from "../../../../components/Grid/GridItem";

import DeleteIcon from '@material-ui/icons/DeleteForever';
import GridContainer from "../../../../components/Grid/GridContainer";

class ShopRejectedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { application_no: "12", age: 12 },
        { application_no: "123", age: 12 },
        { application_no: "32", age: 12 },
        { application_no: "321", age: 12 },
        { application_no: "22", age: 12 },
        { application_no: "11", age: 12 },
        { application_no: "44", age: 12 },
        { application_no: "56", age: 12 }
      ]

    };
  }

  render() {
    const columns = [{
      Header: "Action",
      accessor: "application_no",
      Cell:props=> <Checkbox name={"check"} />// String-based value accessors!
    },{
      Header: "Name",
      accessor: "application_no" // String-based value accessors!
    }, {
      Header: "Age",
      accessor: "age",
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: "Actions",
      accessor: "application_no",
      Cell: props => <IconButton>
        <DeleteIcon/>
      </IconButton> // Custom cell components!
    }];
    return (
      <div>
        <GridContainer>
         <GridItem>
           <TextField variant={"standard"}
                      margin={"dense"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end">
                            <SearchIcon color={"action"}/>
                          </InputAdornment>
                        ),
                        placeholder: "Search"
                      }}/>
         </GridItem>
        </GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <ReactTable
            columns={columns}
            data={this.state.data}
            showPagination={true}
            showPaginationBottom={true}
            showPageSizeOptions={true}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={10}/>
        </GridItem>
      </div>
    );
  }
}

export default ShopRejectedList;