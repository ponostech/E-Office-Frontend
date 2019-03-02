import React, { Component } from "react";
import ReactTable from "react-table";
import GridItem from "../../components/Grid/GridItem";
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";


class PendingHoardingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "kimi", age: 12 },
        { name: "kimi", age: 12 },
        { name: "kimi", age: 12 },
        { name: "kimi", age: 12 },
        { name: "kimi", age: 12 },
        { name: "kimi", age: 12 },
        { name: "kimi", age: 12 },
        { name: "kimi", age: 12 }
      ]

    };
  }

  render() {
    const columns = [{
      Header: "Name",
      accessor: "name" // String-based value accessors!
    }, {
      Header: "Age",
      accessor: "age",
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
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

export default PendingHoardingList;